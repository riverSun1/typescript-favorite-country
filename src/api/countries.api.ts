import axios, { AxiosInstance } from "axios";
import { Country } from "../types/countries.type";

const BASE_URL = "https://restcountries.com/v3.1/";

class API {
  private baseURL = BASE_URL;
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
    });
  }

  async getCountries(): Promise<Country[]> {
    const path = "all";
    const response = await this.client.get<Country[]>(path);
    const result = response.data;
    return result;
  }
}

const api = new API();

export default api;
