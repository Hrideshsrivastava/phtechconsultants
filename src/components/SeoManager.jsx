import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo } from '../data/seo';

// Find a <meta>/<link> in <head> by selector, creating it if it is missing.
const upsert = (tag, selector, attrs) => {
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement(tag);
        document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
};

// Keeps the head tags in sync on client-side navigation; the pre-rendered HTML already has them on first load.
const SeoManager = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const seo = getSeo(pathname);
        document.title = seo.title;
        upsert('meta', 'meta[name="description"]', { name: 'description', content: seo.description });
        upsert('meta', 'meta[name="robots"]', { name: 'robots', content: seo.noindex ? 'noindex, nofollow' : 'index, follow' });
        upsert('link', 'link[rel="canonical"]', { rel: 'canonical', href: seo.canonical });
        upsert('meta', 'meta[property="og:title"]', { property: 'og:title', content: seo.title });
        upsert('meta', 'meta[property="og:description"]', { property: 'og:description', content: seo.description });
        upsert('meta', 'meta[property="og:url"]', { property: 'og:url', content: seo.canonical });
    }, [pathname]);

    return null;
};

export default SeoManager;
