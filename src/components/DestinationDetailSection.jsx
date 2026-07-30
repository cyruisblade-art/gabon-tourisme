import React, { useState } from 'react';
import { PROVINCES_DATA } from '../data/provinces';
import { ACCOMMODATIONS_DATA } from '../data/accommodations';
import { 
  MapPin, Users, Maximize2, Sun, Cloud, ChevronRight, CheckCircle2, 
  ExternalLink, Compass, Hotel, Camera, Layers, Globe, DollarSign, 
  Clock, Zap, Phone, Calendar, ArrowRight, Star, Utensils, Mountain, Palmtree
} from 'lucide-react';

export const DestinationDetailSection = ({ 
  provinceId = 'estuaire', 
  onSelectProvince, 
  onBookExperience,
  onOpenMap 
}) => {
  const [activeSubTab, setActiveSubTab] = useState('apercu');

  // Find currently selected province or fallback to Estuaire
  const currentProvince = PROVINCES_DATA.find(p => p.id === provinceId) || PROVINCES_DATA[0];

  // Helper to handle province switching
  const handleProvinceChange = (id) => {
    if (onSelectProvince) {
      onSelectProvince(id);
    }
  };

  // Find accommodations matching current province, or generate fallback list from province hotels
  const provinceAccommodations = ACCOMMODATIONS_DATA.filter(
    acc => acc.province.toLowerCase() === currentProvince.name.toLowerCase()
  );

  const displayHotels = provinceAccommodations.length > 0
    ? provinceAccommodations.map(acc => ({
        id: acc.id,
        name: acc.name,
        rating: acc.rating ? acc.rating.toString() : "4.8",
        stars: `Hôtel ${acc.stars || 4} étoiles`,
        price: `${acc.pricePerNight.toLocaleString()} XAF`,
        image: acc.image
      }))
    : currentProvince.hotels.map((hotelName, index) => ({
        id: `hotel-${index}`,
        name: hotelName,
        rating: (4.5 + (index * 0.1)).toFixed(1),
        stars: index === 0 ? "Hôtel 5 étoiles" : "Hôtel 4 étoiles",
        price: `${(60000 + index * 15000).toLocaleString()} XAF`,
        image: currentProvince.image
      }));

  // Province sub-header descriptions dictionary
  const provinceSubtitles = {
    'estuaire': "Le cœur vibrant du Gabon",
    'haut-ogooue': "Les spectaculaires plateaux et lianes de Poubara",
    'moyen-ogooue': "La terre des gorilles et des grands lacs de l'Ogooué",
    'ngounie': "Berceau du Bwiti, du Lac Bleu et des traditions Punu",
    'nyanga': "Les montagnes luxuriantes et le sanctuaire des tortues luths",
    'ogooue-ivindo': "La forêt équatoriale sauvage et les chutes de Koungou",
    'ogooue-lolo': "Les monts sacrés Iboundji et les grottes de Lastoursville",
    'ogooue-maritime': "Les plages sauvages de Loango et l'océan Atlantique",
    'woleu-ntem': "Le grand Nord forestier, la culture Fang et le Mvet"
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-20 font-sans">
      
      {/* 1. TOP PROVINCE SELECTOR BAR (Allow choosing any of the 9 provinces) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[64px] z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B6E4F] dark:text-emerald-400 flex-shrink-0 flex items-center space-x-1.5">
              <Compass className="w-4 h-4" />
              <span>Provinces du Gabon :</span>
            </span>

            {/* Province Buttons Horizontal Scroll */}
            <div className="flex items-center space-x-2 flex-nowrap min-w-max">
              {PROVINCES_DATA.map((prov) => {
                const isActive = prov.id === currentProvince.id;
                return (
                  <button
                    key={prov.id}
                    onClick={() => handleProvinceChange(prov.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0B6E4F] text-white shadow-md scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span>{prov.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
          <span className="hover:text-slate-600 cursor-pointer">Accueil</span>
          <span>›</span>
          <span className="hover:text-slate-600 cursor-pointer">Destinations</span>
          <span>›</span>
          <span className="text-emerald-500 font-bold">{currentProvince.name}</span>
        </div>
      </div>

      {/* Hero Banner Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="relative rounded-3xl overflow-hidden min-h-[440px] flex items-end p-6 sm:p-10 shadow-xl bg-slate-950">
          
          {/* Background Image */}
          <img
            key={currentProvince.id}
            src={currentProvince.image}
            alt={currentProvince.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-transparent to-slate-950/85" />

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-end justify-between gap-8">
            
            {/* Left Content */}
            <div className="max-w-2xl text-white space-y-3">
              
              <div className="inline-block px-3 py-1 rounded-md bg-[#0B6E4F] text-white text-[10px] font-black tracking-widest uppercase shadow-sm">
                DESTINATION • PROVINCE DU GABON
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none font-['Outfit']">
                  {currentProvince.name}
                </h1>
                <p className="text-amber-300 italic text-base sm:text-lg font-serif mt-1">
                  {provinceSubtitles[currentProvince.id] || `Découvrez les trésors de ${currentProvince.name}`}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                {currentProvince.history}
              </p>

              {/* 3 Spec Pills */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <div className="flex items-center space-x-2 text-xs bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-[#0B6E4F] flex items-center justify-center text-white">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block leading-none">Population</span>
                    <span className="font-extrabold text-white">{currentProvince.population}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-slate-950">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block leading-none">Chef-Lieu</span>
                    <span className="font-extrabold text-white">{currentProvince.capital}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block leading-none">Superficie</span>
                    <span className="font-extrabold text-white">{currentProvince.surface}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Weather Card Overlay */}
            <div className="w-full sm:w-[280px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 rounded-2xl shadow-2xl space-y-3 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center space-x-3">
                  <Sun className="w-8 h-8 text-amber-500" />
                  <div>
                    <span className="text-2xl font-black block leading-none">27°C</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{currentProvince.climate}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300">
                  <span>Min : 22°C</span>
                  <span>Max : 30°C</span>
                </div>
                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block font-medium">Meilleure période</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Juin - Septembre</span>
                </div>
              </div>

              <button
                onClick={() => onBookExperience({ name: `Séjour & Découverte ${currentProvince.name}`, price: 75000 })}
                className="w-full py-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all text-center"
              >
                Réserver un séjour en {currentProvince.name}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Filter Tabs Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-2 items-center">
          {[
            { id: 'apercu', label: 'Aperçu' },
            { id: 'attractions', label: 'Sites incontournables' },
            { id: 'activites', label: 'Activités' },
            { id: 'hebergements', label: 'Hébergements' },
            { id: 'restaurants', label: 'Gastronomie' },
            { id: 'pratiques', label: 'Infos pratiques' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeSubTab === tab.id
                  ? 'bg-[#0B6E4F] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2 Columns Body Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT MAIN COLUMN (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* À propos de la Province */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#0B6E4F]" />
              <span>À propos de la province de {currentProvince.name}</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{currentProvince.history}</p>
              <p>
                Avec sa capitale administrative à <strong className="text-slate-900 dark:text-white">{currentProvince.capital}</strong>, 
                la province s'étend sur <strong className="text-slate-900 dark:text-white">{currentProvince.surface}</strong> et abrite environ <strong className="text-slate-900 dark:text-white">{currentProvince.population}</strong>. 
                Son climat est de type <strong className="text-slate-900 dark:text-white">{currentProvince.climate}</strong>.
              </p>
            </div>

            {/* 4 Feature Icon Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#0B6E4F] flex items-center justify-center mx-auto">
                  <Palmtree className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Nature Sauvage</h4>
                <p className="text-[10px] text-slate-500">Parcs et biodiversité d'exception</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Sites Incontournables</h4>
                <p className="text-[10px] text-slate-500">{currentProvince.attractions.length} attractions majeures</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto">
                  <Mountain className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Paysages & Relieffs</h4>
                <p className="text-[10px] text-slate-500">Forêts, fleuves et montagnes</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Culture & Spécialités</h4>
                <p className="text-[10px] text-slate-500">{currentProvince.restaurants ? currentProvince.restaurants.length : 3} adresses gourmandes</p>
              </div>
            </div>

          </div>

          {/* Sites Incontournables & Activités Recommandées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sites Incontournables Dynamic */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#0B6E4F]" />
                  <span>Attractions majeures ({currentProvince.name})</span>
                </h3>
                <div className="space-y-3">
                  {currentProvince.attractions.map((attraction, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#0B6E4F] transition-all group cursor-pointer"
                      onClick={() => onBookExperience({ name: attraction, price: 35000 })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#0B6E4F] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0B6E4F]">
                            {attraction}
                          </h4>
                          <p className="text-[10px] text-slate-500">Site remarquable à visiter en {currentProvince.name}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onBookExperience({ name: `Circuit Attractions ${currentProvince.name}`, price: 65000 })}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-4"
              >
                Réserver un guidage pour ces sites
              </button>
            </div>

            {/* Activités suggérées */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Activités populaires</span>
                </h3>
                <div className="space-y-3">
                  {currentProvince.activities.map((act, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-[#0B6E4F] text-white text-[9px] font-black uppercase">
                          Expérience #{idx + 1}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Disponible</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{act}</h4>
                      <p className="text-[10px] text-slate-500">Activité encadrée avec guides locaux passionnés.</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onBookExperience({ name: `Pack Activités ${currentProvince.name}`, price: 85000 })}
                className="w-full py-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white text-xs font-bold transition-colors mt-4"
              >
                Réserver une activité
              </button>
            </div>

          </div>

          {/* Hébergements recommandés en la Province */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <Hotel className="w-5 h-5 text-[#0B6E4F]" />
                <span>Hébergements en {currentProvince.name}</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {displayHotels.length} établissement(s) disponible(s)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {displayHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => onBookExperience({ name: hotel.name, price: hotel.price })}
                  className="group bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-32 relative overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-[#0B6E4F] transition-colors leading-snug">
                        {hotel.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-amber-400 text-[10px] font-bold mt-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{hotel.stars} • {hotel.rating}/5</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-slate-400 block">Tarif indicatif</span>
                        <span className="text-xs font-extrabold text-[#0B6E4F]">{hotel.price}</span>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-[#0B6E4F] text-white text-[10px] font-bold hover:brightness-110">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurants & Gastronomie locale */}
          {currentProvince.restaurants && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-amber-500" />
                <span>Où manger & Gastronomie en {currentProvince.name}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentProvince.restaurants.map((resto, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Table #{idx + 1}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{resto}</h4>
                    <p className="text-[10px] text-slate-500">Spécialités culinaires locales et plats traditionnels.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR COLUMN (1/3) */}
        <div className="space-y-6">
          
          {/* Carte interactive */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Carte & Localisation</h3>
              <p className="text-[11px] text-slate-500">{currentProvince.name} (Coordonnées: {currentProvince.coords[0]}, {currentProvince.coords[1]})</p>
            </div>

            <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src={currentProvince.image}
                alt={`Map Preview ${currentProvince.name}`}
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-emerald-950/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={onOpenMap}
                  className="px-4 py-2 rounded-xl bg-white text-[#0B6E4F] font-bold text-xs shadow-lg flex items-center space-x-1.5 hover:scale-105 transition-transform"
                >
                  <span>Voir sur la carte interactive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5">
              Informations pratiques ({currentProvince.name})
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Chef-lieu</span>
                  <span className="text-[11px] text-slate-500">{currentProvince.capital}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-4 h-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Population</span>
                  <span className="text-[11px] text-slate-500">{currentProvince.population}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-4 h-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Langue & Culture</span>
                  <span className="text-[11px] text-slate-500">Français & langues locales</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <DollarSign className="w-4 h-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Monnaie</span>
                  <span className="text-[11px] text-slate-500">Franc CFA (XAF)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Fuseau horaire</span>
                  <span className="text-[11px] text-slate-500">GMT+1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner d'action pour la province */}
          <div className="relative rounded-3xl overflow-hidden p-6 text-white space-y-3 shadow-xl bg-slate-950">
            <img
              src={currentProvince.image}
              alt={`Découvrir ${currentProvince.name}`}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
            />
            <div className="relative z-10 space-y-3">
              <h4 className="text-lg font-extrabold leading-snug">
                Prêt à découvrir {currentProvince.name} ?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Réservez votre séjour, vos hébergements et vos excursions personnalisées dès aujourd'hui !
              </p>
              <button
                onClick={() => onBookExperience({ name: `Pass Expérience ${currentProvince.name}`, price: 95000 })}
                className="w-full py-3 rounded-2xl bg-white text-[#0B6E4F] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Réserver mon séjour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
