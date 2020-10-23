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
      effects: (
        SkillEffectAggregation |
        SkillEffectAllAttack
      )[];
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

  namespace Effect {
    interface Base {
      class: string;
      parameter: {
        value: number;
      };
    }

    interface Aggregation extends Base {
      class: 'Aggregation';
      parameter: [];
    }

    interface AllAttack extends Base {
      class: 'AllAttack';
      parameter: [];
    }

    interface ChangeAgi extends Base {
      class: 'ChangeAgi';
    }

    interface ChangeHp extends Base {
      class: 'ChangeHp';
    }

    interface ChangeSkillProve extends Base {
      class: 'ChangeSkillProve';
    }

    interface ChangeChangeView extends Base {
      class: 'ChangeChangeView';
    }

    interface ComboDamage extends Base {
      class: 'ComboDamage';
      parameter: {
        value: number;
        comboMul: number;
        // TODO: typo from rawdata.
        combpMul: number;
      };
    }

    interface ComboMultipleAttack extends Base {
      class: 'ComboMultipleAttack';
      parameter: {
        comboMul: number;
      };
    }

    interface ComboPlus extends Base {
      class: 'ComboPlus';
    }

    interface Cure extends Base {
      class: 'Cure';
    }

    interface Damage extends Base {
      class: 'Damage';
    }

    interface DamageLimit extends Base {
      class: 'DamageLimit';
    }

    interface DeleteTurn extends Base {
      class: 'DeleteTurn';
    }

    interface ElementPenetrateDamage extends Base {
      class: 'ElementPenetrateDamage';
      parameter: {
        value: number;
        element: boolean;
      };
    }

    interface Heal extends Base {
      class: 'Heal';
    }

    interface HealthDamage extends Base {
      class: 'HealthDamage';
    }

    interface HealthMultipleAttack extends Base {
      class: 'HealthMultipleAttack';
      parameter: [];
    }

    interface IgnoreElement extends Base {
      class: 'IgnoreElement';
      parameter: [];
    }

    interface IncreaseExp extends Base {
      class: 'IncreaseExp';
      parameter: {
        value: number;
        isPercent: boolean;
      };
    }

    interface IncreaseLAH extends Base {
      class: 'IncreaseLAH';
      parameter: {
        value: number;
        isPercent: boolean;
      };
    }

    interface MoreTurn extends Base {
      class: 'MoreTurn';
    }

    interface MultipleAttack extends Base {
      class: 'MultipleAttack';
    }

    interface MultipleBaseView extends Base {
      class: 'MultipleBaseView';
    }

    interface MultipleDefence extends Base {
      class: 'MultipleDefence';
    }

    interface MultipleHp extends Base {
      class: 'MultipleHp';
    }

    interface NeedViewChange extends Base {
      class: 'NeedViewChange';
    }

    interface NeedViewValueChange extends Base {
      class: 'NeedViewValueChange';
    }

    interface NowViewDamage extends Base {
      class: 'NowViewDamage';
      parameter: {
        value: number;
        viewMult: boolean;
      };
    }

    interface Penetration extends Base {
      class: 'Penetration';
      parameter: [];
    }

    interface Provocation extends Base {
      class: 'Provocation';
      parameter: [];
    }

    interface RegistDebuff extends Base {
      class: 'RegistDebuff';
    }

    interface RemoveBuff extends Base {
      class: 'RemoveBuff';
      parameter: {
        value?: number;
        target?: number;
      };
    }

    interface SalesBonusCheat extends Base {
      class: 'SalesBonusCheat';
      parameter: {
        value: number;
        isCheat: boolean;
      };
    }

    interface Silence extends Base {
      class: 'Silence';
      parameter: [];
    }

    interface spdMult extends Base {
      class: 'spdMult';
      parameter: {
        spdMult: number;
      };
    }

    interface StatusNumberMultipleAttack extends Base {
      class: 'StatusNumberMultipleAttack';
      parameter: {
        statusMult: number;
        isGoodStatus: boolean;
      };
    }

    interface StatusNumDamage extends Base {
      class: 'StatusNumDamage';
      parameter: {
        value: number;
        statusMult?: number;
        isGoodStatus?: boolean;
      };
    }

    interface Wait extends Base {
      class: 'Wait';
      parameter: [];
    }
  }
}
