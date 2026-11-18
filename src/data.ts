export type NewsArticle = { id: string; title: string; category: string; date: string; summary: string; image: string };
export type SchoolEvent = { id: string; day: string; month: string; title: string; category: string; description: string };

export const school = {
  name: 'BrainSmart',
  fullName: 'BrainSmart Elementary School',
  eyebrow: 'A place to think boldly',
  description: 'A thoughtful school community dedicated to purposeful learning, meaningful relationships and a future-ready education.',
  mission: 'To create the conditions for every learner to become a confident thinker, generous collaborator and lifelong learner.',
  vision: 'A learning community where curiosity is protected, potential is nurtured and every future feels possible.',
  contact: { email: 'hello@example.com', phone: '+00 000 000 0000', address: 'School address to be confirmed' },
};

export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Community', to: '/students' },
  { label: 'Resources', to: '/resources' },
  { label: 'News & events', to: '/news' },
];

export const news: NewsArticle[] = [
  { id: 'learning-lab', title: 'Designing a school day around deeper questions', category: 'Learning', date: 'Oct 18, 2025', summary: 'An editorial preview about the ideas and rituals that can make learning more meaningful.', image: '/images/classroom-diverse.jpg' },
  { id: 'family-studio', title: 'Building a strong home–school partnership', category: 'Families', date: 'Sep 26, 2025', summary: 'Practical resources, thoughtful updates and open conversations for families.', image: '/images/family-learning.jpg' },
  { id: 'creative-thinking', title: 'Why creative thinking belongs in every subject', category: 'Ideas', date: 'Aug 09, 2025', summary: 'Explore the people, projects and questions shaping a vibrant learning community.', image: '/images/students-learning.jpg' },
];

export const events: SchoolEvent[] = [
  { id: 'open-house', day: '12', month: 'NOV', title: 'Open house / discover BrainSmart', category: 'Community', description: 'A prospective family event to meet the school community and ask questions.' },
  { id: 'family-forum', day: '21', month: 'NOV', title: 'Family learning forum', category: 'Families', description: 'Join a conversation with educators and families across the school community.' },
  { id: 'maker-week', day: '04', month: 'DEC', title: 'Maker week showcase', category: 'Student life', description: 'Celebrate the ideas and work students have been exploring this term.' },
];

export const pillars = [
  ['01', 'Curiosity first', 'We make room for questions that lead somewhere unexpected.'],
  ['02', 'Many ways to shine', 'Learning is richer when academic, creative and practical strengths meet.'],
  ['03', 'Together, with care', 'Belonging, agency and wellbeing are foundations for meaningful growth.'],
];
