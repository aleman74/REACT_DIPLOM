import {useState} from 'react';
import {useSelector} from "react-redux";
import CatalogCategory from "./CatalogCategory";
import {useLocation} from "react-router-dom";
import CatalogSearch from "./CatalogSearch";
import CatalogData from "./CatalogData";
import {searchSelector} from "../../../store/searchReducer";


// Каталог
export default function Catalog() {

    const location = useLocation();

    const {search_text} = useSelector(searchSelector);
    const [category_id, setCategory] = useState(0);

    // Выбор категории
    const onSelectCategory = (id) => {

        if (category_id !== id)
            setCategory(id);
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>

            {(location.pathname === '/catalog') && <CatalogSearch search_text={search_text} /> }

            <CatalogCategory onSelect={onSelectCategory} сategory_id={category_id} />

            <CatalogData
                search_text={(location.pathname === '/catalog') ? search_text : ''}
                сategory_id={category_id}
            />

        </section>
    );
}
