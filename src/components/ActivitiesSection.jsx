import React, { useState } from 'react';
import { ACTIVITIES_DATA } from '../data/activities';
import {
  Search, Star, Clock, MapPin, ChevronRight, Users, ShieldCheck,
  Leaf, Compass, CheckCircle2, CalendarCheck, Tag, ArrowRight,
  SlidersHorizontal, MessageCircle, Award, DollarSign, RefreshCw
} from 'lucide-react';

// --------------- Data (inline for reliability) ---------------
const ACTIVITY_CATEGORIES = [
  { id: 'all',       label: 'Toutes les activités',   icon: '', color: 'bg-emerald-500' },
  { id: 'Nature',    label: 'Nature & Faune',          icon: '', color: 'bg-green-500'   },
  { id: 'Aventure',  label: 'Aventure & Randonnée',    icon: '', color: 'bg-orange-500'  },
  { id: 'Sport',     label: 'Sport & Loisirs',         icon: '', color: 'bg-blue-500'    },
  { id: 'Culture',   label: 'Culture & Découverte',    icon: '', color: 'bg-purple-500'  },
  { id: 'Bien-être', label: "Bien-être & Détente",     icon: '', color: 'bg-teal-500'    },
];

const FEATURED_ACTIVITIES = [
  {
    id: 'gorilles',
    title: 'Observation des gorilles',
    location: 'Parc National de Lopé',
    price: 185000,
    duration: '1 journée',
    rating: 4.9,
    reviews: 128,
    category: 'Nature',
    badge: 'Nature & Faune',
    badgeColor: 'bg-green-500',
    image: '/images/gorilla.jpg',
  },
  {
    id: 'safari-4x4',
    title: 'Safari en 4x4',
    location: 'Parc National de Loango',
    price: 95000,
    duration: '1 journée',
    rating: 4.8,
    reviews: 94,
    category: 'Aventure',
    badge: 'Aventure',
    badgeColor: 'bg-orange-500',
    image: '/images/elephants.jpg',
  },
  {
    id: 'baleines',
    title: 'Observation des baleines',
    location: 'Parc National de Mayumba',
    price: 250000,
    duration: '1 journée',
    rating: 4.7,
    reviews: 56,
    category: 'Nature',
    badge: 'Nature & Faune',
    badgeColor: 'bg-green-500',
    image: '/images/whales.jpg',
  },
  {
    id: 'kayak',
    title: 'Kayak en rivière',
    location: 'Ogooué-Ivindo',
    price: 45000,
    duration: '2h à 4h',
    rating: 4.6,
    reviews: 72,
    category: 'Sport',
    badge: 'Sport & Loisirs',
    badgeColor: 'bg-blue-500',
    image: '/images/pirogue.jpg',
  },
  {
    id: 'tortues',
    title: 'Observation des tortues',
    location: 'Plage des Tortues, Mayumba',
    price: 35000,
    duration: '1 nuit',
    rating: 4.8,
    reviews: 43,
    category: 'Nature',
    badge: 'Nature & Faune',
    badgeColor: 'bg-green-500',
    image: '/images/turtles.jpg',
  },
  {
    id: 'peche',
    title: 'Pêche sportive',
    location: 'Côtes de Loango',
    price: 120000,
    duration: '1 journée',
    rating: 4.5,
    reviews: 38,
    category: 'Sport',
    badge: 'Sport & Loisirs',
    badgeColor: 'bg-blue-500',
    image: '/images/pirogue.jpg',
  },
  {
    id: 'cascades',
    title: 'Randonnée & Cascades',
    location: 'Chutes de la Mboumi',
    price: 55000,
    duration: '1 journée',
    rating: 4.7,
    reviews: 61,
    category: 'Aventure',
    badge: 'Aventure',
    badgeColor: 'bg-orange-500',
    image: '/images/ivindo.jpg',
  },
  {
    id: 'culture',
    title: 'Découverte culturelle',
    location: 'Villages Fang, Woleu-Ntem',
    price: 30000,
    duration: '1 journée',
    rating: 4.9,
    reviews: 29,
    category: 'Culture',
    badge: 'Culture & Découverte',
    badgeColor: 'bg-purple-500',
    image: '/images/culture.jpg',
  },
];

const POPULAR_ACTIVITIES = [
  {
    title: 'Découverte de la Forêt Dense',
    rating: 4.9,
    reviews: 128,
    price: 85000,
    image: '/images/hero.jpg',
  },
  {
    title: 'Plongée sous-marine',
    rating: 4.7,
    reviews: 87,
    price: 120000,
    image: '/images/whales.jpg',
  },
  {
    title: 'Visite des chutes de Kongou',
    rating: 4.8,
    reviews: 54,
    price: 65000,
    image: '/images/ivindo.jpg',
  },
];

// ----------------------------------------------------------------

