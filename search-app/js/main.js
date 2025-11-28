import {
  setSearchFocus,
  showClearSearchButton,
  clearPushListener,
  clearSearchText,
} from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();

  const search = document.querySelector("#search");
  search.addEventListener("input", showClearSearchButton);

  const clear = document.querySelector("#clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.querySelector("#searchBar");
  form.addEventListener("submit", submitTheSearch);
};

const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;

  const resultArray = await retrieveSearchResults(searchTerm);

  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
