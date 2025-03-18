import { useState } from "react";
import Login from "./components/login";
import DailyForm from "./components/DailyForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col items-center p-4">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <h1 className="text-2xl font-bold">Bem-vindo, {user.displayName}!</h1>
          <DailyForm user={user} />
        </>
      )}
    </div>
  );
};

export default App;
