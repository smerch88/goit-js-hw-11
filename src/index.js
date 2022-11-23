import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";

import { ApiServices } from "./js/api-service.js";
import createCard from "./templates/card.hbs";

const searchFormRef = document.querySelector(".search-form");
const galleryRef = document.querySelector(".gallery");
const loadMoreRef = document.querySelector(".load-more");

const apiServices = new ApiServices();

const onSubmitAction = async (event) => {
  loadMoreRef.classList.remove("hidden");
  event.preventDefault();
  galleryRef.innerHTML = "";
  apiServices.pageNumber = 1;
  apiServices.searchData = event.currentTarget.searchQuery.value;

  try {
    const { data } = await apiServices.getPics();
    if (data.total === 0) {
      throw new Error(Notiflix.Notify.failure("Not found"));
    } else if (apiServices.pageNumber === 1) {
      Notiflix.Notify.success(`${data.total} pictures found.`);
    }
    if (apiServices.perPage > data.hits.length) {
      loadMoreRef.classList.add("hidden");
    }
    const dataToRender = createCard(data.hits);
    galleryRef.insertAdjacentHTML("beforeend", dataToRender);
  } catch (error) {
    console.log(error.message);
  }
};

const onClickAction = async (event) => {
  event.preventDefault();
  apiServices.pageNumber++;
  console.log(apiServices.pageNumber);
  event.preventDefault();
  try {
    const { data } = await apiServices.getPics();
    if (data.total === 0) {
      throw new Error(Notiflix.Notify.failure("Not found"));
    } else if (apiServices.pageNumber === 1) {
      Notiflix.Notify.success(`${data.total} pictures found.`);
    }
    console.log(data);
    console.log(apiServices.perPage - data.hits.length);

    if (apiServices.perPage > data.hits.length) {
      loadMoreRef.classList.add("hidden");
    }
    const dataToRender = createCard(data.hits);
    galleryRef.insertAdjacentHTML("beforeend", dataToRender);
  } catch (error) {
    console.log(error.message);
  }
};

searchFormRef.addEventListener("submit", onSubmitAction);
loadMoreRef.addEventListener("click", onClickAction);
