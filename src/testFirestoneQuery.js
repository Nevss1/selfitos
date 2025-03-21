import { getDocs, collection } from "firebase/firestore";
import { db } from './firebase';
const testFirestoreQuery = async () => {
    try {
      // Recupera todos os documentos da coleção "users"
      console.log("Iniciando consulta...");
      const usersSnapshot = await getDocs(collection(db, "users"));
      console.log("Usuários encontrados:", usersSnapshot.docs.length);
  
      if (usersSnapshot.empty) {
        console.log("Nenhum documento encontrado na coleção 'users'.");
        return;
      }
  
      // Para cada usuário, consulta a subcoleção "daily" e exibe as pontuações
      for (const userDoc of usersSnapshot.docs) {
        console.log("Usuário:", userDoc.id); // Nome do usuário (ex: Antonio)
  
        // Recupera todos os documentos da subcoleção "daily" do usuário
        const dailySnapshot = await getDocs(collection(db, "users", userDoc.id, "daily"));
        console.log(`Pontuações diárias do usuário ${userDoc.id}:`, dailySnapshot.size);
  
        // Exibe as pontuações de cada data no diário do usuário
        dailySnapshot.forEach(doc => {
          console.log(`Data: ${doc.id}, Pontuação: ${doc.data().pontos}`);
        });
      }
    } catch (error) {
      console.error("Erro ao consultar Firestore:", error);
    }
  };
  

export default testFirestoreQuery;
