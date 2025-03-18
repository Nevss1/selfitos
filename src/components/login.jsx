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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Escolha seu usuário</h1>
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setUser(user)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Login;
  