import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, X, Calendar, User, CreditCard, ShieldCheck, CheckCircle2, QrCode, Download, Printer, ChevronDown } from 'lucide-react';

const AVAILABLE_PASSES = [
  { name: "Pass Global Gabon Explorer", price: 50000, desc: "Accès multi-sites et réduction transports" },
  { name: "Pass Séjour Gabon VIP", price: 120000, desc: "Service concierge & hébergements haut de gamme" },
  { name: "Pass Découverte Parcs Nationaux (ANPN)", price: 85000, desc: "Entrées guidées pour 3 parcs majeurs" },
  { name: "Pass Circuit Culture Bwiti & Traditions", price: 65000, desc: "Immersion culturelle et danses traditionnelles" },
  { name: "Safari Loango & Éléphants sur la Plage", price: 195000, desc: "Expédition safari exclusive à Loango" },
  { name: "Excursion Pirogue & Schweitzer (Lambaréné)", price: 45000, desc: "Naviguer sur l'Ogooué et visite historique" },
  { name: "Séjour Détente Pointe-Denis & Estuaire", price: 60000, desc: "Navette maritime, plage et bungalow" },
  { name: "Randonnée Canyons Rouges & Lékoni", price: 75000, desc: "Circuit Plateaux Batéké et pont de lianes" },
  { name: "Observation des Tortues Luths (Mayumba)", price: 70000, desc: "Nidification et safari côtier en Nyanga" },
  { name: "Trek Gorilles & Chutes de Koungou", price: 150000, desc: "Expédition cœur forêt Ivindo UNESCO" }
];

