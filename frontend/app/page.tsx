'use client';

import Chat from './components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">クイナAIマネージャー</h1>
      </header>
      <Chat />
    </div>
  );
} 