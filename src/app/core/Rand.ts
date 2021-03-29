export class Rand {

  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static pile(grain): boolean {
    return !!(this.getRandomInt(grain) % 2);
  }
}
