import React, { useState } from 'react';
import { PROVINCES_DATA } from '../data/provinces';
import { MapPin, ArrowRight, ChevronRight, CalendarCheck, ShieldCheck, Award, Headset, X, CheckCircle2, Hotel } from 'lucide-react';

export const ProvincesSection = ({ onSelectProvinceForBooking }) => {
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Popular destination cards to match the target screenshot exactly
  const popularCards = [
    {
      id: "estuaire",
      name: "Estuaire",
      subtitle: "Libreville et ses environs",
      image: "/images/market_ai.png"
    },
    {
      id: "ogooue-maritime",
      name: "Ogooué-Maritime",
      subtitle: "Plages et océans",
      image: "/images/beach_couple_ai.png"
    },
    {
      id: "woleu-ntem",
      name: "Woleu-Ntem",
      subtitle: "Forêts et rivières",
      image: "/images/guide_ai.png"
    },
    {
      id: "nyanga",
      name: "Nyanga",
      subtitle: "Nature et montagnes",
      image: "/images/nyanga_mountains.png"
    },
    {
      id: "moyen-ogooue",
      name: "Moyen-Ogooué",
      subtitle: "Terre des gorilles",
      image: "/images/moyen_ogooue_gorilla.png"
    }
  ];

  return (
    <section className="py-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Section Header */}
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-[#0B6E4F] dark:text-emerald-400 block mb-1">
          DESTINATIONS POPULAIRES
        </span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Explorez les merveilles du Gabon
          </h2>
          <button className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#0B6E4F] flex items-center space-x-1">
            <span>Voir toutes les destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of 5 Popular Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {popularCards.map((card) => {
          const fullData = PROVINCES_DATA.find(p => p.id === card.id) || PROVINCES_DATA[0];
          return (
            <div
              key={card.id}
              onClick={() => setSelectedProvince(fullData)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white leading-tight">{card.name}</h3>
                  <span className="text-xs text-slate-300 font-medium block">{card.subtitle}</span>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#0B6E4F] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark Green Trust Banner */}
      <div className="bg-[#053828] rounded-3xl p-6 sm:p-8 text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center shadow-xl">
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
            <CalendarCheck className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Réservation facile</h4>
            <p className="text-xs text-emerald-200">Réservez en quelques clics</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Paiement sécurisé</h4>
            <p className="text-xs text-emerald-200">Transactions 100% sécurisées</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
            <Award className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Meilleurs prix garantis</h4>
            <p className="text-xs text-emerald-200">Aucun frais caché</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
            <Headset className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Support 24/7</h4>
            <p className="text-xs text-emerald-200">Nous sommes là pour vous</p>
          </div>
        </div>

      </div>

      {/* Modal View for Province */}
      {selectedProvince && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="relative h-64">
              <img src={selectedProvince.image} alt={selectedProvince.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setSelectedProvince(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-3xl font-extrabold">{selectedProvince.name}</h2>
                <p className="text-xs text-amber-300 font-semibold">Chef-Lieu : {selectedProvince.capital} | Population : {selectedProvince.population}</p>
              </div>
            </div>
            <div className="p-6 space-y-4 text-slate-200 overflow-y-auto text-xs">
              <p className="leading-relaxed">{selectedProvince.history}</p>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-2">Attractions Majeures :</span>
                <ul className="space-y-1">
                  {selectedProvince.attractions.map((a, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    const p = selectedProvince;
                    setSelectedProvince(null);
                    if (onSelectProvinceForBooking) onSelectProvinceForBooking(p);
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#0B6E4F] text-white font-bold hover:brightness-110"
                >
                  Réserver un Séjour en {selectedProvince.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
