import PropTypes from "prop-types";


// Header сайта
export default function Banner(props) {

    // Есть данные и не загрузка
    return (
            <div className="banner">
                <img src={props.img} className="img-fluid" alt={props.text} />
                <h2 className="banner-header">{props.text}</h2>
            </div>
    );
}

Banner.propTypes =
    {
        text: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }