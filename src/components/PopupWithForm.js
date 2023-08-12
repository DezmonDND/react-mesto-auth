function PopupWithForm(props) {
    const { name, title, children, isOpen, onClose, onSubmit, buttonName } = props;
    

    return (
        <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''} `}
            onClick={(e) => {
                if (e.target.classList.contains('popup_opened')) {
                    onClose()
                }
            }}>
            <div className="popup__container">
                <button type="button" className="popup__close-btn" onClick={onClose}></button>
                <form onSubmit={onSubmit} className="popup__content popup__edit-form" name={`${name}Form`} method="post" noValidate>
                    <h2 className='popup__title'>{title}</h2>
                    {children}
                    <button className="popup__save-btn" type="submit">{buttonName}</button>
                </form>
            </div>
        </div >
    );
}

export default PopupWithForm;