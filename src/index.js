import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";

import { ApiServices } from "./js/api-service.js";
import createCard from "./templates/card.hbs";

const searchFormRef = document.querySelector(".search-form");
const galleryRef = document.querySelector(".gallery");
const loadMoreRef = document.querySelector(".load-more");

const apiServices = new ApiServices();

const onSubmitAction = (event) => {
  event.preventDefault();
  galleryRef.innerHTML = "";
  apiServices.pageNumber = 1;
  apiServices.searchData = event.currentTarget.searchQuery.value;
  apiServices
    .getPics()
    .then(({ data }) => {
      if (data.total === 0) {
        throw new Error(Notiflix.Notify.failure("Not found"));
      } else if (apiServices.pageNumber === 1) {
        Notiflix.Notify.success(`${data.total} pictures found.`);
      }
      const dataToRender = createCard(data.hits);
      galleryRef.insertAdjacentHTML("beforeend", dataToRender);
    })
    .catch((error) => console.log(error));
};

const onClickAction = (event) => {
  event.preventDefault();
  apiServices.pageNumber++;
  console.log(apiServices.pageNumber);
  event.preventDefault();
  apiServices
    .getPics()
    .then(({ data }) => {
      const dataToRender = createCard(data.hits);
      galleryRef.insertAdjacentHTML("beforeend", dataToRender);
    })
    .catch((error) => console.log(error));
};

searchFormRef.addEventListener("submit", onSubmitAction);
loadMoreRef.addEventListener("click", onClickAction);
