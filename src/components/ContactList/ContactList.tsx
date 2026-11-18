import { profile } from '../../content/profile'
import { CopyEmailButton } from '../CopyEmailButton/CopyEmailButton'
import { CvLink } from '../CvLink/CvLink'
import styles from './ContactList.module.css'

export function ContactList() {
  return (
    <dl className={styles.reach}>
      <div>
        <dt>Email</dt>
        <dd className={styles.mail}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyEmailButton email={profile.email} />
        </dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>
          <a className="num" href={profile.phoneHref}>
            {profile.phone}
          </a>
        </dd>
      </div>
      {profile.cvUrl ? (
        <div>
          <dt>CV</dt>
          <dd>
            <CvLink href={profile.cvUrl} size="lg" />
          </dd>
        </div>
      ) : null}
      <div>
        <dt>LinkedIn</dt>
        <dd>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            View profile
          </a>
        </dd>
      </div>
    </dl>
  )
}