export const BookingModal = ({ isOpen, onClose, initialItem }) => {
  const [step, setStep] = useState(1); // 1: Details & Dates, 2: Payment, 3: Pass & QR Code
  const [selectedExperience, setSelectedExperience] = useState(AVAILABLE_PASSES[0]);
  const [startDate, setStartDate] = useState('2026-08-15');
  const [travelersCount, setTravelersCount] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('airtel'); // airtel, moov, card, paypal

  // Synchronize state when modal is opened or when initialItem changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialItem) {
        const itemName = initialItem.name || initialItem.title || "Pass Global Gabon Explorer";
        const rawPrice = initialItem.pricePerNight || initialItem.price || 50000;
        const itemPrice = typeof rawPrice === 'number' ? rawPrice : Number(rawPrice.toString().replace(/[^0-9]/g, '')) || 50000;
        
        setSelectedExperience({
          name: itemName,
          price: itemPrice,
          desc: initialItem.category || "Prestation sélectionnée"
        });
      } else {
        setSelectedExperience(AVAILABLE_PASSES[0]);
      }
    }
  }, [isOpen, initialItem]);

  if (!isOpen) return null;

  const title = selectedExperience?.name || "Pass Global Gabon Explorer";
  const unitPrice = selectedExperience?.price || 50000;
  const totalPrice = unitPrice * travelersCount;

  // Build selectable options including initialItem if custom
  const optionsList = AVAILABLE_PASSES.some(p => p.name === selectedExperience?.name)
    ? AVAILABLE_PASSES
    : [selectedExperience, ...AVAILABLE_PASSES];

  const handleConfirmPayment = () => {
    setStep(3);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col max-h-[95vh] text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#053828] to-[#0B6E4F] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <Ticket className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold font-['Outfit']">Réservation & Pass Touristique</h3>
              <p className="text-xs text-amber-300 font-semibold">{title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-around py-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 text-xs font-bold">
          <span className={step >= 1 ? "text-[#0B6E4F] dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}>1. Choix du Pass & Dates</span>
          <span className="text-slate-300 dark:text-slate-700">→</span>
          <span className={step >= 2 ? "text-[#0B6E4F] dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}>2. Paiement Sécurisé</span>
          <span className="text-slate-300 dark:text-slate-700">→</span>
          <span className={step === 3 ? "text-amber-500" : "text-slate-400 dark:text-slate-500"}>3. Pass & QR Code</span>
        </div>

        {/* Step 1: Details & Guest Info */}
        {step === 1 && (
          <div className="p-6 space-y-5 overflow-y-auto">
            
            {/* SELECTABLE Experience Dropdown */}
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-[#0B6E4F] dark:text-emerald-400 uppercase tracking-wider block">
                  Expérience / Pass Touristique Réservé :
                </label>
                <span className="text-xs font-extrabold text-amber-500">
                  {unitPrice.toLocaleString()} XAF / pers.
                </span>
              </div>

              <div className="relative">
                <select
                  value={selectedExperience?.name}
                  onChange={(e) => {
                    const chosen = optionsList.find(p => p.name === e.target.value);
                    if (chosen) setSelectedExperience(chosen);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-extrabold text-xs border-2 border-[#0B6E4F]/40 focus:border-[#0B6E4F] focus:outline-none shadow-sm cursor-pointer appearance-none pr-10"
                >
                  {optionsList.map((pass, index) => (
                    <option key={index} value={pass.name}>
                      {pass.name} — {pass.price.toLocaleString()} XAF
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500 italic">
                {selectedExperience?.desc || "Vous pouvez sélectionner n'importe quel autre pass touristique dans la liste ci-dessus."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Date d'Arrivée / Début</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Nombre de Voyageurs</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block">Coordonnées du Titulaire du Pass</span>
              
              <input
                type="text"
                placeholder="Nom complet (ex: Jean-Luc MBADINGA)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                />
                <input
                  type="tel"
                  placeholder="Téléphone / WhatsApp (+241...)"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                />
              </div>
              <p className="text-[10px] text-red-500 font-bold leading-relaxed bg-red-50 dark:bg-red-950/20 p-2.5 rounded-xl border border-red-200 dark:border-red-800/40">
                Aucune coordonnée ou information personnelle saisie ci-dessus ne sera enregistrée. Il s'agit d'un projet étudiant.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Total à régler ({travelersCount} pers.)</span>
                <span className="text-lg font-extrabold text-amber-500">{totalPrice.toLocaleString()} XAF</span>
              </div>
              
              <button
                onClick={() => setStep(2)}
                disabled={!guestName}
                className="px-6 py-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white text-xs font-bold disabled:opacity-50 transition-all shadow-md"
              >
                Continuer vers le Paiement
              </button>
            </div>

          </div>
        )}

        {/* Step 2: Payment Selection */}
        {step === 2 && (
          <div className="p-6 space-y-5 overflow-y-auto">
            
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block">Sélectionnez le mode de paiement</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'airtel', name: 'Airtel Money Gabon', icon: '📱', color: 'border-emerald-500' },
                { id: 'moov', name: 'Moov Africa Money', icon: '📲', color: 'border-emerald-500' },
                { id: 'card', name: 'Carte Bancaire (Visa/MC)', icon: '💳', color: 'border-emerald-500' },
                { id: 'paypal', name: 'PayPal / Flutterwave', icon: '🌐', color: 'border-emerald-500' }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center space-x-3 ${
                    paymentMethod === m.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-[#0B6E4F] text-[#0B6E4F] dark:text-emerald-400'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <span className="text-xs font-bold block">{m.name}</span>
                    <span className="text-[9px] text-[#0B6E4F] dark:text-emerald-400 font-bold">Instantané & Sécurisé</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-500 block">Récapitulatif de la Commande :</span>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Prestation :</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Voyageurs :</span>
                  <span>{travelersCount} personne(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de dossier ANPN :</span>
                  <span className="text-[#0B6E4F] dark:text-emerald-400 font-bold">Inclus (0 XAF)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-800 dark:text-white">
                  <span>Montant Total :</span>
                  <span className="text-amber-500">{totalPrice.toLocaleString()} XAF</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-red-500 font-bold leading-relaxed bg-red-50 dark:bg-red-950/20 p-2.5 rounded-xl border border-red-200 dark:border-red-800/40">
              AUCUN COMPTE NI INFORMATION BANCAIRE SAISIE CI-DESSUS NE SERA ENREGISTRÉE. IL S'AGIT D'UN PROJET ÉTUDIANT.
            </p>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
              >
                Retour
              </button>

              <button
                onClick={handleConfirmPayment}
                className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-md transition-all"
              >
                Payer {totalPrice.toLocaleString()} XAF
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Confirmation & Digital Pass QR Code */}
        {step === 3 && (
          <div className="p-6 space-y-6 overflow-y-auto text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-1 font-['Outfit']">Réservation Confirmée !</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Votre Pass Touristique Officiel Gabon a été généré avec succès.</p>
            </div>

            {/* Simulated Digital Tourist Pass Ticket */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-500/20 text-left space-y-4 shadow-xl relative">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-500 tracking-wider block mb-0.5">PASS TOURISTIQUE GABON</span>
                  <h4 className="text-base font-extrabold text-slate-800 dark:text-white">{title}</h4>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Titulaire : {guestName || "Jean-Luc MBADINGA"}</span>
                </div>
                {/* SVG QR Code Simulation */}
                <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center border border-slate-200 dark:border-transparent">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">N° de Pass :</span>
                  <span className="font-mono font-bold text-[#0B6E4F] dark:text-emerald-400">GAB-2026-8942</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Date de Validité :</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{startDate}</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-[#0B6E4F] dark:text-emerald-400 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Certifié par l'Agence Nationale des Parcs Nationaux (ANPN)</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center space-x-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer le Pass PDF</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white text-xs font-bold transition-all"
              >
                Terminer
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
