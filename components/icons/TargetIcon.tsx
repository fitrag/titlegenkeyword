import React from 'react';

export const TargetIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H21" />
    </svg>
);