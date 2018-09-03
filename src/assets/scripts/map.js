import { loadReviews } from "./data";
import { getDetailsContentLayout } from "./details";

export default function initMap(ymaps, containerId) {
  const myMap = new ymaps.Map(containerId, {
    center: [55.76, 37.64], //Москва
    controls: [],
    zoom: 10
  });

  let marks = [
    {
      lat: 55.76,
      long: 37.64,
      reviews: [
        {
          name: "Евгений",
          place: "Кафе",
          comment: "Средне"
        }
      ]
    },
    {
      lat: 55.66,
      long: 37.54,
      reviews: [
        {
          name: "Руслан",
          place: "Ресторан",
          comment: "Неплохо"
        }
      ]
    },
    {
      lat: 55.86,
      long: 37.74,
      reviews: [
        {
          name: "Лилия",
          place: "Ресторан",
          comment: "Хорошо"
        }
      ]
    }
  ];
  localStorage.setItem("loftschool-georeviews", JSON.stringify(marks));

  const objectManager = new ymaps.ObjectManager({
    clusterize: true,
    gridSize: 64,
    clusterDisableClickZoom: true,
    geoObjectOpenBalloonOnClick: true,
    geoObjectHideIconOnBalloonOpen: false,
    geoObjectBalloonContentLayout: getDetailsContentLayout(ymaps)
  });

  let reviews = loadReviews();
  console.log(reviews);
  objectManager.add(reviews);
  myMap.geoObjects.add(objectManager);

  // details
  objectManager.objects.events.add("click", event => {
    const objectId = event.get("objectId");
    const obj = objectManager.objects.getById(objectId);

    objectManager.objects.balloon.open(objectId);

    if (!obj.properties.details) {
      obj.properties.details = reviews.features[objectId];
      objectManager.objects.balloon.setData(obj);
    }
  });
}
