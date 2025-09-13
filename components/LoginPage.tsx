import React, { useState } from 'react';
import type { Role } from '../types';

interface LoginPageProps {
  onLogin: (username: string, role: Role) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  type LoginMethod = 'name' | 'email' | 'phone';
  
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('name');
  const [loginValue, setLoginValue] = useState('');
  const [role, setRole] = useState<Role>('Buyer');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginValue.trim() === '') {
      setError('Please provide your details to continue.');
      return;
    }
    setError('');
    onLogin(loginValue, role);
  };

  const getInputType = (): 'text' | 'email' | 'tel' => {
    if (loginMethod === 'email') return 'email';
    if (loginMethod === 'phone') return 'tel';
    return 'text';
  };

  const getPlaceholder = () => {
    if (loginMethod === 'email') return 'Enter your email address';
    if (loginMethod === 'phone') return 'Enter your phone number';
    return 'Enter your name or company';
  };
  
  const handleMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    setLoginValue(''); // Clear input on method change
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12h18M3 12a9 9 0 019-9m-9 9a9 9 0 009 9" />
            </svg>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Global Trade Connect
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connecting Importers & Exporters Worldwide
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          <div>
            <div className="flex bg-gray-100 rounded-lg p-1 space-x-1 mb-4">
              {(['name', 'email', 'phone'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleMethodChange(method)}
                  className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    loginMethod === method ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600 hover:bg-white hover:bg-opacity-50'
                  }`}
                  aria-pressed={loginMethod === method}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor={loginMethod} className="sr-only">{getPlaceholder()}</label>
              <input
                id={loginMethod}
                name={loginMethod}
                type={getInputType()}
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={getPlaceholder()}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`w-full flex justify-center items-center py-3 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ${
                  role === 'Buyer'
                    ? 'bg-blue-600 text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setRole('Buyer')}
              >
                Buyer (Importer)
              </button>
              <button
                type="button"
                className={`w-full flex justify-center items-center py-3 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ${
                  role === 'Supplier'
                    ? 'bg-blue-600 text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setRole('Supplier')}
              >
                Supplier (Exporter)
              </button>
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enter Marketplace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;