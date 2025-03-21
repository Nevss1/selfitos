import { useState, useEffect } from "react";
import Login from "./components/Login"; 
import DailyForm from "./components/DailyForm";
import testFirestoneQuery from "./testFirestoneQuery";

const App = () => {
  useEffect(() => {
    // Chama a função para testar a consulta ao Firestore
    testFirestoneQuery();
  }, []); // A função será chamada uma vez, quando o componente for montado

  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <h1>Bem vindo, {user.name}!</h1>
          <DailyForm user={user} />
        </>
      )
      }
    </div>
  )
}

export default App;
