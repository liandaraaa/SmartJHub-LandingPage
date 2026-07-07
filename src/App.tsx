import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductOverview from './components/ProductOverview';
import OilTestSimulator from './components/OilTestSimulator';
import PointsSection from './components/PointsSection';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  return (
    <div id="smart-jelantah-app" className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Main Header */}
      <Header activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Hero Section */}
      <Hero setActiveSection={handleSectionChange} />

      {/* Main Content Area - All sections always visible in sequence */}
      <main id="main-content-section" className="flex-1 flex flex-col gap-16 py-8">
        
        <div id="overview">
          <ProductOverview setActiveSection={handleSectionChange} />
        </div>

        <div id="simulator">
          <OilTestSimulator showToast={showToast} />
        </div>

        <div id="points">
          <PointsSection setActiveSection={handleSectionChange} />
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}


