import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, User, Menu, X } from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  openAiModal, 
  openUserDashboard, 
  openAdminDashboard,
  openBookingModal 
}) => {
  const { lang, setLang } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'parks', label: 'Parcs Nationaux' },
    { id: 'activities', label: 'Activités' },
    { id: 'accommodations', label: 'Hébergements' },
    { id: 'culture', label: 'Culture' },
    { id: 'events', label: 'Événements' },
    { id: 'guide', label: 'Guide de voyage' },
    { id: 'map', label: 'Carte' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full shadow-sm">
      {/* Educational Banner with Smooth Marquee Animation */}
      <div className="overflow-hidden bg-amber-500 text-slate-950 border-b border-amber-600">
        <div className="py-1.5 px-4 text-[10px] sm:text-xs font-black flex items-center overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex space-x-12">
            <span>
              PROJET ACADÉMIQUE — Ce site est réalisé dans le cadre d'un devoir d'apprentissage visant à étudier l'utilisation et les fonctionnalités de l'outil Google Analytics (analyse globale d'audience, comptage de visiteurs et statistiques d'utilisation). AUCUNE DONNÉE PERSONNELLE, NOM OU INFORMATION BANCAIRE N'EST ENREGISTRÉE NI STOCKÉE. VOTRE NAVIGATION EST TOTALEMENT SÉCURISÉE.
            </span>
            <span>
              PROJET ACADÉMIQUE — Ce site est réalisé dans le cadre d'un devoir d'apprentissage visant à étudier l'utilisation et les fonctionnalités de l'outil Google Analytics (analyse globale d'audience, comptage de visiteurs et statistiques d'utilisation). AUCUNE DONNÉE PERSONNELLE, NOM OU INFORMATION BANCAIRE N'EST ENREGISTRÉE NI STOCKÉE. VOTRE NAVIGATION EST TOTALEMENT SÉCURISÉE.
            </span>
          </div>
        </div>
      </div>  
      
      <header className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
          
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer mr-2 md:mr-8 flex-shrink-0"
              onClick={() => handleNavClick('home')}
            >
              <img 
                src="/1.png" 
                alt="Gabon Tourisme Logo" 
                className="h-14 sm:h-20 w-auto object-contain" 
              />
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden xl:flex items-center space-x-5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors py-1 ${
                    activeTab === link.id
                      ? 'text-[#0B6E4F] dark:text-emerald-400 font-extrabold border-b-2 border-[#0B6E4F]'
                      : 'hover:text-[#0B6E4F] dark:hover:text-emerald-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Changer de thème"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language Selector */}
              <div className="hidden xs:flex items-center space-x-1 bg-slate-100 dark:bg-slate-900 px-2 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="text-xs">🇫🇷</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-xs focus:outline-none cursor-pointer uppercase"
                >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="pt">PT</option>
                  <option value="de">DE</option>
                </select>
              </div>

              {/* User Profile */}
              <button
                onClick={openUserDashboard}
                className="p-1.5 sm:p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Mon Compte"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* CTA Book Now */}
              <button
                onClick={() => openBookingModal()}
                className="hidden sm:block px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
              >
                Réserver
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#0B6E4F]" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    activeTab === link.id
                      ? 'bg-[#0B6E4F] text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-3 rounded-xl bg-[#0B6E4F] text-white font-extrabold text-xs text-center shadow-md"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        )}

      </header>
    </div>
  );
};
