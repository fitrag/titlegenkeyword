import React from 'react';

export const CpuChipIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.252A12.013 12.013 0 0 0 10.5 2.25h-3A2.25 2.25 0 0 0 5.25 4.5v3A2.25 2.25 0 0 0 7.5 9.75h3A2.25 2.25 0 0 0 12.75 7.5v-3A2.25 2.25 0 0 0 10.5 2.25Zm0 19.502c.38.002.75.002 1.125 0h3A2.25 2.25 0 0 0 18.75 19.5v-3A2.25 2.25 0 0 0 16.5 14.25h-3A2.25 2.25 0 0 0 11.25 16.5v3a2.25 2.25 0 0 0 1.125 2.252Z" />
    </svg>
);