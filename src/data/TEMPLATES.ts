import Template from '@/models/Template';

const TEMPLATE_DATA: Array<Required<Template>> = [
    {
        name: 'ゾンビ',
        type: 'アンデッド',
        alignment: '中立にして悪',
        acMod: -4,
        hpMod: 1.2,
        move: '10フィート',
        damage: '殴打',
        abilityMod: [
            0,
            -4,
            +4,
            0,
            0,
            0,
        ],
        attributes: [
            'ダメージ脆弱性: [光輝]',
        ],
    },
    {
        name: 'スケルトン',
        type: 'アンデッド',
        alignment: '中立にして悪',
        acMod: +1,
        hpMod: 0.8,
        move: '',
        damage: '刺突',
        abilityMod: [
            0,
            +2,
            -2,
            0,
            0,
            0,
        ],
        attributes: [
            'ダメージ脆弱性: [光輝][殴打]',
        ],
    },
    {
        name: 'スライム',
        type: '異形',
        alignment: '秩序にして悪',
        acMod: -6,
        hpMod: 2.0,
        move: '10フィート',
        damage: '酸',
        abilityMod: [
            0,
            -4,
            0,
            0,
            0,
            0,
        ],
        attributes: [
            'ダメージ耐性: [酸][毒][精神][死霊]',
        ],
    },
    {
        name: 'デーモン',
        type: 'フィーンド',
        alignment: '秩序にして悪',
        acMod: 0,
        hpMod: 1.0,
        move: '飛行：60フィート',
        damage: '炎',
        abilityMod: [
            0,
            0,
            0,
            0,
            0,
            0,
        ],
        attributes: [
        ],
    },
    {
        name: 'ヴァンパイア',
        type: 'アンデッド',
        alignment: '混沌にして悪',
        acMod: 0,
        hpMod: 1,
        move: '飛行：40フィート',
        damage: '死霊',
        abilityMod: [
            0,
            0,
            0,
            0,
            0,
            +4,
        ],
        attributes: [
            '吸血: 与えた[死霊]ダメージと同じだけhpを回復する',
        ],
    },
    {
        name: 'ゴースト',
        type: 'アンデッド',
        alignment: '混沌にして悪',
        acMod: 0,
        hpMod: 1,
        move: '飛行：20フィート',
        damage: '精神',
        abilityMod: [
            0,
            0,
            0,
            0,
            0,
            +4,
        ],
        attributes: [
            'ダメージ耐性: 非魔法の[殴打][刺突][斬撃]',
        ],
    },
];

const TEMPLATES = TEMPLATE_DATA.map((init) => {
    return new Template(init);
});

export default TEMPLATES;
