import { loadReviews, addPlacemark } from "./data";

export default function initMap(ymaps, containerId) {
  const cache = new Map();
  let marks = {
    "55.76-37.64": [
      {
        name: "Евгений",
        place: "Кафе",
        comment: "Средне",
        date: "25.12.2017"
      },
      {
        name: "Евгений2",
        place: "Кафе2",
        comment: "Средне2",
        date: "25.12.2017"
      }
    ],
    "55.66-37.54": [
      {
        name: "Руслан",
        place: "Ресторан",
        comment: "Неплохо",
        date: "25.12.2017"
      }
    ],
    "55.86-37.74": [
      {
        name: "Лилия",
        place: "Ресторан",
        comment: "Хорошо",
        date: "25.12.2017"
      }
    ]
  };
  localStorage.setItem("loftschool-georeviews", JSON.stringify(marks));

  let reviewsMap = loadReviews();
  const myMap = new ymaps.Map(
    containerId,
    {
      center: [55.76, 37.64],
      zoom: 10
    },
    { searchControlProvider: "yandex#search" }
  );

  function getAddress(coords) {
    if (cache.has(coords.join("-"))) {
      return cache.get(coords.join("-"));
    }

    cache.set(
      coords.join("-"),
      ymaps.geocode(coords).then(result => {
        return result.geoObjects.get(0).getAddressLine();
      })
    );

    return cache.get(coords.join("-"));
  }
  function openBalloon(coords) {
    myMap.balloon.close();
    myMap.setCenter(coords);
    getAddress(coords).then(address => {
      let popup = document.getElementById("popup");
      let templateBalloon = require("pug-loader!../../views/templates/balloon.pug");
      let options = { address };
      if (reviewsMap[coords.join("-")]) {
        options.reviews = reviewsMap[coords.join("-")];
      }
      let html = templateBalloon(options);
      if (popup) {
        popup.innerHTML = html;
      } else {
        popup = document.createElement("div");
        popup.id = "popup";
        popup.style.position = "absolute";
        popup.style.left = document.body.offsetWidth / 2 - 190 + "px";
        popup.style.top = document.body.offsetHeight / 2 - 250 + "px";
        popup.innerHTML = html;
        document.body.appendChild(popup);
      }
      let btnClose = popup.querySelector(".balloon__close");
      let btnAdd = popup.querySelector(".review-form__button");
      btnClose.addEventListener("click", () => popup.remove());
      btnAdd.addEventListener("click", e => {
        e.preventDefault();
        let formFields = document.forms["new-review"].elements;
        let review = {
          name: formFields.name.value,
          place: formFields.place.value,
          comment: formFields.comment.value,
          date: new Date()
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join(".")
        };

        if (review.name && review.place && review.comment) {
          const myPlacemark = addPlacemark(ymaps, coords, review);
          clusterer.add(myPlacemark);

          if (!reviewsMap[coords.join("-")]) {
            reviewsMap[coords.join("-")] = [];
          }

          reviewsMap[coords.join("-")].push(review);
          openBalloon(coords);
        }
      });
    });
  }

  myMap.events.add("click", e => openBalloon(e.get("coords")));
  myMap.geoObjects.events.add("click", e => {
    if (e.get("target").balloon) {
      e.preventDefault();
      openBalloon(e.get("target").geometry.getCoordinates());
    }
  });

  const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    `<div class="ballon__header">
        <div class="title">{{ properties.place }}</div>
        <button class="address">{{ properties.address }}</button>
    </div>
    <div class="ballon__body">{{ properties.comment }}</div>`,
    {
      build: function() {
        customItemContentLayout.superclass.build.call(this);

        const elemAddress = this.getElement().querySelector(".address");
        const coords = this.getData().geoObject.geometry.getCoordinates();
        getAddress(coords).then(address => {
          elemAddress.innerText = address;
        });
        elemAddress.addEventListener("click", e => {
          e.preventDefault();
          openBalloon(coords);
        });
      }
    }
  );

  const clusterer = new ymaps.Clusterer({
    preset: "islands#invertedVioletClusterIcons",
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    hideIconOnBalloonOpen: false,
    openBalloonOnClick: true,
    clusterBalloonContentLayout: "cluster#balloonCarousel",
    clusterBalloonItemContentLayout: customItemContentLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 200,
    clusterBalloonContentLayoutHeight: 150,
    clusterBalloonPagerSize: 5
  });
  myMap.geoObjects.add(clusterer);

  //добавление сохранённых меток на карту
  for (let coords in reviewsMap) {
    reviewsMap[coords].map(review => {
      const myPlacemark = addPlacemark(ymaps, coords.split("-"), review);
      clusterer.add(myPlacemark);
    });
  }
}
