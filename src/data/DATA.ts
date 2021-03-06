export const RACE_ABILITY = new Map<string, number[]> ([
  ['ヒューマン', [1, 1, 1, 1, 1, 1]],
  ['マウンテンドワーフ', [2, 0, 2, 0, 0, 0]],
  ['ヒルドワーフ', [0, 0, 2, 0, 1, 0]],
  ['ハイエルフ', [0, 2, 0, 1, 0, 0]],
  ['ウッドエルフ', [0, 2, 0, 0, 1, 0]],
  ['頑丈ハーフリング', [0, 2, 1, 0, 0, 0]],
  ['速足ハーフリング', [0, 2, 0, 0, 0, 1]],
  ['ドラウ', [0, 2, 0, 0, 0, 1]],
  ['ティーフリング', [0, 0, 0, 1, 0, 2]],
  ['ドラゴンボーン', [2, 0, 0, 0, 0, 1]],
  ['森ノーム', [0, 1, 0, 2, 0, 0]],
  ['岩ノーム', [0, 0, 1, 2, 0, 0]],
  ['ハーフエルフ', [0, 0, 0, 0, 0, 2]],
  ['ハーフオーク', [2, 0, 1, 0, 0, 0]],
]);

export const RACES = Array.from(RACE_ABILITY.keys());

export const BACKGROUND_SKILLS = new Map<string, string[]> ([
  ['貴族', ['説得', '歴史']],
  ['賢者', ['魔法学', '歴史']],
  ['侍祭', ['看破', '宗教学']],
  ['犯罪者', ['隠密', 'ペテン']],
  ['兵士', ['威圧', '運動']],
  ['民衆英雄', ['生存', '動物使い']],
  ['イカサマ師', ['手先の早業', 'ペテン']],
  ['隠者', ['医術', '宗教']],
  ['ギルドの職人', ['看破', '説得']],
  ['芸人', ['軽業', '芸能']],
  ['船乗り', ['運動', '知覚']],
  ['浮浪児', ['隠密', '手先の早業']],
  ['辺境育ち', ['運動', '生存']],
]);

export const BACKGROUND = Array.from(BACKGROUND_SKILLS.keys());

export const ALIGNMENT = [
  '秩序にして善',
  '中立にして善',
  '混沌にして善',
  '秩序にして中立',
  '真なる中立',
  '混沌にして中立',
  '秩序にして悪',
  '中立にして悪',
  '混沌にして悪',
];

export const KLASS = [
  'ファイター',
  'ウィザード',
  'クレリック',
  'ローグ',
  'レンジャー',
  'パラディン',
  'バーバリアン',
  'ソーサラー',
  'モンク',
  'ウォーロック',
  'ドルイド',
  'バード',
];

export const ABILITY_LABEL = [
  '筋力',
  '敏捷',
  '耐久',
  '知力',
  '判断',
  '魅力',
];

export const ABILITY_RANGE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export const SKILLS: string[][] = [
  ['運動'],
  ['隠密', '軽業', '手先の早業'],
  [],
  ['自然', '宗教', '捜査', '魔法学', '歴史'],
  ['医術', '看破', '生存', '知覚', '動物使い'],
  ['説得', '芸能', '威圧', 'ペテン'],
];

export const SKILL_LABELS: string[] = [
  '運動',
  '隠密',
  '軽業',
  '手先の早業',
  '自然',
  '宗教',
  '捜査',
  '魔法学',
  '歴史',
  '医術',
  '看破',
  '生存',
  '知覚',
  '動物使い',
  '説得',
  '芸能',
  '威圧',
  'ペテン',
];

export const LANGUAGES = [
  '共通語',
  'エルフ語',
  'オーク語',
  '巨人語',
  'ゴブリン語',
  'ドワーフ語',
  'ノーム語',
  'ハーフリング語',
  '始原語',
  '地獄語',
  '深淵語',
  '地下共通語',
  '天上語',
  '奈落語',
  '森語',
  '竜語',
];
