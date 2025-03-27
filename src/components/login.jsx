import Leaderboard from "./Leaderboard.jsx";

const users = [
  { id: "Leandro", name: "Barou (Leandro)" },
  { id: "Edmilton", name: "CBUM (Edmilson)" },
  { id: "Lucas", name: "Caike Pro (Lucas)" },
  { id: "Rafael", name: "Ra(mon)fael" },
  { id: "Antonio", name: "Columbu (Antonio)" },
  { id: "Leo Lucas", name: "Ronnie Coleman (leleo)" },
  { id: "Leo Jr", name: "Leojr" },
];

function Login({setUser}) {
  return (
    <div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <p style={{
          fontFamily: "Roboto",
          fontSize: "30px",
          fontWeight: "lighter",
          color: "white"

        }}>Escolha o seu usuário</p>

        {users.map((user) => (
          <button 
            key={user.id}
            style={buttonStyle}
            onClick={() => setUser(user)}
          >
            {user.name}</button>
        ))}
      </div>
      <Leaderboard />
    </div>

  )
}

const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "10px",
  cursor: "pointer",
  margin: "5px",
  width: "90vw",
  padding: "16px",
  fontFamily: "Roboto",
  fontSize: "16px"
}

export default Login;