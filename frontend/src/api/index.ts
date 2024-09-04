import axios from "axios";
import { Params } from "react-router-dom";
import { PlaceData } from "../types";

// Base URL'e sahip bir axios örneği oluşturduk
const api = axios.create({ baseURL: "http://localhost:4001" });

// Parametrelerle konaklama yerlerini getiren fonksiyon
export const getPlaces = (params: Params) =>
  api.get("/api/places", { params }).then((res) => res.data.places);

// yeni bir konaklama yeri oluşturan fonk
export const createPlace = (body: PlaceData) => api.post("/api/places", body);

// 1 konaklama noktasını alan fonksiyon detail t
export const getPlace = (id: string) =>
  api.get(`/api/place/${id}`).then((res) => res.data.place);

export const deletePlace = (id: string) => api.delete(`/api/place/${id}`);