export const ActivitiesSection = ({ onBookActivity }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = FEATURED_ACTIVITIES.filter(act => {
    const matchCat = activeCategory === 'all' || act.category === activeCategory;
    const matchSearch = !searchTerm || act.title.toLowerCase().includes(searchTerm.toLowerCase()) || act.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice = act.price <= maxPrice;
    const matchRating = act.rating >= minRating;
    return matchCat && matchSearch && matchPrice && matchRating;
  });

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-white">

      {/* =========================================================
          HERO BANNER
      ========================================================= */}
      <div className="relative overflow-hidden min-h-[340px] flex items-center bg-slate-950">
        <img
          src="/images/ivindo.jpg"
          alt="Kayak Gabon"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
            Vivez des expériences inoubliables
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] text-white mb-3">
            Activités au Gabon
          </h1>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed mb-6">
            Nature sauvage, aventures authentiques, rencontres uniques.<br />
            Explorez toutes les activités à vivre lors de votre séjour au Gabon.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg flex items-center bg-white rounded-2xl p-1 shadow-xl border border-slate-100">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une activité, un parc, une ville..."
              className="flex-1 px-4 py-2.5 text-xs font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            <button className="p-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white transition-all">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          STATS BAR
      ========================================================= */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
          {[
            { icon: '', label: 'Nature protégée', sub: 'Des ecosystèmes rares' },
            { icon: '', label: 'Guides experts', sub: 'Accompagnement local' },
            { icon: '', label: 'Sécurité garantie', sub: 'Votre sécurité avant tout' },
            { icon: '', label: 'Réservation facile', sub: 'En quelques clics' },
            { icon: '', label: 'Meilleurs prix', sub: 'Sans frais cachés' },
          ].map((s, idx) => (
            <div key={idx} className="flex items-center space-x-2.5">
              <span className="text-xl">{s.icon}</span>
              <div>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block leading-tight">{s.label}</span>
                <span className="text-[10px] text-slate-500">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          MAIN 3-COLUMN BODY
      ========================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── LEFT SIDEBAR – FILTRES (3/12) ── */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0B6E4F]" />
                <span>Filtres</span>
              </h3>
              <button
                onClick={() => { setActiveCategory('all'); setSelectedRegion('all'); setSelectedDuration('all'); setMinRating(0); setMaxPrice(300000); setSearchTerm(''); }}
                className="text-[10px] font-bold text-[#0B6E4F] hover:underline"
              >
                Réinitialiser
              </button>
            </div>

            <div className="p-5 space-y-6 text-xs">

              {/* Catégories */}
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide text-[10px]">Catégories</p>
                <div className="space-y-1">
                  {ACTIVITY_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-left transition-all font-semibold ${
                        activeCategory === cat.id
                          ? 'bg-[#0B6E4F] text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Région */}
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide text-[10px]">Région</p>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-white cursor-pointer focus:outline-none focus:border-[#0B6E4F]"
                >
                  <option value="all">Toutes les régions</option>
                  <option value="estuaire">Estuaire</option>
                  <option value="ogooue-maritime">Ogooué-Maritime</option>
                  <option value="ogooue-ivindo">Ogooué-Ivindo</option>
                  <option value="nyanga">Nyanga</option>
                  <option value="woleu-ntem">Woleu-Ntem</option>
                  <option value="lope">Parc de Lopé</option>
                </select>
              </div>

              {/* Durée */}
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide text-[10px]">Durée</p>
                <div className="flex flex-wrap gap-2">
                  {[{ id: 'all', label: 'Toute' }, { id: '1jour', label: '1 jour' }, { id: 'demi', label: '1/2 journée' }].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDuration(d.id)}
                      className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all ${
                        selectedDuration === d.id
                          ? 'bg-[#0B6E4F] text-white border-[#0B6E4F]'
                          : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-[#0B6E4F]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note étoile */}
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide text-[10px]">Étoile</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 4, 4.5, 4.8].map((r, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMinRating(r)}
                      className={`px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all flex items-center space-x-0.5 ${
                        minRating === r
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>{r === 0 ? 'Tous' : `${r}+`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[10px]">Prix</p>
                  <span className="text-[10px] font-bold text-[#0B6E4F]">{maxPrice.toLocaleString()} XAF</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="300000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0B6E4F]"
                />
                <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                  <span>10 000 XAF</span>
                  <span>300 000 XAF</span>
                </div>
              </div>

              <button className="w-full py-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs shadow-md transition-all">
                Voir les activités
              </button>

            </div>
          </div>

          {/* CTA Aventure IA */}
          <div className="relative rounded-3xl overflow-hidden p-5 text-white shadow-lg bg-slate-900">
            <img
              src="/images/pirogue.jpg"
              alt="Adventure"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
            />
            <div className="relative z-10 space-y-3">
              <p className="text-xs font-extrabold text-white">Envie d'une aventure sur mesure ?</p>
              <p className="text-[10px] text-slate-300 leading-relaxed">Notre IA voyage vous aide à créer le circuit parfait selon vos envies.</p>
              <button
                onClick={() => onBookActivity && onBookActivity({ title: "Itinéraire personnalisé IA", price: 0 })}
                className="w-full py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-[11px] flex items-center justify-center space-x-1 transition-all"
              >
                <span>Créer mon itinéraire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* ── MIDDLE GRID – EXPLOREZ NOS ACTIVITÉS (9/12) ── */}
        <div className="lg:col-span-9 space-y-6">

          {/* Sub Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Explorez nos activités
            </h2>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-500 font-semibold">{filtered.length} activités disponibles</span>
            </div>
          </div>

          {/* Activity Cards Grid — 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((act) => (
              <div
                key={act.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Card Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`${act.badgeColor} text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-lg`}>
                      {act.badge}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/95 text-[#0B6E4F] text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                      {act.price.toLocaleString()} XAF
                    </span>
                  </div>

                  {/* Rating + duration bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-white text-[10px]">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{act.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-amber-300">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{act.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-1 space-y-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-[#0B6E4F] transition-colors leading-snug">
                      {act.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{act.location}</span>
                    </span>
                  </div>

                  {/* Stars row */}
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= Math.round(act.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">({act.reviews} avis)</span>
                  </div>

                  {/* Action */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[9px] text-slate-400 block">À partir de</span>
                      <span className="text-sm font-extrabold text-[#0B6E4F]">{act.price.toLocaleString()} XAF</span>
                    </div>
                    <button
                      onClick={() => onBookActivity && onBookActivity({ title: act.title, price: act.price })}
                      className="px-3.5 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white text-[10px] font-extrabold flex items-center space-x-1 shadow-md transition-all"
                    >
                      <span>Réserver</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="text-center pt-2">
            <button className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Voir plus d'activités ↓
            </button>
          </div>

          {/* ── BROWSE BY CATEGORY PILLS ── */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Parcourez par catégorie
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {ACTIVITY_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`${cat.color} text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-sm hover:opacity-90 transition-opacity`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── BOTTOM 3-COLUMN ROW ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">

            {/* Activités Populaires */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Activités populaires</h3>
                <button className="text-[10px] font-bold text-[#0B6E4F] hover:underline flex items-center">
                  <span>Voir toutes</span><ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {POPULAR_ACTIVITIES.map((act, idx) => (
                  <div
                    key={idx}
                    onClick={() => onBookActivity && onBookActivity({ title: act.title, price: act.price })}
                    className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-[#0B6E4F] transition-colors">{act.title}</h4>
                      <div className="flex items-center space-x-0.5 my-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} className={`w-2.5 h-2.5 ${s <= Math.round(act.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />)}
                        <span className="text-[9px] text-slate-400 ml-0.5">{act.rating} ({act.reviews})</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-[#0B6E4F]">À partir de {act.price.toLocaleString()} XAF</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Besoin d'aide pour choisir ? */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full flex flex-col">
                <div className="relative h-36">
                  <img
                    src="/images/tourists.jpg"
                    alt="Guide Gabon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B6E4F]/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-xs font-extrabold">Guide Certifié ANPN</p>
                    <p className="text-emerald-200 text-[10px]">Expertise locale garantie</p>
                  </div>
                </div>
                <div className="p-4 space-y-3 flex-1">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Besoin d'aide pour choisir ?</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Nos conseillers experts vous guident pour trouver l'activité parfaite selon vos préférences.
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                    {['Conseil personnalisé gratuit', 'Réponse en moins de 2h', 'Support 7j/7'].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6E4F] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2.5 rounded-xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all">
                    <MessageCircle className="w-4 h-4" />
                    <span>Discuter sur WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pourquoi choisir le Gabon ? */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 h-full space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Pourquoi choisir le Gabon ?</h3>
                <div className="space-y-3">
                  {[
                    { icon: '', title: 'Faune exceptionnelle', desc: '13 parcs nationaux, gorilles des plaines, éléphants de forêt...' },
                    { icon: '', title: 'Côtes sauvages', desc: 'Plages vierges, baleines à bosse, tortues luths...' },
                    { icon: '', title: 'Forêt équatoriale', desc: '88% du territoire couvert de forêt tropicale dense' },
                    { icon: '', title: 'Éco-tourisme certifié', desc: 'Séjours responsables labellisés par l\'ANPN' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Choisir une activité au Gabon</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:border-[#0B6E4F]">
                    <option>Sélectionner une activité</option>
                    {FEATURED_ACTIVITIES.map(a => <option key={a.id}>{a.title}</option>)}
                  </select>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
          FOOTER CTA BANNER
      ========================================================= */}
      <div className="bg-[#0B6E4F] mt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center text-white">
          
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-extrabold font-['Outfit'] mb-1">Réservez vos activités en toute simplicité</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Paiement sécurisé • Confirmation immédiate • Annulation flexible
            </p>
          </div>

          {[
            { icon: ShieldCheck, label: 'Paiement sécurisé', sub: 'Mobile Money & Carte bancaire' },
            { icon: RefreshCw,   label: 'Annulation flexible', sub: 'Jusqu\'à 48h avant la date' },
            { icon: Award,       label: 'Meilleur prix garanti', sub: 'Nous respectons votre budget' },
          ].map(({ icon: Icon, label, sub }, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">{label}</h4>
                <p className="text-[10px] text-emerald-100">{sub}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};
