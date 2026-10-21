import { consultingServices } from './services';
import { simulations } from './simulations';
import { trainers } from './trainers';
import { trainingCategories } from './trainingPrograms';
import allTests from '../components/lms/data/all_tests.json';

const pages = [
    { title: 'Home', path: '/', description: 'Overview of PH Tech Consultants.', keywords: 'start landing about company' },
    { title: 'Services', path: '/services', description: 'Advisory & transformational consulting services.', keywords: 'consulting advisory' },
    { title: 'Training', path: '/training', description: 'Corporate training workshops and programmes.', keywords: 'workshops courses programs learning' },
    { title: 'Simulation', path: '/simulation', description: 'Immersive business simulations for professionals and students.', keywords: 'games role play crisis' },
    { title: 'Products – KRA Analysis Suite', path: '/products', description: 'Analytical platform for role clarity, KRA and KPI alignment.', keywords: 'software kra kpi role architecture productivity' },
    { title: 'Trainers', path: '/trainers', description: 'Meet our trainers, consultants and coaches.', keywords: 'team faculty experts people coaches' },
    { title: 'Events', path: '/events', description: 'Upcoming engagements and past corporate engagements.', keywords: 'capabilities delivered clients engagements' },
    { title: 'Contact', path: '/contact', description: 'Email, phone, LinkedIn and location details.', keywords: 'email phone mobile landline linkedin reach address enquiry' },
    { title: 'Gallery', path: '/gallery', description: 'Photos from our workshops and sessions.', keywords: 'photos pictures images' },
    { title: 'LMS Dashboard', path: '/lms', description: 'Learning Management System for students.', keywords: 'learning portal student login' },
    { title: 'All Assessments', path: '/lms/tests', description: 'Browse every test and assessment in the LMS.', keywords: 'tests quiz exam placement' },
    { title: 'LMS Login', path: '/lms/login', description: 'Sign in to the Learning Management System.', keywords: 'sign in account register' },
    { title: 'Privacy Policy', path: '/privacy', description: 'How we handle your data.', keywords: 'legal data privacy' },
    { title: 'Terms of Service', path: '/terms', description: 'Terms governing use of the website.', keywords: 'legal terms conditions' }
].map((page) => ({ ...page, type: 'Page' }));

const services = consultingServices.map((service) => ({
    type: 'Service',
    title: service.title,
    path: service.path,
    description: service.description
}));

const training = trainingCategories.flatMap((category) => [
    {
        type: 'Training',
        title: category.category,
        path: `/training/${category.id}`,
        description: category.description
    },
    ...category.workshops.map((workshop) => ({
        type: 'Workshop',
        title: workshop.title,
        path: `/training/${category.id}`,
        description: workshop.purpose,
        keywords: [category.category, workshop.target, ...workshop.content].join(' ')
    }))
]);

const simulationEntries = simulations.map((simulation) => ({
    type: 'Simulation',
    title: simulation.title,
    path: '/simulation',
    description: simulation.purpose,
    keywords: simulation.target
}));

const trainerEntries = trainers.map((trainer) => ({
    type: 'Trainer',
    title: trainer.name,
    path: '/trainers',
    description: trainer.role,
    keywords: [trainer.focus, ...(trainer.certifications || [])].filter(Boolean).join(' ')
}));

const testCategories = [...new Set(allTests.map((test) => test.category || 'General')), 'Technical & Engineering Assessments'];

const assessments = [
    ...testCategories.map((category) => ({
        type: 'Assessment',
        title: category,
        path: `/lms/tests?category=${encodeURIComponent(category)}`,
        description: 'Assessment category in the LMS.',
        keywords: 'tests category'
    })),
    ...allTests.map((test) => ({
        type: 'Assessment',
        title: test.title,
        path: `/lms/tests/${test.id}`,
        description: test.category,
        keywords: test.targetUsers
    }))
];

export const searchIndex = [
    ...pages,
    ...services,
    ...training,
    ...simulationEntries,
    ...trainerEntries,
    ...assessments
].map((entry, idx) => ({
    ...entry,
    id: `${entry.type}-${idx}`,
    haystack: {
        title: entry.title.toLowerCase(),
        rest: `${entry.description || ''} ${entry.keywords || ''} ${entry.type}`.toLowerCase()
    }
}));

// Every query word must appear somewhere; title matches rank above description/keyword matches.
export const searchSite = (query, limit = 10) => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    const results = [];
    for (const entry of searchIndex) {
        const { title, rest } = entry.haystack;
        let score = 0;
        let matchesAll = true;
        for (const term of terms) {
            if (title.startsWith(term)) score += 6;
            else if (title.split(/[\s&(),–-]+/).some((word) => word.startsWith(term))) score += 4;
            else if (title.includes(term)) score += 3;
            else if (rest.includes(term)) score += 1;
            else {
                matchesAll = false;
                break;
            }
        }
        if (matchesAll) {
            if (entry.type === 'Page') score += 0.5;
            results.push({ entry, score });
        }
    }

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((result) => result.entry);
};
