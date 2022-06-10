import PropTypes from 'prop-types';


export default class MenuItemInfo
{
    constructor(title,url)
    {
        this.title = title;
        this.url = url;
    }
}

MenuItemInfo.prototypes = {
    title: PropTypes.string,
    url: PropTypes.string,
}
