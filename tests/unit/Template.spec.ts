import { MONSTERS } from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';

describe('Monster', () => {
  const info = MONSTERS.get(1);

  it('can initialize with template', () => {
    const tree = MONSTERS.get(1);
    expect(tree).toBeTruthy();
    if (tree === undefined) {
      return;
    }

    expect(tree.name).toBe('アウェイクンド・ツリー');
    expect(tree.maxHp).toBe(59);
    expect(tree.ac).toBe(13);
    expect(tree.ability[1]).toBe(6); // dex
    expect(tree.ability[2]).toBe(15); // con

    const zombie = TEMPLATES[0];
    const zombieTree = tree.add(zombie);

    expect(zombieTree.name).toBe('ゾンビ・アウェイクンド・ツリー');
    expect(zombieTree.maxHp).toBe(70);
    expect(zombieTree.ac).toBe(9);
    expect(zombieTree.ability[1]).toBe(2); // dex -4
    expect(zombieTree.ability[2]).toBe(19); // con +4
    expect(zombieTree.attributes).toContain('ダメージ脆弱性: [光輝][斬撃]');
  });
});
