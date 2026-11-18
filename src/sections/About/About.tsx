import { PlaceholderBlock } from '../../components/PlaceholderBlock/PlaceholderBlock'
import { Rail } from '../../components/Rail/Rail'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { Tag } from '../../components/Tag/Tag'
import { profile } from '../../content/profile'
import styles from './About.module.css'

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <SectionHeading id="about-title">About me</SectionHeading>
      <Rail />
      <div className={styles.body}>
        <Tag as="div" kind="about" className={styles.blankTag}>
          <Tag.Clip side="l" />
          <Tag.Clip side="r" />
          <Tag.Face tone="paper">
            <div className={styles.inner}>
              <PlaceholderBlock
                text={profile.about.text}
                placeholder="3–4 sentences about me — to be added"
              />
            </div>
          </Tag.Face>
        </Tag>
        <ul className={styles.facts}>
          {profile.about.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
