import { useEffect, useState } from "react";
import { collection, getDocs, query, doc } from "firebase/firestore";
import { db } from '../firebase'; // Certifique-se de que o db está corretamente importado

// Função que recupera o leaderboard
const getLeaderboard = async () => {
  try {
    // Recupera todos os usuários da coleção "users"
    const usersSnapshot = await getDocs(query(collection(db, "users")));
    const leaderboard = [];
    // Para cada usuário, busca suas pontuações diárias
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      
      const dailySnapshot = await getDocs(collection(db, "users", userDoc.id, "daily"));
      let totalPoints = 0;

      // Soma as pontuações de cada dia
      dailySnapshot.forEach(doc => {
        totalPoints += doc.data().pontos || 0; // Se não houver pontos, soma 0
      });

      // Adiciona o usuário ao leaderboard
      leaderboard.push({
        id: userDoc.id,
        name: userData.name,
        totalPoints: totalPoints
      });
    }
    // Ordena o leaderboard pela pontuação (do maior para o menor)
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    return leaderboard;
  } catch (error) {
    console.error("Erro ao buscar leaderboard:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Erro ao buscar leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard(); // Chama a função para buscar os dados
  }, []); // Esse efeito roda apenas uma vez, quando o componente for montado

  // Exibe uma mensagem de carregamento enquanto busca os dados
  if (loading) {
    return <div>Carregando leaderboard...</div>;
  }

  return (
    <div style={conteinerRanking}>
      <div style={rankingTitle}>Ranking</div>
        <div style={conteinerUserRanking}>
          {leaderboard.map((user, index) => (
            <div style={conteinerUser}>
              <div>
                {index + 1}.
              </div> 
              <div>  
                {user.id}
              </div>
              <div>
                {user.totalPoints} pontos
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

// Estilos CSS

const conteinerRanking = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",

  margin: "20px 0px 0px 0px",
  padding: "10px",
}

const rankingTitle = {
  fontFamily: "Roboto",
  fontSize: "30px",
  fontWeight: "lighter",
  margin: "0px 0px 10px 0px",
}

const conteinerUserRanking = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}

const conteinerUser = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "90%",
  padding : "10px",
  justifyContent: "space-between",
  borderBottom: "1px solid #ccc"
}

export default Leaderboard;
