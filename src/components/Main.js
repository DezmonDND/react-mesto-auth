import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const { onEditAvatar, onEditProfile, onAddPlace, onOpenCard, cards, onCardLike, onCardDelete, onCardDeletePopup } = props;
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar}>
                    <img
                        alt="Аватар"
                        className="profile__avatar"
                        src={`${currentUser.avatar}`}
                    ></img>
                </button>
                <div className="profile__info">
                    <div className="profile__buttons">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onOpenCard}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        onCardDeletePopup={onCardDeletePopup}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;