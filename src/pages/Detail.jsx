import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const format = "comic";
const formatType = "comic";
const orderBy = "onsaleDate";
const limit = 10;
const hash = "2a1c1fd9ff3e606ef95c9fc9f3cd45d7"; // Required for fetching the data!
const apikey = "1ec87bb86921fb33493233a6d71c8a6d"; // Public apikey.
const baseURL = "https://gateway.marvel.com:443/v1/public";

const service = axios.create({
  baseURL,
});

const Detail = () => {
  const [selectedSuperHero, setSelectedSuperHero] = useState({});
  const [superHeroComics, setSuperHeroComics] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();
  const fetchData = async () => {
    try {
      const comicsResult = await service.get(
        `/characters/${params.id}/comics?`,
        {
          params: { format, formatType, orderBy, ts: 1, limit, apikey, hash },
        }
      );
      const superHeroResult = await service.get(`/characters/${params.id}?`, {
        params: { ts: 1, apikey, hash },
      });
      setSuperHeroComics(comicsResult.data.data.results);
      setSelectedSuperHero(superHeroResult.data.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    
    <div>
      <div>
        <button className="backToHomePageButton" onClick={() => navigate("/")}>
          {t("backToHomePage")}
        </button>
      </div>
      <div className="superHeroDetailParentDiv">
        <div className="superHeroDetailNameAndImageContainer">
          <div className="superHeroDetailName">
            <h1>{selectedSuperHero.name}</h1>
          </div>
          <div>
            <img
              width="416"
              height="524"
              src={
                selectedSuperHero.thumbnail?.path +
                "." +
                selectedSuperHero.thumbnail?.extension
              }
              alt="superHero"
            />
          </div>
        </div>
        <div className="superHeroDetailParagraph">
          {(selectedSuperHero.description)}
        </div>
        <div className="superHeroDetailComics">
          <h2>{t("superHeroComics")}</h2>
          {superHeroComics?.reverse().map((comic,index) => (
            <span key={index}>{comic.title}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
