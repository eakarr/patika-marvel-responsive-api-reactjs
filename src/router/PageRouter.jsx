import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Header from "../components/header";
import SearchBarAndLang from "../components/searchBar";

const PageRouter = () => {
  return (
    <>
      <Header />
      <SearchBarAndLang />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </>
  );
};

export default PageRouter;
