declare namespace Item {
  interface ItemData {
    itemId: number;
    itemName: string;
    resourceName: string;
    rarity: number;
    // TODO:
    itemType: number;
    description: string;
    effect: {
      // TODO:
      class: string;
      isPercent: boolean;
      repairValue: number;
    }[];
  }
}
