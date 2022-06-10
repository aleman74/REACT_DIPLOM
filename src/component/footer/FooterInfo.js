import React from "react";
import PropTypes from 'prop-types';
import {nanoid} from "nanoid";

import MenuItemInfo from "../../model/MenuItemInfo";
import FooterInfoItem from "./FooterInfoItem";


// Колонка Info
export default function FooterInfo(props) {

    return (
        <div className="col">
            <section>
                <h5>Информация</h5>
                <ul className="nav flex-column">

                    {props.menu_items.map(item =>
                        <FooterInfoItem key={nanoid()} item={item} />
                    )}

                </ul>
            </section>
        </div>
    );
}

FooterInfo.propTypes =
    {
        menu_items: PropTypes.arrayOf(
            PropTypes.instanceOf(MenuItemInfo)
        ).isRequired
    }
