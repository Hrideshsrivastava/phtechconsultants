import React from 'react';
import ServiceLayout from '../ServiceLayout';

const IPA = () => {
    return (
        <ServiceLayout
            title="Information Process Automation"
            subtitle="Accelerate decision-making through structured automation and digital workflow systems."
            philosophy="Operational data becomes valuable only when structured, accessible, and aligned to decision-making frameworks. Our philosophy is centered on eliminating manual inefficiencies and transforming scattered information streams into streamlined, automated, and intelligence-driven systems."
            offerings={[
                "Advanced macro tool development for process automation",
                "SharePoint-based collaboration platform design",
                "IMS data repository architecture and structuring",
                "Automated reporting and dashboard solutions",
                "Custom internal web-based systems",
                "Survey and analytical reporting frameworks"
            ]}
            approach="We map existing information flows, identify automation opportunities, and architect structured digital systems that reduce redundancy. By integrating workflow automation with business objectives, we ensure data clarity and execution visibility across functions."
            impact={[
                "Faster Reporting Cycles",
                "Reduced Manual Errors",
                "Improved Internal Communication",
                "Higher Decision-Making Transparency",
                "Operational Efficiency Gains",
                "Structured Information Governance"
            ]}
        />
    );
};

export default IPA;
