export type Role = {
  id: string
  title: string
  company: string
  priceStart: string
  priceEnd: string | 'NOW'
  datesSpoken: string
  subLine?: string
  duties: string[]
}

export type Case = {
  id: string
  title: string
  year: '2024'
  award: string
  context: string
  brief: string | null
  role: string | null
  outcome: string | null
}

export type Spec = { label: string; value: string }

export type Profile = {
  name: string
  shortName: 'Mia'
  city: string
  email: string
  phone: string
  phoneHref: string
  linkedinUrl: string
  cvUrl: string | null
  oneLiner: string[]
  current: { role: string; company: string; promotedLine: string }
  brands: string[]
  channels: string[]
  objective: string
  about: { text: string | null; facts: string[] }
  ledes: { experience: string; selectedWork: string }
  experience: Role[]
  cases: Case[]
  specs: Spec[]
}
