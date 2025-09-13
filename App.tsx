
import React, { useState, useCallback } from 'react';
import type { User, Requirement, Message, Role } from './types';
import LoginPage from './components/LoginPage';
import BuyerDashboard from './components/BuyerDashboard';
import SupplierDashboard from './components/SupplierDashboard';
import Header from './components/Header';
import { initialRequirements, initialMessages } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleLogin = useCallback((username: string, role: Role) => {
    if (username.trim() && role) {
      setCurrentUser({ id: `user-${Date.now()}`, username, role });
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const addRequirement = useCallback((requirement: Omit<Requirement, 'id' | 'buyerId' | 'buyerName' | 'timestamp'>) => {
    if (!currentUser) return;
    const newRequirement: Requirement = {
      ...requirement,
      id: `req-${crypto.randomUUID()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.username,
      timestamp: new Date(),
    };
    setRequirements(prev => [newRequirement, ...prev]);
  }, [currentUser]);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'senderId' | 'senderName' | 'timestamp'>) => {
    if (!currentUser) return;
    const newMessage: Message = {
      ...message,
      id: `msg-${crypto.randomUUID()}`,
      senderId: currentUser.id,
      senderName: currentUser.username,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, [currentUser]);

  const getDashboard = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case 'Buyer':
        return <BuyerDashboard 
                  currentUser={currentUser}
                  requirements={requirements.filter(r => r.buyerId === currentUser.id)}
                  messages={messages.filter(m => m.receiverId === currentUser.id)}
                  onAddRequirement={addRequirement}
                />;
      case 'Supplier':
        return <SupplierDashboard
                  currentUser={currentUser}
                  requirements={requirements}
                  onSendMessage={addMessage}
                />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {currentUser ? (
        <>
          <Header user={currentUser} onLogout={handleLogout} />
          <main className="p-4 sm:p-6 lg:p-8">
            {getDashboard()}
          </main>
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
