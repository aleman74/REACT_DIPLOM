import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import MenuItemInfo from "../../model/MenuItemInfo";


// Header сайта
export default function FooterInfoItem(props) {

    return (
        <div className="banner">
            <li className="nav-item">
                <Link to={props.item.url} className="nav-link">{props.item.title}</Link>
            </li>
        </div>
    );
}

FooterInfoItem.propTypes =
    {
        item: PropTypes.instanceOf(MenuItemInfo).isRequired
    }