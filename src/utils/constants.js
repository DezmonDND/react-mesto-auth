// Кнопки
export const profileEditBtn = document.querySelector('.profile__edit-button');
export const addNewCardBtn = document.querySelector('.profile__add-button');
export const popupAvatarBtn = document.querySelector('.profile__avatar-button');

// Инпуты из форм 
export const inputName = document.querySelector('#popupName');
export const inputDescription = document.querySelector('#popupDescription');

// Формы для валидации
export const profileFormVal = document.forms['profileForm'];
export const placeForm = document.forms['placeForm'];
export const avatarForm = document.forms['avatarForm'];

// Создаем переменные со ссылкой на элементы Templat и Elements (на блок с карточками)//
export const cardTemplateSelector = ".cards-template";

// Селекторы для попапов
export const profilePopupSelector = ".popup-edit-profile";
export const imagePopupSelector = ".popup-image";
export const cardPopupSelector = ".popup-edit-card";
export const deletePopupSelector = ".popup-delete-card";
export const avatarPopupSelector = ".popup-avatar";
export const gridBlockSelector = ".elements";

// Селекторы для попапа с профилем и аватаром
export const formInfoConfig = {
    nameUserInfo: ".profile__name",
    informationUserInfo: ".profile__description",
    avatar: ".profile__avatar",
};