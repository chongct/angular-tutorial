import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Link } from './link';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const links: Link[] = [
      { id: 11, description: "Typescript", url: "https://www.typescriptlang.org/docs/home.html" },
      { id: 12, description: "Redux", url: "https://www.valentinog.com/blog/redux/" },
      { id: 13, description: "Learn design", url: "https://hackdesign.org/lessons" },
      { id: 14, description: "Freecodecamp", url: "https://www.freecodecamp.org/" },
      { id: 15, description: "Test", url: "http://www.test.com" }
    ];
    return { links };
  }

  // Overrides the default genId method to ensure that a link always has an id.
  // If the links array is empty, the method below returns the initial number (11).
  // If the links array is not empty, the method below returns the highest link id + 1.
  genId(links: Link[]): number {
    return links.length > 0 ? Math.max(...links.map(link => link.id)) + 1 : 11;
  }
}
