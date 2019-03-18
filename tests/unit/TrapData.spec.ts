import {
  chooseTrapMode,
  chooseTrapCondition,
  chooseTrapEffect,
  chooseTrapItem,
  chooseTrap,
} from '@/data/TRAP';

describe('TRAP', () => {
  it('can choose mode', () => {
    const mode = chooseTrapMode();
    expect(mode).toMatch(/妨害する|危険な|致命的な/);
  });

  it('can choose conditions', () => {
    const condition = chooseTrapCondition();
    expect(condition).toMatch(/踏む|通る|触る|開ける|見つめる|動かす/);
  });

  it('can choose effect', () => {
    const effect = chooseTrapEffect();
    expect(typeof effect).toBe('string');
    expect(effect && effect.length).toBeGreaterThan(6);
  });

  it('can choose items', () => {
    const item = chooseTrapItem();
    expect(typeof item).toBe('string');
  });

  it('can choose trap', () => {
    const trap = chooseTrap();
    expect(typeof trap).toBe('string');
  });
});
