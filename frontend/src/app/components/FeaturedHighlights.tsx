"use client";

import { CardLayout } from "@/global-components/Card";

const features = [
    {
        icon: "💬",
        title: "AI-Powered Mock Interviews",
        desc: "Simulate real interviews and get instant, actionable feedback."
    },
    {
        icon: "📈",
        title: "Progress Tracking",
        desc: "Visualize your growth and focus on your improvement areas."
    },
    {
        icon: "🧑‍💼",
        title: "Industry-Specific Questions",
        desc: "Practice with questions tailored to your target role."
    },
];

export default function FeatureHighlights() {
    
    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Platform Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map(f => (
                    <CardLayout className="p-10" key={f.title}>
                        <div className="text-4xl mb-4">{f.icon}</div>
                        <div className="font-semibold text-gray-900 text-lg mb-2">{f.title}</div>
                        <div className="text-gray-700 text-sm leading-relaxed">{f.desc}</div>
                    </CardLayout>
                ))}
            </div>
        </section>
    );
}
