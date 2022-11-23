import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import createCard from "./templates/card.hbs";

const searchFormRef = document.querySelector(".search-form");
const galleryRef = document.querySelector(".gallery");
const loadMoreRef = document.querySelector(".load-more");

let searchData = "cat";
let pageNumber = 1;

const onSubmitAction = (event) => {
  event.preventDefault();
  pageNumber = 1;
  galleryRef.innerHTML = "";
  searchData = event.currentTarget.searchQuery.value;
  fetchPictures().then((pictures) => {
    const data = createCard(pictures.hits);
    galleryRef.insertAdjacentHTML("beforeend", data);
  });
  console.log(searchData);
};

const fetchPictures = async () => {
  const response = await fetch(
    `https://pixabay.com/api/?key=31495238-8710d87c3c0eb2a83465ec547&q=${searchData}&image_type=photo&page=${pageNumber}&per_page=40&safesearch=true&orientation=horizontal`
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

const onClickAction = (event) => {
  event.preventDefault();
  pageNumber++;
  console.log(pageNumber);
  event.preventDefault();
  fetchPictures().then((pictures) => {
    const data = createCard(pictures.hits);
    galleryRef.insertAdjacentHTML("beforeend", data);
  });
};

searchFormRef.addEventListener("submit", onSubmitAction);
loadMoreRef.addEventListener("click", onClickAction);

galleryRef.addEventListener("click", (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }
});

// lightbox simple
let gallery = new SimpleLightbox(".gallery a", {
  caption: true,
  captionsData: "alt",
  captionDelay: 250,
});
gallery.on("show.simplelightbox", function () {
  // do something…
});

gallery.on("error.simplelightbox", function (e) {
  console.log(e); // some usefull information
});
