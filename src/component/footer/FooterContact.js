import {CONTACT_INFO} from "../../data/global";


// Колонка Контакты
export default function FooterContact() {

    const work_time = `Ежедневно: с ${CONTACT_INFO.time_start} до ${CONTACT_INFO.time_finish}`;

    return (
        <div className="col text-right">
            <section className="footer-contacts">
                <h5>Контакты:</h5>
                <a className="footer-contacts-phone" href={CONTACT_INFO.phone_href}>{CONTACT_INFO.phone_text}</a>
                <span className="footer-contacts-working-hours">{work_time}</span>
                <a className="footer-contacts-email" href={CONTACT_INFO.email_href}>{CONTACT_INFO.email_text}</a>
                <div className="footer-social-links">
                    <div className="footer-social-link footer-social-link-twitter" />
                    <div className="footer-social-link footer-social-link-vk" />
                </div>
            </section>
        </div>
    );
}
