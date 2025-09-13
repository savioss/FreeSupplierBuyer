
import type { Requirement, Message } from './types';

export const initialRequirements: Requirement[] = [
  {
    id: 'req-1',
    buyerId: 'buyer-1',
    buyerName: 'Global Imports Inc.',
    product: 'Organic Arabica Coffee Beans',
    description: 'Looking for high-quality, ethically sourced Arabica coffee beans. Must be certified organic. Initial order of 5 tons.',
    quantity: '5 Tons',
    destination: 'Port of Rotterdam, Netherlands',
    timestamp: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: 'req-2',
    buyerId: 'buyer-2',
    buyerName: 'TechParts Direct',
    product: 'High-Performance RAM Modules',
    description: 'Seeking DDR5 RAM modules, 16GB sticks, CL36 or better. Need 10,000 units for our next production run.',
    quantity: '10,000 Units',
    destination: 'San Francisco, CA, USA',
    timestamp: new Date('2023-10-25T14:30:00Z'),
  },
   {
    id: 'req-3',
    buyerId: 'buyer-1',
    buyerName: 'Global Imports Inc.',
    product: 'Hand-woven Cotton Textiles',
    description: 'Sourcing authentic, hand-woven cotton textiles from India. Various patterns and colors. Please provide catalog and pricing for bulk orders.',
    quantity: '5000 meters',
    destination: 'Port of Hamburg, Germany',
    timestamp: new Date('2023-10-24T09:00:00Z'),
  },
];

export const initialMessages: Message[] = [
    {
        id: 'msg-1',
        requirementId: 'req-1',
        senderId: 'supplier-1',
        senderName: 'Andes Mountain Coffee Co.',
        receiverId: 'buyer-1',
        content: "Hello Global Imports, we can supply premium organic Arabica beans from our farms in Colombia. We are fully certified and can meet your quantity requirements. I've sent our spec sheet to your profile.",
        timestamp: new Date('2023-10-26T11:00:00Z'),
    },
    {
        id: 'msg-2',
        requirementId: 'req-1',
        senderId: 'supplier-2',
        senderName: 'Ethiopian Sun Grains',
        receiverId: 'buyer-1',
        content: "We have excellent Yirgacheffe coffee beans available. They are known for their distinct floral notes. Can we send a sample?",
        timestamp: new Date('2023-10-26T12:30:00Z'),
    },
];
