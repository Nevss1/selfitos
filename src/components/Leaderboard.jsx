import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Certifique-se de que o db está corretamente importado

// Função que recupera o leaderboard
const getLeaderboard = async () => {
  try {
    // Recupera todos os usuários da coleção "users"
    const usersSnapshot = await getDocs(collection(db, "users"));
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

  // Exibe uma mensagem caso não haja dados
  if (leaderboard.length === 0) {
    return <div>Nenhum dado disponível para exibir o leaderboard.</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={user.id}>
            <strong>{index + 1}. {user.name}</strong>: {user.totalPoints} pontos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
