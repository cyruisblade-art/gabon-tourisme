import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/events';
import { Calendar, MapPin, Tag, ChevronRight, Search, Clock, Users, ArrowRight } from 'lucide-react';

export const EventsSection = ({ onBookEvent }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'Tous les Événements' },
    { id: 'Culture', label: 'Culture & Musique' },
    { id: 'Sport', label: 'Sports & Compétitions' },
    { id: 'Gastronomie', label: 'Gastronomie' },
    { id: 'Nature', label: 'Éco-tourisme' },
    { id: 'Officiel', label: 'Fêtes Nationales' },
  ];

  const filtered = EVENTS_DATA.filter(evt => {
    const matchCat = activeCategory === 'all' || evt.category === activeCategory;
    const matchSearch = !searchTerm || evt.title.toLowerCase().includes(searchTerm.toLowerCase()) || evt.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 font-sans">

      {/* Hero Banner */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[340px] flex items-center mb-10">
        <img
          src="/images/events.jpg"
          alt="Events Gabon"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.60]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-5">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">Agenda & Festivités</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Outfit']">
            Événements au Gabon
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Découvrez le calendrier des grands festivals culturels, marathons internationaux et célébrations nationales.
          </p>
          <div className="max-w-xl flex items-center bg-white rounded-2xl p-1.5 shadow-2xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un événement, un lieu, une date..."
              className="flex-1 px-4 py-2.5 text-xs font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            <button className="p-3 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white transition-all shadow-md">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 columns: Main + Sidebar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* MAIN GRID (9/12) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {filtered.length} événement{filtered.length > 1 ? 's' : ''} à venir
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((evt) => (
              <div
                key={evt.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[9px] font-black uppercase">{evt.category}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] text-amber-300 font-bold flex items-center space-x-1 mb-0.5">
                      <Calendar className="w-3 h-3" /><span>{evt.date}</span>
                    </span>
                    <h3 className="text-sm font-extrabold text-white leading-snug">{evt.title}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{evt.description}</p>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-[#0B6E4F] font-semibold flex items-center space-x-1">
                      <MapPin className="w-3 h-3" /><span>{evt.location}</span>
                    </span>
                    <button
                      onClick={() => onBookEvent(evt)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-bold transition-all flex items-center space-x-0.5"
                    >
                      <span>Pass Événement</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Voir tout le calendrier des événements
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR (3/12) */}
        <div className="lg:col-span-3 space-y-6">

          {/* Featured Event */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Événement phare 2026</h3>
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <img src="/images/culture.jpg" alt="FESPAM" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-sm font-extrabold text-white">Festival des Cultures du Gabon</h4>
                <p className="text-[10px] text-amber-300">15 — 22 Août 2026 • Libreville</p>
              </div>
            </div>
            <button onClick={() => onBookEvent({ title: 'Festival des Cultures du Gabon', price: 25000 })} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all">
              Réserver mon Pass
            </button>
          </div>

          {/* Prochains Événements Liste */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Prochains événements</h3>
            <div className="space-y-3">
              {[
                { month: 'AUG', day: '15', title: 'Festival des Cultures', loc: 'Libreville', color: 'bg-amber-500' },
                { month: 'SEP', day: '01', title: 'Fête de la Nature & ANPN', loc: 'Loango', color: 'bg-[#0B6E4F]' },
                { month: 'NOV', day: '28', title: 'Fête Nationale du Gabon', loc: 'Tout le Gabon', color: 'bg-blue-500' },
                { month: 'DEC', day: '10', title: 'Marathon International', loc: 'Libreville', color: 'bg-purple-500' },
              ].map((ev, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors cursor-pointer">
                  <div className={`${ev.color} text-white text-center rounded-xl w-12 h-12 flex flex-col items-center justify-center flex-shrink-0`}>
                    <span className="text-[9px] font-bold uppercase leading-none">{ev.month}</span>
                    <span className="text-lg font-extrabold leading-none">{ev.day}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{ev.title}</h4>
                    <p className="text-[10px] text-slate-500 flex items-center space-x-0.5">
                      <MapPin className="w-2.5 h-2.5" /><span>{ev.loc}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
