import ContactInfo from "../model/ContactInfo";
import MenuItemInfo from "../model/MenuItemInfo";
import {nanoid} from "nanoid";


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

// Количество элементов, считываемых за одно обращение к серверу
export const ITEM_COUNT = 6;

// Задержка при реагировании на ввод текста в поле поиска
export const TIME_DELAY = 200;

// Максимальное количество попыток считать данные
export const RETRY_COUNT = 5;
// Задержка между попытками
export const RETRY_DELAY = 200;      // in ms


// Ключи для хранения данных в localStorage
const CURRENT_USER = 'current_user';    // {phone: '', address: ''}

// Установка значения в localStorage о пользователе
export function SetLocalStorage_user(phone, address)
{
    const user = {phone: phone, address: address};
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
}

// Проверяем существование ключа в localStorage
function IsLocalStorageKeyExist(key)
{
    let keys = Object.keys(localStorage);
    let result = (keys.indexOf(key) > -1);

    return result;
}

// Получение значения из localStorage о пользователе
export function GetLocalStorage_user()
{
    let result = {phone: '', address: ''};

    // Проверяем существование ключа в localStorage
    if (IsLocalStorageKeyExist(CURRENT_USER))
    {
        let str = localStorage.getItem(CURRENT_USER);
        result = JSON.parse(str);
    }

    return result;
}

// Функция для форматирования вывода стоимости товара (между разрядами вставляем пробел)
export function FormatPrice(value, sep)
{
    let val_int = Math.trunc(value);        // Целая часть суммы
    let val_fract = value % 1;        // Дробная часть суммы

    let str = String(val_int);
    let count = Math.trunc(str.length / 3) + 1;

    let res = '';
    let s = '';
    for (let i = 0; i < count; i++)
    {
        if (i === count - 1)
            s = str.substring(0, str.length - (i * 3));
        else
            s = str.substring(str.length - ((i + 1) * 3), str.length - (i * 3));

        if (res !== '')
            res = s + sep + res;
        else
            res = s;
    }

    if (val_fract > 0)
        res += '.' + val_fract;

    return res;
}

// Объединяем два массива
export function JoinArray(arr1, arr2)
{
    let all = arr1.slice(0);
    all.push(...arr2);

    return all;
}

// Формируем элемент для корзины
export function CartItem_new(item, product_size, product_count)
{
    const v = {
        cart_id: nanoid(),
        id: item.id,
        title: item.title,
        size: product_size,
        count: product_count,
        price: item.price,
        amount: item.price * product_count
    };

    return v;
}

// Клонируем элемент для корзины и добавляем значения count и amount
export function CartItem_clone(item, count = 0, amount = 0)
{
    const v = {
        cart_id: item.cart_id,
        id: item.id,
        title: item.title,
        size: item.size,
        count: item.count + count,
        price: item.price,
        amount: item.amount + amount
    };

    return v;
}

// Формируем объект "корзина" для обработки его на сервере
// in - массив покупок
export function GetOrderObject(cart_items, client_phone, client_address)
{
    let v = {
        "owner": {
            "phone": client_phone,
            "address": client_address,
        },
        "items": []
    };

    for (let i = 0; i < cart_items.length; i++)
    {
        let item = {
            "id": cart_items[i].id,
            "price": cart_items[i].price,
            "count": cart_items[i].count
        };

        v.items.push(item);
    }

    return v;
}
