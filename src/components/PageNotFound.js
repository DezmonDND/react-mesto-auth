import { Link } from "react-router-dom";

function PageNotFound(props) {

    return (
        <div className="page-404">
            <h2 className="page-404__title">404</h2>
            <p className="page-404__text">Страница не найдена</p>
            <p className="page-404__error">К сожалению, запрашиваемый вами адрес недоступен
                Страница могла быть удалена, переименована или вы допустили ошибку в адресе.
                Пожалуйста, перейдите на <Link to='/sign-in' className="page-404__link">на главную страницу</Link> сайта и попробуйте еще раз.</p>
        </div>
    )
}

export default PageNotFound;