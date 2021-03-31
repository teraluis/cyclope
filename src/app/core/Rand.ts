export class Rand {

  static getRandomArbitrary(min, max): number {
    return Math.random() * (max - min) + min;
  }

  static getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static pile(grain): boolean {
    return !!(this.getRandomInt(grain) % 2);
  }

  static randomMovieId(): number {
    const ids = [11, 15, 16, 231, 301, 302, 307, 308, 309, 310
    , 311, 312, 445, 500, 4459, 3149, 1622, 8738, 5047,
      641, 8290, 4213];
    return ids[this.getRandomInt(ids.length)];
  }
}
