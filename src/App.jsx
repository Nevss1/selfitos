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
          <div style={conteinerBemVindo}>
            Bem vindo, {user.id}!</div>
          <DailyForm user={user} />
        </>
      )
      }
    </div>
  )
}

const conteinerBemVindo = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#282c34",
  fontFamily: "Roboto",
  fontSize: "30px",
  fontWeight: "lighter",
  margin: "16px 0px 6px 0px",
};

export default App;
