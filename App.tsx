import React, { useState } from 'react';
import { BURSA_CONTENT } from './constants';
import { InfoCard } from './components/InfoCard';
import { RouteMap } from './components/RouteMap';
import { BookOpen, Map, Info } from 'lucide-react';

enum Tab {
  GUIDE = 'rehber',
  ROUTE = 'rota'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GUIDE);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">
      
      {/* Header - Sticky */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
            BURSA
          </h1>
          <p className="text-xs font-medium text-green-600 tracking-widest uppercase">
            Tarih & Lezzet
          </p>
        </div>
        <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center text-green-600">
           <Info size={18} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pb-24 min-h-screen bg-gray-50">
        {activeTab === Tab.GUIDE ? (
          <div className="px-5 py-6 space-y-2">
            
            {/* Intro Text */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Hoşgeldiniz</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Paleolitik çağdan günümüze uzanan tarihi ve damak çatlatan lezzetleriyle Bursa'yı keşfedin.
              </p>
            </div>

            {/* Cards Feed */}
            {BURSA_CONTENT.map((item) => (
              <InfoCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <RouteMap />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-8 py-3 pb-6 z-40 flex justify-around items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        
        <button 
          onClick={() => setActiveTab(Tab.GUIDE)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === Tab.GUIDE ? 'text-green-600 scale-105' : 'text-gray-400'}`}
        >
          <div className={`p-2 rounded-xl ${activeTab === Tab.GUIDE ? 'bg-green-50' : 'bg-transparent'}`}>
            <BookOpen size={24} strokeWidth={activeTab === Tab.GUIDE ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-bold tracking-wide">REHBER</span>
        </button>

        <button 
          onClick={() => setActiveTab(Tab.ROUTE)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === Tab.ROUTE ? 'text-green-600 scale-105' : 'text-gray-400'}`}
        >
          <div className={`p-2 rounded-xl ${activeTab === Tab.ROUTE ? 'bg-green-50' : 'bg-transparent'}`}>
            <Map size={24} strokeWidth={activeTab === Tab.ROUTE ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-bold tracking-wide">GÜZERGAH</span>
        </button>

      </nav>
    </div>
  );
};

export default App;