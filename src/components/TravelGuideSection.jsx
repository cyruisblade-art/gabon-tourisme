import React, { useState } from 'react';
import { TRAVEL_GUIDE_DATA } from '../data/guide';
import { BookOpen, ShieldCheck, Plane, Syringe, Banknote, Smartphone, CheckCircle2, ChevronRight, AlertTriangle, Phone } from 'lucide-react';

export const TravelGuideSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const guideItems = [
    {
      key: 'visa',
      icon: Plane,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      data: TRAVEL_GUIDE_DATA.visa
    },
    {
      key: 'vaccines',
      icon: Syringe,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      data: TRAVEL_GUIDE_DATA.vaccines
    },
    {
      key: 'currency',
      icon: Banknote,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      data: TRAVEL_GUIDE_DATA.currency
    },
    {
      key: 'transport',
      icon: Plane,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      data: TRAVEL_GUIDE_DATA.transport
    },
    {
      key: 'telecom',
      icon: Smartphone,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      data: TRAVEL_GUIDE_DATA.telecom
    },
    {
      key: 'safety',
      icon: ShieldCheck,
      color: 'text-[#0B6E4F]',
      bg: 'bg-emerald-500/10',
      data: TRAVEL_GUIDE_DATA.safety
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 font-sans">

      {/* Hero Banner */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[340px] flex items-center mb-10">
        <img
          src="/images/lope.jpg"
          alt="Guide Voyage Gabon"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.60]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-5">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block">Informations pratiques</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Outfit']">
            Guide du Voyageur au Gabon
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Toutes les informations essentielles pour organiser votre séjour en toute sérénité : e-Visa, santé, transports, monnaie XAF et télécoms.
          </p>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* GUIDE CARDS MAIN (9/12) */}
        <div className="lg:col-span-9 space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">Préparez votre voyage</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {guideItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 text-2xl`}>
                    {item.emoji}
                  </div>

                  <h3 className={`text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:${item.color} transition-colors`}>
                    {item.data.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    {item.data.summary}
                  </p>

                  <ul className="space-y-2">
                    {item.data.details.slice(0, 3).map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${item.color} flex-shrink-0 mt-0.5`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {activeCard === idx && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      {item.data.details.slice(3).map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300 list-none">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${item.color} flex-shrink-0 mt-0.5`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </div>
                  )}

                  <button className={`mt-4 text-xs font-bold ${item.color} flex items-center space-x-0.5 hover:underline`}>
                    <span>{activeCard === idx ? 'Voir moins' : 'En savoir plus'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Avertissement Santé */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 p-5 rounded-3xl flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-amber-800 dark:text-amber-300 mb-1">Important : Vaccinations Obligatoires</h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                Le vaccin contre la <strong>Fièvre Jaune</strong> est obligatoire pour entrer au Gabon. Présentez votre carnet de santé international à votre arrivée à l'Aéroport International Léon-Mba de Libreville.
                La prophylaxie antipaludéenne est fortement recommandée pour toute la durée du séjour.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (3/12) */}
        <div className="lg:col-span-3 space-y-6">

          {/* Urgences & Contacts */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-500" /><span>Contacts Urgence</span>
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { label: 'Police / Gendarmerie', num: '177', color: 'bg-blue-500' },
                { label: 'SAMU / Urgences Médicales', num: '1300', color: 'bg-red-500' },
                { label: 'Pompiers Libreville', num: '18', color: 'bg-orange-500' },
                { label: 'Ambassade France à Libreville', num: '+241 01 79 81 00', color: 'bg-slate-700' },
                { label: 'ANPN (Parcs Nationaux)', num: '+241 01 44 25 00', color: 'bg-[#0B6E4F]' },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">{c.label}</span>
                  <span className={`${c.color} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg`}>{c.num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ambassades */}
          <div className="bg-[#053828] p-5 rounded-3xl text-white space-y-4 shadow-lg">
            <h3 className="text-sm font-extrabold text-white border-b border-emerald-800 pb-2">Obtenir votre e-Visa</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Faites votre demande de visa électronique en ligne via le portail officiel de la DGDI (Direction Générale de la Documentation et de l'Immigration).
            </p>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li className="flex items-start space-x-2"><span className="text-emerald-400">✓</span><span>Délai de traitement : 72h ouvrées</span></li>
              <li className="flex items-start space-x-2"><span className="text-emerald-400">✓</span><span>Visa touristique 30 ou 90 jours</span></li>
              <li className="flex items-start space-x-2"><span className="text-emerald-400">✓</span><span>Paiement en ligne sécurisé</span></li>
            </ul>
            <a
              href="https://www.dgdi.ga"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-white text-[#053828] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-1 block text-center"
            >
              <span>Faire ma demande de visa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Météo Synopsis */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Meilleures périodes pour voyager</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <span className="font-extrabold text-[#0B6E4F]">Juin — Septembre</span>
                <span className="text-[10px] text-[#0B6E4F] font-bold">Saison idéale</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Décembre — Janvier</span>
                <span className="text-[10px] text-slate-500">Bonne période</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Mars — Mai</span>
                <span className="text-[10px] text-slate-500">Saison des pluies</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
