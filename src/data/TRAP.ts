import _ from 'lodash';

export const TRAP_CONDITIONS = [
  '踏む',
  '通る',
  '触る',
  '開ける',
  '見つめる',
  '動かす',
];

export const chooseTrapCondition = () => _.sample(TRAP_CONDITIONS);

export const TRAP_MODE = new Map<number, string>([
  [1, '妨害する'],
  [3, '危険な'],
  [6, '致命的な'],
]);

export const chooseTrapMode = () => {
  const dice = Math.floor(Math.random() * 6 + 1);
  return [...TRAP_MODE].reduce((a, [num, msg]) => a = dice > num ? msg : a, '');
};

export const TRAP_EFFECTS = [
  '像または物体からマジック·ミサイル呪文が飛んでくる',
  '階段が突然すべり台に変化し、キャラクターたちはすべり台の下に開いた穴にすべり落ちる',
  '天井の一部または全体が崩落する',
  '部屋に閉じこめられ、天井がゆっくりと下りてくる',
  '床に滑り台つき落とし穴が開く',
  'うるさい音がして近くのモンスターを呼び寄せてしまう',
  '物体に触るとディスインテグレート呪文が作動する',
  '扉などの物体に接触毒が塗られている',
  '壁、床、または物体から炎が噴き出す',
  '物体に触るとフレッシュ·トゥ·ストーン呪文が作動する',
  '床が崩れる/床は幻だった',
  '壁の穴からガスが噴き出す;目つぶし、酸、視界阻害、麻痺、毒、または睡眠',
  '床のタイルが電気を帯びる',
  'グリフ·オヴ·ウォーディング呪文',
  '大きな車輪のついた像が階段を下りてくる',
  '壁または物体からライトニング·ボルト呪文が飛んでくる',
  '部屋に閉じこめられ、水または酸が流れこむ',
  '開けた宝箱からダーツが飛んでくる',
  '武器、鎧、またはじゅうたんに触れると、自律行動を始めて襲いかかってくる(『モンスター·マニュアル』のアニメイテッド·オブジェクト参照)',
  '振り子(刃がついているか、鉄鎚のように重い)が部屋や廊下を横切って往復運動する',
  'キャラクターの足元に落とし穴が開く(25%の確率で、穴の底に1体のブラック·プディングかゼラチナス·キュブがいる)',
  '酸または炎で満たされた落とし穴',
  '水で満たされた落とし穴;自動的にふたが閉まり施錠される',
  '壁または物体から大鎌の刃が現れる',
  '槍(毒が塗ってあるかもしれない)が突き出す',
  'もろくなっていた階段が崩れ、下にはスパイクが植わっている',
  'サンダーウェイヴ呪文がキャラクターたちを穴やスパイクの方へ押しやる',
  '鋼鉄製または石製のトラバサミがキャラクターを拘束する',
  '廊下の端から端まで、石のブロックが次々と落下する',
  'シンボル呪文',
  '両側の壁が同時にスライドする',
];

export const chooseTrapEffect = () => _.sample(TRAP_EFFECTS);

export const TRAP_ITEMS = [
'ひじ掛け椅子',
'移動式食器棚',
'たれ幕',
'カーテン',
'カバン',
'ビール樽',
'クッションつきの足台',
'大型の樽',
'大型の偶像',
'小型の樽',
'織機',
'マット',
'マットレス',
'手桶',
'絵画',
'ベンチ',
'大きな箱',
'わら布団',
'台座',
'釘',
'枕',
'掛け布団',
'火鉢と石炭',
'バケツ',
'立食台',
'二段ベッド',
'超大型な樽',
'枝付き燭台',
'カーペット(大型)',
'ワイン樽',
'シャンデリア',
'じゅうたん',
'燈心草',
'ずだ袋',
'壁の燭台',
'灰',
'簡素な椅子',
'クッションつきの椅子',
'長椅子',
'大型の櫃',
'中型の櫃',
'引き出しの並ぶ整理棚',
'衣装だんす',
'ついたて',
'シーツ',
'棚',
'社',
'サイドボード',
'ソファ',
'普通の杖',
'演台',
'像',
'高いスツール',
'普通のスツール',
'大型のテーブル',
'長いテーブル',
'低いテーブル',
'丸テーブル',
'小型のテーブル',
'組み立て式テーブル',
'タペストリー',
'玉座',
'トランク',
'バスタブ',
'超大型の樽',
'骨壺',
'寝椅子',
'油皿(灯火用)',
'食器棚',
'クッション',
'教壇',
'机',
'暖炉と薪',
'マントルピースつきの暖炉',
'小型の樽',
'噴水',
'フレスコ画',
'壁の水盤と泉',
'棒きれ',
'作業台',
'石臼',
];

export const chooseTrapItem = () => _.sample(TRAP_ITEMS);

export const chooseTrap = () => {
  const mode = chooseTrapMode();
  const condition = chooseTrapCondition();
  const effect = chooseTrapEffect();
  const item = chooseTrapItem();
  const find = _.random(8, 16);
  const disable = _.random(10, 18);
  return `${item}を${condition}と発動する${mode}罠。発見難易度${find}、無効化難易度${disable}。効果：${effect}`;
};
