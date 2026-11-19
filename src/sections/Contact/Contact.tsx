import { ContactList } from '../../components/ContactList/ContactList'
import { Rail } from '../../components/Rail/Rail'
import { profile } from '../../content/profile'
import { dataOn, HEADING_VIEW } from '../../motion/motion'
import { useInViewOnce } from '../../motion/useInViewOnce'
import styles from './Contact.module.css'

export function Contact() {
  const [innerRef, on] = useInViewOnce<HTMLDivElement>(HEADING_VIEW)
  return (
    <footer id="contact" className={styles.counter} aria-labelledby="contact-title">
      <Rail />
      <div ref={innerRef} className={styles.inner}>
        <h2 id="contact-title" className={styles.heading} data-on={dataOn(on)}>
          Let’s work together.
        </h2>
        <ContactList />
      </div>
      <p className={styles.sign}>
        {profile.name} · {profile.city}
      </p>
    </footer>
  )
}
