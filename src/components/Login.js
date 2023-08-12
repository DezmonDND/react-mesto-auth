import * as auth from "../utils/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin, setInfoTooltipPopupOpen, setTooltipSuccess, setUserEmail }) => {
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
            setTooltipSuccess(false)
            setInfoTooltipPopupOpen(true)
            return;
        }

        auth.autorize(email, password)
            .then((res) => {
                if (res && res.token) {
                    handleLogin(res);
                    setUserEmail(email);
                    navigate('/');
                }
            })
            .catch((err) => {
                if (err.statusCose === 400) {
                    console.log('Не передано одно из полей');
                }
                else if (err.statusCose === 401) {
                    console.log('Пользователь с email не найден');
                }
                setTooltipSuccess(false)
                setInfoTooltipPopupOpen(true)
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
                        required
                    ></input>
                    <input
                        onChange={handleChange}
                        value={formValue.password}
                        className="login__input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                    ></input>
                    <button className="login__button">Войти</button>
                </form>
            </div>
        </>
    )
}

export default Login;