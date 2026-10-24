import { consultingServices } from './services';
import { trainingCategories } from './trainingPrograms';

export const SITE_URL = 'https://phtechconsultant.com';
export const SITE_NAME = 'PH Tech Consultants';
export const DEFAULT_IMAGE = `${SITE_URL}/logophtc.jpeg`;

const home = {
    title: `${SITE_NAME} | HR Consulting, Corporate Training & Employability Programmes`,
    description: 'Noida-based consultancy for KRA-led performance planning, HR & organisation development, corporate training workshops, business simulations and student employability assessments.'
};

// The main sections all render the same one-page layout, so they point search engines at "/".
const sectionPaths = ['/services', '/training', '/simulation', '/products', '/trainers', '/events', '/contact'];

// Pages with their own content: each is pre-rendered, self-canonical and listed in the sitemap.
const pages = {
    '/': home,
    ...Object.fromEntries(consultingServices.map((service) => [
        service.path,
        { title: `${service.title} | ${SITE_NAME}`, description: service.description }
    ])),
    ...Object.fromEntries(trainingCategories.map((category) => [
        `/training/${category.id}`,
        {
            title: `${category.category} Training Workshops | ${SITE_NAME}`,
            description: `${category.description} Workshops: ${category.workshops.map((workshop) => workshop.title).join(', ')}.`
        }
    ])),
    '/gallery': {
        title: `Gallery | ${SITE_NAME}`,
        description: 'Photos from PH Tech Consultants workshops, training sessions and corporate engagements.'
    },
    '/privacy': {
        title: `Privacy Policy | ${SITE_NAME}`,
        description: 'How PH Tech Consultants collects, uses and protects your data.'
    },
    '/terms': {
        title: `Terms of Service | ${SITE_NAME}`,
        description: 'Terms governing the use of the PH Tech Consultants website and LMS.'
    }
};

export const indexedPaths = Object.keys(pages);
export const prerenderPaths = [...indexedPaths, ...sectionPaths];

export const getSeo = (pathname) => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

    if (pages[path]) {
        return { ...pages[path], canonical: `${SITE_URL}${path === '/' ? '/' : path}`, noindex: false };
    }
    if (sectionPaths.includes(path)) {
        return { ...home, canonical: `${SITE_URL}/`, noindex: false };
    }
    // LMS and anything else behind a login is kept out of search results.
    return { ...home, canonical: `${SITE_URL}${path}`, noindex: true };
};
