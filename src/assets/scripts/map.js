import { loadReviews, addPlacemark } from "./data";

export default function initMap(ymaps, containerId) {
  const cache = new Map();
  let placemarks = [];
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
  console.log("reviews", reviewsMap);

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

  function openBalloon(point) {
    var state = clusterer.getObjectState(point),
      cluster = state.isClustered && state.cluster;

    if (cluster) {
      cluster.state.set("activeObject", point);
      cluster.balloon.open();
    } else {
      point.balloon.open();
    }
  }

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
        getAddress([
          this.getData().properties._data.lat,
          this.getData().properties._data.long
        ]).then(address => {
          elemAddress.innerText = address;
        });
        elemAddress.addEventListener("click", e => {
          e.preventDefault();

          let current = ymaps
            .geoQuery(placemarks)
            .search(`lat=${this.getData().properties._data.lat}`)
            .search(`long=${this.getData().properties._data.long}`)
            .get(0);
          openBalloon(current);
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

  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    `<div class="balloon">
      <div class="balloon__header">
        <div class="balloon__title"></div>
        <button class="balloon__close"></button>
      </div>
      <div class="balloon__content">
        <div class="balloon__reviews reviews">
          <ul class="reviews__list">
          {% for review in properties.reviews %}
            <li class="reviews__item">
              <div class="reviews__author">{{ review.name }}</div>
              <div class="reviews__place">{{ review.place }}</div>
              <div class="reviews__date">{{ review.date }}</div>
              <div class="reviews__text">{{ review.comment }}</div>
            </li>
          {% endfor %}
          </ul>
        </div>
        <div class="balloon__form review-form">
          <form class="review-form__area" id="new-review">
            <div class="review-form__title">Ваш отзыв</div>
            <div class="review-form__fields">
              <div class="review-form__field">
                <label class="review-form__field-label">Ваше имя</label>
                <input name="name" class="review-form__field-input" placeholder="Ваше имя"/>
              </div>
              <div class="review-form__field">
                <label class="review-form__field-label">Укажите место</label>
                <input name="place" class="review-form__field-input" placeholder="Укажите место"/>
              </div>
              <div class="review-form__field">
                <label class="review-form__field-label">Поделитесь впечатлениями</label>
                <textarea name="comment" class="review-form__field-textarea" placeholder="Поделитесь впечатлениями" rows="5"></textarea>
              </div>
            </div>
            <button class="review-form__button">Добавить</button>
          </form>
        </div>
      </div>
    </div>`,
    {
      build: function() {
        BalloonContentLayout.superclass.build.call(this);

        this.elemBalloon = this.getElement();
        let closeBtn = this.elemBalloon.querySelector(".balloon__close");
        let addBtn = this.elemBalloon.querySelector(".review-form__button");
        this.coords = [
          this.getData().properties._data.lat,
          this.getData().properties._data.long
        ];

        if (this.coords) {
          const balloonTitle = this.elemBalloon.querySelector(
            ".balloon__title"
          );
          getAddress(this.coords).then(address => {
            balloonTitle.innerText = address;
          });
        }

        closeBtn.addEventListener("click", this.onCloseClick.bind(this));
        addBtn.addEventListener("click", this.addReview.bind(this));
      },
      clear: function() {
        let closeBtn = this.elemBalloon.querySelector(".balloon__close");
        let addBtn = this.elemBalloon.querySelector(".review-form__button");

        closeBtn.removeEventListener("click", this.onCloseClick);
        addBtn.removeEventListener("click", this.addReview);

        BalloonContentLayout.superclass.clear.call(this);
      },
      onCloseClick: function(e) {
        e.preventDefault();
        this.events.fire("userclose");
      },
      addReview: function(e) {
        e.preventDefault();

        let formFields = document.forms["new-review"].elements;
        let elem = {
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

        if (elem.name && elem.place && elem.comment) {
          let reviewsList = this.elemBalloon.querySelector(".reviews__list");
          let item = document.createDocumentFragment();
          item.innerHTML = `<li class="reviews__item">
              <div class="reviews__author">{{ elem.name }}</div>
              <div class="reviews__place">{{ elem.place }}</div>
              <div class="reviews__date">{{ elem.date }}</div>
              <div class="reviews__text">{{ elem.comment }}</div>
            </li>`;
          reviewsList.appendChild(item);

          [elem.lat, elem.long] = this.coords;
          const myPlacemark = addPlacemark(ymaps, elem, BalloonContentLayout);
          clusterer.add(myPlacemark);

          if (!reviewsMap[this.coords.join("-")]) {
            reviewsMap[this.coords.join("-")] = [];
          }

          reviewsMap[this.coords.join("-")].push(elem);

          formFields.name.value = "";
          formFields.place.value = "";
          formFields.comment.value = "";
          console.log(reviewsMap);
        }
      }
    }
  );

  //добавление сохранённых меток на карту
  for (let coords in reviewsMap) {
    reviewsMap[coords].map(elem => {
      [elem.lat, elem.long] = coords.split("-");
      const myPlacemark = addPlacemark(
        ymaps,
        elem,
        BalloonContentLayout,
        reviewsMap[coords]
      );
      placemarks.push(myPlacemark);
      clusterer.add(myPlacemark);
    });
  }
}
