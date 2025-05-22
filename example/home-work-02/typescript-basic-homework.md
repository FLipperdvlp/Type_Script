# Домашня робота з TypeScript

## Завдання 1: Типізація змінних
Додайте правильні типи для змінних.

```typescript
// Додайте типи для змінних
let studentName = "Anna";
let studentAge = 22;
let isEnrolled = true;
let subjects = ["Math", "Physics", "Programming"];
let studentDetails = {
  id: 101,
  email: "anna@university.com",
  year: 2
};
```

## Завдання 2: Типізація функції множення
Додайте типи для параметрів та результату функції.

```typescript
// Додайте типи
function multiply(a, b) {
  return a * b;
}

// Приклад використання:
const product1 = multiply(4, 5);
const product2 = multiply(2.5, 3);
```

## Завдання 3: Типізація масиву
Додайте типізацію для масиву рядків.

```typescript
// Додайте типи
const courses = ["TypeScript", "JavaScript", "React", "Node.js"];

function joinCourses(arr) {
  return arr.join(", ");
}

// Приклад використання:
const courseList = joinCourses(courses);
```

## Завдання 4: Типізація об'єкта
Створіть інтерфейс для об'єкта курсу.

```typescript
// Створіть інтерфейс Course
// Додайте типи для об'єкта

const typescriptCourse = {
  title: "Advanced TypeScript",
  duration: 8,
  isRequired: true,
  students: 25
};

function getCourseInfo(course) {
  return `${course.title} (${course.duration} тижнів)`;
}

// Приклад використання:
const courseInfo = getCourseInfo(typescriptCourse);
```

## Завдання 5: Типізація функції з необов'язковими параметрами
Додайте типи для функції з необов'язковими параметрами.

```typescript
// Додайте типи
function createStudent(name, age, isActive) {
  return {
    name,
    age,
    isActive: isActive !== undefined ? isActive : true,
    enrollmentDate: new Date()
  };
}

// Приклад використання:
const student1 = createStudent("John", 20);
const student2 = createStudent("Mary", 22, false);
```

## Завдання 6: Типізація функції з кількома типами
Додайте типи для функції, яка може приймати різні типи даних.

```typescript
// Додайте типи
function displayId(id) {
  if (typeof id === "number") {
    return `ID: ${id}`;
  } else {
    return `ID: ${id}`;
  }
}

// Приклад використання:
const numericId = displayId(123);
const stringId = displayId("A123");
```

## Завдання 7: Типізація масиву об'єктів
Додайте типи для масиву об'єктів.

```typescript
// Створіть інтерфейс Student
// Додайте типи для масиву

const students = [
  { id: 1, name: "John", grade: 85 },
  { id: 2, name: "Mary", grade: 92 },
  { id: 3, name: "Bob", grade: 78 }
];

function getHighestGrade(students) {
  return Math.max(...students.map(student => student.grade));
}

// Приклад використання:
const highestGrade = getHighestGrade(students);
```

## Завдання 8: Типізація функції з типом результату
Додайте типи для функції, яка повертає об'єкт певного типу.

```typescript
// Створіть інтерфейс Result
// Додайте типи для функції

function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  
  return {
    count: numbers.length,
    sum: sum,
    average: average
  };
}

// Приклад використання:
const grades = [85, 92, 78, 90, 88];
const result = calculateAverage(grades);
```

## Завдання 9: Типізація функції з callback
Додайте типи для функції, яка приймає callback-функцію.

```typescript
// Додайте типи
function processData(data, callback) {
  return callback(data);
}

// Приклад використання:
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = processData(numbers, nums => nums.map(n => n * 2));
```

## Завдання 10: Типізація enum
Створіть enum для статусів завдань та типізуйте функцію.

```typescript
// Створіть enum TaskStatus
// Додайте типи для функції

function getTaskStatusText(status) {
  switch (status) {
    case 0: // TODO: використайте enum замість чисел
      return "Завдання очікує виконання";
    case 1:
      return "Завдання в процесі виконання";
    case 2:
      return "Завдання завершено";
    default:
      return "Невідомий статус";
  }
}

// Приклад використання:
const todoStatus = getTaskStatusText(0);
const inProgressStatus = getTaskStatusText(1);
const completedStatus = getTaskStatusText(2);
```

