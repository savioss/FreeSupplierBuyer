
import React from 'react';
import type { Requirement } from '../types';

interface RequirementCardProps {
    requirement: Requirement;
    actionButton?: React.ReactNode;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({ requirement, actionButton }) => {
    const timeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{requirement.product}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">{requirement.quantity}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    Posted by <span className="font-semibold text-gray-700">{requirement.buyerName}</span>
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {requirement.description}
                </p>
                 <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Destination: <span className="font-medium text-gray-600 ml-1">{requirement.destination}</span>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                 <p className="text-xs text-gray-500">{timeAgo(requirement.timestamp)}</p>
                 {actionButton && <div className="w-1/2">{actionButton}</div>}
            </div>
        </div>
    );
};
