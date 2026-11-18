import { CaseTag } from '../../components/CaseTag/CaseTag'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { profile } from '../../content/profile'
import styles from './SelectedWork.module.css'

export function SelectedWork() {
  return (
    <section id="selected-work" className="section" aria-labelledby="selected-work-title">
      <SectionHeading id="selected-work-title" lede={profile.ledes.selectedWork}>
        Selected work
      </SectionHeading>
      <div className={styles.cases}>
        {profile.cases.map((item, i) => (
          <CaseTag key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
