import Armor from '@/models/Armor';
import ARMOR_DATA from '@/data/ARMOR_DATA';

describe('Armor.ts', () => {
  const armor = new Armor(ARMOR_DATA[1]);
  it('create collection from init data', () => {
    expect(armor.name).toBe('パデッド');
    expect(armor.type).toBe('軽装鎧');
    expect(armor.price).toBe('5gp');
    expect(armor.ac).toBe(11);
  });

  it('has description', () => {
    expect(armor.description).toBe('軽装鎧（5gp/8ポンド）：AC11＋【敏】修正値、隠密：不利');
  });
});
