import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const { isOpen, onClose, onUpdateUser, buttonName } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonName={buttonName}
            children={
                <>
                    <input
                        onChange={handleNameChange}
                        value={name || ''}
                        type="text"
                        className="popup__input"
                        id="popupName"
                        placeholder="Имя"
                        name="profileName"
                        minLength="2"
                        maxLength="40"
                        required
                    ></input>
                    <span className="popupName-error popup__input-error"></span>
                    <input
                        onChange={handleDescriptionChange}
                        value={description || ''}
                        type="text"
                        className="popup__input"
                        id="popupDescription"
                        placeholder="О себе"
                        name="profileAbout"
                        minLength="2"
                        maxLength="200"
                        required
                    ></input>
                    <span className="popupDescription-error popup__input-error"></span>
                </>
            }
        />
    )
}

export default EditProfilePopup;