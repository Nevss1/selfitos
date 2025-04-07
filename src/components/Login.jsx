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
          <div style={userBox}>
            <div style={{margin: "0px 0px 0px 10px"}}>
              {user.name}  
            </div>
            <button 
              key={user.id}
              style={buttonStyle}
              onClick={() => setUser(user)}
            >
              <img src="/arrow.png" alt="User Avatar" style={{ width: "30px", height: "30px"}} />
              </button>
          </div>
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
  width: "25px",
  height: "25px",
  padding: "18px",
  fontFamily: "Roboto",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const userBox = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "rgba(58, 58, 58, 0.62)",
  color: "white",
  borderRadius: "40px",
  border: "0.5px solid rgba(255, 255, 255, 0.62)",
  padding: "10px",
  margin: "5px",
  width: "70vw",
  height: "36px",
  fontFamily: "Roboto",
}
export default Login;