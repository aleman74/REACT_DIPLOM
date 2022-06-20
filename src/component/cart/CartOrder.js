import React, {useState} from 'react';
import CartOrderButton from "./CartOrderButton";
import {GetLocalStorage_user} from "../../data/global";


// Заказ
export default function CartOrder() {

    // Получение данные о пользователе из localStorage
    const {phone: old_phone, address: old_address} = GetLocalStorage_user();


    const [is_agree, setAgree] = useState(false);
    const [phone, setPhone] = useState(old_phone);
    const [address, setAddress] = useState(old_address);

    const onAgree = (evt) => {
        setAgree(prev => !prev);
    }

    const onPhone = (evt) => {
        setPhone(evt.target.value);
    }

    const onAddress = (evt) => {
        setAddress(evt.target.value);
    }


    return (
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card">
                    <form className="card-body">
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone} onChange={onPhone} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input className="form-control" id="address" placeholder="Адрес доставки" value={address} onChange={onAddress}  />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement" value={is_agree} onClick={onAgree} />
                            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>

                        <CartOrderButton is_agree={is_agree} phone={phone} address={address} />

                    </form>
                </div>
            </section>
    );
}
