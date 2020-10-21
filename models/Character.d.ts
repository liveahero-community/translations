declare namespace Character {
  interface Growth {
    level: number;
    hp: number;
    attack: number;
    agility: number;
    addView: number;
  }

  interface RankUpItem {
    itemId: number;
    value: number;
  }

  interface HeroData {
    heroCardId: number;
    stockId: number;
    stockOrder: number;
    cardName: string;
    element: number;
    role: number;
    rarity: number;
    cardId: number;
    skillIds: number[];
    growths: Growth[];
    rankUpItems: RankUpItem[];
    resourceName: string;
    characterId: number;
    job: string;
    affiliationOffice: string;
    characterVoice: string;
    illustrator: string;
  }

  interface SidekickData {
    sidekickCardId: number;
    stockId: number;
    cardName: string;
    rarity: number;
    levelZone: number;
    role: number;
    cardId: number;
    skillIds: number[];
    growths: Growth[];
    rankUpItems: RankUpItem[];
    resourceName: string;
    characterId: number;
    job: string;
    affiliationOffice: string;
    characterVoice: string;
    illustrator: string;
    equipmentSkills: number[];
  }
}