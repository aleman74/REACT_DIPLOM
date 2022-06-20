import PropTypes from 'prop-types';
import {nanoid} from "nanoid";

import MenuItemInfo from "../../model/MenuItemInfo";
import HeaderMenuItem from "./HeaderMenuItem";


// Логотип сайта
export default function HeaderMenu(props) {

    return (
        <ul className="navbar-nav mr-auto">

            {props.items.map(item =>
                <HeaderMenuItem key={nanoid()} item={item} />
            )}

        </ul>
    );
}

HeaderMenu.propTypes =
    {
        items: PropTypes.arrayOf(
            PropTypes.instanceOf(MenuItemInfo)
        ).isRequired
    }
