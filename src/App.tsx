import { Header } from './components/Header/Header'
import { LiveRegionProvider } from './components/LiveRegion/LiveRegion'
import { SkipLink } from './components/SkipLink/SkipLink'
import { About } from './sections/About/About'
import { CareerObjective } from './sections/CareerObjective/CareerObjective'
import { Contact } from './sections/Contact/Contact'
import { Experience } from './sections/Experience/Experience'
import { Hero } from './sections/Hero/Hero'
import { SelectedWork } from './sections/SelectedWork/SelectedWork'
import { Specifications } from './sections/Specifications/Specifications'

export function App() {
  return (
    <LiveRegionProvider>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <CareerObjective />
        <About />
        <Experience />
        <SelectedWork />
        <Specifications />
      </main>
      <Contact />
    </LiveRegionProvider>
  )
}
