import React, { useState } from 'react';
import { CULTURE_DATA } from '../data/culture';
import { BookOpen, ChevronRight, Search } from 'lucide-react';

export const CultureSection = () => {
  const [activeTab, setActiveTab] = useState('ethnicities');

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 font-sans">

      {/* Hero Banner */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[340px] flex items-center mb-10">
        <img
          src="/images/culture.jpg"
          alt="Culture Gabon"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.60]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-5">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">Patrimoine Vivant & Traditions</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Outfit']">
            Culture & Art du Gabon
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Découvrez la diversité spirituelle des 50 ethnies gabonaises, le génie de la sculpture sacrée et la richesse de la gastronomie locale.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-2">
          {[
            { id: 'ethnicities', label: 'Ethnies Ancestrales', icon: '' },
            { id: 'gastronomy', label: 'Gastronomie & Nyembwe', icon: '' },
            { id: 'artAndMasks', label: 'Masques & Art Sacré', icon: '' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2 Column Layout: Main + Sidebar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* MAIN CONTENT (9/12) */}
        <div className="lg:col-span-9 space-y-6">

          {/* Ethnicities */}
          {activeTab === 'ethnicities' && (
            <>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">Les grandes ethnies du Gabon</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {CULTURE_DATA.ethnicities.map((eth, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 transition-colors">{eth.name}</h3>
                    <span className="text-xs text-amber-600 font-semibold block mb-3">Région : {eth.region}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{eth.detail}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gastronomy */}
          {activeTab === 'gastronomy' && (
            <>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">Saveurs & Spécialités Gabonaises</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {CULTURE_DATA.gastronomy.map((dish, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group">
                    <div className="h-52 relative overflow-hidden">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[9px] font-black uppercase">{dish.type}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">{dish.name}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Art & Masks */}
          {activeTab === 'artAndMasks' && (
            <>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">Art Sacré & Masques Rituels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {CULTURE_DATA.artAndMasks.map((art, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#0B6E4F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-[#0B6E4F] transition-colors">{art.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{art.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

        {/* RIGHT SIDEBAR (3/12) */}
        <div className="lg:col-span-3 space-y-6">

          {/* Gabon en Chiffres */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Le Gabon en Chiffres</h3>
            <div className="space-y-3 text-xs">
              {[
                { label: 'Population', value: '2,4 millions d\'habitants' },
                { label: 'Langues parlées', value: '40+ dialectes locaux' },
                { label: 'Ethnies', value: '+50 groupes ethniques' },
                { label: 'Instruments sacrés', value: 'Ngombi, Mvett, Balafon' },
                { label: 'Rituels traditionnels', value: 'Bwiti, Mwiri, Okuyi' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white block text-[11px]">{item.label}</span>
                    <span className="text-[10px] text-slate-500">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Musées à Visiter */}
          <div className="bg-[#053828] p-5 rounded-3xl text-white space-y-4 shadow-lg">
            <h3 className="text-sm font-extrabold text-white border-b border-emerald-800 pb-2">Musées & Centres Culturels</h3>
            <ul className="space-y-3 text-xs text-emerald-100">
              {[
                'Musée National des Arts & Traditions du Gabon — Libreville',
                'Centre Culturel Français (CCF) — Libreville',
                'Village des Arts de Libreville',
                'Institut National des Arts — Libreville',
                'Centre Culturel de Ntoum',
              ].map((m, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-extrabold leading-none mt-0.5">—</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
