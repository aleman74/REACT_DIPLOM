import {CONTACT_INFO} from "../../data/global";

// Каталог
export default function Contact() {

    const address = `Наш головной офис расположен в г.Москва, по адресу: ${CONTACT_INFO.address}.`;
    const work_time = ` (ежедневно: с ${CONTACT_INFO.time_start} до ${CONTACT_INFO.time_finish})`;

    return (
        <section className="top-sales">
            <h2 className="text-center">Контакты</h2>
            <p>{address}</p>
            <h5 className="text-center">Координаты для связи:</h5>
            <p>Телефон: <a href={CONTACT_INFO.phone_href}>{CONTACT_INFO.phone_text}</a>{work_time}</p>
            <p>Email: <a href={CONTACT_INFO.email_href}>{CONTACT_INFO.email_text}</a></p>
        </section>
    );
}
