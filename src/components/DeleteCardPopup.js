import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    const { isOpen, onClose, buttonName, onDelete, selectedCard } = props;

    function handleSubmit(e) {
        e.preventDefault();
        onDelete(selectedCard);
    }

    return (
        <PopupWithForm
            name='delete-card'
            title='Вы уверены?'
            onClose={onClose}
            isOpen={isOpen}
            buttonName={buttonName}
            onSubmit={handleSubmit}
        />
    )
}

export default DeleteCardPopup;