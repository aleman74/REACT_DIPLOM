import PropTypes from 'prop-types';


export default class ContactInfo
{
    constructor(
        email_text,
        email_href,
        phone_text,
        phone_href,
        time_start,
        time_finish,
        address
    )
    {
        this.email_text = email_text;
        this.email_href = email_href;

        this.phone_text = phone_text;
        this.phone_href = phone_href;

        this.time_start = time_start;
        this.time_finish = time_finish;

        this.address = address;
    }
}

ContactInfo.prototypes = {
    email_text: PropTypes.string,
    email_href: PropTypes.string,

    phone_text: PropTypes.string,
    phone_href: PropTypes.string,

    time_start: PropTypes.string,
    time_finish: PropTypes.string,

    address: PropTypes.string,
}
