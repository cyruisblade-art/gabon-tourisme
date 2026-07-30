import React, { useState } from 'react';
import { ACCOMMODATIONS_DATA } from '../data/accommodations';
import { BedDouble, Star, MapPin, Wifi, Waves, ChevronRight, SlidersHorizontal, Search } from 'lucide-react';

export const AccommodationsSection = ({ onBookAccommodation }) => {
  const [filterType, setFilterType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [searchTerm, setSearchTerm] = useState('');

  const filterTabs = [
    { id: 'all', label: 'Tous', icon: '' },
    { id: 'lodges', label: 'Lodges Safari', icon: '' },
    { id: 'hôtels', label: 'Hôtels & Resorts', icon: '' },
    { id: 'villas', label: "Villas d'Exception", icon: '' },
    { id: 'campements', label: 'Campements', icon: '' },
    { id: 'auberges', label: 'Auberges', icon: '' },
  ];

  const filtered = ACCOMMODATIONS_DATA.filter(item => {
    const matchType = filterType === 'all' || item.type === filterType;
    const matchPrice = item.pricePerNight <= maxPrice;
    const matchSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchPrice && matchSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 font-sans">

      {/* Hero Banner */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[340px] flex items-center mb-10">
        <img
          src="/images/accommodations.jpg"
          alt="Hébergements Gabon"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-5">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block">Hôtels & Lodges de Luxe</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Outfit']">
            Où Séjourner au Gabon
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Du palace 5 étoiles sur le Bord de Mer de Libreville aux camps d'écotourisme d'exception au cœur de Loango et d'Ivindo.
          </p>
          <div className="max-w-xl flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border border-slate-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un hôtel, un lodge, une destination..."
              className="flex-1 px-4 py-2.5 text-xs font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            <button className="p-3 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white transition-all shadow-md">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT FILTERS */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0B6E4F]" />
                <span>Filtres</span>
              </h3>
              <button onClick={() => { setFilterType('all'); setMaxPrice(300000); setSearchTerm(''); }} className="text-[11px] font-bold text-[#0B6E4F] hover:underline">Réinitialiser</button>
            </div>

            {/* Type */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Type d'hébergement</label>
              <div className="space-y-2">
                {filterTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterType(tab.id)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-left transition-all ${
                      filterType === tab.id
                        ? 'bg-[#0B6E4F] text-white font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Budget max / nuit</label>
              <input
                type="range"
                min="50000"
                max="300000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0B6E4F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>50 000 XAF</span>
                <span className="font-extrabold text-[#0B6E4F]">{maxPrice.toLocaleString()} XAF</span>
              </div>
            </div>

            {/* Équipements */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Équipements</label>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                {['Piscine', 'Wi-Fi Starlink', 'Spa & Bien-être', 'Restaurant gastronomique', 'Plage privée', 'Safari proposé', 'Transfert aéroport'].map(eq => (
                  <label key={eq} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-[#0B6E4F]" />
                    <span>{eq}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all">
              Appliquer les filtres
            </button>
          </div>
        </div>

        {/* MIDDLE GRID */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Hébergements disponibles
            </h2>
            <span className="text-xs font-bold text-slate-500">{filtered.length} hébergements</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-amber-400 font-extrabold text-[10px] flex items-center space-x-1 border border-amber-400/30">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B6E4F]/90 text-white text-[10px] font-bold">{item.category}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] text-amber-300 font-medium flex items-center space-x-1 mb-0.5">
                      <MapPin className="w-3 h-3" /><span>{item.location}</span>
                    </span>
                    <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">À partir de</span>
                      <span className="text-base font-extrabold text-[#0B6E4F]">
                        {item.pricePerNight.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">XAF/nuit</span>
                      </span>
                    </div>
                    <button
                      onClick={() => onBookAccommodation(item)}
                      className="px-4 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white text-xs font-bold transition-all flex items-center space-x-1 shadow-md"
                    >
                      <span>Réserver</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Voir tous les hébergements
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-3 space-y-6">
          {/* Featured Hotel */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Hébergement en vedette</h3>
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <img src="/images/libreville.jpg" alt="Radisson Blu" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-sm font-extrabold text-white">Radisson Blu Libreville</h4>
                <div className="flex items-center space-x-1 text-amber-400 text-[10px]">
                  <Star className="w-3 h-3 fill-amber-400" /><span>5.0 • Hôtel 5 étoiles</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Le meilleur hôtel 5 étoiles de Libreville avec vue panoramique sur l'Atlantique, spa, piscine et restaurants gastronomiques.
            </p>
            <button
              onClick={() => onBookAccommodation({ name: 'Radisson Blu Libreville', price: 95000 })}
              className="w-full py-2.5 rounded-xl bg-[#0B6E4F] text-white font-bold text-xs shadow-md hover:bg-[#08543c] transition-all"
            >
              Réserver ce Séjour
            </button>
          </div>

          {/* Pourquoi Nous Choisir */}
          <div className="bg-[#053828] p-5 rounded-3xl text-white space-y-4 shadow-lg">
            <h3 className="text-sm font-extrabold text-white border-b border-emerald-800 pb-2">Pourquoi réserver avec nous ?</h3>
            <ul className="space-y-2.5 text-xs text-emerald-100">
              {[
                'Meilleurs prix garantis, sans frais cachés',
                'Paiement sécurisé par Mobile Money & CB',
                'Confirmation instantanée par email & SMS',
                'Annulation flexible jusqu\'à 48h avant',
                'Support 24h/24, 7j/7 en français',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-extrabold text-base leading-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Offres exclusives</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Abonnez-vous pour recevoir les meilleures promotions sur les hôtels et lodges du Gabon.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Votre e-mail..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-[#0B6E4F]"
              />
              <button className="w-full py-2.5 rounded-xl bg-[#0B6E4F] text-white font-bold text-xs shadow-md hover:bg-[#08543c] transition-all">
                Je m'abonne
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
