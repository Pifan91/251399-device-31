// Переменные для слайдера
const slider = document.querySelector('.slider');
const sliderItems = slider.querySelectorAll('.slider__item');
const sliderItemWidth = sliderItems[0].offsetWidth;
const sliderWidth = (sliderItems.length) * sliderItemWidth + 'px';
const sliderToggles = document.querySelectorAll('.slider-toggle-list__button');
const sliderTogglesActive = 'slider-toggle-list__button--active';

// Переменные для слайдера в блоке services
const servicesItems = document.querySelectorAll('.services-list__item');
const servicesToggles = document.querySelectorAll('.services-toggle-list__button');
const servicesTogglesActive = 'services-toggle-list__button--checked';

//Переменные для popup
const popupOpenButton = document.getElementById('showPopup');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.close-button');

//Переменные для popup-map
const popupMapOpenButton = document.getElementById('showMap');
const popupMap = document.querySelector('.popup-map');
const popupMapCloseButton = popupMap.querySelector('.close-button');

// Задаём ширину слайдера в соответствии с кол-вом слайдов.
slider.style.width = sliderWidth;

//Задаём value для переключателей.
function setValues(items, clickHandler) {
  items.forEach(function (item, i) {
    item.value = i;
    item.addEventListener('click', clickHandler);
  });
}

//Листает слайдер
function changeSlide(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains(sliderTogglesActive)) {
    sliderToggles.forEach(function (item) {
      item.classList.remove(sliderTogglesActive);
    });

    evt.target.classList.add(sliderTogglesActive);
    slider.style.transform = "translateX(-" + (sliderItemWidth * evt.target.value) + "px)";
  }
}

//Листает слайдер в блоке services
function changeServices(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains(servicesTogglesActive)) {
    servicesToggles.forEach(function (item) {
      item.classList.remove(servicesTogglesActive);
    });

    servicesItems.forEach(function (item) {
      item.classList.remove('services-list__item--active');
    });

    evt.target.classList.add(servicesTogglesActive);
    servicesItems[evt.target.value].classList.add('services-list__item--active');
  }
}

function popupOpenHandler(evt) {
  evt.preventDefault();
  showPopup(popup, 'popup--show');
}

function popupCloseHandler(evt) {
  evt.preventDefault();
  closePopup(popup, 'popup--show');
}

function popupMapOpenHandler(evt) {
  evt.preventDefault();
  showPopup(popupMap, 'popup-map--show');
}

function popupMapCloseHandler(evt) {
  evt.preventDefault();
  closePopup(popupMap, 'popup-map--show');
}

//Покажем popup
function showPopup(popup, classname) {
  popup.classList.add(classname);
}

//Спрячем popup
function closePopup(popup, classname) {
  popup.classList.remove(classname);
}

setValues(sliderToggles, changeSlide);
setValues(servicesToggles, changeServices);

popupOpenButton.addEventListener('click', popupOpenHandler);
popupCloseButton.addEventListener('click', popupCloseHandler);

popupMapOpenButton.addEventListener('click', popupMapOpenHandler);
popupMapCloseButton.addEventListener('click', popupMapCloseHandler);
