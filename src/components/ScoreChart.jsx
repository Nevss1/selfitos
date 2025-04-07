import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const users = [
  { id: "Leandro", name: "usuário 1", color: "#ff7300", },
  { id: "Edmilton", name: "usuário 2", color: "#387908" },
  { id: "Lucas", name: "usuário 3", color: "#8884d8" },
  { id: "Rafael", name: "usuário 4", color: "#82ca9d" },
  { id: "Antonio", name: "usuário 5", color: "#ffc658" },
  { id: "Leo Lucas", name: "usuário 6", color: "#d884d8" },
  { id: "Leo Jr", name: "usuário 7", color: "#4080ff" },
];

const ScoreChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      let userPoints = {};
      let allDates = new Set();

      // Buscar os dados de cada usuário
      for (const user of users) {
        const dailySnapshot = await getDocs(collection(db, "users", user.id, "daily"));

        userPoints[user.id] = {};
        let total = 0; // Pontuação acumulada

        dailySnapshot.forEach((doc) => {
          const date = doc.id; // Data do documento
          total += doc.data().pontos || 0; // Soma os pontos do dia
          userPoints[user.id][date] = total;
          allDates.add(date);
        });
      }

      // Ordenar todas as datas em ordem crescente
      const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

      // Criar estrutura de dados para o gráfico
      let formattedChartData = [];
      let lastPoints = {}; // Salva a última pontuação de cada usuário

      sortedDates.forEach((date) => {
        let entry = { 
          date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) 
        };
      
        users.forEach((user) => {
          if (userPoints[user.id][date] !== undefined) {
            lastPoints[user.id] = userPoints[user.id][date]; // Atualiza a última pontuação conhecida
          }
          entry[user.id] = lastPoints[user.id] || 0; // Se não há pontuação no dia, mantém a última conhecida
        });
      
        formattedChartData.push(entry);
      });
      

      setChartData(formattedChartData);
      console.log(formattedChartData); // Para depuração
    };

    fetchChartData();
  }, []);

  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap", // Permite quebra de linha no celular
        maxWidth: "90vw", // Limita a largura no celular
        marginBottom: "30px",
        marginLeft: "30px",
      }}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{
            marginRight: 10,
            display: "flex",
            alignItems: "center",
            flex: "1 1 auto", // Permite melhor adaptação em telas menores
            minWidth: "100px" // Garante que os itens fiquem organizados
          }}>
            <div style={{
              width: 12, height: 12, backgroundColor: entry.color, marginRight: 5, borderRadius: "50%"
            }}></div>
            <span style={{ fontSize: 12, color: "#fff" }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ width: "90%", marginTop: "20px" }}>
      <div style={{ textAlign: "center", color: "white", fontFamily: "Roboto" }}>📈 Evolução das Pontuações</div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="20 20" />
          <XAxis dataKey="date" />
          <YAxis />
          <Legend content={<CustomLegend />} />
          
          {users.map((user) => (
            <Line 
              key={user.id} 
              type="basis" 
              dataKey={user.id} 
              stroke={user.color} 
              name={user.name}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
