import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SuperHeroContext } from "../../context/SuperHeroContext";
import i18n from "../../language/i18next";
import { useNavigate } from "react-router-dom";

const SearchBarAndLang = () => {
  const [searchBarInput, setSearchBarInput] = useState("");
  const { searchedSuperHero, fetchSearchBarData, setSearchedSuperHero } =
    useContext(SuperHeroContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchBarInputHandler = (event) => {
    fetchSearchBarData(event.target.value);
    setSearchBarInput(event.target.value);
  };

  const selectedSuperHeroHandler = (superHero) => {
    console.log(superHero);
    navigate(`./${superHero.id}`);
    setSearchBarInput("");
  };

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const onBlur = () => {
    setTimeout(() => {
      setSearchedSuperHero([]);
    }, 100);
  };

  return (
    <div className="searchBarContainerMainDiv">
      <label className="searchBarLabel">{t("search")}</label>
      <div className="searchBarAndLanguageDiv">
        <div className="searchBar" onBlur={onBlur}>
          <input
            type="text"
            onChange={searchBarInputHandler}
            value={searchBarInput}
            placeholder={t("inputPlaceholder")}
          />

          {searchBarInput.length >= 2 && searchedSuperHero ? (
            <div className="searchBarSpanDiv">
              {searchedSuperHero.map((superHero) => (
                <span
                  className="searchBarSpan"
                  key={superHero.id}
                  onClick={() => selectedSuperHeroHandler(superHero)}
                >
                  {superHero.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="languages">
          <button className="languagesButtons" onClick={() => changeLang("fr")}>FR</button>
          <button className="languagesButtons" onClick={() => changeLang("en")}>EN</button>
          <button className="languagesButtons" onClick={() => changeLang("tr")}>TR</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBarAndLang;
