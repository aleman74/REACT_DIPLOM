import PropTypes from 'prop-types';


export default class LoadInfo
{
    constructor()
    {
        this.is_loading = false;
        this.error_text = '';
        this.data = null;
        this.all_data = [];
    }
}

LoadInfo.prototypes = {
    is_loading: PropTypes.bool,
    error_text: PropTypes.string,
    data: PropTypes.any,
    all_data: PropTypes.any,
}
