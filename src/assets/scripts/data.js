export function loadReviews() {
  let reviewsMap = localStorage.getItem("loftschool-georeviews") || "{}";
  return JSON.parse(reviewsMap);
}

export function addPlacemark(ymaps, coords, review) {
  return (window.myPlacemark = new ymaps.Placemark(
    coords,
    {
      place: review.place,
      comment: review.comment
    },
    {
      balloonShadow: false,
      balloonPanelMaxMapArea: 0,
      hideIconOnBalloonOpen: false,
      preset: "islands#violetDotIcon"
    }
  ));
}
