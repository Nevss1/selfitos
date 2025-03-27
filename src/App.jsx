import { useState, useEffect } from "react";
import Login from "./components/Login"; 
import DailyForm from "./components/DailyForm";
import teste from "./Queryfirebase"

const App = () => {
  useEffect(() => {
    teste();
  }, [])

  const [user, setUser] = useState(null);

  return (
    <div style={{background: "rgb(43, 43, 43)"}}>
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
