import React, { useState } from 'react';
import { Sparkles, Bot, Send, X, Calculator, Calendar, Compass, DollarSign, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const AiAssistantModal = ({ isOpen, onClose, onApplyItineraryBooking }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Mbolo ! Je suis Gaby AI, votre Assistant Virtuel dédié au Tourisme au Gabon. Comment puis-je vous aider à préparer votre voyage inoubliable ?"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'generator'

  // Itinerary Generator Form State
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [budgetTier, setBudgetTier] = useState('confort'); // 'eco', 'confort', 'luxe'
  const [interest, setInterest] = useState('safari'); // 'safari', 'marine', 'culture', 'beach'
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  if (!isOpen) return null;

  const quickQuestions = [
    "Où et quand observer les gorilles ?",
    "Quel budget prévoir pour 7 jours au Gabon ?",
    "Comment réserver pour les baleines à bosse ?",
    "Quel itinéraire idéal pour un premier séjour ?"
  ];

  const disclaimerMessage = "AVERTISSEMENT ACADÉMIQUE : Ce site web et cet assistant IA font partie d'un projet d'études. Aucune donnée personnelle, nom ou information bancaire n'est enregistrée ni stockée au cours de votre utilisation. Si vous souhaitez un site web ou un assistant personnalisé similaire pour votre projet ou entreprise, n'hésitez pas à me contacter !";

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputQuery('');

    // Generate intelligent AI response based on query keywords, accompanied by educational notice
    setTimeout(() => {
      let botAnswer = "Le Gabon offre des opportunités uniques au monde ! Pour des conseils personnalisés, n'hésitez pas à tester notre Générateur d'Itinéraire automatique dans l'onglet ci-dessus.";
      const q = query.toLowerCase();

      if (q.includes('gorille')) {
        botAnswer = "**Gorilles des Plaines au Gabon** :\n\n- **Meilleurs Parcs** : Parc National de Loango (Camp d'Akaka) et Parc National de Moukalaba-Doudou.\n- **Période idéale** : Toute l'année, avec un pic de visibilité en saison sèche (Juin à Septembre).\n- **Permis ANPN** : Inclus dans nos offres de séjour (à partir de 150 000 XAF/pers).";
      } else if (q.includes('budget')) {
        botAnswer = "**Budget Estimatif au Gabon** :\n\n- **Option Confort** : ~120 000 XAF (180€) / jour / personne (inclus lodge 3/4*, repas et transferts).\n- **Option Luxe & Wilderness** : ~250 000 XAF (380€) / jour (inclus lodge 5* Loango/Ivindo, vol intérieur et guide privé).";
      } else if (q.includes('baleine') || q.includes('tortue')) {
        botAnswer = "**Baleines & Tortues Luths** :\n\n- **Baleines à Bosse** : Juillet à Octobre à Port-Gentil et Mayumba.\n- **Tortues Luths (Ponte)** : Novembre à Février au Parc National de Mayumba et Pongara.";
      } else if (q.includes('hôtel') || q.includes('lodges')) {
        botAnswer = "**Hôtels Recommandés** :\n\n- **Libreville** : Radisson Blu (5* Bord de mer), Nomad Hotel & Spa.\n- **Safari & Parc** : Loango Safari Lodge (Iguela) et Koungou Wilderness Camp (Ivindo).";
      }

      // Append disclaimer notice
      const fullAnswer = `${botAnswer}\n\n---\n*${disclaimerMessage}*`;

      setMessages(prev => [...prev, { sender: 'bot', text: fullAnswer }]);
    }, 600);
  };

  const handleGenerateItinerary = () => {
    let daysPlan = [];
    let estimatedCostPerPerson = 0;

    if (interest === 'safari') {
      daysPlan = [
        { day: 1, title: "Arrivée à Libreville & Accueil", desc: "Arrivée Aéroport Léon Mba, installation Radisson Blu, dîner Poulet Nyembwe en bord de mer." },
        { day: 2, title: "Vol Afrijet vers Port-Gentil & Pirogue Iguela", desc: "Vol court vers Port-Gentil puis transfert lagunaire vers le Loango Safari Lodge." },
        { day: 3, title: "Safari Gorilles à Akaka", desc: "Journée trek avec pisteurs ANPN à la rencontre de la famille de gorilles du dos argenté." },
        { day: 4, title: "Safari Élégants & Buffles sur la Plage", desc: "Exploration des plages sauvages de Loango où les éléphants se baignent dans l'Atlantique." },
        { day: 5, title: "Retour Libreville & Marché d'Art", desc: "Pirogue retour, souvenirs au marché artisan du Mont-Bouët et vol de départ." }
      ];
      estimatedCostPerPerson = budgetTier === 'luxe' ? 1250000 : 750000;
    } else {
      daysPlan = [
        { day: 1, title: "Libreville & Traversée Pointe-Denis", desc: "Installation en villa Pongara Beach Resort, baignade et détente sur le sable blanc." },
        { day: 2, title: "Nidification des Tortues Luths", desc: "Ronde nocturne guidée avec biologistes pour observer la ponte des géantes des mers." },
        { day: 3, title: "Safari Mangroves & Dauphins d'Akanda", desc: "Excursion pirogue dans le Parc d'Akanda à la rencontre des dauphins de l'Estuaire." },
        { day: 4, title: "Gastronomie & Immersion Culturelle", desc: "Dégustation culinaire braisée et démonstration rituelle du masque Okuyi." },
        { day: 5, title: "Shopping Artisanal & Transfert Aéroport", desc: "Achats d'artisanat en bois et transfert retour." }
      ];
      estimatedCostPerPerson = budgetTier === 'luxe' ? 980000 : 580000;
    }

    const totalBudgetXAF = estimatedCostPerPerson * travelers;

    setGeneratedItinerary({
      title: `Circuit Sur-Mesure Gabon (${duration} Jours - ${travelers} Voyageur${travelers > 1 ? 's' : ''})`,
      costPerPerson: estimatedCostPerPerson,
      totalBudgetXAF: totalBudgetXAF,
      totalBudgetEUR: Math.round(totalBudgetXAF / 655.957),
      days: daysPlan.slice(0, duration)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[85vh] relative text-slate-800 dark:text-slate-200">
        
        {/* Header Modal */}
        <div className="p-5 bg-gradient-to-r from-[#053828] to-[#0B6E4F] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <Bot className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold font-['Outfit'] flex items-center space-x-2">
                <span>Gaby AI</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">Intelligence Touristique</span>
              </h3>
              <p className="text-xs text-amber-200 font-medium">Assistant officiel et Générateur d'Itinéraires Gabon</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chat' ? 'bg-white/20 text-white shadow-inner' : 'text-slate-200 hover:text-white'
              }`}
            >
              Chatbot IA
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'generator' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-200 hover:text-white'
              }`}
            >
              Générateur d'Itinéraire
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/20 text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Banner Notice inside AI Modal */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 p-2.5 px-4 text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center justify-between">
          <span>PROJET ACADÉMIQUE — Aucune donnée saisie n'est enregistrée. Envie d'un site ou chatbot IA pour votre entreprise ? Contactez-moi !</span>
        </div>

        {/* Tab 1: Interactive AI Chatbot */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 bg-slate-50 dark:bg-slate-950">
            
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0B6E4F] text-white rounded-br-none shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-sm whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="py-2.5 flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-[11px] px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 text-[#0B6E4F] dark:text-emerald-400 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm font-semibold"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-2 flex items-center space-x-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question sur les gorilles, hôtels, parcs, budget..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F] shadow-sm"
              />
              <button
                onClick={() => handleSend()}
                className="p-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Automated Itinerary & Budget Generator */}
        {activeTab === 'generator' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Durée du Séjour</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                >
                  <option value={3}>3 Jours (Express Escapade)</option>
                  <option value={5}>5 Jours (Standard Exploration)</option>
                  <option value={7}>7 Jours (Immersion Complète)</option>
                  <option value={10}>10 Jours (Grand Tour du Gabon)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Nombre de Voyageurs</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Niveau de Confort</label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                >
                  <option value="eco">Éco-Aventure Brousse</option>
                  <option value="confort">Confort & Safaris Lodges</option>
                  <option value="luxe">Luxe VIP & Transferts Héliport/Avion</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Centre d'Intérêt Majeur</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                >
                  <option value="safari">Gorilles, Élépants & Safaris</option>
                  <option value="marine">Baleines, Tortues & Plages</option>
                  <option value="culture">Tradition Bwiti & Gastronomie</option>
                </select>
              </div>

            </div>

            <button
              onClick={handleGenerateItinerary}
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Générer l'Itinéraire & le Devis Instantané</span>
            </button>

            {/* Generated Output */}
            {generatedItinerary && (
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-500/40 space-y-4 shadow-lg animate-fade-in">
                
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="text-base font-extrabold text-amber-500">{generatedItinerary.title}</h4>
                    <span className="text-xs text-slate-400">Généré par l'IA Gaby</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#0B6E4F] dark:text-emerald-400 block">
                      {generatedItinerary.totalBudgetXAF.toLocaleString()} XAF
                    </span>
                    <span className="text-[10px] text-slate-400">~{generatedItinerary.totalBudgetEUR} € pour le groupe</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase block">Programme Jour par Jour :</span>
                  {generatedItinerary.days.map((d) => (
                    <div key={d.day} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-extrabold text-amber-500 block mb-0.5">Jour {d.day} : {d.title}</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">{d.desc}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onApplyItineraryBooking) onApplyItineraryBooking(generatedItinerary);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Réserver cet Itinéraire Sur-Mesure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
