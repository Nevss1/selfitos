/*

const users = [
    { id: "pessoa1", name: "Barou (Leandro" },
    { id: "pessoa2", name: "CBUM (Edmilson)" },
    { id: "pessoa3", name: "Caike Pro (Lucas)" },
    { id: "pessoa4", name: "Ra(mon)fael" },
    { id: "pessoa5", name: "Columbu (Antonio)" },
    { id: "pessoa6", name: "Ronnie Coleman (leleo)" },
    { id: "pessoa7", name: "Leojr" },
  ];
  
  const Login = ({ setUser }) => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Escolha seu usuário</h1>
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
            console.log(user),
            <button
              key={user.id}
              onClick={() => setUser(user)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Login;
  */

  const users = [
    { id: "user1", name: "Barou (Leandro)" },
    { id: "user2", name: "CBUM (Edmilson)" },
    { id: "user3", name: "Caike Pro (Lucas)" },
    { id: "user4", name: "Ra(mon)fael" },
    { id: "user5", name: "Columbu (Antonio)" },
    { id: "user6", name: "Ronnie Coleman (leleo)" },
    { id: "user7", name: "Leojr" },
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
          fontWeight: "lighter"

        }}>Usuários</p>

        {users.map((user) => (
          <button 
            key={user.id}
            style={buttonStyle}
            onClick={() => setUser(user.name)}
          >
            {user.name}</button>
        ))}
      </div>
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