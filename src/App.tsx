import "./App.css";
import ToolBar from "./components/ToolBar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Containers/Home.tsx";

const App = () => {

  return (
    <>
      <ToolBar/>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
