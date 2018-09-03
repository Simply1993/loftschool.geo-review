import { mapData } from "./mapper";

export function loadReviews() {
  let reviews = localStorage.getItem("loftschool-georeviews") || "[]";
  return mapData(JSON.parse(reviews));
}
