import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';

export { getSeo, prerenderPaths, indexedPaths, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from './data/seo';

// Used at build time by scripts/prerender.js to turn each public route into static HTML.
export const render = (url) => renderToString(
  <StrictMode>
    <AuthProvider>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </StaticRouter>
    </AuthProvider>
  </StrictMode>
);
