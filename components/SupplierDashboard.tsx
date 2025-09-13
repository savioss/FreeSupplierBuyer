import React, { useState, useMemo } from 'react';
import type { User, Requirement, Message } from '../types';
import SendMessageModal from './SendMessageModal';
import { RequirementCard } from './RequirementCard';

interface SupplierDashboardProps {
  currentUser: User;
  requirements: Requirement[];
  onSendMessage: (message: Omit<Message, 'id' | 'senderId' | 'senderName' | 'timestamp'>) => void;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ currentUser, requirements, onSendMessage }) => {
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (content: string) => {
    if (!selectedRequirement) return;
    onSendMessage({
      content,
      requirementId: selectedRequirement.id,
      receiverId: selectedRequirement.buyerId,
    });
    setSelectedRequirement(null);
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
    <div className="max-w-7xl mx-auto">
      {selectedRequirement && (
        <SendMessageModal
          requirement={selectedRequirement}
          onClose={() => setSelectedRequirement(null)}
          onSubmit={handleSendMessage}
        />
      )}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Marketplace Requirements</h1>
        <p className="mt-1 text-gray-600">Browse and respond to inquiries from buyers around the world.</p>
      </div>

       <div className="mb-8 max-w-2xl mx-auto">
            <label htmlFor="search-marketplace" className="sr-only">Search Marketplace</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="search-marketplace"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search for products, materials, etc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search marketplace"
                />
            </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequirements.length > 0 ? (
          filteredRequirements.map(req => (
            <RequirementCard 
              key={req.id} 
              requirement={req}
              actionButton={
                <button
                  onClick={() => setSelectedRequirement(req)}
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                >
                  Message Buyer
                </button>
              } 
            />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-16 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requirements found</h3>
            <p className="mt-1 text-sm text-gray-500">{searchQuery ? 'Try a different search term.' : 'Check back later for new import requests.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;