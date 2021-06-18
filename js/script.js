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
const popupForm = document.querySelector('.popup-form');
const popupFormName = document.getElementById('popup-name');
const popupFormEmail = document.getElementById('popup-email');
const popupCloseButton = popup.querySelector('.close-button');

//Переменные для popup-map
const popupMapOpenButton = document.getElementById('showMap');
const popupMap = document.querySelector('.popup-map');
const popupMapCloseButton = popupMap.querySelector('.close-button');

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}


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

  if (storage) {
    popupFormName.value = storage;
    popupFormEmail.focus();
  } else {
    popupFormName.focus();
  }
}

function popupCloseHandler(evt) {
  evt.preventDefault();

  if (popup.classList.contains('popup--error')) {
    popup.classList.remove('popup--error');
  }

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

function closePopupWithKey(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains('popup--show')) {
      evt.preventDefault();
      popup.classList.remove('popup--error');
    } else if (popupMap.classList.contains('popup-map--show')) {
      evt.preventDefault();
      popupMap.classList.remove('popup-map--show');
    }
  }
}

function formValidation(evt) {
  if (!popupFormName.value || !popupFormEmail.value) {
    evt.preventDefault();
    popup.classList.remove('popup--error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('popup--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", popupFormName.value);
    }
  }
}

setValues(sliderToggles, changeSlide);
setValues(servicesToggles, changeServices);

popupOpenButton.addEventListener('click', popupOpenHandler);
popupCloseButton.addEventListener('click', popupCloseHandler);

popupMapOpenButton.addEventListener('click', popupMapOpenHandler);
popupMapCloseButton.addEventListener('click', popupMapCloseHandler);

popupForm.addEventListener('submit', formValidation)
window.addEventListener('keydown', closePopupWithKey);
