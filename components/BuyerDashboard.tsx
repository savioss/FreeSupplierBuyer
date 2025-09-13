import React, { useState, useMemo } from 'react';
import type { User, Requirement, Message } from '../types';
import PostRequirementModal from './PostRequirementModal';
import { RequirementCard } from './RequirementCard';

interface BuyerDashboardProps {
  currentUser: User;
  requirements: Requirement[];
  messages: Message[];
  onAddRequirement: (requirement: Omit<Requirement, 'id' | 'buyerId' | 'buyerName' | 'timestamp'>) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ currentUser, requirements, messages, onAddRequirement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messagesByRequirement = useMemo(() => {
    return messages.reduce((acc, message) => {
      (acc[message.requirementId] = acc[message.requirementId] || []).push(message);
      return acc;
    }, {} as Record<string, Message[]>);
  }, [messages]);

  const handlePostRequirement = (requirement: Omit<Requirement, 'id' | 'buyerId' | 'buyerName' | 'timestamp'>) => {
    onAddRequirement(requirement);
    setIsModalOpen(false);
  };

  const filteredRequirements = useMemo(() => {
    if (!searchQuery.trim()) return requirements;
    const lowercasedQuery = searchQuery.toLowerCase();
    return requirements.filter(req =>
      req.product.toLowerCase().includes(lowercasedQuery) ||
      req.description.toLowerCase().includes(lowercasedQuery)
    );
  }, [requirements, searchQuery]);
  
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {isModalOpen && (
        <PostRequirementModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostRequirement}
        />
      )}
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Posted Requirements</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Post New Requirement
          </button>
        </div>

        <div className="mb-6">
            <label htmlFor="search-requirements" className="sr-only">Search Your Requirements</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="search-requirements"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search your requirements by product or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search your requirements"
                />
            </div>
        </div>

        <div className="space-y-4">
            {filteredRequirements.length > 0 ? (
                filteredRequirements.map(req => (
                    <RequirementCard key={req.id} requirement={req} />
                ))
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No requirements found</h3>
                    <p className="mt-1 text-sm text-gray-500">{searchQuery ? 'Try adjusting your search.' : 'Get started by posting a new requirement.'}</p>
                </div>
            )}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Supplier Messages</h2>
        <div className="space-y-6 bg-white p-4 rounded-lg shadow">
            {requirements.length > 0 && messages.length > 0 ? (
                requirements.map(req => (
                    messagesByRequirement[req.id] && (
                        <div key={req.id}>
                            <h3 className="font-semibold text-gray-700 border-b pb-2 mb-2">
                                For: <span className="text-blue-600">{req.product}</span>
                            </h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {messagesByRequirement[req.id].map(msg => (
                                    <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm font-bold text-gray-800">{msg.senderName}</p>
                                        <p className="text-sm text-gray-600 mt-1">{msg.content}</p>
                                        <p className="text-xs text-gray-400 text-right mt-2">{new Date(msg.timestamp).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))
            ) : (
                 <div className="text-center py-12">
                     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Messages from suppliers will appear here.</p>
                 </div>
            )}
            {messages.length === 0 && requirements.length > 0 && <p className="text-center text-sm text-gray-500 py-4">No messages received for your requirements yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;