export function loadReviews() {
  let reviewsMap = localStorage.getItem("loftschool-georeviews") || "[]";
  return JSON.parse(reviewsMap);
}

export function addPlacemark(ymaps, coords) {
  return (window.myPlacemark = new ymaps.Placemark(
    coords,
    {},
    {
      balloonShadow: false,
      balloonPanelMaxMapArea: 0,
      hideIconOnBalloonOpen: false,
      preset: "islands#violetDotIcon"
    }
  ));
}
