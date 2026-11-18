import type { Profile } from './types.ts'

export const profile: Profile = {
  name: 'Hoang Minh Anh',
  shortName: 'Mia',
  city: 'Ho Chi Minh City, Vietnam',
  email: 'hmianh2504@gmail.com',
  phone: '+84 928 718 538',
  phoneHref: 'tel:+84928718538',
  linkedinUrl: 'https://www.linkedin.com/in/minh-anh-ho%C3%A0ng-88aa00333',
  cvUrl: null, // TODO(owner): CV PDF (drop into public/ and set the path)
  oneLiner: [
    'Keeps electronics brands’ marketplace stores running.',
    'Marketing graduate, Swinburne University, 2026.',
  ],
  current: {
    role: 'Key Account Manager',
    company: 'DIGIWORLD Corporation',
    promotedLine: 'Promoted from Trainee · Oct 2026',
  },
  brands: ['ASUS', 'Xiaomi', 'Hisense', 'LG'],
  channels: ['Shopee', 'Lazada', 'TikTok Shop'],
  objective:
    'Marketing graduate and Key Account Manager with hands-on experience in e-commerce operations, key accounts and customer relationships. I coordinate cross-functional teams, analyze sales performance and run marketplace operations, with one aim: grow the business and give customers an experience worth coming back for.',
  about: {
    text: null, // TODO(owner): 3–4 first-person sentences
    facts: [
      'Ho Chi Minh City, Vietnam',
      'Marketing graduate, Swinburne, 2026',
      'English & Vietnamese',
    ],
  },
  ledes: {
    experience: 'Four roles, newest first, across Shopee, Lazada, TikTok Shop and brand websites.',
    selectedWork: 'Three projects from 2024. Write-ups are on their way to the shelf.',
  },
  experience: [
    {
      id: 'key-account-manager',
      title: 'Key Account Manager',
      company: 'DIGIWORLD Corporation',
      priceStart: '10.26',
      priceEnd: 'NOW',
      datesSpoken: 'October 2026 to present',
      subLine: 'Key Account Management Trainee · 06.26 – 10.26',
      duties: [
        'Manages daily operations and order fulfillment for the ASUS Official Website and Xiaomi Authorized Store.',
        'Supports Hisense official stores: campaign execution and marketplace operations.',
        'Monitors P&L, sales and KPIs; keeps deliveries on time with Operations and Customer Service.',
      ],
    },
    {
      id: 'crm-intern',
      title: 'CRM Intern',
      company: 'Lotte Mart',
      priceStart: '05.26',
      priceEnd: '06.26',
      datesSpoken: 'May 2026 to June 2026',
      duties: [
        'Handled customer inquiries, complaints, returns and membership services.',
        'Worked with cross-functional teams to resolve customer issues quickly.',
      ],
    },
    {
      id: 'ecommerce-intern',
      title: 'E-commerce Intern',
      company: 'AIRR Labs',
      priceStart: '08.25',
      priceEnd: '02.26',
      datesSpoken: 'August 2025 to February 2026',
      duties: [
        'Supported LG Vina on Shopee, Lazada and TikTok Shop: campaigns and orders.',
        'Prepared sales reports; coordinated with teams to improve performance.',
        'Monitored competitors and market trends for promotional planning.',
      ],
    },
    {
      id: 'english-teaching-assistant',
      title: 'English Teaching Assistant',
      company: 'YOLA English Center',
      priceStart: '10.23',
      priceEnd: '09.25',
      datesSpoken: 'October 2023 to September 2025',
      duties: [
        'Assisted lesson planning and class activities focused on student engagement.',
        'Organized and supported educational events.',
        'Worked with senior staff to improve the student journey.',
      ],
    },
  ],
  cases: [
    {
      id: 'hsbc',
      title: 'HSBC Business Case Competition',
      year: '2024',
      award: 'Top 8 Regional Finalist',
      context:
        'Among the top 8 teams in the regional round: analyzed complex business cases and presented strategic marketing and financial recommendations.',
      brief: null, // TODO(owner): brief for HSBC Business Case Competition 2024
      role: null, // TODO(owner): my role for HSBC Business Case Competition 2024
      outcome: null, // TODO(owner): outcome for HSBC Business Case Competition 2024
    },
    {
      id: 'consumer-behavior',
      title: 'Consumer Behavior research',
      year: '2024',
      award: 'Best Performance',
      context:
        'Marketing Research & Analytics, Swinburne: research projects applying marketing insights, data analysis and consumer psychology.',
      brief: null, // TODO(owner): brief for Consumer Behavior research 2024
      role: null, // TODO(owner): my role for Consumer Behavior research 2024
      outcome: null, // TODO(owner): outcome for Consumer Behavior research 2024
    },
    {
      id: 'greenovation',
      title: 'Greenovation Conference',
      year: '2024',
      award: 'Research Participant · Swinburne University',
      context:
        'Student-led research on sustainable innovation; presented marketing-related findings and joined the academic discussions.',
      brief: null, // TODO(owner): brief for Greenovation Conference 2024
      role: null, // TODO(owner): my role for Greenovation Conference 2024
      outcome: null, // TODO(owner): outcome for Greenovation Conference 2024
    },
  ],
  specs: [
    {
      label: 'Education',
      value: 'Marketing, Swinburne University of Technology · 2023 – 2026 · GPA 3.2/4.0',
    },
    { label: 'Tools', value: 'Excel · Word · PowerPoint · Canva · SPSS (basic statistics)' },
    { label: 'Languages', value: 'English and Vietnamese, both fluent' },
  ],
}
