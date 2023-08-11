import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "./Auth";

const Register = ({ openInfoTooltipPopup, isRegister }) => {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        auth.register(email, password)
            .then((res) => {
                if (res.statusCode !== 400) {
                    console.log(res);
                    navigate('/sign-in')
                    openInfoTooltipPopup(isRegister);
                }
                else {
                    console.log('Что-то пошло не так');
                    openInfoTooltipPopup(isRegister);
                }
            })
            .catch((err) => {
                openInfoTooltipPopup(isRegister);
                console.log(err)
            });
    }

    return (
        <>
            <div className="login">
                <p className="login__title">Регистрация</p>
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
                    <button className="login__button">Зарегистрироваться</button>
                </form>
            </div>
            <div className="login__sign">
                <Link to='/sign-in' className="login__sign-link">Уже зарегистрированы? Войти</Link>
            </div>
        </>
    )
}

export default Register;