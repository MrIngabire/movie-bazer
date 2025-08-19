import axios from "axios";

const API_KEY = '43bd2d02efba908daa30f720f820ab34';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export default tmdb;
