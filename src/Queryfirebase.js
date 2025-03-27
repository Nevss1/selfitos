import { db } from "./firebase"
import { collection, getDocs, query, doc} from "firebase/firestore"

const vamover = async () => {
    try {
        console.log("Firebase conectado?", db ? "Sim" : "Não");

        const q = collection(db, "users");
        const snapshot = await getDocs(q);

        console.log(snapshot.size)
        snapshot.forEach((doc) => {
            console.log("User ID: ", doc.id)
        })
    } catch (error) {
        console.error("erro ao buscar")
    }
}

export default vamover;