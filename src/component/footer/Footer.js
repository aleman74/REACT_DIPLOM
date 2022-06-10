import React from "react";
import FooterInfo from "./FooterInfo";
import MenuItemInfo from "../../model/MenuItemInfo";
import FooterPay from "./FooterPay";
import FooterContact from "./FooterContact";

import {FOOTER_MENU_ITEMS} from "../../data/global";


// Header сайта
export default function Footer(props) {

    return (
        <footer className="container bg-light footer">
            <div id="footer" className="row">

                <FooterInfo menu_items={FOOTER_MENU_ITEMS} />

                <FooterPay />

                <FooterContact />

            </div>
        </footer>
    );
}