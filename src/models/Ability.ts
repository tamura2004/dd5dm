export default class Ability {

  public static modify(ability: number): number {
    return Math.floor((ability - 10) / 2);
  }

  public static modifyString(ability: number): string {
    const modify = this.modify(ability);
    if (modify > 0) {
      return `+${modify}`;
    } else {
      return `${modify}`;
    }
  }
}
