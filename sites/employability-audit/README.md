# Employability Audit mini-site

Single-page site for the Employability Audit programme: programme outline, pricing (with an
interactive "Build your audit" picker), videos, and a registration form.

All text, prices, modules and videos are in `src/data/program.js`. Edit that file to update content.

## Run locally

```
cd sites/employability-audit
npm install
npm run dev
```

## Cloudflare Worker settings

- **Root directory:** `sites/employability-audit`
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Build watch paths:** `sites/employability-audit/*`
- **Build variables:** the same `VITE_FIREBASE_*` variables as the main site's Worker
  (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
  `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`).

## Registrations

Submissions are saved to the Firestore collection `employabilityRegistrations` in the main site's
Firebase project. Visitors aren't logged in, so Firestore must allow creating (but not reading)
documents in that collection. Add this inside `match /databases/{database}/documents { ... }` in
**Firebase console → Firestore → Rules**:

```
match /employabilityRegistrations/{registrationId} {
  allow create: if isValidRegistration(request.resource.data);
  allow read, update, delete: if false;
}

function isValidRegistration(data) {
  return data.keys().hasOnly(['name', 'email', 'phone', 'institution', 'course', 'package', 'message', 'source', 'createdAt'])
    && data.name is string && data.name.size() > 0 && data.name.size() <= 100
    && data.email is string && data.email.size() > 3 && data.email.size() <= 200
    && data.phone is string && data.phone.size() >= 10 && data.phone.size() <= 20
    && data.institution is string && data.institution.size() > 0 && data.institution.size() <= 200
    && data.course is string && data.course.size() <= 100
    && data.package is string && data.package.size() <= 100
    && data.message is string && data.message.size() <= 2000
    && data.source is string && data.source.size() <= 100
    && data.createdAt == request.time;
}
```

Also add the site's domain under **Firebase console → Authentication → Settings → Authorized domains**.

If Firebase isn't configured or the save fails, the form doesn't lose the registration: it offers
a one-tap "Send by email" button with the details already filled in.

The site deliberately shows no phone number; the team contacts registrants directly.
