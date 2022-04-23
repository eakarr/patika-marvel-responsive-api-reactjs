import React, { createContext, useState } from "react";
import axios from "axios";

const limit = 5;
const hash = "2a1c1fd9ff3e606ef95c9fc9f3cd45d7"; // Required for fetching the data!
const apikey = "1ec87bb86921fb33493233a6d71c8a6d"; // Public apikey.
const baseURL = "https://gateway.marvel.com:443/v1/public";

const service = axios.create({
  baseURL,
});

export const SuperHeroContext = createContext();

export const SuperHeroProvider = ({ children }) => {
  const [searchedSuperHero, setSearchedSuperHero] = useState([]);

  const fetchSearchBarData = async (heroName) => {
    if (!heroName) {
      return;
    }
    try {
      const result = await service.get(
        `/characters?nameStartsWith=${heroName}`,
        {
          params: { ts: 1, limit, apikey, hash },
        }
      );
      setSearchedSuperHero(result.data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SuperHeroContext.Provider
      value={{
        searchedSuperHero,
        fetchSearchBarData,
        setSearchedSuperHero,
      }}
    >
      {children}
    </SuperHeroContext.Provider>
  );
};
