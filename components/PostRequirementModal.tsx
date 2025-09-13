
import React, { useState } from 'react';
import type { Requirement } from '../types';

interface PostRequirementModalProps {
  onClose: () => void;
  onSubmit: (requirement: Omit<Requirement, 'id' | 'buyerId' | 'buyerName' | 'timestamp'>) => void;
}

const PostRequirementModal: React.FC<PostRequirementModalProps> = ({ onClose, onSubmit }) => {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !description || !quantity || !destination) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({ product, description, quantity, destination });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Post a New Requirement</h2>
          <p className="text-sm text-gray-500">Detail the goods you are looking to import.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" id="product" value={product} onChange={(e) => setProduct(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Organic Arabica Coffee Beans" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Provide details like specifications, quality standards, etc."></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 5 Tons" />
                </div>
                <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination Port/City</label>
                    <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Port of Rotterdam" />
                </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">Post Requirement</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostRequirementModal;
