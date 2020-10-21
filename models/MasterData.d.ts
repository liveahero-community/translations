declare namespace MasterData {
  interface CardMaster {
    [heroCardId: string]: Character.HeroData;
  }

  interface SidekickMaster {
    [sidekickCardId: string]: Character.SidekickData;
  }

  interface SkillMaster {
    [skillId: string]: Skill.SkillData;
  }

  interface SkillEffectMaster {
    [skillEffectId: string]: Skill.SkillEffectData;
  }

  interface StatusMaster {
    [statusId: string]: Skill.StatusData;
  }

  interface ItemMaster {
    [itemId: string]: Item.ItemData;
  }
}
