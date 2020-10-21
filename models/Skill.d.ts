declare namespace Skill {
  interface SkillData {
    skillId: number;
    skillName: string;
    useView: number;
    targetFlag: 0 | 1 | 2 | 3 | 4 | 5;
    resourceName: string;
    subResourceName: string;
    timing: number;
    description: string;
    cutin: {
      info: {
        class: 'CutIn' | 'NormalAttack' | 'SidekickSkill' | 'System';
      };
      name: string;
    };
    effects: {
      skillEffectId: number;
      prob: number;
      effectTarget: number;
    }[];
  }

  interface SkillEffectData {
    skillEffectId: number;
    skillEffectJson: {
      turn: number;
      count: number;
      effects: {
        // TODO: many kinds.
        class: string;
        parameter: {
          value: number;
        };
      };
      filename: string;
      statusId: number;
      canDispel: boolean;
      description: string;
      isImmediate: boolean;
      persistence: boolean;
      canDuplicate: boolean;
    };
    useView: number;
    targetFlag: 0 | 1 | 2 | 3 | 4 | 5;
    resourceName: string;
    subResourceName: string;
    timing: number;
    description: string;
    cutin: {
      info: {
        class: 'CutIn' | 'NormalAttack' | 'SidekickSkill' | 'System';
      };
      name: string;
    };
    effects: {
      skillEffectId: number;
      prob: number;
      effectTarget: number;
    }[];
  }

  interface StatusData {
    statusId: number;
    statusName: string;
    isGoodStatus: 0 | 1;
    description: string;
  }

  interface SkillEffectBase {
    class: string;
    parameter: [] | {
      value: number;
    };
  }
}
