webpackJsonp([0],[function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _map = __webpack_require__(1);\n\nvar _map2 = _interopRequireDefault(_map);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nymaps.ready(function () {\n  (0, _map2.default)(ymaps, "map");\n  console.log("inited");\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3NjcmlwdHMvbWFpbi5qcz9lYTE5Il0sIm5hbWVzIjpbInltYXBzIiwicmVhZHkiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFFQUEsTUFBTUMsS0FBTixDQUFZLFlBQU07QUFDaEIscUJBQVFELEtBQVIsRUFBZSxLQUFmO0FBQ0FFLFVBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsQ0FIRCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluaXRNYXAgZnJvbSBcIi4vbWFwXCI7XHJcblxyXG55bWFwcy5yZWFkeSgoKSA9PiB7XHJcbiAgaW5pdE1hcCh5bWFwcywgXCJtYXBcIik7XHJcbiAgY29uc29sZS5sb2coXCJpbml0ZWRcIik7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n')},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();\n\nexports.default = initMap;\n\nvar _data = __webpack_require__(2);\n\nfunction initMap(ymaps, containerId) {\n  var cache = new Map();\n  var placemarks = [];\n  var marks = {\n    "55.76-37.64": [{\n      name: "Евгений",\n      place: "Кафе",\n      comment: "Средне",\n      date: "25.12.2017"\n    }, {\n      name: "Евгений2",\n      place: "Кафе2",\n      comment: "Средне2",\n      date: "25.12.2017"\n    }],\n    "55.66-37.54": [{\n      name: "Руслан",\n      place: "Ресторан",\n      comment: "Неплохо",\n      date: "25.12.2017"\n    }],\n    "55.86-37.74": [{\n      name: "Лилия",\n      place: "Ресторан",\n      comment: "Хорошо",\n      date: "25.12.2017"\n    }]\n  };\n  localStorage.setItem("loftschool-georeviews", JSON.stringify(marks));\n\n  var reviewsMap = (0, _data.loadReviews)();\n  console.log("reviews", reviewsMap);\n\n  var myMap = new ymaps.Map(containerId, {\n    center: [55.76, 37.64],\n    zoom: 10\n  }, { searchControlProvider: "yandex#search" });\n\n  function getAddress(coords) {\n    if (cache.has(coords.join("-"))) {\n      return cache.get(coords.join("-"));\n    }\n\n    cache.set(coords.join("-"), ymaps.geocode(coords).then(function (result) {\n      return result.geoObjects.get(0).getAddressLine();\n    }));\n\n    return cache.get(coords.join("-"));\n  }\n\n  function openBalloon(point) {\n    var state = clusterer.getObjectState(point),\n        cluster = state.isClustered && state.cluster;\n\n    if (cluster) {\n      cluster.state.set("activeObject", point);\n      cluster.balloon.open();\n    } else {\n      point.balloon.open();\n    }\n  }\n\n  var customItemContentLayout = ymaps.templateLayoutFactory.createClass("<div class=\\"ballon__header\\">\\n        <div class=\\"title\\">{{ properties.place }}</div>\\n        <button class=\\"address\\">{{ properties.address }}</button>\\n    </div>\\n    <div class=\\"ballon__body\\">{{ properties.comment }}</div>", {\n    build: function build() {\n      var _this = this;\n\n      customItemContentLayout.superclass.build.call(this);\n\n      var elemAddress = this.getElement().querySelector(".address");\n      getAddress([this.getData().properties._data.lat, this.getData().properties._data.long]).then(function (address) {\n        elemAddress.innerText = address;\n      });\n      elemAddress.addEventListener("click", function (e) {\n        e.preventDefault();\n\n        var current = ymaps.geoQuery(placemarks).search("lat=" + _this.getData().properties._data.lat).search("long=" + _this.getData().properties._data.long).get(0);\n        openBalloon(current);\n      });\n    }\n  });\n\n  var clusterer = new ymaps.Clusterer({\n    preset: "islands#invertedVioletClusterIcons",\n    clusterDisableClickZoom: true,\n    clusterOpenBalloonOnClick: true,\n    hideIconOnBalloonOpen: false,\n    openBalloonOnClick: true,\n    clusterBalloonContentLayout: "cluster#balloonCarousel",\n    clusterBalloonItemContentLayout: customItemContentLayout,\n    clusterBalloonPanelMaxMapArea: 0,\n    clusterBalloonContentLayoutWidth: 200,\n    clusterBalloonContentLayoutHeight: 150,\n    clusterBalloonPagerSize: 5\n  });\n  myMap.geoObjects.add(clusterer);\n\n  var BalloonContentLayout = ymaps.templateLayoutFactory.createClass("<div class=\\"balloon\\">\\n      <div class=\\"balloon__header\\">\\n        <div class=\\"balloon__title\\"></div>\\n        <button class=\\"balloon__close\\"></button>\\n      </div>\\n      <div class=\\"balloon__content\\">\\n        <div class=\\"balloon__reviews reviews\\">\\n          <ul class=\\"reviews__list\\">\\n          {% for review in properties.reviews %}\\n            <li class=\\"reviews__item\\">\\n              <div class=\\"reviews__author\\">{{ review.name }}</div>\\n              <div class=\\"reviews__place\\">{{ review.place }}</div>\\n              <div class=\\"reviews__date\\">{{ review.date }}</div>\\n              <div class=\\"reviews__text\\">{{ review.comment }}</div>\\n            </li>\\n          {% endfor %}\\n          </ul>\\n        </div>\\n        <div class=\\"balloon__form review-form\\">\\n          <form class=\\"review-form__area\\" id=\\"new-review\\">\\n            <div class=\\"review-form__title\\">\\u0412\\u0430\\u0448 \\u043E\\u0442\\u0437\\u044B\\u0432</div>\\n            <div class=\\"review-form__fields\\">\\n              <div class=\\"review-form__field\\">\\n                <label class=\\"review-form__field-label\\">\\u0412\\u0430\\u0448\\u0435 \\u0438\\u043C\\u044F</label>\\n                <input name=\\"name\\" class=\\"review-form__field-input\\" placeholder=\\"\\u0412\\u0430\\u0448\\u0435 \\u0438\\u043C\\u044F\\"/>\\n              </div>\\n              <div class=\\"review-form__field\\">\\n                <label class=\\"review-form__field-label\\">\\u0423\\u043A\\u0430\\u0436\\u0438\\u0442\\u0435 \\u043C\\u0435\\u0441\\u0442\\u043E</label>\\n                <input name=\\"place\\" class=\\"review-form__field-input\\" placeholder=\\"\\u0423\\u043A\\u0430\\u0436\\u0438\\u0442\\u0435 \\u043C\\u0435\\u0441\\u0442\\u043E\\"/>\\n              </div>\\n              <div class=\\"review-form__field\\">\\n                <label class=\\"review-form__field-label\\">\\u041F\\u043E\\u0434\\u0435\\u043B\\u0438\\u0442\\u0435\\u0441\\u044C \\u0432\\u043F\\u0435\\u0447\\u0430\\u0442\\u043B\\u0435\\u043D\\u0438\\u044F\\u043C\\u0438</label>\\n                <textarea name=\\"comment\\" class=\\"review-form__field-textarea\\" placeholder=\\"\\u041F\\u043E\\u0434\\u0435\\u043B\\u0438\\u0442\\u0435\\u0441\\u044C \\u0432\\u043F\\u0435\\u0447\\u0430\\u0442\\u043B\\u0435\\u043D\\u0438\\u044F\\u043C\\u0438\\" rows=\\"5\\"></textarea>\\n              </div>\\n            </div>\\n            <button class=\\"review-form__button\\">\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C</button>\\n          </form>\\n        </div>\\n      </div>\\n    </div>", {\n    build: function build() {\n      BalloonContentLayout.superclass.build.call(this);\n\n      this.elemBalloon = this.getElement();\n      var closeBtn = this.elemBalloon.querySelector(".balloon__close");\n      var addBtn = this.elemBalloon.querySelector(".review-form__button");\n      this.coords = [this.getData().properties._data.lat, this.getData().properties._data.long];\n\n      if (this.coords) {\n        var balloonTitle = this.elemBalloon.querySelector(".balloon__title");\n        getAddress(this.coords).then(function (address) {\n          balloonTitle.innerText = address;\n        });\n      }\n\n      closeBtn.addEventListener("click", this.onCloseClick.bind(this));\n      addBtn.addEventListener("click", this.addReview.bind(this));\n    },\n    clear: function clear() {\n      var closeBtn = this.elemBalloon.querySelector(".balloon__close");\n      var addBtn = this.elemBalloon.querySelector(".review-form__button");\n\n      closeBtn.removeEventListener("click", this.onCloseClick);\n      addBtn.removeEventListener("click", this.addReview);\n\n      BalloonContentLayout.superclass.clear.call(this);\n    },\n    onCloseClick: function onCloseClick(e) {\n      e.preventDefault();\n      this.events.fire("userclose");\n    },\n    addReview: function addReview(e) {\n      e.preventDefault();\n\n      var formFields = document.forms["new-review"].elements;\n      var elem = {\n        name: formFields.name.value,\n        place: formFields.place.value,\n        comment: formFields.comment.value,\n        date: new Date().toJSON().slice(0, 10).split("-").reverse().join(".")\n      };\n\n      if (elem.name && elem.place && elem.comment) {\n        var reviewsList = this.elemBalloon.querySelector(".reviews__list");\n        var item = document.createDocumentFragment();\n        item.innerHTML = "<li class=\\"reviews__item\\">\\n              <div class=\\"reviews__author\\">{{ elem.name }}</div>\\n              <div class=\\"reviews__place\\">{{ elem.place }}</div>\\n              <div class=\\"reviews__date\\">{{ elem.date }}</div>\\n              <div class=\\"reviews__text\\">{{ elem.comment }}</div>\\n            </li>";\n        reviewsList.appendChild(item);\n\n        var _coords = _slicedToArray(this.coords, 2);\n\n        elem.lat = _coords[0];\n        elem.long = _coords[1];\n\n        var myPlacemark = (0, _data.addPlacemark)(ymaps, elem, BalloonContentLayout);\n        clusterer.add(myPlacemark);\n\n        if (!reviewsMap[this.coords.join("-")]) {\n          reviewsMap[this.coords.join("-")] = [];\n        }\n\n        reviewsMap[this.coords.join("-")].push(elem);\n\n        formFields.name.value = "";\n        formFields.place.value = "";\n        formFields.comment.value = "";\n        console.log(reviewsMap);\n      }\n    }\n  });\n\n  //добавление сохранённых меток на карту\n\n  var _loop = function _loop(coords) {\n    reviewsMap[coords].map(function (elem) {\n      var _coords$split = coords.split("-");\n\n      var _coords$split2 = _slicedToArray(_coords$split, 2);\n\n      elem.lat = _coords$split2[0];\n      elem.long = _coords$split2[1];\n\n      var myPlacemark = (0, _data.addPlacemark)(ymaps, elem, BalloonContentLayout, reviewsMap[coords]);\n      placemarks.push(myPlacemark);\n      clusterer.add(myPlacemark);\n    });\n  };\n\n  for (var coords in reviewsMap) {\n    _loop(coords);\n  }\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3NjcmlwdHMvbWFwLmpzP2ZjYWEiXSwibmFtZXMiOlsiaW5pdE1hcCIsInltYXBzIiwiY29udGFpbmVySWQiLCJjYWNoZSIsIk1hcCIsInBsYWNlbWFya3MiLCJtYXJrcyIsIm5hbWUiLCJwbGFjZSIsImNvbW1lbnQiLCJkYXRlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXZpZXdzTWFwIiwiY29uc29sZSIsImxvZyIsIm15TWFwIiwiY2VudGVyIiwiem9vbSIsInNlYXJjaENvbnRyb2xQcm92aWRlciIsImdldEFkZHJlc3MiLCJjb29yZHMiLCJoYXMiLCJqb2luIiwiZ2V0Iiwic2V0IiwiZ2VvY29kZSIsInRoZW4iLCJyZXN1bHQiLCJnZW9PYmplY3RzIiwiZ2V0QWRkcmVzc0xpbmUiLCJvcGVuQmFsbG9vbiIsInBvaW50Iiwic3RhdGUiLCJjbHVzdGVyZXIiLCJnZXRPYmplY3RTdGF0ZSIsImNsdXN0ZXIiLCJpc0NsdXN0ZXJlZCIsImJhbGxvb24iLCJvcGVuIiwiY3VzdG9tSXRlbUNvbnRlbnRMYXlvdXQiLCJ0ZW1wbGF0ZUxheW91dEZhY3RvcnkiLCJjcmVhdGVDbGFzcyIsImJ1aWxkIiwic3VwZXJjbGFzcyIsImNhbGwiLCJlbGVtQWRkcmVzcyIsImdldEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0RGF0YSIsInByb3BlcnRpZXMiLCJfZGF0YSIsImxhdCIsImxvbmciLCJpbm5lclRleHQiLCJhZGRyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnQiLCJnZW9RdWVyeSIsInNlYXJjaCIsIkNsdXN0ZXJlciIsInByZXNldCIsImNsdXN0ZXJEaXNhYmxlQ2xpY2tab29tIiwiY2x1c3Rlck9wZW5CYWxsb29uT25DbGljayIsImhpZGVJY29uT25CYWxsb29uT3BlbiIsIm9wZW5CYWxsb29uT25DbGljayIsImNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dCIsImNsdXN0ZXJCYWxsb29uSXRlbUNvbnRlbnRMYXlvdXQiLCJjbHVzdGVyQmFsbG9vblBhbmVsTWF4TWFwQXJlYSIsImNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dFdpZHRoIiwiY2x1c3RlckJhbGxvb25Db250ZW50TGF5b3V0SGVpZ2h0IiwiY2x1c3RlckJhbGxvb25QYWdlclNpemUiLCJhZGQiLCJCYWxsb29uQ29udGVudExheW91dCIsImVsZW1CYWxsb29uIiwiY2xvc2VCdG4iLCJhZGRCdG4iLCJiYWxsb29uVGl0bGUiLCJvbkNsb3NlQ2xpY2siLCJiaW5kIiwiYWRkUmV2aWV3IiwiY2xlYXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnRzIiwiZmlyZSIsImZvcm1GaWVsZHMiLCJkb2N1bWVudCIsImZvcm1zIiwiZWxlbWVudHMiLCJlbGVtIiwidmFsdWUiLCJEYXRlIiwidG9KU09OIiwic2xpY2UiLCJzcGxpdCIsInJldmVyc2UiLCJyZXZpZXdzTGlzdCIsIml0ZW0iLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJteVBsYWNlbWFyayIsInB1c2giLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUV3QkEsTzs7QUFGeEI7O0FBRWUsU0FBU0EsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0JDLFdBQXhCLEVBQXFDO0FBQ2xELE1BQU1DLFFBQVEsSUFBSUMsR0FBSixFQUFkO0FBQ0EsTUFBSUMsYUFBYSxFQUFqQjtBQUNBLE1BQUlDLFFBQVE7QUFDVixtQkFBZSxDQUNiO0FBQ0VDLFlBQU0sU0FEUjtBQUVFQyxhQUFPLE1BRlQ7QUFHRUMsZUFBUyxRQUhYO0FBSUVDLFlBQU07QUFKUixLQURhLEVBT2I7QUFDRUgsWUFBTSxVQURSO0FBRUVDLGFBQU8sT0FGVDtBQUdFQyxlQUFTLFNBSFg7QUFJRUMsWUFBTTtBQUpSLEtBUGEsQ0FETDtBQWVWLG1CQUFlLENBQ2I7QUFDRUgsWUFBTSxRQURSO0FB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QUNGO0FBL0VILEdBekMyQixDQUE3Qjs7QUE0SEE7O0FBdFBrRCw2QkF1UHpDUSxNQXZQeUM7QUF3UGhEUixlQUFXUSxNQUFYLEVBQW1Cb0YsR0FBbkIsQ0FBdUIsZ0JBQVE7QUFBQSwwQkFDTHBGLE9BQU8yRSxLQUFQLENBQWEsR0FBYixDQURLOztBQUFBOztBQUM1QkwsV0FBS3ZDLEdBRHVCO0FBQ2xCdUMsV0FBS3RDLElBRGE7O0FBRTdCLFVBQU1rRCxjQUFjLHdCQUNsQnhHLEtBRGtCLEVBRWxCNEYsSUFGa0IsRUFHbEJoQixvQkFIa0IsRUFJbEI5RCxXQUFXUSxNQUFYLENBSmtCLENBQXBCO0FBTUFsQixpQkFBV3FHLElBQVgsQ0FBZ0JELFdBQWhCO0FBQ0FyRSxnQkFBVXdDLEdBQVYsQ0FBYzZCLFdBQWQ7QUFDRCxLQVZEO0FBeFBnRDs7QUF1UGxELE9BQUssSUFBSWxGLE1BQVQsSUFBbUJSLFVBQW5CLEVBQStCO0FBQUEsVUFBdEJRLE1BQXNCO0FBWTlCO0FBQ0YiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvYWRSZXZpZXdzLCBhZGRQbGFjZW1hcmsgfSBmcm9tIFwiLi9kYXRhXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TWFwKHltYXBzLCBjb250YWluZXJJZCkge1xyXG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xyXG4gIGxldCBwbGFjZW1hcmtzID0gW107XHJcbiAgbGV0IG1hcmtzID0ge1xyXG4gICAgXCI1NS43Ni0zNy42NFwiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcItCV0LLQs9C10L3QuNC5XCIsXHJcbiAgICAgICAgcGxhY2U6IFwi0JrQsNGE0LVcIixcclxuICAgICAgICBjb21tZW50OiBcItCh0YDQtdC00L3QtVwiLFxyXG4gICAgICAgIGRhdGU6IFwiMjUuMTIuMjAxN1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcItCV0LLQs9C10L3QuNC5MlwiLFxyXG4gICAgICAgIHBsYWNlOiBcItCa0LDRhNC1MlwiLFxyXG4gICAgICAgIGNvbW1lbnQ6IFwi0KHRgNC10LTQvdC1MlwiLFxyXG4gICAgICAgIGRhdGU6IFwiMjUuMTIuMjAxN1wiXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBcIjU1LjY2LTM3LjU0XCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IFwi0KDRg9GB0LvQsNC9XCIsXHJcbiAgICAgICAgcGxhY2U6IFwi0KDQtdGB0YLQvtGA0LDQvVwiLFxyXG4gICAgICAgIGNvbW1lbnQ6IFwi0J3QtdC/0LvQvtGF0L5cIixcclxuICAgICAgICBkYXRlOiBcIjI1LjEyLjIwMTdcIlxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgXCI1NS44Ni0zNy43NFwiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcItCb0LjQu9C40Y9cIixcclxuICAgICAgICBwbGFjZTogXCLQoNC10YHRgtC+0YDQsNC9XCIsXHJcbiAgICAgICAgY29tbWVudDogXCLQpdC+0YDQvtGI0L5cIixcclxuICAgICAgICBkYXRlOiBcIjI1LjEyLjIwMTdcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxvZnRzY2hvb2wtZ2VvcmV2aWV3c1wiLCBKU09OLnN0cmluZ2lmeShtYXJrcykpO1xyXG5cclxuICBsZXQgcmV2aWV3c01hcCA9IGxvYWRSZXZpZXdzKCk7XHJcbiAgY29uc29sZS5sb2coXCJyZXZpZXdzXCIsIHJldmlld3NNYXApO1xyXG5cclxuICBjb25zdCBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXHJcbiAgICBjb250YWluZXJJZCxcclxuICAgIHtcclxuICAgICAgY2VudGVyOiBbNTUuNzYsIDM3LjY0XSxcclxuICAgICAgem9vbTogMTBcclxuICAgIH0sXHJcbiAgICB7IHNlYXJjaENvbnRyb2xQcm92aWRlcjogXCJ5YW5kZXgjc2VhcmNoXCIgfVxyXG4gICk7XHJcblxyXG4gIGZ1bmN0aW9uIGdldEFkZHJlc3MoY29vcmRzKSB7XHJcbiAgICBpZiAoY2FjaGUuaGFzKGNvb3Jkcy5qb2luKFwiLVwiKSkpIHtcclxuICAgICAgcmV0dXJuIGNhY2hlLmdldChjb29yZHMuam9pbihcIi1cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhY2hlLnNldChcclxuICAgICAgY29vcmRzLmpvaW4oXCItXCIpLFxyXG4gICAgICB5bWFwcy5nZW9jb2RlKGNvb3JkcykudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQuZ2VvT2JqZWN0cy5nZXQoMCkuZ2V0QWRkcmVzc0xpbmUoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIGNhY2hlLmdldChjb29yZHMuam9pbihcIi1cIikpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb3BlbkJhbGxvb24ocG9pbnQpIHtcclxuICAgIHZhciBzdGF0ZSA9IGNsdXN0ZXJlci5nZXRPYmplY3RTdGF0ZShwb2ludCksXHJcbiAgICAgIGNsdXN0ZXIgPSBzdGF0ZS5pc0NsdXN0ZXJlZCAmJiBzdGF0ZS5jbHVzdGVyO1xyXG5cclxuICAgIGlmIChjbHVzdGVyKSB7XHJcbiAgICAgIGNsdXN0ZXIuc3RhdGUuc2V0KFwiYWN0aXZlT2JqZWN0XCIsIHBvaW50KTtcclxuICAgICAgY2x1c3Rlci5iYWxsb29uLm9wZW4oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBvaW50LmJhbGxvb24ub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY3VzdG9tSXRlbUNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICBgPGRpdiBjbGFzcz1cImJhbGxvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3sgcHJvcGVydGllcy5wbGFjZSB9fTwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGRyZXNzXCI+e3sgcHJvcGVydGllcy5hZGRyZXNzIH19PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJiYWxsb25fX2JvZHlcIj57eyBwcm9wZXJ0aWVzLmNvbW1lbnQgfX08L2Rpdj5gLFxyXG4gICAge1xyXG4gICAgICBidWlsZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3VzdG9tSXRlbUNvbnRlbnRMYXlvdXQuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICBjb25zdCBlbGVtQWRkcmVzcyA9IHRoaXMuZ2V0RWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkcmVzc1wiKTtcclxuICAgICAgICBnZXRBZGRyZXNzKFtcclxuICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpLnByb3BlcnRpZXMuX2RhdGEubGF0LFxyXG4gICAgICAgICAgdGhpcy5nZXREYXRhKCkucHJvcGVydGllcy5fZGF0YS5sb25nXHJcbiAgICAgICAgXSkudGhlbihhZGRyZXNzID0+IHtcclxuICAgICAgICAgIGVsZW1BZGRyZXNzLmlubmVyVGV4dCA9IGFkZHJlc3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxlbUFkZHJlc3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIGxldCBjdXJyZW50ID0geW1hcHNcclxuICAgICAgICAgICAgLmdlb1F1ZXJ5KHBsYWNlbWFya3MpXHJcbiAgICAgICAgICAgIC5zZWFyY2goYGxhdD0ke3RoaXMuZ2V0RGF0YSgpLnByb3BlcnRpZXMuX2RhdGEubGF0fWApXHJcbiAgICAgICAgICAgIC5zZWFyY2goYGxvbmc9JHt0aGlzLmdldERhdGEoKS5wcm9wZXJ0aWVzLl9kYXRhLmxvbmd9YClcclxuICAgICAgICAgICAgLmdldCgwKTtcclxuICAgICAgICAgIG9wZW5CYWxsb29uKGN1cnJlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY2x1c3RlcmVyID0gbmV3IHltYXBzLkNsdXN0ZXJlcih7XHJcbiAgICBwcmVzZXQ6IFwiaXNsYW5kcyNpbnZlcnRlZFZpb2xldENsdXN0ZXJJY29uc1wiLFxyXG4gICAgY2x1c3RlckRpc2FibGVDbGlja1pvb206IHRydWUsXHJcbiAgICBjbHVzdGVyT3BlbkJhbGxvb25PbkNsaWNrOiB0cnVlLFxyXG4gICAgaGlkZUljb25PbkJhbGxvb25PcGVuOiBmYWxzZSxcclxuICAgIG9wZW5CYWxsb29uT25DbGljazogdHJ1ZSxcclxuICAgIGNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dDogXCJjbHVzdGVyI2JhbGxvb25DYXJvdXNlbFwiLFxyXG4gICAgY2x1c3RlckJhbGxvb25JdGVtQ29udGVudExheW91dDogY3VzdG9tSXRlbUNvbnRlbnRMYXlvdXQsXHJcbiAgICBjbHVzdGVyQmFsbG9vblBhbmVsTWF4TWFwQXJlYTogMCxcclxuICAgIGNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dFdpZHRoOiAyMDAsXHJcbiAgICBjbHVzdGVyQmFsbG9vbkNvbnRlbnRMYXlvdXRIZWlnaHQ6IDE1MCxcclxuICAgIGNsdXN0ZXJCYWxsb29uUGFnZXJTaXplOiA1XHJcbiAgfSk7XHJcbiAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQoY2x1c3RlcmVyKTtcclxuXHJcbiAgY29uc3QgQmFsbG9vbkNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICBgPGRpdiBjbGFzcz1cImJhbGxvb25cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhbGxvb25fX2hlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsb29uX190aXRsZVwiPjwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJiYWxsb29uX19jbG9zZVwiPjwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhbGxvb25fX2NvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbG9vbl9fcmV2aWV3cyByZXZpZXdzXCI+XHJcbiAgICAgICAgICA8dWwgY2xhc3M9XCJyZXZpZXdzX19saXN0XCI+XHJcbiAgICAgICAgICB7JSBmb3IgcmV2aWV3IGluIHByb3BlcnRpZXMucmV2aWV3cyAlfVxyXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJyZXZpZXdzX19pdGVtXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJldmlld3NfX2F1dGhvclwiPnt7IHJldmlldy5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJldmlld3NfX3BsYWNlXCI+e3sgcmV2aWV3LnBsYWNlIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJldmlld3NfX2RhdGVcIj57eyByZXZpZXcuZGF0ZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXZpZXdzX190ZXh0XCI+e3sgcmV2aWV3LmNvbW1lbnQgfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgIHslIGVuZGZvciAlfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbG9vbl9fZm9ybSByZXZpZXctZm9ybVwiPlxyXG4gICAgICAgICAgPGZvcm0gY2xhc3M9XCJyZXZpZXctZm9ybV9fYXJlYVwiIGlkPVwibmV3LXJldmlld1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3LWZvcm1fX3RpdGxlXCI+0JLQsNGIINC+0YLQt9GL0LI8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJldmlldy1mb3JtX19maWVsZHNcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3LWZvcm1fX2ZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJyZXZpZXctZm9ybV9fZmllbGQtbGFiZWxcIj7QktCw0YjQtSDQuNC80Y88L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJuYW1lXCIgY2xhc3M9XCJyZXZpZXctZm9ybV9fZmllbGQtaW5wdXRcIiBwbGFjZWhvbGRlcj1cItCS0LDRiNC1INC40LzRj1wiLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3LWZvcm1fX2ZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJyZXZpZXctZm9ybV9fZmllbGQtbGFiZWxcIj7Qo9C60LDQttC40YLQtSDQvNC10YHRgtC+PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwicGxhY2VcIiBjbGFzcz1cInJldmlldy1mb3JtX19maWVsZC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwi0KPQutCw0LbQuNGC0LUg0LzQtdGB0YLQvlwiLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3LWZvcm1fX2ZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJyZXZpZXctZm9ybV9fZmllbGQtbGFiZWxcIj7Qn9C+0LTQtdC70LjRgtC10YHRjCDQstC/0LXRh9Cw0YLQu9C10L3QuNGP0LzQuDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImNvbW1lbnRcIiBjbGFzcz1cInJldmlldy1mb3JtX19maWVsZC10ZXh0YXJlYVwiIHBsYWNlaG9sZGVyPVwi0J/QvtC00LXQu9C40YLQtdGB0Ywg0LLQv9C10YfQsNGC0LvQtdC90LjRj9C80LhcIiByb3dzPVwiNVwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmV2aWV3LWZvcm1fX2J1dHRvblwiPtCU0L7QsdCw0LLQuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gLFxyXG4gICAge1xyXG4gICAgICBidWlsZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgQmFsbG9vbkNvbnRlbnRMYXlvdXQuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1CYWxsb29uID0gdGhpcy5nZXRFbGVtZW50KCk7XHJcbiAgICAgICAgbGV0IGNsb3NlQnRuID0gdGhpcy5lbGVtQmFsbG9vbi5xdWVyeVNlbGVjdG9yKFwiLmJhbGxvb25fX2Nsb3NlXCIpO1xyXG4gICAgICAgIGxldCBhZGRCdG4gPSB0aGlzLmVsZW1CYWxsb29uLnF1ZXJ5U2VsZWN0b3IoXCIucmV2aWV3LWZvcm1fX2J1dHRvblwiKTtcclxuICAgICAgICB0aGlzLmNvb3JkcyA9IFtcclxuICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpLnByb3BlcnRpZXMuX2RhdGEubGF0LFxyXG4gICAgICAgICAgdGhpcy5nZXREYXRhKCkucHJvcGVydGllcy5fZGF0YS5sb25nXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29vcmRzKSB7XHJcbiAgICAgICAgICBjb25zdCBiYWxsb29uVGl0bGUgPSB0aGlzLmVsZW1CYWxsb29uLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiLmJhbGxvb25fX3RpdGxlXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBnZXRBZGRyZXNzKHRoaXMuY29vcmRzKS50aGVuKGFkZHJlc3MgPT4ge1xyXG4gICAgICAgICAgICBiYWxsb29uVGl0bGUuaW5uZXJUZXh0ID0gYWRkcmVzcztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbG9zZUNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5hZGRSZXZpZXcuYmluZCh0aGlzKSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2xvc2VCdG4gPSB0aGlzLmVsZW1CYWxsb29uLnF1ZXJ5U2VsZWN0b3IoXCIuYmFsbG9vbl9fY2xvc2VcIik7XHJcbiAgICAgICAgbGV0IGFkZEJ0biA9IHRoaXMuZWxlbUJhbGxvb24ucXVlcnlTZWxlY3RvcihcIi5yZXZpZXctZm9ybV9fYnV0dG9uXCIpO1xyXG5cclxuICAgICAgICBjbG9zZUJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsb3NlQ2xpY2spO1xyXG4gICAgICAgIGFkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5hZGRSZXZpZXcpO1xyXG5cclxuICAgICAgICBCYWxsb29uQ29udGVudExheW91dC5zdXBlcmNsYXNzLmNsZWFyLmNhbGwodGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uQ2xvc2VDbGljazogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50cy5maXJlKFwidXNlcmNsb3NlXCIpO1xyXG4gICAgICB9LFxyXG4gICAgICBhZGRSZXZpZXc6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGxldCBmb3JtRmllbGRzID0gZG9jdW1lbnQuZm9ybXNbXCJuZXctcmV2aWV3XCJdLmVsZW1lbnRzO1xyXG4gICAgICAgIGxldCBlbGVtID0ge1xyXG4gICAgICAgICAgbmFtZTogZm9ybUZpZWxkcy5uYW1lLnZhbHVlLFxyXG4gICAgICAgICAgcGxhY2U6IGZvcm1GaWVsZHMucGxhY2UudmFsdWUsXHJcbiAgICAgICAgICBjb21tZW50OiBmb3JtRmllbGRzLmNvbW1lbnQudmFsdWUsXHJcbiAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIC50b0pTT04oKVxyXG4gICAgICAgICAgICAuc2xpY2UoMCwgMTApXHJcbiAgICAgICAgICAgIC5zcGxpdChcIi1cIilcclxuICAgICAgICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAuam9pbihcIi5cIilcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZWxlbS5uYW1lICYmIGVsZW0ucGxhY2UgJiYgZWxlbS5jb21tZW50KSB7XHJcbiAgICAgICAgICBsZXQgcmV2aWV3c0xpc3QgPSB0aGlzLmVsZW1CYWxsb29uLnF1ZXJ5U2VsZWN0b3IoXCIucmV2aWV3c19fbGlzdFwiKTtcclxuICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBgPGxpIGNsYXNzPVwicmV2aWV3c19faXRlbVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXZpZXdzX19hdXRob3JcIj57eyBlbGVtLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3c19fcGxhY2VcIj57eyBlbGVtLnBsYWNlIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJldmlld3NfX2RhdGVcIj57eyBlbGVtLmRhdGUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3c19fdGV4dFwiPnt7IGVsZW0uY29tbWVudCB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPmA7XHJcbiAgICAgICAgICByZXZpZXdzTGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcclxuXHJcbiAgICAgICAgICBbZWxlbS5sYXQsIGVsZW0ubG9uZ10gPSB0aGlzLmNvb3JkcztcclxuICAgICAgICAgIGNvbnN0IG15UGxhY2VtYXJrID0gYWRkUGxhY2VtYXJrKHltYXBzLCBlbGVtLCBCYWxsb29uQ29udGVudExheW91dCk7XHJcbiAgICAgICAgICBjbHVzdGVyZXIuYWRkKG15UGxhY2VtYXJrKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJldmlld3NNYXBbdGhpcy5jb29yZHMuam9pbihcIi1cIildKSB7XHJcbiAgICAgICAgICAgIHJldmlld3NNYXBbdGhpcy5jb29yZHMuam9pbihcIi1cIildID0gW107XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV2aWV3c01hcFt0aGlzLmNvb3Jkcy5qb2luKFwiLVwiKV0ucHVzaChlbGVtKTtcclxuXHJcbiAgICAgICAgICBmb3JtRmllbGRzLm5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgZm9ybUZpZWxkcy5wbGFjZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBmb3JtRmllbGRzLmNvbW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmV2aWV3c01hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDRgdC+0YXRgNCw0L3RkdC90L3Ri9GFINC80LXRgtC+0Log0L3QsCDQutCw0YDRgtGDXHJcbiAgZm9yIChsZXQgY29vcmRzIGluIHJldmlld3NNYXApIHtcclxuICAgIHJldmlld3NNYXBbY29vcmRzXS5tYXAoZWxlbSA9PiB7XHJcbiAgICAgIFtlbGVtLmxhdCwgZWxlbS5sb25nXSA9IGNvb3Jkcy5zcGxpdChcIi1cIik7XHJcbiAgICAgIGNvbnN0IG15UGxhY2VtYXJrID0gYWRkUGxhY2VtYXJrKFxyXG4gICAgICAgIHltYXBzLFxyXG4gICAgICAgIGVsZW0sXHJcbiAgICAgICAgQmFsbG9vbkNvbnRlbnRMYXlvdXQsXHJcbiAgICAgICAgcmV2aWV3c01hcFtjb29yZHNdXHJcbiAgICAgICk7XHJcbiAgICAgIHBsYWNlbWFya3MucHVzaChteVBsYWNlbWFyayk7XHJcbiAgICAgIGNsdXN0ZXJlci5hZGQobXlQbGFjZW1hcmspO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvc2NyaXB0cy9tYXAuanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n')},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.loadReviews = loadReviews;\nexports.addPlacemark = addPlacemark;\nfunction loadReviews() {\n  var reviewsMap = localStorage.getItem("loftschool-georeviews") || "[]";\n  return JSON.parse(reviewsMap);\n}\n\nfunction addPlacemark(ymaps, element, balloonLayout, reviews) {\n  return window.myPlacemark = new ymaps.Placemark([element.lat, element.long], {\n    reviews: reviews,\n    lat: element.lat,\n    long: element.long,\n    name: element.name,\n    place: element.place,\n    date: element.date,\n    comment: element.comment\n  }, {\n    balloonShadow: false,\n    balloonLayout: balloonLayout,\n    balloonPanelMaxMapArea: 0,\n    hideIconOnBalloonOpen: false,\n    preset: "islands#violetDotIcon"\n  });\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3NjcmlwdHMvZGF0YS5qcz9kNWM2Il0sIm5hbWVzIjpbImxvYWRSZXZpZXdzIiwiYWRkUGxhY2VtYXJrIiwicmV2aWV3c01hcCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJ5bWFwcyIsImVsZW1lbnQiLCJiYWxsb29uTGF5b3V0IiwicmV2aWV3cyIsIndpbmRvdyIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwibGF0IiwibG9uZyIsIm5hbWUiLCJwbGFjZSIsImRhdGUiLCJjb21tZW50IiwiYmFsbG9vblNoYWRvdyIsImJhbGxvb25QYW5lbE1heE1hcEFyZWEiLCJoaWRlSWNvbk9uQmFsbG9vbk9wZW4iLCJwcmVzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBQWdCQSxXLEdBQUFBLFc7UUFLQUMsWSxHQUFBQSxZO0FBTFQsU0FBU0QsV0FBVCxHQUF1QjtBQUM1QixNQUFJRSxhQUFhQyxhQUFhQyxPQUFiLENBQXFCLHVCQUFyQixLQUFpRCxJQUFsRTtBQUNBLFNBQU9DLEtBQUtDLEtBQUwsQ0FBV0osVUFBWCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0QsWUFBVCxDQUFzQk0sS0FBdEIsRUFBNkJDLE9BQTdCLEVBQXNDQyxhQUF0QyxFQUFxREMsT0FBckQsRUFBOEQ7QUFDbkUsU0FBUUMsT0FBT0MsV0FBUCxHQUFxQixJQUFJTCxNQUFNTSxTQUFWLENBQzNCLENBQUNMLFFBQVFNLEdBQVQsRUFBY04sUUFBUU8sSUFBdEIsQ0FEMkIsRUFFM0I7QUFDRUwsb0JBREY7QUFFRUksU0FBS04sUUFBUU0sR0FGZjtBQUdFQyxVQUFNUCxRQUFRTyxJQUhoQjtBQUlFQyxVQUFNUixRQUFRUSxJQUpoQjtBQUtFQyxXQUFPVCxRQUFRUyxLQUxqQjtBQU1FQyxVQUFNVixRQUFRVSxJQU5oQjtBQU9FQyxhQUFTWCxRQUFRVztBQVBuQixHQUYyQixFQVczQjtBQUNFQyxtQkFBZSxLQURqQjtBQUVFWCxtQkFBZUEsYUFGakI7QUFHRVksNEJBQXdCLENBSDFCO0FBSUVDLDJCQUF1QixLQUp6QjtBQUtFQyxZQUFRO0FBTFYsR0FYMkIsQ0FBN0I7QUFtQkQiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBsb2FkUmV2aWV3cygpIHtcclxuICBsZXQgcmV2aWV3c01hcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibG9mdHNjaG9vbC1nZW9yZXZpZXdzXCIpIHx8IFwiW11cIjtcclxuICByZXR1cm4gSlNPTi5wYXJzZShyZXZpZXdzTWFwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBsYWNlbWFyayh5bWFwcywgZWxlbWVudCwgYmFsbG9vbkxheW91dCwgcmV2aWV3cykge1xyXG4gIHJldHVybiAod2luZG93Lm15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhcclxuICAgIFtlbGVtZW50LmxhdCwgZWxlbWVudC5sb25nXSxcclxuICAgIHtcclxuICAgICAgcmV2aWV3cyxcclxuICAgICAgbGF0OiBlbGVtZW50LmxhdCxcclxuICAgICAgbG9uZzogZWxlbWVudC5sb25nLFxyXG4gICAgICBuYW1lOiBlbGVtZW50Lm5hbWUsXHJcbiAgICAgIHBsYWNlOiBlbGVtZW50LnBsYWNlLFxyXG4gICAgICBkYXRlOiBlbGVtZW50LmRhdGUsXHJcbiAgICAgIGNvbW1lbnQ6IGVsZW1lbnQuY29tbWVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgYmFsbG9vblNoYWRvdzogZmFsc2UsXHJcbiAgICAgIGJhbGxvb25MYXlvdXQ6IGJhbGxvb25MYXlvdXQsXHJcbiAgICAgIGJhbGxvb25QYW5lbE1heE1hcEFyZWE6IDAsXHJcbiAgICAgIGhpZGVJY29uT25CYWxsb29uT3BlbjogZmFsc2UsXHJcbiAgICAgIHByZXNldDogXCJpc2xhbmRzI3Zpb2xldERvdEljb25cIlxyXG4gICAgfVxyXG4gICkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvc2NyaXB0cy9kYXRhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n')}],[0]);