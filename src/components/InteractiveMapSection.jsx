import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { PARKS_DATA } from '../data/parks';
import { ACCOMMODATIONS_DATA } from '../data/accommodations';
import { 
  MapPin, Trees, Hotel, Waves, Plane, Compass, Star, 
  X, ExternalLink, Calendar, ShieldCheck, CheckCircle2, ChevronRight,
  Info, ArrowRight, Sparkles, Navigation
} from 'lucide-react';

// Helper to create Leaflet Custom Pin Icons
const createCustomIcon = (color, emoji) => {
  return L.divIcon({
    className: 'custom-map-pin-container',
    html: `
      <div style="
        background-color: ${color};
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        border: 2.5px solid white;
        transition: transform 0.2s ease;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -32]
  });
};

const iconPark = createCustomIcon('#0B6E4F', '🌳');
const iconHotel = createCustomIcon('#0284C7', '🏨');
const iconNature = createCustomIcon('#D97706', '🌊');
const iconAirport = createCustomIcon('#6366F1', '✈️');
const iconCulture = createCustomIcon('#9333EA', '🏛️');

export const InteractiveMapSection = ({ onSelectParkForBooking, onSelectAccommodationForBooking }) => {
  const [filter, setFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Expanded and Enriched List of Points of Interest (POIs) across Gabon
  const naturalSites = [
    {
      id: 'koungou-falls',
      name: "Chutes de Koungou (UNESCO)",
      type: 'nature',
      category: "Site Naturel d'Exception",
      province: "Ogooué-Ivindo",
      coords: [0.4600, 12.6300],
      image: "/images/ivindo.jpg",
      rating: "4.9",
      price: "45 000 XAF / pers.",
      description: "Spectaculaires cascades nichées au cœur de la forêt équatoriale du Parc National d'Ivindo. Un des plus beaux spectacles naturels d'Afrique centrale.",
      features: ["Randonnée en forêt vierge", "Excursion en pirogue", "Observation d'oiseaux marabouts", "Bivouac sauvage"]
    },
    {
      id: 'lac-bleu',
      name: "Lac Bleu de Mouila",
      type: 'nature',
      category: "Merveille Sacrée",
      province: "Ngounié",
      coords: [-1.8800, 11.0200],
      image: "/images/culture.jpg",
      rating: "4.8",
      price: "25 000 XAF / pers.",
      description: "Lac naturel aux eaux cristallines et bleu turquoise, entouré de légendes Bwiti. Un lieu mystique et apaisant au cœur de la Ngounié.",
      features: ["Eaux claires translucides", "Légendes Bwiti & Punu", "Baignade & détente", "Photos panoramiques"]
    },
    {
      id: 'lekoni-canyon',
      name: "Canyon Rouge de Lékoni",
      type: 'nature',
      category: "Canyon & Plateaux Batéké",
      province: "Haut-Ogooué",
      coords: [-1.5833, 14.2500],
      image: "/images/lope.jpg",
      rating: "4.9",
      price: "35 000 XAF / pers.",
      description: "Cirque naturel spectaculaire creusé dans le sable ocre et rouge des Plateaux Batéké, créant des paysages lunaires grandioses.",
      features: ["Cirque de sable rouge", "Safari sur les plateaux", "Rencontre culture Téké", "Coucher de soleil magique"]
    },
    {
      id: 'pointe-denis',
      name: "Plage de la Pointe-Denis",
      type: 'nature',
      category: "Station Balnéaire",
      province: "Estuaire",
      coords: [0.3000, 9.3500],
      image: "/images/beach_couple_ai.png",
      rating: "4.9",
      price: "30 000 XAF / pers.",
      description: "Bande de sable blanc paradisiaque située à 20 minutes en bateau de Libreville. Idéale pour la détente et le nautisme.",
      features: ["Plages de sable blanc", "Navette bateau rapide", "Clubs nautiques & Paillotes", "Ponte des tortues luths (Saison)"]
    },
    {
      id: 'monts-doudou',
      name: "Monts Doudou & Mayumba",
      type: 'nature',
      category: "Chaîne Montagneuse & Littoral",
      province: "Nyanga",
      coords: [-2.8500, 11.0167],
      image: "/images/nyanga_mountains.png",
      rating: "4.8",
      price: "40 000 XAF / pers.",
      description: "Sommets côtiers verdoyants surplombant les plages sauvages de Mayumba, sanctuaire des tortues luths et des baleines à bosse.",
      features: ["Montagnes verdoyantes", "Nidification tortues luths", "Whale watching (Juillet-Octobre)", "Randonnée botanique"]
    },
    {
      id: 'lambaréné-lacs',
      name: "Grand Lac Zilé & Ogooué",
      type: 'nature',
      category: "Écosystème Lacustre",
      province: "Moyen-Ogooué",
      coords: [-0.7000, 10.2333],
      image: "/images/moyen_ogooue_gorilla.png",
      rating: "4.8",
      price: "35 000 XAF / pers.",
      description: "Réseau de lacs paisibles bordant le fleuve Ogooué à Lambaréné. Territoire des hippopotames et des gorilles de forêt.",
      features: ["Balade en pirogue traditionnelle", "Observation des hippopotames", "Visite musée Schweitzer", "Pêche au capitaine"]
    }
  ];

  const airports = [
    {
      id: 'lbv-airport',
      name: "Aéroport International Léon Mba",
      type: 'airport',
      category: "Hub Aérien National & Intl",
      province: "Estuaire (Libreville)",
      coords: [0.4583, 9.4122],
      image: "/images/libreville.jpg",
      rating: "4.6",
      price: "Navette dispo",
      description: "Premier aéroport du Gabon desservant les vols internationaux et les connexions intérieures vers Port-Gentil, Franceville et Oyem.",
      features: ["Vols régionaux & intl", "Services VIP & Lounges", "Comptoir location voitures", "Changement devises"]
    },
    {
      id: 'pog-airport',
      name: "Aéroport International de Port-Gentil",
      type: 'airport',
      category: "Aéroport Côtier",
      province: "Ogooué-Maritime",
      coords: [-0.7117, 8.7544],
      image: "/images/whales.jpg",
      rating: "4.5",
      price: "Vols quotidiens",
      description: "Porte d'entrée aérienne vers la capitale économique pétrolière et les safaris d'exception du Parc National de Loango.",
      features: ["Vols quotidiens depuis LBV", "Accès direct à Loango", "Transferts hélicoptère", "Service taxis & navettes"]
    },
    {
      id: 'mvengue-airport',
      name: "Aéroport International Mvengue",
      type: 'airport',
      category: "Aéroport du Haut-Ogooué",
      province: "Franceville",
      coords: [-1.6560, 13.4380],
      image: "/images/lope.jpg",
      rating: "4.4",
      price: "Connexions aériennes",
      description: "Dessert la ville de Franceville, les Plateaux Batéké et la région minière et touristique du Sud-Est du Gabon.",
      features: ["Liaisons quotidiennes", "Accès Canyons de Lékoni", "Transferts Poubara", "Location véhicules tout-terrain"]
    }
  ];

  const culturalSites = [
    {
      id: 'schweitzer-hospital',
      name: "Hôpital Historique Albert Schweitzer",
      type: 'culture',
      category: "Patrimoine Mondial & Musée",
      province: "Moyen-Ogooué (Lambaréné)",
      coords: [-0.6950, 10.2280],
      image: "/images/pirogue_ai.png",
      rating: "4.9",
      price: "15 000 XAF / pers.",
      description: "Hôpital fondé en 1913 par le Prix Nobel de la Paix Albert Schweitzer. Conservé intact en tant que musée d'histoire de la médecine.",
      features: ["Musée original Schweitzer", "Archives & manuscrits", "Chambre du Docteur", "Visites guidées historiques"]
    },
    {
      id: 'monts-iboundji',
      name: "Mont Iboundji (1575m)",
      type: 'culture',
      category: "Sommet Céleste & Sacré",
      province: "Ogooué-Lolo",
      coords: [-1.1333, 12.4833],
      image: "/images/hero.jpg",
      rating: "4.7",
      price: "50 000 XAF / pers.",
      description: "Point le plus élevé du Gabon culminant à 1575 mètres d'altitude. Montagne mystique de la tradition Kota.",
      features: ["Ascension pédestre", "Panoramas à 360°", "Sanctuaires sacrés Kota", "Spéléologie grottes de Lastoursville"]
    }
  ];

  // Helper to trigger booking modal for a selected POI
  const handleBooking = (poi) => {
    if (poi.type === 'park' && onSelectParkForBooking) {
      onSelectParkForBooking(poi);
    } else if (poi.type === 'hotel' && onSelectAccommodationForBooking) {
      onSelectAccommodationForBooking(poi);
    } else if (onSelectParkForBooking) {
      onSelectParkForBooking({ name: poi.name, price: poi.price });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto space-y-8 font-sans">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B6E4F]/10 text-[#0B6E4F] dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Google Maps Style • SIG Touristique du Gabon</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Explorez le Gabon sur la Carte Interactive
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Cliquez sur un marqueur pour ouvrir la fiche détaillée avec visuels HD, services et réservation.
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center space-x-1">
            <span>🌳</span> <span>Parcs Nationaux</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center space-x-1">
            <span>🏨</span> <span>Hôtels & Lodges</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center space-x-1">
            <span>🌊</span> <span>Cascades & Plages</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center space-x-1">
            <span>🏛️</span> <span>Culture & Patrimoine</span>
          </span>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-2 items-center justify-start">
        {[
          { id: 'all', label: "Tous les Points d'Intérêt", emoji: '🗺️' },
          { id: 'parks', label: '13 Parcs Nationaux', emoji: '🌳' },
          { id: 'hotels', label: 'Hôtels & Lodges de Luxe', emoji: '🏨' },
          { id: 'nature', label: 'Cascades, Lacs & Plages', emoji: '🌊' },
          { id: 'culture', label: 'Culture & Patrimoine', emoji: '🏛️' },
          { id: 'airports', label: 'Aéroports & Transports', emoji: '✈️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              filter === tab.id
                ? 'bg-[#0B6E4F] text-white shadow-md scale-105'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Map Container with Side Panel (Google Maps layout) */}
      <div className="relative w-full h-[640px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950 flex flex-col md:flex-row">
        
        {/* Leaflet Map Area */}
        <div className="w-full h-full relative">
          <MapContainer
            center={[-0.8000, 11.6000]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 1. Parks Markers */}
            {(filter === 'all' || filter === 'parks') &&
              PARKS_DATA.map((park) => (
                <Marker 
                  key={park.id} 
                  position={park.coords} 
                  icon={iconPark}
                  eventHandlers={{
                    click: () => setSelectedLocation({
                      ...park,
                      type: 'park',
                      category: 'Parc National Officiel (ANPN)',
                      image: park.image || "/images/ivindo.jpg",
                      rating: "4.9",
                      province: park.province || "Gabon",
                      features: park.highlights || ["Faune protégée", "Safari photo", "Guides certifiés ANPN"]
                    })
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">Parc National</span>
                      <h4 className="text-xs font-extrabold text-slate-900">{park.name}</h4>
                      <p className="text-[10px] text-slate-600">{park.tagline}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* 2. Hotels Markers */}
            {(filter === 'all' || filter === 'hotels') &&
              ACCOMMODATIONS_DATA.map((hotel) => (
                <Marker 
                  key={hotel.id} 
                  position={hotel.coordinates} 
                  icon={iconHotel}
                  eventHandlers={{
                    click: () => setSelectedLocation({
                      ...hotel,
                      type: 'hotel',
                      price: `${hotel.pricePerNight.toLocaleString()} XAF / nuit`,
                      province: hotel.province,
                      features: hotel.amenities || ["Piscine", "Restaurant", "Wi-Fi Gratuit"]
                    })
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1">
                      <span className="text-[10px] font-bold text-sky-600 uppercase block">{hotel.category}</span>
                      <h4 className="text-xs font-extrabold text-slate-900">{hotel.name}</h4>
                      <p className="text-[10px] text-[#0B6E4F] font-bold">{hotel.pricePerNight.toLocaleString()} XAF / nuit</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* 3. Natural Sites Markers */}
            {(filter === 'all' || filter === 'nature') &&
              naturalSites.map((site) => (
                <Marker 
                  key={site.id} 
                  position={site.coords} 
                  icon={iconNature}
                  eventHandlers={{
                    click: () => setSelectedLocation(site)
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1">
                      <span className="text-[10px] font-bold text-amber-600 uppercase block">{site.category}</span>
                      <h4 className="text-xs font-extrabold text-slate-900">{site.name}</h4>
                      <p className="text-[10px] text-slate-600">{site.province}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* 4. Cultural Sites Markers */}
            {(filter === 'all' || filter === 'culture') &&
              culturalSites.map((site) => (
                <Marker 
                  key={site.id} 
                  position={site.coords} 
                  icon={iconCulture}
                  eventHandlers={{
                    click: () => setSelectedLocation(site)
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1">
                      <span className="text-[10px] font-bold text-purple-600 uppercase block">{site.category}</span>
                      <h4 className="text-xs font-extrabold text-slate-900">{site.name}</h4>
                      <p className="text-[10px] text-slate-600">{site.province}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* 5. Airports Markers */}
            {(filter === 'all' || filter === 'airports') &&
              airports.map((airport) => (
                <Marker 
                  key={airport.id} 
                  position={airport.coords} 
                  icon={iconAirport}
                  eventHandlers={{
                    click: () => setSelectedLocation(airport)
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase block">Aéroport</span>
                      <h4 className="text-xs font-extrabold text-slate-900">{airport.name}</h4>
                    </div>
                  </Popup>
                </Marker>
              ))}

          </MapContainer>

          {/* Quick Helper Floating Badge on Map */}
          {!selectedLocation && (
            <div className="absolute bottom-6 left-6 z-[400] bg-slate-950/80 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-800 shadow-xl flex items-center space-x-3 pointer-events-none max-w-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0B6E4F] flex items-center justify-center text-amber-300 flex-shrink-0 animate-pulse">
                <Navigation className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-200">
                Cliquez sur n'importe quelle icône de la carte pour faire apparaître sa fiche Google Maps.
              </p>
            </div>
          )}
        </div>

        {/* GOOGLE MAPS STYLE SIDE PANEL (Opens when a marker is clicked) */}
        {selectedLocation && (
          <div className="absolute md:relative right-0 top-0 bottom-0 z-[500] w-full md:w-[380px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Panel Content Top */}
            <div>
              {/* Header Image */}
              <div className="relative h-56 w-full bg-slate-950">
                <img
                  src={selectedLocation.image || "/images/hero.jpg"}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Badge Category */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="px-2.5 py-1 rounded-md bg-[#0B6E4F] text-white text-[10px] font-black uppercase tracking-wider">
                    {selectedLocation.category || "Point d'Intérêt Touristique"}
                  </span>

                  {selectedLocation.rating && (
                    <div className="flex items-center space-x-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md text-xs font-black">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>{selectedLocation.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight font-['Outfit']">
                    {selectedLocation.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-[#0B6E4F] dark:text-emerald-400 font-bold mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedLocation.province || selectedLocation.location || "Gabon"}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedLocation.description || selectedLocation.tagline || "Point d'intérêt touristique majeur du Gabon à visiter absolument."}
                </p>

                {/* Price tag if any */}
                {selectedLocation.price && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Tarif / Estimation :</span>
                    <span className="text-xs font-extrabold text-[#0B6E4F] dark:text-emerald-400">{selectedLocation.price}</span>
                  </div>
                )}

                {/* Highlights / Features List */}
                {selectedLocation.features && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white block">Point forts & Caractéristiques :</span>
                    <ul className="space-y-1.5">
                      {selectedLocation.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
              <button
                onClick={() => handleBooking(selectedLocation)}
                className="w-full py-3 rounded-2xl bg-[#0B6E4F] hover:bg-[#08543c] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Réserver ce site / hôtel</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedLocation(null)}
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-colors text-center"
              >
                Fermer la fiche
              </button>
            </div>

          </div>
        )}

      </div>

    </section>
  );
};
