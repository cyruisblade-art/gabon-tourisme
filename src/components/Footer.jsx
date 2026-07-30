import React from 'react';
import { Compass, Mail, ShieldCheck, Award, MapPin, Phone } from 'lucide-react';

export const Footer = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand & About */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/1.png" alt="Gabon Tourisme" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            La plateforme numérique officielle du Tourisme en République Gabonaise. Faites l'expérience du dernier paradis naturel d'Afrique.
          </p>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Site Officiel Sous Tutelle de l'ANPN</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onSelectTab('destinations')} className="hover:text-emerald-400">Les 9 Provinces</button></li>
            <li><button onClick={() => onSelectTab('parks')} className="hover:text-emerald-400">13 Parcs Nationaux (UNESCO)</button></li>
            <li><button onClick={() => onSelectTab('accommodations')} className="hover:text-emerald-400">Hôtels & Safari Lodges</button></li>
            <li><button onClick={() => onSelectTab('activities')} className="hover:text-emerald-400">Safaris Gorilles & Baleines</button></li>
            <li><button onClick={() => onSelectTab('culture')} className="hover:text-emerald-400">Culture & Gastronomie Nyembwe</button></li>
          </ul>
        </div>

        {/* Traveler Practical */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Guide & Formalités</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onSelectTab('guide')} className="hover:text-amber-400">e-Visa Gabon (DGDI)</button></li>
            <li><button onClick={() => onSelectTab('guide')} className="hover:text-amber-400">Vaccin Fièvre Jaune Obligatoire</button></li>
            <li><button onClick={() => onSelectTab('guide')} className="hover:text-amber-400">Vol Afrijet & Transgabonais</button></li>
            <li><button onClick={() => onSelectTab('map')} className="hover:text-amber-400">Carte Interactive HD</button></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lettre d'Information</h4>
          <p className="text-xs text-slate-400">Abonnez-vous aux actualités du tourisme, safaris et festivals du Gabon.</p>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Votre e-mail..."
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs border border-slate-800 focus:outline-none focus:border-emerald-500 w-full"
            />
            <button className="px-4 py-2.5 rounded-xl bg-gradient-forest text-white font-bold text-xs hover:brightness-110">
              OK
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Visit Gabon — République Gabonaise. Tous droits réservés.</p>
        <div className="flex space-x-6">
          <span>Mentions Légales</span>
          <span>Politique de Confidentialité</span>
          <span>Accessibilité WCAG 2.1</span>
        </div>
      </div>
    </footer>
  );
};
