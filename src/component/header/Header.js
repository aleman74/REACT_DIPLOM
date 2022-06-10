import React from "react";

import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";

import {LOGO, HEADER_MENU_ITEMS, IS_SEARCH_SHOW} from "../../data/global";


// Header сайта
export default function Header() {

    // Есть данные и не загрузка
    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav id="navbar" className="navbar navbar-expand-sm navbar-light bg-light">

                        <HeaderLogo href='/' alt='Bosa Noga' logo={LOGO} />

                        <div className="collapase navbar-collapse" id="navbarMain">

                            <HeaderMenu items={HEADER_MENU_ITEMS} />

                            <HeaderSearch is_search_show={IS_SEARCH_SHOW} />

                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}