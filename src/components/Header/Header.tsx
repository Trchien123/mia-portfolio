import { profile } from '../../content/profile'
import styles from './Header.module.css'

type NavItem = { label: string; href: string }

const nav: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Selected work', href: '#selected-work' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  return (
    <header className={styles.head}>
      <a className={styles.brand} href="#top" aria-label={`${profile.shortName}, back to top`}>
        {profile.shortName}
      </a>
      <nav aria-label="Primary">
        <ul className={styles.list}>
          {nav.map((item) => (
            <li key={item.href}>
              <a className={styles.link} href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
