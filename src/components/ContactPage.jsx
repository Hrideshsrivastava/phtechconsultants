import React from 'react';
import SectionReveal from './SectionReveal';
import ContactForm from './ContactForm';

const icons = {
    email: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    landline: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    location: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
    )
};

const LinkedInIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.812 0-9.728h3.554v1.375c.426-.659 1.189-1.592 2.894-1.592 2.113 0 3.695 1.381 3.695 4.349v5.596zM5.337 9.433c-1.144 0-1.915-.761-1.915-1.713 0-.951.768-1.71 1.959-1.71 1.188 0 1.914.759 1.939 1.71 0 .952-.751 1.713-1.983 1.713zm1.946 11.019H3.391V8.724h3.892v11.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
);

const contactDetails = [
    // The email is the longest value, so it gets the full row on wider screens
    { label: 'Email', value: 'info@phtechconsultant.com', href: 'mailto:info@phtechconsultant.com', icon: 'email', wide: true },
    { label: 'Mobile', value: '8800446350', href: 'tel:8800446350', icon: 'phone' },
    { label: 'Landline', value: '+91-120-4565227', href: 'tel:+91-120-4565227', icon: 'landline' },
    { label: 'LinkedIn', value: 'PHTechConsultant', href: 'https://www.linkedin.com/company/phtechconsultant/', icon: 'linkedin', external: true },
    { label: 'Based in', value: 'Noida', icon: 'location' }
];

const ContactDetail = ({ detail }) => {
    const content = (
        <>
            <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg bg-white text-blue-900 shadow-sm ring-1 ring-slate-200">
                {detail.icon === 'linkedin' ? (
                    <LinkedInIcon />
                ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">{icons[detail.icon]}</svg>
                )}
            </span>
            <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">{detail.label}</span>
                <span className="block text-[15px] font-bold text-slate-900 sm:text-lg [overflow-wrap:anywhere]">
                    {/* Lets a long email wrap after the @ rather than mid-word */}
                    {detail.value.includes('@') ? <>{detail.value.split('@')[0]}@<wbr />{detail.value.split('@')[1]}</> : detail.value}
                </span>
            </span>
        </>
    );

    const className = `flex items-center gap-3 sm:gap-4 rounded-xl px-2 py-2.5 sm:p-3 text-left transition-colors ${detail.wide ? 'md:col-span-2' : ''}`;
    return detail.href ? (
        <a
            href={detail.href}
            {...(detail.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`${className} hover:bg-white`}
        >
            {content}
        </a>
    ) : (
        <div className={className}>{content}</div>
    );
};

const ContactPage = () => (
    <div className="flex flex-col max-w-4xl mx-auto py-12 px-0 sm:px-4">
        <SectionReveal className="bg-white p-4 sm:p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 md:mb-6 tracking-tight">Executive Advisory Board</h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
                Ready to align your strategic capabilities and eliminate operational friction? Reach out to schedule a closed-door consultation session.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 max-w-2xl mx-auto sm:bg-slate-50 sm:p-4 rounded-xl sm:border sm:border-slate-100">
                {contactDetails.map((detail) => (
                    <ContactDetail key={detail.label} detail={detail} />
                ))}
            </div>
        </SectionReveal>

        <SectionReveal className="mt-8 bg-white p-4 sm:p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">Send Us an Enquiry</h2>
                <p className="mt-3 text-slate-600 font-medium max-w-xl mx-auto">
                    Tell us what you're looking for and our team will get back to you directly.
                </p>
            </div>
            <div className="max-w-2xl mx-auto">
                <ContactForm />
            </div>
        </SectionReveal>
    </div>
);

export default ContactPage;