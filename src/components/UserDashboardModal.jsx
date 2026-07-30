import React, { useState } from 'react';
import { User, Ticket, Heart, CreditCard, Bell, X, ShieldCheck, QrCode, Star, CheckCircle2 } from 'lucide-react';

export const UserDashboardModal = ({ isOpen, onClose, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState('bookings');

  if (!isOpen) return null;

  const sampleBookings = [
    {
      id: "GAB-2026-8942",
      title: "Parc National de Loango - Safari Gorilles & Plage",
      date: "15-18 Août 2026",
      status: "Confirmé",
      amount: "450 000 XAF",
      travelers: 2
    },
    {
      id: "GAB-2026-3109",
      title: "Radisson Blu Hotel Libreville (Vue Mer)",
      date: "14 Août 2026",
      status: "Confirmé",
      amount: "195 000 XAF",
      travelers: 2
    }
  ];

  const sampleFavorites = [
    { name: "Parc National d'Ivindo (Chutes Koungou)", type: "Parc UNESCO", rating: 4.9 },
    { name: "Loango Safari Lodge & Spa", type: "Lodge de Luxe", rating: 4.9 },
    { name: "Observation des Baleines à Bosse", type: "Excursion Marine", rating: 4.8 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 text-white w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh] relative">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#053828] via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B6E4F] text-white flex items-center justify-center font-black text-xl shadow-lg border border-emerald-400/40">
              JM
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white font-['Outfit']">Jean-Marc ONDO</h3>
              <p className="text-xs text-amber-300 font-bold">Membre Explorer VIP Gabon • Pass n° 2026-8942</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High Contrast Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
          {[
            { id: 'bookings', label: 'Mes Réservations & Passes', icon: Ticket },
            { id: 'favorites', label: 'Mes Favoris', icon: Heart },
            { id: 'payments', label: 'Historique Paiements', icon: CreditCard }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all ${
                  isActive
                    ? 'border-[#0B6E4F] text-emerald-400 bg-emerald-950/30'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900">
          
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {sampleBookings.map((b) => (
                <div key={b.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-extrabold text-amber-400 block">Pass n° {b.id}</span>
                    <h4 className="text-sm font-extrabold text-white">{b.title}</h4>
                    <p className="text-xs text-slate-300">Date : {b.date} • {b.travelers} Voyageur(s)</p>
                  </div>

                  <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/40">
                      {b.status}
                    </span>
                    <span className="text-sm font-extrabold text-white">{b.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleFavorites.map((fav, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase block">{fav.type}</span>
                    <h4 className="text-xs font-bold text-white">{fav.name}</h4>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{fav.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-sm">
              <span className="text-xs font-extrabold text-slate-200 block">Dernières Transactions Mobile Money & Carte</span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-2.5 border-b border-slate-800">
                  <span>14/08/2026 - Airtel Money Gabon</span>
                  <span className="text-emerald-400 font-bold">- 450 000 XAF</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-800">
                  <span>10/08/2026 - Visa **** 8941</span>
                  <span className="text-emerald-400 font-bold">- 195 000 XAF</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
