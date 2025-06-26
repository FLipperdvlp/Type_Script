// Завдання 1
let studentName: string = "Anna";
let studentAge: number = 22;
let isEnrolled: boolean = true;
let subjects: string[] = ["Math", "Physics", "Programming"];
let studentDetails: { id: number; email: string; year: number } = {
  id: 101,
  email: "anna@university.com",
  year: 2,
};

// Завдання 2
function multiply(a: number, b: number): number {
  return a * b;
}
const product1 = multiply(4, 5);
const product2 = multiply(2.5, 3);

// Завдання 3
const courses: string[] = ["TypeScript", "JavaScript", "React", "Node.js"];
function joinCourses(arr: string[]): string {
  return arr.join(", ");
}
const courseList = joinCourses(courses);

// Завдання 4
interface Course {
  title: string;
  duration: number;
  isRequired: boolean;
  students: number;
}
const typescriptCourse: Course = {
  title: "Advanced TypeScript",
  duration: 8,
  isRequired: true,
  students: 25,
};
function getCourseInfo(course: Course): string {
  return `${course.title} (${course.duration} тижнів)`;
}
const courseInfo = getCourseInfo(typescriptCourse);

// Завдання 5
function createStudent(name: string, age: number, isActive?: boolean) {
  return {
    name,
    age,
    isActive: isActive !== undefined ? isActive : true,
    enrollmentDate: new Date(),
  };
}
const student1 = createStudent("John", 20);
const student2 = createStudent("Mary", 22, false);

// Завдання 6
function displayId(id: number | string): string {
  return `ID: ${id}`;
}
const numericId = displayId(123);
const stringId = displayId("A123");

// Завдання 7
interface Student {
  id: number;
  name: string;
  grade: number;
}
const students: Student[] = [
  { id: 1, name: "John", grade: 85 },
  { id: 2, name: "Mary", grade: 92 },
  { id: 3, name: "Bob", grade: 78 },
];
function getHighestGrade(students: Student[]): number {
  return Math.max(...students.map((student) => student.grade));
}
const highestGrade = getHighestGrade(students);

// Завдання 8
interface Result {
  count: number;
  sum: number;
  average: number;
}
function calculateAverage(numbers: number[]): Result {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  return { count: numbers.length, sum, average };
}
const grades = [85, 92, 78, 90, 88];
const result = calculateAverage(grades);

// Завдання 9
function processData<T>(data: T, callback: (input: T) => T): T {
  return callback(data);
}
const numbersArray = [1, 2, 3, 4, 5];
const doubledNumbers = processData(numbersArray, (nums) => nums.map((n) => n * 2));

// Завдання 10
enum TaskStatus {
  Todo,
  InProgress,
  Completed,
}
function getTaskStatusText(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Todo:
      return "Завдання очікує виконання";
    case TaskStatus.InProgress:
      return "Завдання в процесі виконання";
    case TaskStatus.Completed:
      return "Завдання завершено";
    default:
      return "Невідомий статус";
  }
}
const todoStatus = getTaskStatusText(TaskStatus.Todo);
const inProgressStatus = getTaskStatusText(TaskStatus.InProgress);
const completedStatus = getTaskStatusText(TaskStatus.Completed);

// Завдання 11
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return String(value);
  }
}
const formattedString = formatValue("hello");
const formattedNumber = formatValue(42.1234);
const formattedBoolean = formatValue(true);

// Завдання 12
class Task {
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  complete(): this {
    this.completed = true;
    return this;
  }

  getStatus(): string {
    return this.completed ? "Завершено" : "В процесі";
  }
}
const task = new Task(1, "Вивчити TypeScript");
task.complete();
const status = task.getStatus();

// Завдання 13
class User {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  updateName(newName: string) {
    this.name = newName;
    // this.id = 2; // Помилка
  }
}
const userInstance = new User(1, "John");
userInstance.updateName("Jane");

// Завдання 14
interface UserData {
  id: number;
  name: string;
  email: string;
  age: number;
}
function updateUser(user: UserData, updates: Partial<UserData>): UserData {
  return { ...user, ...updates };
}
const user = { id: 1, name: "John", email: "john@example.com", age: 30 };
const updatedUser = updateUser(user, { age: 31 });

// Завдання 15
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  category: string;
}
function getProductBasicInfo(product: Pick<Product, "id" | "name" | "price">) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
  };
}
const product = {
  id: 1,
  name: "Laptop",
  price: 1000,
  description: "Powerful laptop for developers",
  inStock: true,
  category: "Electronics",
};
const basicInfo = getProductBasicInfo(product);

// Завдання 16
function createDictionary<T extends string, V>(keys: T[], value: V): Record<T, V> {
  const result: Record<T, V> = {} as Record<T, V>;
  keys.forEach((key) => {
    result[key] = value;
  });
  return result;
}
const statusDictionary = createDictionary(["draft", "published", "archived"], false);

// Завдання 17
function getFirstItem<T>(items: T[]): T {
  return items[0];
}
const firstNumber = getFirstItem([1, 2, 3]);
const firstString = getFirstItem(["a", "b", "c"]);
const firstObject = getFirstItem([{ id: 1 }, { id: 2 }]);

// Завдання 18
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user2 = {
  id: 1,
  name: "John",
  email: "john@example.com",
};
const userName = getProperty(user2, "name");
const userEmail = getProperty(user2, "email");

// Завдання 19
const defaultUser = {
  name: "",
  age: 0,
  isActive: false,
};
function createUser(data: Partial<typeof defaultUser>): typeof defaultUser {
  return { ...defaultUser, ...data };
}
const newUser = createUser({ name: "John", age: 30 });

// Завдання 20
function parseCoordinates(coords: string): [number, number] {
  const [x, y] = coords.split(",").map(Number);
  return [x, y];
}
const coordinates = parseCoordinates("10,20");
const [x, y] = coordinates;
