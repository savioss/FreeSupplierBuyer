
import React, { useState } from 'react';
import type { Requirement } from '../types';

interface SendMessageModalProps {
  requirement: Requirement;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ requirement, onClose, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Please enter a message.');
      return;
    }
    onSubmit(content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Contact Buyer</h2>
          <p className="text-sm text-gray-500 mt-1">
            Regarding: <span className="font-semibold text-blue-600">{requirement.product}</span> for {requirement.buyerName}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label htmlFor="message-content" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              id="message-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Introduce yourself and explain how you can fulfill their requirement for ${requirement.product}...`}
            />
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessageModal;
