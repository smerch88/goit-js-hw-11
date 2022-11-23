import axios from "axios";

export class ApiServices {
  #BASEURL = "https://pixabay.com/api/?key=31495238-8710d87c3c0eb2a83465ec547";

  constructor() {
    this.searchData = "cat";
    this.pageNumber = "1";
  }

  getPics() {
    return axios.get(
      `${this.#BASEURL}&q=${this.searchData}&image_type=photo&page=${
        this.pageNumber
      }&per_page=40&safesearch=true&orientation=horizontal`
    );
  }
}
