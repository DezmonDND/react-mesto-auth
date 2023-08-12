import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import { api } from "../utils/Api";
import { getToken, setToken, removeToken } from "../utils/token";
import * as auth from "../utils/Auth";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";

function App() {
  // Стейты для попапов
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  // Выбранная карточка
  const [selectedCard, setSelectedCard] = useState({});
  // Массив карточек с сервера
  const [cards, setCards] = useState([]);
  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [token, setTokenState] = useState(getToken());
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipSuccess, setTooltipSuccess] = useState(false);
  // Стейт лоадера
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Получение данных с сервера и отрисовка
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((e) => console.log(`Error! ${e}`));
  }, [loggedIn]);

  // Закрытие всех попапов
  const closeAllPopups = () => {
    setisEditProfilePopupOpen(false)
    setisAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setDeleteCardPopupOpen(false)
    setInfoTooltipPopupOpen(false)
  }

  // Открыть ImagePopup на selectedCard
  function handleCardClick(card) {
    setImagePopupOpen(true)
    setSelectedCard(card)
  }

  // Открыть DeletePopup на selectedCard
  function handleTrashButtonClick(card) {
    setSelectedCard(card)
    setDeleteCardPopupOpen(true)
  }

  // Поставить лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((e) => console.log(`Error! ${e}`));
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((e) => console.log(`Error! ${e}`));
    }
  }

  // Удалить карточку
  function handleCardDelete(card) {
    setLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => {
        setLoading(false)
      })
  }

  // Обновить данные пользователя
  function handleUpdateUser(inputValues) {
    setLoading(true)
    api.setUserInfo(inputValues)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => {
        setLoading(false)
      })
  }

  // Обновить аватар
  function handleUpdateAvatar(inputValues) {
    setLoading(true)
    api.updateAvatar({ avatarLink: inputValues.avatar })
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups();
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => {
        setLoading(false);
      })
  }

  // Добавить карточку
  function handleAddPlaceSubmit(inputValues) {
    setLoading(true)
    api.sentNewCard({ profileName: inputValues.name, profileAbout: inputValues.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => {
        setLoading(false)
      })
  }

  // Авторизация
  function handleLogin(userData) {
    setTokenState(userData.jwt)
    setToken(userData.token)
    setLoggedIn(true);
  }

    function tokenCheck() {
    if (!token) {
      setLoggedIn(false);
      return;
    }
    auth.getContent(token).then((data) => {
      if (data) {
        setLoggedIn(true);
        setUserEmail(data.data.email)
        navigate('/');
      } else {
        setLoggedIn(false);
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }

  // Проверить токен при обновлении страницы
  useEffect(() => {
    tokenCheck();
  }, []);

  // Выход
  function handleLogout() {
    setLoggedIn(false);
    removeToken();
  }

  // Отмена редиректа в адресной строке при обновлении страницы
  if (loggedIn === undefined) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          loggedIn={loggedIn}
          email={userEmail}
          onSignOut={handleLogout}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRouteElement
                element={Main}
                onEditAvatar={() => setEditAvatarPopupOpen(true)}
                onEditProfile={() => setisEditProfilePopupOpen(true)}
                onAddPlace={() => setisAddPlacePopupOpen(true)}
                onOpenCard={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleTrashButtonClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setTooltipSuccess={setTooltipSuccess}
                setInfoTooltipPopupOpen={setInfoTooltipPopupOpen}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                setTooltipSuccess={setTooltipSuccess}
                setInfoTooltipPopupOpen={setInfoTooltipPopupOpen}
                setUserEmail={setUserEmail}
              />}
          />
          <Route
            path="*"
            element={
              <PageNotFound />}
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonName={isLoading ? 'Сохранение...' : 'Создать'}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          buttonName={isLoading ? 'Удаление...' : 'Да'}
          selectedCard={selectedCard}
        />
        <ImagePopup
          name='image'
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isTooltipSuccess={isTooltipSuccess}
          message={isTooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