## Завдання 11: Типізація об'єднаних типів
Додайте типи для функції, яка може приймати різні типи даних.

```typescript
// Додайте типи
function formatValue(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return String(value);
  }
}

// Приклад використання:
const formattedString = formatValue("hello");
const formattedNumber = formatValue(42.1234);
const formattedBoolean = formatValue(true);
```

## Завдання 12: Типізація класу
Додайте типи для властивостей та методів класу.

```typescript
// Додайте типи
class Task {
  id;
  title;
  completed;
  
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }
  
  complete() {
    this.completed = true;
    return this;
  }
  
  getStatus() {
    return this.completed ? "Завершено" : "В процесі";
  }
}

// Приклад використання:
const task = new Task(1, "Вивчити TypeScript");
task.complete();
const status = task.getStatus();
```

## Завдання 13: Типізація readonly властивостей
Додайте типи для класу з readonly властивостями.

```typescript
// Додайте типи з readonly властивостями
class User {
  id;
  name;
  
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  
  updateName(newName) {
    this.name = newName;
    // this.id = 2; // Це має викликати помилку компіляції
  }
}

// Приклад використання:
const user = new User(1, "John");
user.updateName("Jane");
```

## Завдання 14: Типізація з використанням Partial
Додайте типи для функції оновлення об'єкта.

```typescript
// Створіть інтерфейс User
// Додайте типи для функції з використанням Partial

function updateUser(user, updates) {
  return { ...user, ...updates };
}

// Приклад використання:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30
};

const updatedUser = updateUser(user, { age: 31 });
```

## Завдання 15: Типізація з використанням Pick
Додайте типи для функції, яка вибирає певні властивості об'єкта.

```typescript
// Створіть інтерфейс Product
// Додайте типи для функції з використанням Pick

function getProductBasicInfo(product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price
  };
}

// Приклад використання:
const product = {
  id: 1,
  name: "Laptop",
  price: 1000,
  description: "Powerful laptop for developers",
  inStock: true,
  category: "Electronics"
};

const basicInfo = getProductBasicInfo(product);
```

## Завдання 16: Типізація з використанням Record
Додайте типи для об'єкта з динамічними ключами.

```typescript
// Додайте типи з використанням Record
function createDictionary(keys, value) {
  const result = {};
  
  keys.forEach(key => {
    result[key] = value;
  });
  
  return result;
}

// Приклад використання:
const statusDictionary = createDictionary(["draft", "published", "archived"], false);
```

## Завдання 17: Типізація з використанням generics
Додайте типи для функції, яка працює з різними типами даних.

```typescript
// Додайте типи з використанням generics
function getFirstItem(items) {
  return items[0];
}

// Приклад використання:
const numbers = [1, 2, 3];
const firstNumber = getFirstItem(numbers);

const strings = ["a", "b", "c"];
const firstString = getFirstItem(strings);

const objects = [{ id: 1 }, { id: 2 }];
const firstObject = getFirstItem(objects);
```

## Завдання 18: Типізація з використанням keyof
Додайте типи для функції, яка отримує значення за ключем.

```typescript
// Додайте типи з використанням keyof
function getProperty(obj, key) {
  return obj[key];
}

// Приклад використання:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

const userName = getProperty(user, "name");
const userEmail = getProperty(user, "email");
```

## Завдання 19: Типізація з використанням typeof
Додайте типи для функції, яка створює об'єкт на основі іншого об'єкта.

```typescript
// Додайте типи з використанням typeof
const defaultUser = {
  name: "",
  age: 0,
  isActive: false
};

function createUser(data) {
  return { ...defaultUser, ...data };
}

// Приклад використання:
const newUser = createUser({ name: "John", age: 30 });
```

## Завдання 20: Типізація з використанням tuple
Додайте типи для функції, яка повертає кортеж.

```typescript
// Додайте типи з використанням tuple
function parseCoordinates(coords) {
  const [x, y] = coords.split(",").map(Number);
  return [x, y];
}

// Приклад використання:
const coordinates = parseCoordinates("10,20");
const [x, y] = coordinates;
```
