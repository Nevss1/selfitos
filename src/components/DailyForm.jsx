import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import "../styles.css"

const DailyForm = ({ user }) => {
  const [data, setData] = useState({
    academia: false,
    agua: false,
    alimentacao: false,
    sono: false,
    cardio: false,
  });
  const [totalPontos, setTotalPontos] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const q = query(collection(db, "users", user.id, "daily"));
      const querySnapshot = await getDocs(q);

      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().pontos;
      });

      setTotalPontos(total);
    }; // fetchPoints atualiza o estado dos Pontos do Jogador usuário

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

    const pontos = 
      (data.academia ? 30 : 0) +
      (data.agua ? 15 : 0) +
      (data.alimentacao ? 20 : 0) +
      (data.sono ? 15 : 0) +
      (data.cardio ? 20 : 0);

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
    <div style={conteinerGeral}>
      <div style={conteinerPontuacao}>Pontuação total: {totalPontos} pontos</div>
      <div style={preenchaDados}>Preencha seus dados diários</div>
      
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Roboto", margin: "0px 0px 0px 0px" }}> 
        <label style={conteinerCheckBox}>
        💪<input style={checkBox} type="checkbox" name="academia" checked={data.academia} onChange={handleChange} />
          Academia (+30)
        </label>

        <label style={conteinerCheckBox}>
        🏃 <input style={checkBox} type="checkbox" name="cardio" checked={data.cardio} onChange={handleChange} />
          Cardio (+20)
        </label>

        <label style={conteinerCheckBox}>
        🥗<input style={checkBox} type="checkbox" name="alimentacao" checked={data.alimentacao} onChange={handleChange} />
          Alimentação (+20)
        </label>

        <label style={conteinerCheckBox}>
        🌊<input style={checkBox} type="checkbox" name="agua" checked={data.agua} onChange={handleChange} />
          Meta de água (+15)
        </label>

        <label style={conteinerCheckBox}>
        💤<input style={checkBox} type="checkbox" name="sono" checked={data.sono} onChange={handleChange} />
          Sono 7-8h (+15)
        </label>
      </div>
      <button type="submit" onClick={handleSubmit} style={salvarButton}>
        Salvar
      </button>
    </div>
  );
};

const conteinerGeral = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const conteinerPontuacao = {
  fontFamily: "Roboto",
  fontSize: "18px",
  fontWeight: "lighter",
  margin: "0px 0px 10px 0px",
}
const preenchaDados = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "lighter",
  margin: "0px 0px 10px 0px",
};
const conteinerCheckBox = {
  fontSize: "16px",
  marginTop: "4px",
}

const checkBox = {
  accentColor: "green",
  borderRadius: "100%",
  width: "16px",
  height: "16px",
  marginRight: "8px",
} 
const salvarButton = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "10px",
  cursor: "pointer",
  margin: "5px",
  width: "90vw",
  padding: "16px",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "lighter",
  marginTop: "40px",
}
export default DailyForm;
