import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {FormatPrice} from "../../../data/global";


// Корзина
export default function HitItem(props) {

//    console.log('HitItem props.item', props.item);

    return (
            <div className="col-4">
                <div className="card">
                    <img src={props.item.images[0]}
                         className="card-img-top img-fluid" alt={props.item.title} />
                    <div className="card-body">
                        <p className="card-text">{props.item.title}</p>
                        <p className="card-text">{FormatPrice(props.item.price, ' ') + ' руб.'}</p>
                        <Link to={'/catalog/' + props.item.id} className="btn btn-outline-primary">Заказать</Link>
                    </div>
                </div>
            </div>
    );

}

HitItem.propTypes =
    {
        item: PropTypes.object.isRequired,
    }
