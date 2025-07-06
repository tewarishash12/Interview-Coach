"use client";
import { useState } from "react";
import FAQ from "@/utils/FAQ";

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    function handleToggle(idx: number) {
        setOpenIndex(idx === openIndex ? null : idx);
    }

    return (
        <div className="max-w-7xl mx-auto my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {FAQ.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-md shadow border border-gray-200">
                        <button
                            className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                            onClick={() => handleToggle(idx)}
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-panel-${idx}`}
                        >
                            <span className="font-semibold text-gray-900">{item.question}</span>
                            <span className="text-purple-500 text-2xl font-bold transition-transform duration-200">
                                {openIndex === idx ? "-" : "+"}
                            </span>
                        </button>
                        {openIndex === idx && (
                            <div
                                id={`faq-panel-${idx}`}
                                className="px-6 pb-4 text-gray-700 text-base animate-fade-in"
                            >
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
      `}</style>
        </div>
    );
}
