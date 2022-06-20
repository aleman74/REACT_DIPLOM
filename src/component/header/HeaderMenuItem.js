import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import MenuItemInfo from "../../model/MenuItemInfo";


// Логотип сайта
export default function HeaderMenuItem(props) {

//    console.log('HeaderMenuItem props.item', props.item);

    return (
        <li className="nav-item active">
            <NavLink className="nav-link" strict to={props.item.url}>{props.item.title}</NavLink>
        </li>
    );
}

HeaderMenuItem.propTypes =
    {
        item: PropTypes.instanceOf(MenuItemInfo).isRequired
    }
