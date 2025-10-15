import Feed from "./components/Feed";
import InputLogger from "./components/InputLogger";
import LoginForm from "./components/LoginForm";
import MessageBoard from "./components/MessageBoard";

function App() {
  return (
    <div>
      <h1>ReactBook - Partie 4</h1>
      <InputLogger />
      <LoginForm />
      <MessageBoard />
      <Feed />
    </div>
  );
}

export default App;
