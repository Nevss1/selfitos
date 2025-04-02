import Leaderboard from "./Leaderboard.jsx";
import ScoreChart from "./ScoreChart.jsx";


const users = [
  { id: "Leandro", name: "Barou (Leandro)" },
  { id: "Edmilton", name: "CBUM (Edmilson)" },
  { id: "Lucas", name: "Caike Pro (Lucas)" },
  { id: "Rafael", name: "Ra(mon)fael" },
  { id: "Antonio", name: "Columbu (Antonio)" },
  { id: "Leo Lucas", name: "Ronnie Coleman (leleo)" },
  { id: "Leo Jr", name: "Leojr"},
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
        }}>Quem está acessando?</p>

        {users.map((user) => (
          <button 
            key={user.id}
            style={buttonStyle}
            onClick={() => setUser(user)}
          >
            <img src="/arrow.png" alt="User Avatar" style={{ width: "30px", height: "30px"}} />
            </button>
        ))}
      </div>
      <Leaderboard />
      <ScoreChart />
    </div>

  )
}

const buttonStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.62)",
  color: "white",
  border: "none",
  borderRadius: "100%",
  cursor: "pointer",
  margin: "5px",
  width: "20px",
  height: "20px",
  padding: "16px",
  fontFamily: "Roboto",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export default Login;