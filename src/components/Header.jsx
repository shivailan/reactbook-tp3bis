import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(credentials.username, credentials.password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000); // Efface l'erreur après 2s
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-black text-xl">R</div>
          <h1 className="text-2xl font-black text-gray-900 hidden sm:block">
            React<span className="text-blue-600">Book</span>
          </h1>
        </div>

        {/* Section Connexion / Profil */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-[10px] text-green-500 font-bold uppercase">En ligne</p>
              </div>
              <button 
                onClick={logout}
                className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-2 rounded-full text-sm font-bold transition-all"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Utilisateur"
                className={`text-xs p-2 border rounded-lg outline-none transition-all ${error ? 'border-red-500 animate-shake' : 'border-gray-200 focus:border-blue-500'}`}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
              <input 
                type="password" 
                placeholder="MDP"
                className={`text-xs p-2 border rounded-lg outline-none transition-all ${error ? 'border-red-500 animate-shake' : 'border-gray-200 focus:border-blue-500'}`}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-all"
              >
                Connexion
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;