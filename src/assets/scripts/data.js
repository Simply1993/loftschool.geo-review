export function loadReviews() {
  let reviewsMap = localStorage.getItem("loftschool-georeviews") || "[]";
  return JSON.parse(reviewsMap);
}

export function addPlacemark(ymaps, element, balloonLayout, reviews) {
  return (window.myPlacemark = new ymaps.Placemark(
    [element.lat, element.long],
    {
      reviews,
      lat: element.lat,
      long: element.long,
      name: element.name,
      place: element.place,
      date: element.date,
      comment: element.comment
    },
    {
      balloonShadow: false,
      balloonLayout: balloonLayout,
      balloonPanelMaxMapArea: 0,
      hideIconOnBalloonOpen: false,
      preset: "islands#violetDotIcon"
    }
  ));
}
