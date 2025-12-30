export interface EntreprisesData {
  title: string;
  description: string;
  companies: string[];
  stats: {
    total: number;
    secteurPublic: number;
    secteurPrive: number;
  };
}

export const entreprisesData: EntreprisesData = {
  title: "Entreprises d'Accueil",
  description: "46 structures partenaires ayant accueilli nos étudiants",
  companies: [
    "AFRILAND FIRST BANK",
    "Agence Nationale des Technologies de l'Information et de la Communication (ANTIC)",
    "Agence de Régulation des Télécommunications (ART)",
    "ARRDEL",
    "ASHDOWN",
    "Banque des Etats de l'Afrique Centrale (BEAC)",
    "Caisse Autonome d'Amortissement (CAA)",
    "Caisse de stabilisation des prix des hydrocarbures (CSPH)",
    "CAISSE DES DÉPÔTS ET CONSIGNATIONS (CDEC)",
    "Caisse Nationale de Prévoyance Sociale (CNPS)",
    "Centre de Développement de L'informatique (CENADI)",
    "Conseil Régional du Centre (CRCE)",
    "CREDIXCAM SA",
    "Digital House International (DHI)",
    "Direction Générale des Douanes (DGD)",
    "Direction Générale des Impôts (DGI)",
    "Eglise Evangélique du Cameroun (EEC)",
    "Electricity Development Corporation (EDC)",
    "ENSolutions Hydro",
    "ENSPY (Cameron)",
    "FEICOM",
    "Gohze",
    "IMT Atlantique Bretagne-Pays de la Loire",
    "INP Toulouse - ENSEEIHT",
    "IT Brains Consulting Group",
    "ItechLand",
    "ITGStore",
    "KAEYROS ANALYTICS",
    "LA REGIONALE Bank",
    "Les Boissons du Cameroun",
    "Ministère des finances (MINFI)",
    "Mozart Group SARL",
    "NASARA TECHNOLOGIES",
    "Neero",
    "OFTY",
    "ORANGE Cameroun S.A",
    "Port Autonome de Douala (PAD)",
    "Port Autonome de Kribi (PAK)",
    "PROOFTAG CATIS S.A",
    "SCB Cameroun",
    "Services CEO",
    "SmartDS",
    "Tech Innovation Center (TiC)",
    "Telecom SudParis - Laboratoire SAMOVAR",
    "UGA- Laboratoire AGEIS-Laboratoire Informatique de Grenoble (LIG)",
    "UMMISCO",
  ],
  stats: {
    total: 46,
    secteurPublic: 18,
    secteurPrive: 28,
  },
};

