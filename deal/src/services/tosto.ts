//TYPESCRIPT TESTS. REMOVE IT!
import { pool } from '../db/db.js';

interface CheckResponse {
  exists: boolean;
}
function isCheckResponse(obj: unknown): obj is CheckResponse {
  return typeof obj === 'object' && obj !== null && 'exists' in obj;
}

async function checkApplicationIdExist(applicationID: number): Promise<unknown> {
  const text = 'select exists(select 1 from application where application_id = $1);';
  const values = [applicationID];
  const status = await pool
    .query(text, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((e) => {
      throw new Error(e.message);
    });
  //logger.info('loanOffer created');
  return status;
}

const status = await checkApplicationIdExist(21);

if (isCheckResponse(status)) {
  if (status.exists) {
    console.log('Yes, exists!');
  } else {
    console.log('No, does not exists!');
  }
} else {
  console.log('Something wrong happened!');
}
/*
interface Person {
  name: string;
  age: string;
}

function isPerson(obj: unknown): obj is Person {
  return typeof obj === 'object' && obj !== null && 'name' in obj && 'age' in obj;
}

const obj: unknown = {
  name: 'James',
  age: 30,
};

if (isPerson(obj)) {
  console.log(obj.name); // 👉️ "James"
  console.log(obj.age); // 👉️ 30
}*/

function tosto(): string {
  return 'Hello World';
}
let a: string | boolean;
a = tosto();
a = true;
console.log(a);

const array: Array<number | string> = [];
array.push(10);
array.push('Hello Kitty');

const c = function (): void {
  console.log('declaration');
};
c();

function tostor(): unknown {
  return 'Hello World';
}

const d: string = tostor() as string;
console.log(d);
/*
let direction: 'UP' | 'DOWN';
direction = 'UP';
//console.log(direction);*/

function sayHello(): void {
  console.log('hello');
}

class Person {
  constructor(readonly name: string, private isCool: boolean, protected email: string, public friends: number) {}

  sayMyName() {
    console.log(`Ты не Хайзенберг, ты ${this.name}`);
  }
}

const person1 = new Person('Менделеев', false, 'men@de.ru', 118);
console.log(person1.name); // Менделеев

type FavoriteColor = 'red' | 'blue' | 'green' | 'yellow';

//favoriteColor = 'blue';
//color: FavoriteColor = 'red';

type Lang = 'en' | 'ja' | 'pt';

function selectedLanguage(language: Lang): string {
  return language;
}

selectedLanguage('en');

type CardinalDirection = 'North' | 'East' | 'South' | 'West';

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North'); // Okay
//move(1, 'Nurth'); // Error!

type Numstr = number | string;
function rtturn(par: Numstr): Numstr {
  return par;
}

console.log(rtturn(10));

const par: Numstr = 10;
console.log(par);

class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  /**
   * name
   */
  public showName(): string {
    return this.name;
  }
}

interface CanBark {
  bark(): string;
}

class Dog extends Animal implements CanBark {
  public weight: number;
  constructor(name: string, weight: number) {
    super(name);
    this.weight = weight;
  }
  bark(): string {
    //throw new Error('Method not implemented.');
    return this.name;
  }
}

class Doggy extends Animal {
  public weight: number;
  constructor(name: string, weight: number) {
    super(name);
    this.weight = weight;
  }
}

const dog: Dog = new Dog('Kevin', 100);
const doggy: Doggy = new Doggy('NotKevin', 10);

class PersonPlus {
  name: string;
  constructor(userName: string) {
    this.name = userName;
  }
  print(): void {
    console.log(`Имя: ${this.name}`);
  }
}

class Employee extends PersonPlus {
  company: string;
  constructor(name: string, company: string) {
    super(name);
    this.company = company;
  }
  work(): void {
    console.log(`${this.name} работает в компании ${this.company}`);
  }
}

const bob: Employee = new Employee('Bob', 'Microsoft');
bob.work(); // Bob работает в компании Microsoft

const dogName = <T extends Animal & CanBark>(animal: T): string => {
  return animal.name;
};

const dogWeight = <T extends Dog>(animal: T): number => {
  return animal.weight;
};

console.log(dogName(dog));
console.log(dogWeight(dog));

//console.log(dogName(doggy)); //FAILED COS REQUIRES interface Bark
//console.log(dogWeight(doggy)); //FAILED COS REQUIRES be extended class DOG
