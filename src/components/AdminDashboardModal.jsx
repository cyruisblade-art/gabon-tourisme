import React, { useState } from 'react';
import { ShieldCheck, BarChart3, Users, BedDouble, Trees, DollarSign, Settings, X, Search, CheckCircle2, AlertTriangle, Globe } from 'lucide-react';

export const AdminDashboardModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col h-[85vh] relative">
        
        {/* Admin Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
                <span>PORTAIL ADMINISTRATEUR TOURISME GABON</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">SuperAdmin</span>
              </h3>
              <p className="text-xs text-slate-400">Ministère du Tourisme & Ministère des Eaux et Forêts (ANPN)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-600/80 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top KPI Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6 bg-slate-900/60 border-b border-slate-800">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Visiteurs Annuels</span>
            <span className="text-2xl font-black text-emerald-400">145 800</span>
            <span className="text-[10px] text-emerald-400 block mt-1">+18.5% cette année</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Revenus Générés (XAF)</span>
            <span className="text-2xl font-black text-amber-300">2,85 Mrd</span>
            <span className="text-[10px] text-amber-300 block mt-1">Mobile Money & CB</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Réservations Actives</span>
            <span className="text-2xl font-black text-teal-300">1 240</span>
            <span className="text-[10px] text-teal-300 block mt-1">Parcs & Lodges</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Parcs Nationaux ANPN</span>
            <span className="text-2xl font-black text-indigo-300">13 Parcs</span>
            <span className="text-[10px] text-indigo-300 block mt-1">100% opérationnels</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/80 px-6">
          {[
            { id: 'overview', label: "Vue d'Ensemble & Stats", icon: BarChart3 },
            { id: 'bookings', label: 'Gestion Réservations (124)', icon: Users },
            { id: 'listings', label: 'Hôtels & Parcs', icon: Trees },
            { id: 'seo', label: 'Bannières & SEO', icon: Globe }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white mb-2">Dernières Réservations Confirmées en Temps Réel</h4>
              <div className="space-y-2">
                {[
                  { id: "GAB-9921", user: "Alexander Smith (UK)", item: "Safari Gorilles Loango", price: "450 000 XAF", status: "Payé (Airtel Money)" },
                  { id: "GAB-9922", user: "Marie-Thérèse DUPONT (FR)", item: "Radisson Blu Libreville", price: "195 000 XAF", status: "Payé (Carte Visa)" },
                  { id: "GAB-9923", user: "Hans MÜLLER (DE)", item: "Expédition Chutes Ivindo", price: "650 000 XAF", status: "Payé (PayPal)" }
                ].map((row) => (
                  <div key={row.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <div>
                      <span className="font-mono font-bold text-amber-400 mr-2">{row.id}</span>
                      <span className="font-extrabold text-white">{row.user}</span>
                      <span className="text-slate-400 block">{row.item}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 block">{row.price}</span>
                      <span className="text-[10px] text-slate-400">{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Rechercher par nom, email, n° de Pass..."
                  className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 w-72"
                />
                <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                  Exporter CSV / Excel
                </button>
              </div>
              <p className="text-xs text-slate-400">Tous les Pass touristiques sont vérifiés et validés par les agents d'accueil ANPN.</p>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm">Score de Performance SEO & Lighthouse</h4>
                <div className="flex space-x-4">
                  <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-extrabold">Lighthouse : 98/100</span>
                  <span className="px-3 py-1 rounded-lg bg-blue-950 text-blue-300 font-extrabold">Schema.org : Valide</span>
                  <span className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 font-extrabold">Sitemap.xml : Actif</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
