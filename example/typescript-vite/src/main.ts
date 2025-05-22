import "./style.css";

//! Оператори keyof і typeof у TypeScript

//? Літеральні типи

// У TypeScript літеральні типи - це більш конкретні типи рядків, чисел або логічних значень.

// let direction: "left" | "right" | "up" | "down";

// direction = "left";
// direction = "right";
// direction = "up";
// direction = "down";

// type Direction = "left" | "right" | "up" | "down";

// let direction2: Direction;
// direction2 = "left";
// direction2 = "right";
// direction2 = "up";
// direction2 = "down";

//? Оператор keyof

// Оператор `keyof` використовується для отримання ключів будь-якого типу у вигляді union типу.

// interface User {
//   name: string;
//   age: number;
// }

// type UserKeys = keyof User; // "name" | "age"
// let prop: UserKeys = "name"; // або "age"

// prop = "age";
// prop = "name";
// prop = "sdfdf";

// class Person {
//   public name: string;
//   public age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const person: Person = {
//   name: "John",
//   age: 30,
// };

// console.log(person.name);
// console.log(person.age);

// type PersonKeys = keyof Person; // "name" | "age"
// let prop: PersonKeys = "name"; // або "age"

// prop = "age";
// prop = "name";

//? Оператор typeof

// Оператор `typeof` у TypeScript відрізняється від `typeof` у JavaScript. У TypeScript він використовується для отримання типу змінної.

// const person = {
//   name: "John",
//   age: 30,
// };

// type Person = typeof person;

// const person2: Person = {
//   name: "John",
//   age: 30,
// };

// console.log(person2.name);
// console.log(person2.age);

//? Комбінування keyof і typeof

// const person = {
//   name: "John",
//   age: 30,
// };

// type Person = typeof person;

// type PersonKeys = keyof Person;

// let prop: PersonKeys = "name";
// prop = "age";
// // prop = "sdfdf";

//! Дженерики

// Дженерики (Generics) — це параметризовані типи, які дозволяють створювати компоненти, що можуть працювати з різними типами даних, зберігаючи при цьому типову безпеку.

// Дженерики оголошуються за допомогою кутових дужок `<>`:

// Розглянемо проблему, яку вирішують дженерики. Уявіть, що ви хочете створити функцію, яка повертає рандомний елемент масиву:

// function getRandomElement(arr: number[]): number {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// console.log(getRandomElement([1, 2, 3]));
// console.log(getRandomElement(["a", "b", "c"]));
// console.log(getRandomElement([true, false]));

// Розглянемо ще одну проблему, яку вирішують дженерики:
// interface User {
//   name: string;
//   age: number;
// }

// interface Message {
//   text: string;
// }

// // Без дженериків
// interface UserState {
//   loading: boolean;
//   error: Error | null;
//   data: User;
// }

// interface MessageState {
//   loading: boolean;
//   error: Error | null;
//   data: Message;
// }

// З дженериками

//? Обмеження дженериків

// Іноді потрібно обмежити типи, які можуть використовуватися як дженерик-параметри. Це можна зробити за допомогою ключового слова `extends`:

// Функція, яка приймає об'єкт та повертає його довжину
// function getLength(item) {
//   return item.length;
// }

// console.log(getLength("string"));
// console.log(getLength([1, 2, 3]));
// console.log(getLength(123));

// // Функція, яка об'єднує два об'єкти
// function merge(obj1, obj2) {
//   return { ...obj1, ...obj2 };
// }

// console.log(merge({ name: "John" }, { age: 30 }));

//! TypeScript Utility Types
