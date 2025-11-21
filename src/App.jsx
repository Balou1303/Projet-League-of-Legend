import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainPage from "./Pages/MainPage";
import ChampionDetailsPage from "./Pages/ChampionDetailsPage";
import NavBar from "./Components/NavBar";
import RegionsPage from "./Pages/RegionsPage";
import RegionDetailsPage from "./Pages/RegionDetailsPage";
import ChampionsPage from "./Pages/ChampionsPage";
import QuizzPage from "./Pages/QuizzPage";


function App() {
  return (
    
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/championDetails/:id" element={<ChampionDetailsPage />} />
          <Route path="/regions" element={<RegionsPage />} />
          <Route path="/regionDetails/:id" element={<RegionDetailsPage />} />
          <Route path="/champions" element={<ChampionsPage />} />
          <Route path="/quizz" element={<QuizzPage/>} />
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App