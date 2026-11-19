import type { Profile } from './types.ts'

export const profile: Profile = {
  name: 'Hoang Minh Anh',
  shortName: 'Mia',
  city: 'Ho Chi Minh City, Vietnam',
  email: 'hmianh2504@gmail.com',
  phone: '+84 928 718 538',
  phoneHref: 'tel:+84928718538',
  linkedinUrl: 'https://www.linkedin.com/in/minh-anh-ho%C3%A0ng-88aa00333',
  // Relative to the page, so it works at the site root and under a sub-path. File lives in public/.
  cvUrl: 'Hoang-Minh-Anh-CV.pdf',
  oneLiner: [
    'Keeps brands’ marketplace stores running.',
    'Marketing graduate, Swinburne University, 2026.',
  ],
  current: {
    role: 'Key Account Executive',
    company: 'DIGIWORLD Corporation',
    promotedLine: 'Promoted from Trainee · Oct 2026',
  },
  brands: ['ASUS', 'Xiaomi', 'Hisense', 'LG Vina'],
  channels: ['Shopee', 'Lazada', 'TikTok Shop'],
  objective:
    'I’m a Key Account Executive with a marketing background and a passion for e-commerce. From managing key accounts and running marketplace operations to turning sales data into action, I connect teams and ideas to achieve one goal: growing the business while creating customer experiences people want to return to.',
  about: {
    text: 'I’m an energetic, resilient and curious individual who embraces challenges and is always eager to grow. I enjoy stepping out of my comfort zone, learning new things and turning challenges into opportunities. With a proactive mindset and a strong sense of responsibility, I thrive in collaborative environments and enjoy making things happen. Always curious, always evolving, and never afraid to take the next step.',
    facts: [
      'Ho Chi Minh City, Vietnam',
      'Marketing graduate, Swinburne, 2026',
      'English & Vietnamese',
    ],
  },
  ledes: {
    experience: 'Four roles, newest first, across Shopee, Lazada, TikTok Shop and brand websites.',
    selectedWork: 'Three research and case projects, 2024 – 2026.',
  },
  experience: [
    {
      id: 'key-account-executive',
      title: 'Key Account Executive',
      company: 'DIGIWORLD Corporation',
      priceStart: '10.26',
      priceEnd: 'NOW',
      datesSpoken: 'October 2026 to present',
      subLine: 'Key Account Management Trainee · 06.26 – 10.26',
      duties: [
        'Managed daily operations and order fulfillment for ASUS Official Website, Xiaomi Authorized Store and Lion Corporation (Thailand).',
        'Coordinated with Operations and Customer Service teams to ensure timely order processing and delivery.',
        'Supported Hisense official stores across e-commerce platforms, including campaign execution and marketplace operations.',
        'Monitored P&L, GMV, sales performance and operational KPIs to track business performance.',
        'Coordinated with brand partners on pricing, promotions, sales planning and financial reconciliation.',
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
        'Handled customer inquiries, complaints, returns and membership services while ensuring excellent customer satisfaction.',
        'Coordinated with cross-functional teams to resolve customer issues and deliver timely, solution-oriented support.',
        'Maintained and updated customer information, membership records and service requests to ensure accurate CRM data management.',
        'Supported customer retention by following up on feedback, monitoring recurring issues and identifying opportunities to improve the customer experience.',
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
      brief:
        'Analyzed a real-world business case, identifying key business challenges and evaluating potential growth opportunities through market and financial analysis.',
      role: 'Collaborated with team members to conduct research, analyze business data, develop strategic recommendations and contribute to the final presentation.',
      outcome:
        'Achieved Top 8 Regional Finalist, demonstrating strong analytical thinking, problem-solving, teamwork and business presentation skills.',
    },
    {
      id: 'consumer-behavior',
      title: 'Consumer Behavior Research',
      year: '2024',
      award: 'Best Performance',
      context:
        'Conducted consumer behavior research, applying marketing theories, consumer psychology and data analytics to understand purchase intentions and decision-making.',
      brief:
        'Participated in academic research activities, including the CIEMB research initiative at National Economics University (NEU), focusing on consumer behavior and marketing-related topics.',
      role: 'Contributed to literature reviews, research design, data collection, statistical analysis and interpretation of research findings.',
      outcome:
        'Received Best Performance recognition and contributed to academic research presented in the CIEMB conference proceedings.',
    },
    {
      id: 'greenovation',
      title: 'Greenovation Conference',
      year: '2024 – 2026',
      award: 'Top 3 · Research Participant · Swinburne University',
      context:
        'Participated in student-led research exploring consumer behavior, nutrition awareness and sustainable consumption.',
      brief:
        'Conducted research on Vietnamese university students’ purchase intentions toward ultra-processed foods, applying the Theory of Planned Behavior (TPB) and a nutrition knowledge framework.',
      role: 'Contributed to literature review, questionnaire development, data collection, statistical analysis using SPSS and AMOS, and interpretation of research findings.',
      outcome:
        'Achieved Top 3 recognition at the Greenovation Conference, presenting research findings and contributing to academic discussions on consumer behavior and sustainable consumption.',
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
