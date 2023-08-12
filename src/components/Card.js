import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element" >
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            {isOwn && <button className='element__trash-btn' onClick={handleDeleteClick} />}
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <p className="element__counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;