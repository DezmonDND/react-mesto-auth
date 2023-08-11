export class Api {
    constructor(options) {
        this._options = options;
    }

    // Обработать промис, если ОК, в строку, если ошибка - вывести в консоль ошибку
    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-69/users/me', {
            headers: {
                method: 'GET',
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f'
            }
        })
            .then(this._checkError);
    }

    setUserInfo(inputValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-69/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.about
            })
        })
            .then((this._checkError));
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-69/cards', {
            headers: {
                method: 'GET',
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f'
            }
        })
            .then(this._checkError);
    }

    sentNewCard(inputValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-69/cards', {
            method: 'POST',
            headers: {
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues.profileName,
                link: inputValues.profileAbout
            })
        })
            .then(this._checkError);
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
                'Content-Type': 'application/json'
            },
        })
            .then(this._checkError);
    }

    addLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
                'Content-Type': 'application/json'
            },
        })
            .then(this._checkError);
    }

    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
                'Content-Type': 'application/json'
            },
        })
            .then(this._checkError);
    }

    updateAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-69/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatarLink
            })
        })
            .then(this._checkError);
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
    headers: {
        authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
        'Content-Type': 'application/json'
    }
});