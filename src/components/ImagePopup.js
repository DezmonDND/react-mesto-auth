function ImagePopup(props) {
    const { name, selectedCard, isOpen, onClose } = props;

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
                        src={selectedCard.link}
                        alt={selectedCard.name}
                    />
                    <figcaption className="popup__image-description">{selectedCard.name}</figcaption>
                </div>
            </div>
        </div >
    )
}

export default ImagePopup;