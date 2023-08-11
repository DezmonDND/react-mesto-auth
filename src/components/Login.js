import * as auth from "./Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ( {handleLogin, openInfoTooltipPopup} ) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;

        if (!email || !password) {
            console.log('Необходимо заполнить все поля');
            openInfoTooltipPopup(false)
            return;
        }

        auth.autorize(email, password)
            .then((res) => {
                if (res.statusCose === 400 || res.statusCose === 401) {
                    console.log('Что-то пошло не так!');
                    openInfoTooltipPopup(false)
                }
                if (res && res.token) {
                    handleLogin(res);
                    navigate('/');
                }
            })
            .catch((err) => {
                openInfoTooltipPopup(false);
                console.log(err)
            });
    }

    return (
        <>
            <div className="login">
                <p className="login__title">Вход</p>
                <form
                    className="login__form"
                    onSubmit={handleSubmit}
                >
                    <input
                        onChange={handleChange}
                        value={formValue.email}
                        className="login__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                    ></input>
                    <input
                        onChange={handleChange}
                        value={formValue.password}
                        className="login__input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                    ></input>
                    <button className="login__button">Войти</button>
                </form>
            </div>
        </>
    )
}

export default Login;