import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlace, buttonName } = props;
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        })
    }

    return (
        <PopupWithForm
            name='edit-card'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonName={buttonName}
            children={
                <>
                    <input
                        onChange={handleNameChange}
                        value={name}
                        type="text"
                        className="popup__input"
                        id="newItemName"
                        placeholder="Название"
                        name="profileName"
                        minLength="2"
                        maxLength="30"
                        required
                    ></input>
                    <span className="newItemName-error popup__input-error"></span>
                    <input
                        onChange={handleLinkChange}
                        value={link}
                        type="url"
                        className="popup__input"
                        id="newItemLink" placeholder="Ссылка на картинку"
                        name="profileAbout"
                        required
                    ></input>
                    <span className="newItemLink-error popup__input-error"></span>
                </>
            }
        />
    )
}

export default AddPlacePopup;