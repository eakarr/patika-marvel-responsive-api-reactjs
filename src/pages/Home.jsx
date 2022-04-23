import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Pagination from "../components/pagination/index";
import { useNavigate } from "react-router-dom";

const limit = 12;
const hash = "2a1c1fd9ff3e606ef95c9fc9f3cd45d7"; // Required for fetching the data!
const apikey = "1ec87bb86921fb33493233a6d71c8a6d"; // Public apikey.
const baseURL = "https://gateway.marvel.com:443/v1/public";

const service = axios.create({
  baseURL,
});

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const navigate = useNavigate();

  ////////////////////////////////// LocalStorage Logic Start //////////////////////////////////
  const saveData = useCallback((offset, characters) => {
    localStorage.setItem(offset, JSON.stringify(characters));
  }, []);

  const saveTotalCharacterCount = useCallback((count) => {
    localStorage.setItem("totalCharacterCount", count);
  }, []);

  const getTotalCharacterCount = useCallback(() => {
    return localStorage.getItem("totalCharacterCount");
  }, []);

  const getSavedData = useCallback((key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }, []);
  ////////////////////////////////// LocalStorage Logic End //////////////////////////////////

  ////////////////////////////////// Fetching Data Logic Start by Using Pagination//////////////////////////////////
  const fetchData = useCallback(
    async (offset) => {
      const savedData = getSavedData(offset);

      if (savedData) {
        setCharacters(savedData);
        const totalCharacters = getTotalCharacterCount();
        setTotalCharacters(totalCharacters);
        window.scrollTo(0, 0);
        return;
      } // If the characters are already saved in our localStorage, then there is no need to continue for fetching the data.

      try {
        setIsLoading(true);

        const result = await service.get("/characters", {
          params: { ts: 1, limit, offset: offset * 12, apikey, hash },
        });
        // console.log(result) // This actually shows us that the data we want is in data.data.results

        const totalCharacters = result.data.data.total;

        const characters = result.data.data.results;

        setTotalCharacters(totalCharacters);
        setCharacters(characters);
        saveData(offset, characters);
        saveTotalCharacterCount(totalCharacters);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    },
    [saveData, getSavedData, saveTotalCharacterCount, getTotalCharacterCount]
  );

  useEffect(() => {
    fetchData(offset);
  }, [fetchData, offset]);
  ////////////////////////////////// Fetching Data Logic End by Using Pagination //////////////////////////////////

  ////////////////////////////////// Pagination Logic Start //////////////////////////////////
  const onPrevClick = () => {
    setOffset((prev) => {
      let page = prev - 1;
      if (page < 0) {
        page = 0;
      }
      return page;
    });
  };

  const onNextClick = () => {
    setOffset((prev) => {
      let page = prev + 1;
      if (page > pageNumbers.length - 1) {
        page = pageNumbers.length - 1;
      }
      return page;
    });
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCharacters / limit); i++) {
    pageNumbers.push(i);
  }
  ////////////////////////////////// Pagination Logic End //////////////////////////////////

  const selectedSuperHeroHandler = (superHero) => {
    navigate(`./${superHero.id}`);
    console.log(superHero);
  };

  return (
    <div className="container">
      {/* <!-- ////////////////////////////////// Down Side Container Start //////////////////////////////////--> */}
      <div className="down-side-container">
        {characters?.map((character) => {
          return (
            <div key={character.id}>
              <div
                className="hero-cards"
                onClick={() => selectedSuperHeroHandler(character)}
              >
                <img
                  width="216"
                  height="324"
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt="hero"
                />
                <p>{character.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
        >
          Loading...
        </div>
      )}
      {/* <!-- ////////////////////////////////// Down Side Container End //////////////////////////////////--> */}

      {/* <!-- ////////////////////////////////// Pagination Start //////////////////////////////////--> */}
      <div className="pagination">
        <Pagination
          offset={offset}
          onChange={setOffset}
          pageNumbers={pageNumbers}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      </div>
      {/* <!-- ////////////////////////////////// Pagination End //////////////////////////////////--> */}

      {/* <!-- ////////////////////////////////// Container End //////////////////////////////////--> */}
    </div>
  );
};

export default Home;
