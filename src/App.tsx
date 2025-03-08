import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Containers/Home.tsx";
import Categories from "./Containers/Categories.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/cateogories' element={<Categories/>}/>
      </Routes>
    </>
  );
};

export default App;
