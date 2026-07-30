import React, { useState } from 'react';
import { Compass, Calendar, MapPin, Users, Search, Bot, Leaf, Camera } from 'lucide-react';

export const Hero = ({ onExploreClick, onBookClick, onAiClick, onSearch }) => {
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState('2 voyageurs');

  return (
    <div className="relative mb-24">
      
      {/* Hero Banner Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-slate-950">
        
        {/* Background Image - Gabon River & Elephant Landscape */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpg"
            alt="Gabon Tourism Hero"
            className="w-full h-full object-cover object-center filter brightness-[0.82]"
          />
          {/* Subtle Dark Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Hero Text Block */}
          <div className="max-w-2xl text-left text-white space-y-6">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-['Outfit']">
              Découvrez le dernier <br />
              <span className="text-[#10B981] font-black">paradis naturel</span> d'Afrique
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-normal max-w-xl leading-relaxed">
              Explorez les plages sauvages, les forêts tropicales, les gorilles, les éléphants, les baleines et une nature préservée.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-sm shadow-xl transition-all flex items-center space-x-2.5"
              >
                <Compass className="w-5 h-5" />
                <span>Explorer le Gabon</span>
              </button>

              <button
                onClick={onBookClick}
                className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/40 backdrop-blur-md transition-all flex items-center space-x-2.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Réserver maintenant</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white border-t border-white/15 max-w-xl">
              
              <div className="flex items-center space-x-3">
                <Leaf className="w-6 h-6 text-[#10B981]" />
                <div>
                  <span className="text-xl font-extrabold block leading-none">13</span>
                  <span className="text-[11px] text-slate-300 font-medium">Parcs Nationaux</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-[#10B981]" />
                <div>
                  <span className="text-xl font-extrabold block leading-none">9</span>
                  <span className="text-[11px] text-slate-300 font-medium">Provinces</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Camera className="w-6 h-6 text-[#10B981]" />
                <div>
                  <span className="text-xl font-extrabold block leading-none">+100</span>
                  <span className="text-[11px] text-slate-300 font-medium">Sites à découvrir</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-[#10B981]" />
                <div>
                  <span className="text-xs font-bold block leading-tight">Une biodiversité</span>
                  <span className="text-[10px] text-slate-300">exceptionnelle</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Floating AI Assistant Card */}
          <div className="w-full sm:w-[320px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-slate-900 animate-fade-in">
            
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0B6E4F]/10 border border-[#0B6E4F]/30 flex items-center justify-center text-[#0B6E4F]">
                <Bot className="w-6 h-6 text-[#0B6E4F]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center space-x-1.5">
                  <span>Assistant IA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <span className="text-[10px] text-emerald-600 font-semibold">En ligne</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <strong className="text-slate-900 block mb-1">Bonjour !</strong>
              Je suis votre assistant touristique du Gabon. Comment puis-je vous aider ?
            </p>

            <button
              onClick={onAiClick}
              className="w-full py-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all text-center"
            >
              Poser une question
            </button>

          </div>

        </div>

      </section>

      {/* Floating Multi-Criteria Search Bar */}
      <div className="relative max-w-[1240px] mx-auto px-4 -mt-12 z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          
          {/* Field 1: Destination Select */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <MapPin className="w-5 h-5 text-[#0B6E4F] flex-shrink-0" />
            <div className="w-full">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-0.5">Où voulez-vous aller ?</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 dark:text-white bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="" className="text-slate-400">Toutes les destinations</option>
                <option value="estuaire">Estuaire (Libreville)</option>
                <option value="loango">Parc National de Loango</option>
                <option value="ivindo">Parc National d'Ivindo</option>
                <option value="lambaréné">Lambaréné & Moyen-Ogooué</option>
                <option value="nyanga">Nyanga & Mayumba</option>
                <option value="haut-ogooue">Haut-Ogooué (Lékoni)</option>
                <option value="woleu-ntem">Woleu-Ntem (Oyem)</option>
              </select>
            </div>
          </div>

          {/* Field 2: Arrivée Date Input */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <Calendar className="w-5 h-5 text-[#0B6E4F] flex-shrink-0" />
            <div className="w-full">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-0.5">Arrivée</label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 dark:text-white bg-transparent focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Field 3: Départ Date Input */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <Calendar className="w-5 h-5 text-[#0B6E4F] flex-shrink-0" />
            <div className="w-full">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-0.5">Départ</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 dark:text-white bg-transparent focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Field 4: Voyageurs Dropdown */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
            <Users className="w-5 h-5 text-[#0B6E4F] flex-shrink-0" />
            <div className="w-full">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-0.5">Voyageurs</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 dark:text-white bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="1 voyageur">1 voyageur</option>
                <option value="2 voyageurs">2 voyageurs</option>
                <option value="3 voyageurs">3 voyageurs</option>
                <option value="4 voyageurs">4 voyageurs</option>
                <option value="5+ voyageurs">5+ voyageurs (Groupe)</option>
              </select>
            </div>
          </div>

          {/* Field 5: Search Button */}
          <div className="px-2">
            <button
              onClick={() => onSearch && onSearch({ destination, arrivalDate, departureDate, travelers })}
              className="w-full py-3.5 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Rechercher</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
