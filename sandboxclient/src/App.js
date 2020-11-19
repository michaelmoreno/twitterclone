import "./App.css";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Trending from "./components/Trending";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <Feed />

      <Trending />
    </div>
  );
}

export default App;
