import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from './ImagePopup';
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { getToken, setToken, removeToken } from "../utils/token";
import * as auth from "../utils/Auth";
import PageNotFound from "./PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setTokenState] = useState(getToken());
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isTooltipSuccess, setTooltipSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((e) => console.log(`Error! ${e}`));
  }, [loggedIn]);

  const closeAllPopups = () => {
    setisEditProfilePopupOpen(false)
    setisAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setDeleteCardPopupOpen(false)
    setInfoTooltipPopupOpen(false)
  }

  function handleCardClick(card) {
    setImagePopupOpen(true)
    setSelectedCard(card)
  }

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

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((e) => console.log(`Error! ${e}`));
  }

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

  function handleLogin(userData) {
    setTokenState(userData.jwt)
    setToken(userData.token)
    setLoggedIn(true);
  }

  const navigate = useNavigate();

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

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogout() {
    setLoggedIn(false);
    removeToken();
  }

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
                onCardDelete={handleCardDelete}
                onCardDeletePopup={() => setDeleteCardPopupOpen(true)}
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
              <PageNotFound

              />}
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
          onSubmit={handleCardDelete}
          buttonName={isLoading ? 'Удаление...' : 'Да'}
        />
        <ImagePopup
          name='image'
          card={selectedCard}
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
