import React from 'react';
import logo from '../images/header_logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header(props) {
    const { email, onSignOut, loggedIn } = props;

    return (
        <header className="header">
            <img src={logo} alt="Логотип шапка" className="header__logo"></img>
            <div className='header__userBlock'>
                {loggedIn && <p className='header__email'>{email}</p>}
                {loggedIn && <button onClick={onSignOut} className='header__logout'>Выйти</button>}
            </div>
                <Routes>
                    <Route exact path=':sign-in'
                        element={
                            <Link to='/sign-up' className='header__link'>Регистрация</Link>
                        }
                    />
                    <Route exact path=':sign-up'
                        element={
                            <Link to='/sign-in' className='header__link'>Войти</Link>
                        }
                    />
                </Routes>
        </header>
    );
}

export default Header;