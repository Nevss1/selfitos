
/*

import { useState } from "react";
import Login from "./components/Login";
import DailyForm from "./components/DailyForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col items-center p-4">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user.name}!</h1>
          <DailyForm user={user} />
          <button
            onClick={() => setUser(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Sair
          </button>
        </>
      )}
    </div>
  );
};

export default App;
*/

import { useState } from "react";
import Login from "./components/login"; 
import DailyForm from "./components/DailyForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <h1>Bem vindo, {user}!</h1>
          <DailyForm user={user} />
        </>
      )
      }
    </div>
  )
}

export default App;
