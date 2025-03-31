import { useState } from "react";
import Login from "./components/Login.jsx";
import DailyForm from "./components/DailyForm.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div style={{ background: "rgb(37, 37, 37)" }}>
      <div style={header}>
        <img src="/olympia-banner.png" style={containerLogo} />
      </div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <div style={conteinerBemVindo}>Bem vindo, {user.id}!</div>
          <DailyForm user={user} />
        </>
      )}
    </div>
  );
};

const header = {
  justifyContent: "space-around",
  alignItems: "center",
  display: "flex",
  width: "100%",
  height: "50px",
  marginTop: "10px",
};
const containerLogo = {
  height: "100%",
};

const conteinerBemVindo = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Roboto",
  fontSize: "30px",
  fontWeight: "lighter",
  margin: "16px 0px 6px 0px",
};

export default App;
