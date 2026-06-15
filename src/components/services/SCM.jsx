import React from 'react';
import ServiceLayout from '../ServiceLayout';

const SCM = () => {
    return (
        <ServiceLayout
            title="Supply Chain Services"
            subtitle="Design, stabilize, and optimize supply chain functions for operational excellence."
            philosophy="Supply chain efficiency is not achieved through firefighting but through structured governance, disciplined processes, and commercial clarity. Our philosophy focuses on building resilient supply systems that minimize disruption, strengthen vendor relationships, and align procurement strategy with organizational profitability."
            offerings={[
                "Complete SCM setup and restructuring support",
                "Supply chain procedure and governance framework implementation",
                "Critical operational roadblock resolution",
                "Supply chain audit with structured improvement roadmap",
                "Pre-bid commercial and strategic supply planning",
                "Capability development programs for SCM teams"
            ]}
            approach="We begin with a structured diagnostic of existing supply functions, followed by gap identification and governance model design. Through process standardization, commercial visibility enhancement, and targeted capability interventions, we build a sustainable and performance-driven supply ecosystem."
            impact={[
                "Improved Procurement Efficiency",
                "Reduced Operational Disruptions",
                "Stronger Vendor Governance",
                "Enhanced Cost Visibility",
                "Improved Delivery Reliability",
                "Structured Supply Discipline"
            ]}
        />
    );
};

export default SCM;
