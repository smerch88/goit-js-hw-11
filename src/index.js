import axios from "axios";
import Notiflix from "notiflix";

const searchFormRef = document.querySelector(".search-form");
const div = document.querySelector(".gallery");
const loadMoreRef = document.querySelector(".load-more");

let searchData = "cat";
let pageNumber = 1;

const onSubmitAction = (event) => {
  event.preventDefault();
  pageNumber = 1;
  div.innerHTML = "";
  searchData = event.currentTarget.searchQuery.value;
  fetchPictures().then((pictures) => {
    console.log(pictures.hits);
    pictures.hits.forEach((element) => {
      const pictureUrl = element.largeImageURL;
      renderData(pictureUrl);
    });
  });
  console.log(searchData);
};

const fetchPictures = async () => {
  const response = await fetch(
    `https://pixabay.com/api/?key=31495238-8710d87c3c0eb2a83465ec547&q=${searchData}&image_type=photo&pretty=true&page=${pageNumber}&per_page=40`
  );
  console.log(
    `https://pixabay.com/api/?key=31495238-8710d87c3c0eb2a83465ec547&q=${searchData}&image_type=photo&pretty=true&page=${pageNumber}&per_page=40`
  );
  const pictures = await response.json();
  console.log(pictures.total);
  if (pictures.total === 0) {
    throw new Error(Notiflix.Notify.failure("Not found"));
  } else {
    Notiflix.Notify.success(`${pictures.total} pictures found.`);
  }
  return pictures;
};

function renderData(imgUrl) {
  const data = `<img src="${imgUrl}"></img>`;
  div.insertAdjacentHTML("beforeend", data);
}

const onClickAction = (event) => {
  pageNumber++;
  console.log(pageNumber);
  event.preventDefault();
  fetchPictures().then((pictures) => {
    console.log(pictures.hits);
    pictures.hits.forEach((element) => {
      const pictureUrl = element.largeImageURL;
      renderData(pictureUrl);
    });
  });
};

searchFormRef.addEventListener("submit", onSubmitAction);
loadMoreRef.addEventListener("click", onClickAction);
