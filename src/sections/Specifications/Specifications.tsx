import { SpecsPanel } from '../../components/SpecsPanel/SpecsPanel'
import { profile } from '../../content/profile'

export function Specifications() {
  return (
    <section id="specifications" className="section" aria-labelledby="specifications-title">
      <SpecsPanel id="specifications-title" specs={profile.specs} />
    </section>
  )
}
