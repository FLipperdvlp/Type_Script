# Класи в TypeScript

TypeScript підтримує класи та об'єктно-орієнтоване програмування, додаючи статичну типізацію та інші корисні функції до класів JavaScript.

## Основи класів

Ось простий приклад класу в TypeScript:

```typescript
class Person {
  // Властивості класу
  name: string;
  age: number;

  // Конструктор
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Метод
  greet(): string {
    return `Привіт, мене звати ${this.name} і мені ${this.age} років`;
  }
}

// Створення екземпляра класу
const person = new Person("Іван", 30);
console.log(person.greet()); // "Привіт, мене звати Іван і мені 30 років"
```

## Модифікатори доступу

TypeScript додає модифікатори доступу до властивостей та методів класу:

- `public` - доступ з будь-якого місця (за замовчуванням)
- `private` - доступ тільки всередині класу
- `protected` - доступ всередині класу та в похідних класах

```typescript
class Person {
  public name: string;
  private age: number;
  protected address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  public greet(): string {
    return `Привіт, мене звати ${this.name}`;
  }

  private getAge(): number {
    return this.age;
  }

  protected getAddress(): string {
    return this.address;
  }
}

const person = new Person("Іван", 30, "Київ");
console.log(person.name); // "Іван"
// console.log(person.age); // Помилка: Property 'age' is private
// console.log(person.address); // Помилка: Property 'address' is protected
console.log(person.greet()); // "Привіт, мене звати Іван"
// console.log(person.getAge()); // Помилка: Property 'getAge' is private
// console.log(person.getAddress()); // Помилка: Property 'getAddress' is protected
```

## Скорочений синтаксис ініціалізації властивостей

TypeScript дозволяє скоротити ініціалізацію властивостей класу за допомогою модифікаторів доступу в конструкторі:

```typescript
class Person {
  // Скорочений синтаксис з модифікаторами доступу в конструкторі
  constructor(
    public name: string,
    private age: number,
    protected address: string
  ) {}

  public greet(): string {
    return `Привіт, мене звати ${this.name} і мені ${this.age} років`;
  }
}

const person = new Person("Іван", 30, "Київ");
console.log(person.greet()); // "Привіт, мене звати Іван і мені 30 років"
```

## Наслідування

TypeScript підтримує наслідування класів за допомогою ключового слова `extends`:

```typescript
class Person {
  constructor(public name: string, public age: number) {}

  greet(): string {
    return `Привіт, мене звати ${this.name}`;
  }
}

class Employee extends Person {
  constructor(
    name: string,
    age: number,
    public position: string
  ) {
    // Виклик конструктора батьківського класу
    super(name, age);
  }

  // Перевизначення методу батьківського класу
  greet(): string {
    return `${super.greet()}. Я працюю як ${this.position}`;
  }

  // Додатковий метод
  work(): string {
    return `${this.name} працює як ${this.position}`;
  }
}

const employee = new Employee("Іван", 30, "розробник");
console.log(employee.greet()); // "Привіт, мене звати Іван. Я працюю як розробник"
console.log(employee.work()); // "Іван працює як розробник"
```

## Абстрактні класи

Абстрактні класи не можуть бути інстанційовані безпосередньо, вони призначені для наслідування:

```typescript
abstract class Animal {
  constructor(public name: string) {}

  // Абстрактний метод (повинен бути реалізований у похідних класах)
  abstract makeSound(): string;

  // Звичайний метод
  move(): string {
    return `${this.name} рухається`;
  }
}

class Dog extends Animal {
  // Реалізація абстрактного методу
  makeSound(): string {
    return "Гав-гав!";
  }

  // Додатковий метод
  fetch(): string {
    return `${this.name} приносить м'яч`;
  }
}

// const animal = new Animal("Тварина"); // Помилка: Cannot create an instance of an abstract class
const dog = new Dog("Рекс");
console.log(dog.name); // "Рекс"
console.log(dog.makeSound()); // "Гав-гав!"
console.log(dog.move()); // "Рекс рухається"
console.log(dog.fetch()); // "Рекс приносить м'яч"
```

## Реалізація інтерфейсів

Класи можуть реалізовувати інтерфейси за допомогою ключового слова `implements`:

```typescript
interface Vehicle {
  brand: string;
  year: number;
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  constructor(public brand: string, public year: number) {}

  start(): void {
    console.log(`${this.brand} запущено`);
  }

  stop(): void {
    console.log(`${this.brand} зупинено`);
  }

