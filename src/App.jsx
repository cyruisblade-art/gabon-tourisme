import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProvincesSection } from './components/ProvincesSection';
import { ParksSection } from './components/ParksSection';
import { AccommodationsSection } from './components/AccommodationsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { CultureSection } from './components/CultureSection';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { TravelGuideSection } from './components/TravelGuideSection';
import { EventsSection } from './components/EventsSection';
import { DestinationDetailSection } from './components/DestinationDetailSection';
import { AiAssistantModal } from './components/AiAssistantModal';
import { BookingModal } from './components/BookingModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProvinceId, setSelectedProvinceId] = useState('estuaire');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenBookingForItem = (item) => {
    setSelectedBookingItem(item);
    setIsBookingModalOpen(true);
  };

  const handleSelectProvinceDetail = (province) => {
    const provId = typeof province === 'string' ? province : (province.id || 'estuaire');
    setSelectedProvinceId(provId);
    setActiveTab('destinations');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiModal={() => setIsAiModalOpen(true)}
        openUserDashboard={() => setIsUserDashboardOpen(true)}
        openAdminDashboard={() => setIsAdminDashboardOpen(true)}
        openBookingModal={() => handleOpenBookingForItem({ name: "Pass Global Gabon Explorer", price: 50000 })}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Views */}
      <main>
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreClick={() => setActiveTab('destinations')}
              onBookClick={() => handleOpenBookingForItem({ name: "Pass Séjour Gabon VIP", price: 120000 })}
              onAiClick={() => setIsAiModalOpen(true)}
            />
            <ProvincesSection onSelectProvinceForBooking={handleSelectProvinceDetail} />
            <InteractiveMapSection
              onSelectParkForBooking={handleOpenBookingForItem}
              onSelectAccommodationForBooking={handleOpenBookingForItem}
            />
          </>
        )}

        {activeTab === 'destinations' && (
          <DestinationDetailSection
            provinceId={selectedProvinceId}
            onSelectProvince={(id) => setSelectedProvinceId(id)}
            onBookExperience={handleOpenBookingForItem}
            onOpenMap={() => setActiveTab('map')}
          />
        )}

        {activeTab === 'parks' && (
          <ParksSection onBookPark={handleOpenBookingForItem} />
        )}

        {activeTab === 'accommodations' && (
          <AccommodationsSection onBookAccommodation={handleOpenBookingForItem} />
        )}

        {activeTab === 'activities' && (
          <ActivitiesSection onBookActivity={handleOpenBookingForItem} />
        )}

        {activeTab === 'culture' && (
          <CultureSection />
        )}

        {activeTab === 'map' && (
          <InteractiveMapSection
            onSelectParkForBooking={handleOpenBookingForItem}
            onSelectAccommodationForBooking={handleOpenBookingForItem}
          />
        )}

        {activeTab === 'guide' && (
          <TravelGuideSection />
        )}

        {activeTab === 'events' && (
          <EventsSection onBookEvent={handleOpenBookingForItem} />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Modals */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyItineraryBooking={(itinerary) => {
          setIsAiModalOpen(false);
          handleOpenBookingForItem({ name: itinerary.title, price: itinerary.costPerPerson });
        }}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialItem={selectedBookingItem}
      />

      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        onOpenBooking={handleOpenBookingForItem}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
