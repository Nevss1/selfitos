import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const DailyForm = ({ user }) => {
  const [data, setData] = useState({
    academia: false,
    agua: false,
    alimentacao: false,
    sono: false,
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
    };

    fetchPoints();
  }, [user.id]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    console.log(data);
    event.preventDefault();

    if (!user) {
      console.error("Nenhum usuário selecionado");
      alert("Erro: Nenhum usuário selecionado");
      return;
    }

    const pontos = 
      (data.academia ? 20 : 0) +
      (data.agua ? 20 : 0) +
      (data.alimentacao ? 30 : 0) +
      (data.sono ? 15 : 0);

    const today = new Date().toISOString().split("T")[0];
    
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
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Preencha seus dados de hoje</h2>
      <p className="mb-2 text-lg font-semibold">Pontuação Total: {totalPontos} pontos</p>
      <div style={{ display: "flex", flexDirection: "column" }}> 
        <label>
          <input type="checkbox" name="academia" checked={data.academia} onChange={handleChange} />
          Foi à academia? (+20 pontos)
        </label>

        <label>
          <input type="checkbox" name="agua" checked={data.agua} onChange={handleChange} />
          Bebeu a meta de água? (+20 pontos)
        </label>

        <label>
          <input type="checkbox" name="alimentacao" checked={data.alimentacao} onChange={handleChange} />
          Se alimentou bem? (+30 pontos)
        </label>

        <label>
          <input type="checkbox" name="sono" checked={data.sono} onChange={handleChange} />
          Dormiu 7-8h? (+15 pontos)
        </label>
      </div>
      <button type="submit" onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
        Salvar
      </button>
    </div>
  );
};

export default DailyForm;
