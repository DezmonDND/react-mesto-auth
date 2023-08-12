import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    const { isOpen, onClose, buttonName } = props;

    function handleDeleteClick(e) {
        e.preventDefault();
    }

    return (
        <PopupWithForm
            name='delete-card'
            title='Вы уверены?'
            onClose={onClose}
            isOpen={isOpen}
            buttonName={buttonName}
            onSubmit={handleDeleteClick}
        />
    )
}

export default DeleteCardPopup;