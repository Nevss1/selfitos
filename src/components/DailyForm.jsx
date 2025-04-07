import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import "../stylesDailyForm.css"
import Infopopup from "./infoPopUp.jsx"

const DailyForm = ({ user }) => {
  const [data, setData] = useState({
    academia: false,
    agua: false,
    alimentacao: false,
    sono: false,
    cardio: false,
  });
  const [totalPontos, setTotalPontos] = useState(0);
  const [workoutMode, setWorkoutMode] = useState(4);

  useEffect(() => {
    if (!user) return;


    const fetchWorkoutMode = async () => {
      const userRef = doc(db, "users", user.id);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(userData.WorkoutMode)
        if (userData.WorkoutMode) setWorkoutMode(userData.WorkoutMode);
      }
    }; // fetchWorkoutMode atualiza o estado do Modo de Treino do usuário	


    const fetchPoints = async () => {
      const userDailyRef = collection(db, "users", user.id, "daily");
      const querySnapshot = await getDocs(userDailyRef);

      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().pontos;
      });

      setTotalPontos(total);
    }; // fetchPoints atualiza o estado dos Pontos do Jogador usuário


    fetchWorkoutMode();
    fetchPoints();
  }, [user.id]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error("Nenhum usuário selecionado");
      alert("Erro: Nenhum usuário selecionado");
      return;
    }

    let pontos = 0; // Inicializa a variável de pontos

    const calculatePoints = () => {
      if (data.academia) {
        if (workoutMode == 4) pontos += 30; // Modo de treino 4
        else if (workoutMode == 3) pontos += 40; // Modo de treino 3
      }
      if (data.agua) pontos += 15;
      if (data.alimentacao) pontos += 20;
      if (data.sono) pontos += 15;
      if (data.cardio) pontos += 20;
      return pontos;
    }
    calculatePoints()
    console.log("Pontos calculados:", pontos);

    const today = new Date().toLocaleString("en-CA", { timeZone: "America/Sao_Paulo" }).split(",")[0];

    const docRef = collection(db, "users", user.id, "daily");

    try {
      await setDoc(doc(docRef, today), { ...data, pontos, date: today });
      setTotalPontos((prev) => prev + pontos);
      alert("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className="conteinerGeral">
      <div className="conteinerPontuacao">Pontuação total: {totalPontos} pontos</div>
      <div className="preenchaDados">Preencha seus dados diários</div>
      
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Roboto", margin: "0px 0px 0px 0px" }}> 
        <label className="conteinerCheckBox">
        💪<input type="checkbox" name="academia" checked={data.academia} onChange={handleChange} />
          Academia (+{workoutMode == 4 ? 30 : 40})
        </label>

        <label className="conteinerCheckBox">
        🏃 <input type="checkbox" name="cardio" checked={data.cardio} onChange={handleChange} />
          Cardio (+20)
        </label>

        <label className="conteinerCheckBox">
        🥗<input type="checkbox" name="alimentacao" checked={data.alimentacao} onChange={handleChange} />
          Alimentação (+20)
        </label>

        <label className="conteinerCheckBox">
        🌊<input type="checkbox" name="agua" checked={data.agua} onChange={handleChange} />
          Meta de água (+15)
        </label>

        <label className="conteinerCheckBox}">
        💤<input type="checkbox" name="sono" checked={data.sono} onChange={handleChange} />
          Sono 7-8h (+15)
        </label>
      </div>
      <button type="submit" onClick={handleSubmit} className="salvarButton">
        Salvar
      </button>
      <div style={infoConteiner}>
        <Infopopup workoutMode={workoutMode} setWorkoutMode={setWorkoutMode} user={user}/>
      </div>
    </div>
  );
};

const infoConteiner = {
  margin: "40px 0px 0px 0px",
  fontFamily: "Roboto",
  width: "90vw",
}

export default DailyForm;
