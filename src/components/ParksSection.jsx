import React, { useState } from 'react';
import { PARKS_DATA } from '../data/parks';
import { 
  Trees, MapPin, Search, Filter, ShieldCheck, Award, ExternalLink, 
  ChevronRight, Footprints, Compass, UserCheck, Heart, Sparkles, X, CheckCircle2, ArrowRight
} from 'lucide-react';

export const ParksSection = ({ onBookPark, onOpenAiModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [activeParkModal, setActiveParkModal] = useState(null);

  // Filtered parks list based on user inputs
  const filteredParks = PARKS_DATA.filter(park => {
    const matchesSearch = park.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          park.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          park.fauna.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || park.province.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-20 font-sans">
      
      {/* Hero Banner Section */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center">
        {/* Gorilla Background Image */}
        <img
          src="/images/hero.jpg"
          alt="Gorilla in Gabon"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-6">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block">
            Découvrez la nature sauvage du Gabon
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Outfit']">
            Nos 13 Parcs Nationaux
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Le Gabon est l'un des pays au monde avec le plus fort taux de couvert forestier. Explorez des écosystèmes uniques et une biodiversité exceptionnelle.
          </p>

          {/* Search Input Box */}
          <div className="max-w-xl flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border border-slate-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un parc, un animal, une activité..."
              className="flex-1 px-4 py-2.5 text-xs font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            <button className="p-3 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white transition-all shadow-md">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 Stats Bar Below Hero */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm py-4 mb-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-4 items-center text-xs">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-[#0B6E4F] flex items-center justify-center font-bold text-lg">
              🍃
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base block leading-none">13</span>
              <span className="text-[11px] text-slate-500">Parcs nationaux</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-[#0B6E4F] flex items-center justify-center font-bold text-lg">
              🌲
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base block leading-none">+85%</span>
              <span className="text-[11px] text-slate-500">De forêt préservée</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg">
              🏅
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block leading-snug">Faune unique</span>
              <span className="text-[10px] text-slate-500">Gorilles, éléphants, panthères...</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-lg">
              🍃
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block leading-snug">Écotourisme</span>
              <span className="text-[10px] text-slate-500">Voyage responsable</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-lg">
              🧭
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block leading-snug">Expériences inoubliables</span>
              <span className="text-[10px] text-slate-500">Aventure et dépaysement</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main 3 Columns Section: Left Filters (1/4) + Middle Grid (2/4) + Right Stats (1/4) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: FILTRES (3/12) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Filtres</h3>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedRegion('all'); setDifficultyFilter('all'); }}
                className="text-[11px] font-bold text-[#0B6E4F] hover:underline"
              >
                Réinitialiser
              </button>
            </div>

            {/* Région */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Région</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold cursor-pointer"
              >
                <option value="all">Toutes les régions</option>
                <option value="estuaire">Estuaire</option>
                <option value="ogooué-maritime">Ogooué-Maritime</option>
                <option value="ogooué-ivindo">Ogooué-Ivindo</option>
                <option value="nyanga">Nyanga</option>
                <option value="woleu-ntem">Woleu-Ntem</option>
                <option value="ngounié">Ngounié</option>
                <option value="haut-ogooué">Haut-Ogooué</option>
              </select>
            </div>

            {/* Activités */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Activité</label>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" defaultChecked />
                  <span>Observation des gorilles</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" defaultChecked />
                  <span>Safari</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" />
                  <span>Randonnée</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" />
                  <span>Observation des oiseaux</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" />
                  <span>Baignade</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" />
                  <span>Camping</span>
                </label>
              </div>
            </div>

            {/* Niveau de difficulté */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Niveau de difficulté</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setDifficultyFilter('facile')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                    difficultyFilter === 'facile' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  🟢 Facile
                </button>
                <button 
                  onClick={() => setDifficultyFilter('modere')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                    difficultyFilter === 'modere' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  🟡 Modéré
                </button>
                <button 
                  onClick={() => setDifficultyFilter('difficile')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                    difficultyFilter === 'difficile' ? 'bg-red-500 text-white border-red-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  🔴 Difficile
                </button>
              </div>
            </div>

            {/* Équipements */}
            <div>
              <label className="font-extrabold text-slate-900 dark:text-white block mb-2">Équipements</label>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" defaultChecked />
                  <span>Camping autorisé</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" defaultChecked />
                  <span>Hébergement disponible</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" defaultChecked />
                  <span>Guide obligatoire</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#0B6E4F]" />
                  <span>Accessible en 4x4</span>
                </label>
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all">
              Appliquer les filtres
            </button>
          </div>

          {/* Bottom Card: Envie d'une aventure sur mesure ? */}
          <div className="relative rounded-3xl overflow-hidden p-6 text-white space-y-3 shadow-xl bg-slate-950">
            <img
              src="/images/ivindo.jpg"
              alt="Waterfall"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
            />
            <div className="relative z-10 space-y-3">
              <h4 className="text-sm font-extrabold leading-snug">
                Envie d'une aventure sur mesure ?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Notre IA voyage vous aide à créer le circuit parfait selon vos envies.
              </p>
              <button
                onClick={onOpenAiModal}
                className="w-full py-2.5 rounded-xl bg-white text-[#0B6E4F] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Créer mon itinéraire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* MIDDLE COLUMN: PARKS GRID (6/12) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Explorez tous les parcs nationaux
            </h2>
            <span className="text-xs font-bold text-slate-500">
              {filteredParks.length} parcs disponibles
            </span>
          </div>

          {/* 3x3 Grid of Parks Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredParks.map((park, idx) => (
              <div
                key={park.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Top Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={park.image}
                    alt={park.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {idx === 0 && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0B6E4F] text-white text-[9px] font-black uppercase">
                      Le plus visité
                    </span>
                  )}
                  {park.unesco && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] font-black uppercase">
                      UNESCO
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-[#0B6E4F] transition-colors leading-snug">
                      {park.name}
                    </h3>
                    
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{park.province}</span>
                    </span>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {park.tagline}
                    </p>

                    {/* Feature Emoji Icons */}
                    <div className="flex items-center space-x-2 text-xs pt-2">
                      <span title="Gorilles">🦍</span>
                      <span title="Éléphants">🐘</span>
                      <span title="Baleines">🐋</span>
                      <span title="Tortues">🐢</span>
                      <span title="Camping">🏕️</span>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 block">À partir de</span>
                      <span className="text-xs font-extrabold text-[#0B6E4F]">{park.price}</span>
                    </div>

                    <button
                      onClick={() => onBookPark(park)}
                      className="text-[11px] font-bold text-[#0B6E4F] hover:underline flex items-center space-x-0.5"
                    >
                      <span>Voir plus</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Voir tous les parcs nationaux
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: MAP & BIODIVERSITY STATS (3/12) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Carte des parcs nationaux Widget */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Carte des parcs nationaux</h3>
              <p className="text-[11px] text-slate-500">Découvrez leur localisation</p>
            </div>

            <div className="h-52 rounded-2xl overflow-hidden relative bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src="/images/whales.jpg"
                alt="Map Parks Gabon"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-emerald-950/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => onBookPark(PARKS_DATA[0])}
                  className="px-4 py-2 rounded-xl bg-white text-[#0B6E4F] font-bold text-xs shadow-lg flex items-center space-x-1.5 hover:scale-105 transition-transform"
                >
                  <span>Voir en plein écran</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* La biodiversité du Gabon */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5">
              La biodiversité du Gabon
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  🦣
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-sm block leading-none">200+</span>
                  <span className="text-[10px] text-slate-500">Espèces de mammifères</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-[#0B6E4F] flex items-center justify-center font-bold">
                  🦜
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-sm block leading-none">700+</span>
                  <span className="text-[10px] text-slate-500">Espèces d'oiseaux</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                  🌿
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-sm block leading-none">10 000+</span>
                  <span className="text-[10px] text-slate-500">Espèces de plantes</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                  🦎
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-sm block leading-none">100+</span>
                  <span className="text-[10px] text-slate-500">Espèces de reptiles</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  🐸
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-sm block leading-none">80+</span>
                  <span className="text-[10px] text-slate-500">Espèces d'amphibiens</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bon à savoir (Dark Green Card) */}
          <div className="bg-[#053828] p-5 rounded-3xl text-white space-y-4 shadow-lg">
            <h3 className="text-sm font-extrabold text-white border-b border-emerald-800 pb-2.5">
              Bon à savoir
            </h3>

            <ul className="space-y-2.5 text-xs text-emerald-100">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Respect de la nature et éco-éthique</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Permis ou guide de brousse recommandé</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Suivez toujours les instructions des guides</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Certains parcs nécessitent un vaccin (Fièvre jaune)</span>
              </li>
            </ul>

            <button className="w-full py-2.5 rounded-xl bg-white text-[#053828] font-extrabold text-xs shadow-md hover:bg-slate-100 transition-all flex items-center justify-center space-x-1">
              <span>Guide du voyageur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Activity Highlights (Vivez des expériences uniques) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8">
        
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Vivez des expériences uniques
          </h2>
          <p className="text-xs text-slate-500">Activités populaires dans nos parcs nationaux</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { title: "Observation des gorilles", img: "/images/gorilla.jpg" },
            { title: "Safari 4x4", img: "/images/elephants.jpg" },
            { title: "Randonnée en forêt", img: "/images/lope.jpg" },
            { title: "Birdwatching", img: "/images/turtles.jpg" },
            { title: "Canoë & Kayak", img: "/images/pirogue.jpg" },
            { title: "Camping en nature", img: "/images/ivindo.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm p-3 flex items-center space-x-3 cursor-pointer hover:border-[#0B6E4F] transition-colors">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button className="px-8 py-3.5 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all">
            Voir toutes les activités
          </button>
        </div>

      </div>

    </div>
  );
};
