import React from 'react';
import ServiceLayout from '../ServiceLayout';

const MRBD = () => {
    return (
        <ServiceLayout
            title="Market Research & Business Development"
            subtitle="Build structured market entry strategies and sustainable expansion networks."
            philosophy="Market expansion without structured research exposes organizations to avoidable risk. Our philosophy integrates analytical rigor with strategic execution, ensuring market entry decisions are backed by data-driven evaluation and disciplined network development."
            offerings={[
                "Target business potential analysis",
                "Total Available Market (TAM) assessment",
                "Total Saleable Market (TSM) evaluation",
                "SWOT analysis for competitive positioning",
                "Technical evaluation and regulatory registration support",
                "Business development planning and distributor network setup",
                "After-sales service establishment",
                "Representation in the Indian market"
            ]}
            approach="We conduct comprehensive market diagnostics, validate commercial viability, and design structured entry strategies. Through distributor governance frameworks and strategic partnerships, we enable sustainable expansion and controlled growth."
            impact={[
                "Stronger Market Positioning",
                "Reduced Expansion Risk",
                "Structured Entry Strategy",
                "Improved Distributor Governance",
                "Sustainable Revenue Growth",
                "Competitive Advantage Clarity"
            ]}
        />
    );
};

export default MRBD;
