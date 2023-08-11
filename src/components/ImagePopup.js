function ImagePopup(props) {
    const { name, card, isOpen, onClose } = props;

    return (
        < div
            className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}
            onClick={(e) => {
                if (e.target.classList.contains('popup_opened')) {
                    onClose()
                }
            }}>
            <div className="popup__container">
                <button className="popup__close-btn" type="button" onClick={onClose}></button>
                <div className="popup__image-content">
                    <img className="popup__picture"
                        src={card.link}
                        alt={card.name}
                    />
                    <figcaption className="popup__image-description">{card.name}</figcaption>
                </div>
            </div>
        </div >
    )
}

export default ImagePopup;