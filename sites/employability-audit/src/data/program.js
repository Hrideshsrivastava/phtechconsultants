// All programme content lives here so it can be updated without touching the layout.

export const MAIN_SITE_URL = 'https://phtechconsultant.com';

export const contact = {
    phone: '+91-9871291350',
    phoneHref: 'tel:+919871291350',
    whatsappHref: 'https://wa.me/919871291350',
    email: 'info@phtechconsultant.com'
};

export const purpose =
    'The modern job market demands a blend of technical expertise, communication agility, and psychological resilience. ' +
    'This programme eliminates the gaps between academic knowledge and actual corporate expectations. It evaluates candidates ' +
    'under realistic corporate pressure to benchmark their skills, remove professional insecurities, and map out a precise growth trajectory.';

// The gap each module uncovers; colours are Tailwind class fragments used across the page.
export const modules = [
    {
        code: 'M1',
        title: 'Proctored Online Test',
        gap: 'Knowledge Gap',
        description: 'A timed, proctored test that benchmarks aptitude and domain knowledge against real placement standards.',
        price: 399,
        standalone: true,
        perk: 'Pass and get 50% off your 2nd test',
        icon: 'test',
        color: 'sky'
    },
    {
        code: 'M2',
        title: 'AI Video Interview & Behavioral Audit',
        gap: 'Presence & Behaviour Gap',
        description: 'An AI-driven video interview that reads body language, posture and vocal habits, with video-ready feedback.',
        price: 799,
        standalone: true,
        icon: 'camera',
        color: 'violet'
    },
    {
        code: 'M3',
        title: 'Group Discussion & Situational Audit',
        gap: 'Communication & Collaboration Gap',
        description: 'Live group discussions and situational challenges that test how you think, speak and collaborate under pressure.',
        price: 599,
        standalone: true,
        icon: 'group',
        color: 'emerald'
    },
    {
        code: 'M4',
        title: 'Panel Interview',
        gap: 'Resilience & Situation Handling Gap',
        description: 'A realistic, high-pressure panel round that builds composure and structured thinking on the spot.',
        price: 999,
        standalone: false,
        icon: 'panel',
        color: 'amber'
    },
    {
        code: 'M5',
        title: 'Senior Expert CXO Interview',
        gap: 'Job Alignment & Emotional Intelligence Gap',
        description: 'A one-on-one with a senior industry expert, calibrated for 20 LPA+ roles, on mindset, attitude and job fit.',
        price: 999,
        standalone: false,
        icon: 'star',
        color: 'rose'
    }
];

export const modulesByCode = Object.fromEntries(modules.map((module) => [module.code, module]));

// `modules: null` means the bundle's contents are confirmed on enquiry.
export const tiers = [
    { code: 'Tier 1', title: 'Digital & AI Audit', modules: ['M1', 'M2'], price: 1099 },
    { code: 'Tier 2', title: 'Online Test + Senior Expert', modules: ['M1', 'M5'], price: 1199 },
    { code: 'Tier 3', title: 'AI & Group Readiness', modules: ['M1', 'M2', 'M3'], price: 1599 },
    { code: 'Tier 4', title: 'Online Test + AI Interview + Senior Expert', modules: ['M1', 'M2', 'M5'], price: 1999 },
    { code: 'Tier 5', title: 'Online Test + AI Interview + GD + Senior Expert', modules: ['M1', 'M2', 'M3', 'M5'], price: 2499 },
    { code: 'Tier 6', title: 'Flagship 360° Employability Audit', modules: null, price: 2499, featured: true },
    { code: 'Tier 7', title: 'Comprehensive', modules: ['M1', 'M2', 'M3', 'M4', 'M5'], price: 2999 }
];

export const earlyBird = { title: 'Early Bird Bundle', price: 2199 };

export const impacts = [
    { title: 'Exposes Hidden Blind Spots', text: 'Replaces guesswork with hard data, catching critical skill gaps before real recruiters do.', icon: 'eye' },
    { title: 'Crushes Interview Anxiety', text: 'Desensitizes students to high-pressure settings, loud group discussions, and intimidating panel rounds.', icon: 'shield' },
    { title: 'Sharpens Instant Thinking', text: 'Trains the brain to filter thoughts and deliver structured answers under strict time constraints.', icon: 'bolt' },
    { title: 'Fixes Body Language Flaws', text: 'Corrects nervous habits, weak postures, and vocal ticks through expert, video-ready feedback.', icon: 'body' },
    { title: 'Bridges the Expectation Gap', text: 'Aligns raw academic knowledge with the specific mindset and attitude HR leaders actually hire.', icon: 'bridge' }
];

export const deliveryFacts = [
    { label: 'Duration', value: '1–3 Days' },
    { label: 'Group size', value: '100–500 per group' },
    { label: 'For', value: 'Placement interview aspirants' },
    { label: 'Method', value: 'One-to-one & one-to-group exercises' }
];

export const stats = [
    { value: 5, suffix: '', label: 'Audit modules' },
    { value: 4, suffix: '', label: 'Gap areas mapped' },
    { value: 500, suffix: '', label: 'Max. participants per group' },
    { value: 3, suffix: ' days', label: 'Max. programme length' }
];

export const nextLevel = [
    'Consulting for individuals and teams, on demand',
    'Extended workshop for faculty who prepare students for interviews'
];

export const videos = [
    { id: '3nOw8B2hjOc', title: 'Employability Workshop', caption: 'See the audit in action', featured: true },
    { id: '1-Qa3bJ4EAg', title: 'Mock Interview at NIFTEM', caption: 'Panel round, real pressure' },
    { id: 'nS30vi6Rt54', title: 'Training at NIFTEM', caption: 'Workshop highlights' }
];

export const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`;
