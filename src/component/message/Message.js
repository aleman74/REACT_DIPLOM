import React from "react";
import PropTypes from "prop-types";


// Header сайта
export default function Message(props) {

    let id = 0;

    if (props.msg.length > 0)
        return (
            <div className={
                "msg-info" +
                ((props.msg_type === 'ok') ? ' msg-ok' : '') +
                ((props.msg_type === 'error') ? ' msg-error' : '')
            }>
                {
                    props.msg.map(str =>
                        <React.Fragment key={id++}>{str}<br/></React.Fragment>
                    )
                }
            </div>
        );

    return null;       // Нет сообщения
}

Message.propTypes =
    {
        msg: PropTypes.arrayOf(PropTypes.string).isRequired,
        msg_type: PropTypes.string.isRequired,
    }