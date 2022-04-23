import React from "react";
import "./App.css";
import PageRouter from "./router/PageRouter";
import { SuperHeroProvider } from "./context/SuperHeroContext";

const App = () => {
  return (
    <SuperHeroProvider>
      <PageRouter />
    </SuperHeroProvider>
  );
};

export default App;
