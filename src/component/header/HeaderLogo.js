import React from "react";
import PropTypes from 'prop-types';
// import logo from '../../img/header-logo.png';


// Логотип сайта
export default function HeaderLogo(props) {

    return (
        <a className="navbar-brand" href={props.href}>
            <img src={props.logo}  alt={props.alt} />
        </a>
    );
}

HeaderLogo.propTypes =
    {
        href: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }
