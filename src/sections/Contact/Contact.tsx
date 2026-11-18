import { ContactList } from '../../components/ContactList/ContactList'
import { Rail } from '../../components/Rail/Rail'
import { profile } from '../../content/profile'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <footer id="contact" className={styles.counter} aria-labelledby="contact-title">
      <Rail />
      <div className={styles.inner}>
        <h2 id="contact-title" className={styles.heading}>
          Ask staff about this item.
        </h2>
        <ContactList />
      </div>
      <p className={styles.sign}>
        {profile.name} · {profile.city}
      </p>
    </footer>
  )
}
