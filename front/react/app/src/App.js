import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import UserCard from "./Components/UserCard/UserCard";

function App() {
  return (
    <>
      <NavBar />
      <div className="appArea">
        <UserCard className="UserCard" />
      </div>
    </>
  );
}

export default App;
