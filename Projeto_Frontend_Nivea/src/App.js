import { Routes, Route } from 'react-router-dom';
import MenuSuperior from "./components/MenuSuperior";
import InclusaoLivros from "./components/InclusaoLivros";
import ManutencaoLivros from "./components/ManutencaoLivros";
import ResumoLivros from "./components/ResumoLivros.js";
import NossaEmpresa from "./components/NossaEmpresa"

const App = () => {
  return (
    <>
      <MenuSuperior />
      <Routes>
        <Route path="manut" element={<ManutencaoLivros /> } /> 
        <Route path="resumo" element={<ResumoLivros /> } />
        <Route path="/" element={<InclusaoLivros /> } />
        <Route path="nossaempresa" element={<NossaEmpresa /> } />
      </Routes>
    </>
  );
};

export default App;
