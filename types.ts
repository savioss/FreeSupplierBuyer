
export type Role = 'Buyer' | 'Supplier';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Requirement {
  id: string;
  buyerId: string;
  buyerName: string;
  product: string;
  description: string;
  quantity: string;
  destination: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  requirementId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}
