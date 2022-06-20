import React from 'react';
import PropTypes from "prop-types";


export default function CatalogNext(props) {

    // Следующие записи
    const onNextClick = (evt) => {
        evt.preventDefault();
        props.onNext();
    }

    return (
            <div className="text-center">
                <button className="btn btn-outline-primary" onClick={onNextClick}>Загрузить ещё</button>
            </div>
    );
}

CatalogNext.propTypes =
    {
        onNext: PropTypes.func.isRequired,
    }