  // Додатковий метод
  honk(): void {
    console.log("Бііп!");
  }
}

const car = new Car("Toyota", 2020);
car.start(); // "Toyota запущено"
car.honk(); // "Бііп!"
car.stop(); // "Toyota зупинено"
```

Клас може реалізовувати кілька інтерфейсів:

```typescript
interface Engine {
  start(): void;
  stop(): void;
}

interface Lockable {
  lock(): void;
  unlock(): void;
}

class Car implements Engine, Lockable {
  constructor(public brand: string) {}

  start(): void {
    console.log(`${this.brand} запущено`);
  }

  stop(): void {
    console.log(`${this.brand} зупинено`);
  }

  lock(): void {
    console.log(`${this.brand} заблоковано`);
  }

  unlock(): void {
    console.log(`${this.brand} розблоковано`);
  }
}

const car = new Car("Toyota");
car.unlock(); // "Toyota розблоковано"
car.start(); // "Toyota запущено"
car.stop(); // "Toyota зупинено"
car.lock(); // "Toyota заблоковано"
```

## Статичні властивості та методи

Статичні властивості та методи належать класу, а не його екземплярам:

```typescript
class MathUtils {
  // Статична властивість
  static PI: number = 3.14159;

  // Статичний метод
  static calculateCircleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }

  // Звичайний метод (не статичний)
  calculateCircumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

// Доступ до статичних членів через клас
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.calculateCircleArea(5)); // 78.53975

// Для виклику не статичного методу потрібен екземпляр
const utils = new MathUtils();
console.log(utils.calculateCircumference(5)); // 31.4159
```

## Геттери та сеттери

TypeScript підтримує геттери та сеттери для властивостей класу:

```typescript
class Person {
  private _age: number;

  constructor(public name: string, age: number) {
    this._age = age;
  }

  // Геттер
  get age(): number {
    return this._age;
  }

  // Сеттер
  set age(value: number) {
    if (value < 0) {
      throw new Error("Вік не може бути від'ємним");
    }
    this._age = value;
  }
}

const person = new Person("Іван", 30);
console.log(person.age); // 30 (виклик геттера)
person.age = 31; // виклик сеттера
console.log(person.age); // 31
// person.age = -5; // Помилка: Вік не може бути від'ємним
```

## Readonly властивості

Властивості тільки для читання можуть бути встановлені тільки при створенні об'єкта:

```typescript
class Person {
  readonly name: string;
  readonly birthDate: Date;

  constructor(name: string, birthDate: Date) {
    this.name = name;
    this.birthDate = birthDate;
  }

  // Метод, який намагається змінити readonly властивість
  changeName(newName: string): void {
    // this.name = newName; // Помилка: Cannot assign to 'name' because it is a read-only property
  }
}

const person = new Person("Іван", new Date(1990, 0, 1));
console.log(person.name); // "Іван"
// person.name = "Петро"; // Помилка: Cannot assign to 'name' because it is a read-only property
```

## Класи як типи

В TypeScript класи також можуть використовуватися як типи:

```typescript
class Point {
  constructor(public x: number, public y: number) {}

  distanceFromOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

// Використання класу як типу
function printPoint(point: Point): void {
  console.log(`Координати: (${point.x}, ${point.y})`);
  console.log(`Відстань від початку координат: ${point.distanceFromOrigin()}`);
}

const point = new Point(3, 4);
printPoint(point);
// "Координати: (3, 4)"
// "Відстань від початку координат: 5"
```

## Дженерик класи

Класи можуть бути параметризовані типами, так само як і функції:

```typescript
class Box<T> {
  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }

  setContent(content: T): void {
    this.content = content;
  }
}

// Створення екземплярів з різними типами
const numberBox = new Box<number>(42);
console.log(numberBox.getContent()); // 42

const stringBox = new Box<string>("Hello");
console.log(stringBox.getContent()); // "Hello"

// TypeScript може визначити тип автоматично
const booleanBox = new Box(true);
console.log(booleanBox.getContent()); // true
```


## Висновок

Класи в TypeScript надають потужні можливості для об'єктно-орієнтованого програмування з додатковими перевагами статичної типізації. Модифікатори доступу, абстрактні класи, інтерфейси, геттери/сеттери та інші функції TypeScript допомагають створювати надійний та зрозумілий код.

У наступному розділі ми розглянемо дженерики в TypeScript, які дозволяють створювати компоненти, що працюють з різними типами даних.
