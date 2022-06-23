import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import MenuItemInfo from "../../model/MenuItemInfo";


// Логотип сайта
export default function HeaderMenuItem(props) {

    return (
        <li className="nav-item active">
            <NavLink className="nav-link" to={props.item.url} strict="true">{props.item.title}</NavLink>
        </li>
    );
}

HeaderMenuItem.propTypes =
    {
        item: PropTypes.instanceOf(MenuItemInfo).isRequired
    }
