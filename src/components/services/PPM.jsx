import React from 'react';
import ServiceLayout from '../ServiceLayout';

const PPM = () => {
    return (
        <ServiceLayout
            title="Program & Project Management"
            subtitle="Execute with disciplined control over risk, cost, time, and resources."
            philosophy="Project success demands structured planning, baseline governance, and proactive risk management. Our philosophy embeds profitability-focused execution into program culture, ensuring every initiative aligns with financial discipline and strategic objectives."
            offerings={[
                "Comprehensive project planning frameworks",
                "Strategic dashboard and performance visibility systems",
                "Cost baseline tracking and financial control mechanisms",
                "Risk identification and mitigation frameworks",
                "Change and claim management structures",
                "Governance model implementation"
            ]}
            approach="We deploy structured planning methodologies, enforce baseline discipline, and introduce transparent reporting systems. Through proactive risk evaluation and controlled execution models, we drive measurable project performance improvements."
            impact={[
                "Improved Project Profitability",
                "Reduced Risk Exposure",
                "Enhanced Cost Discipline",
                "Stronger Schedule Adherence",
                "Clear Stakeholder Alignment",
                "Structured Execution Culture"
            ]}
        />
    );
};

export default PPM;
