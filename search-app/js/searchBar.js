export const setSearchFocus = () => {
  document.querySelector("#search").focus();
};

export const showClearSearchButton = () => {
  const search = document.querySelector("#search");
  const clear = document.querySelector("#clear");

  if (search.value.length) {
    clear.classList.remove("none");
    clear.classList.add("flex");
  } else {
    clear.classList.remove("flex");
    clear.classList.add("none");
  }
};

export const clearSearchText = (event) => {
  event.preventDefault();
  document.querySelector("#search").value = "";
  const clear = document.querySelector("#clear");
  clear.classList.remove("flex");
  clear.classList.add("none");
  setSearchFocus();
};

export const clearPushListener = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    document.querySelector("#clear").click();
  }
};
