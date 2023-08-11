import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
const {isOpen, onClose} = props;

    return (
        <PopupWithForm
            name='delete-card'
            title='Вы уверены?'
            onClose={onClose}
            isOpen={isOpen}
        />
    )
}

export default DeleteCardPopup;