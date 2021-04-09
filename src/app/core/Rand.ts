import {Movie} from './Movie';

export class Rand {
  // memory tampon will be used only if the database is empty
  database = [11, 15, 16];

  constructor() {}

  static getRandomArbitrary(min, max): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static pile(grain): boolean {
    return !!(this.getRandomInt(grain) % 2);
  }

  static customRand(count: number, min: number): number[] {
    if (count > min) {
      const rand = Rand.getRandomArbitrary(min, count);
      return [rand - min, rand];
    } else {
      return [0, count];
    }
  }

  randomMovieId(): number {
    return this.database[Rand.getRandomInt(this.database.length - 1)];
  }

  addMovieId(id: number) {
    if (!this.isInDB(id)) {
      this.database.push(id);
    }
  }

  isInDB(id: number): boolean {
    return this.database.includes(id);
  }

  hydrateMoviesTampon(movies: Movie[]): number[] {
    if (movies.length > 0) { this.database = []; }
    movies.forEach(movie => { this.addMovieId(movie.id); });
    return this.database;
  }
}
