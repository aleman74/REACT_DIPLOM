import ContactInfo from "../model/ContactInfo";
import MenuItemInfo from "../model/MenuItemInfo";


// Контактные данные
export const CONTACT_INFO = new ContactInfo(
    '+7 495 79 03 5 03',
    'tel:+7-495-790-35-03',

    'office@bosanoga.ru',
    'mailto:office@bosanoga.ru',

    '09-00',
    '21-00',

    'Варшавское шоссе, д. 17, бизнес-центр W Plaza',
);

// Логотип
export const LOGO = require('../img/header-logo.png');

// Меню в Header
export const HEADER_MENU_ITEMS = [
    new MenuItemInfo('Главная', '/'),
    new MenuItemInfo('Каталог', '/catalog'),
    new MenuItemInfo('О магазине', '/about'),
    new MenuItemInfo('Контакты', '/contact'),
];

// Меню в Footer (cсылки в разделе "Информация")
export const FOOTER_MENU_ITEMS = [
    new MenuItemInfo('О магазине', '/about'),
    new MenuItemInfo('Каталог', '/catalog'),
    new MenuItemInfo('Контакты', '/contact'),
];

// Флаг: отображать строку поиска по умолчанию
export const IS_SEARCH_SHOW = false;
