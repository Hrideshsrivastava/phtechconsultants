import React from 'react';
import ServiceLayout from '../ServiceLayout';

const HR_OD = () => {
    return (
        <ServiceLayout
            title="Human Resources & Organizational Development"
            subtitle="Optimize internal capabilities and map inter-team dependencies for peak performance."
            philosophy="Organizations frequently stagnate by looking externally for talent rather than optimizing internal capital. Our philosophy roots organizational development in rigorous job analysis, definitive role mapping, and the resolution of inter-departmental silos. By establishing a clear Line of Sight (LoS) between individual Key Result Areas (KRAs) and top-level corporate strategy, we re-engineer performance cultures from the inside out."
            offerings={[
                "Guided self-job analysis using KRA and KPI frameworks",
                "Competence requirement analysis and capability gap identification",
                "Inter-team dependency mapping via the Penta-Power framework",
                "Development roadmapping rooted in structured competence audits",
                "Skill assessment platform simulation for HR sub-functions"
            ]}
            approach="We deploy an immersive, evidence-based methodology spanning individual profile coaching, case discussions, and real-time behavioral simulations. Our approach actively forces participants to reconcile their perceived operational value against actual KPI-driven outputs, building an undeniable case for immediate behavioral realignment."
            impact={[
                "Performance-Focused Mindset",
                "Reduced Silos",
                "Competence-Driven Culture",
                "Reduced Talent Loss",
                "Knowledge-Sharing Infrastructure",
                "Stronger Service Delivery"
            ]}
        />
    );
};

export default HR_OD;
