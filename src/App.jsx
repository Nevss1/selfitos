import { useState } from "react";
import Login from "./components/Login.jsx"; 
import DailyForm from "./components/DailyForm.jsx";

const App = () => {
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
