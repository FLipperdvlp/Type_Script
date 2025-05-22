# Завдання з типізації в TypeScript

## Дженерики

### Завдання 1: Типізація функції getRandomElement
Додайте правильну типізацію для функції `getRandomElement`, яка повертає випадковий елемент з масиву.

```typescript
// Додайте типізацію
function getRandomElement(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

// Приклад використання:
const numbers = [1, 2, 3, 4, 5];
const randomNumber = getRandomElement(numbers);

const strings = ["a", "b", "c"];
const randomString = getRandomElement(strings);
```

### Завдання 2: Типізація класу Storage
Додайте правильну типізацію для класу `Storage`, який зберігає дані різних типів.

```typescript
// Додайте типізацію
class Storage {
  private items;

  constructor() {
    this.items = {};
  }

  addItem(key, item) {
    this.items[key] = item;
  }

  getItem(key) {
    return this.items[key];
  }
}

// Приклад використання:
const storage = new Storage();
storage.addItem("user", { name: "John", age: 30 });
storage.addItem("settings", { theme: "dark", notifications: true });

const user = storage.getItem("user");
const settings = storage.getItem("settings");
```

### Завдання 3: Типізація функції merge
Додайте правильну типізацію для функції `merge`, яка об'єднує два об'єкти.

```typescript
// Додайте типізацію
function merge(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// Приклад використання:
const person = { name: "John" };
const details = { age: 30, job: "developer" };
const employee = merge(person, details);
```

### Завдання 4: Типізація функції filter
Додайте правильну типізацію для функції `filter`, яка фільтрує елементи масиву за умовою.

```typescript
// Додайте типізацію
function filter(array, predicate) {
  return array.filter(predicate);
}

// Приклад використання:
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, n => n % 2 === 0);

const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Bob", age: 40 }
];
const adults = filter(users, user => user.age >= 30);
```

### Завдання 5: Типізація функції createPair
Додайте правильну типізацію для функції `createPair`, яка створює пару з двох значень різних типів.

```typescript
// Додайте типізацію
function createPair(first, second) {
  return { first, second };
}

// Приклад використання:
const pair1 = createPair("hello", 42);
const pair2 = createPair(10, { name: "John" });
```

## Оператори keyof і typeof

### Завдання 6: Типізація функції getProperty
Додайте правильну типізацію для функції `getProperty`, яка повертає значення властивості об'єкта за ключем.

```typescript
// Додайте типізацію
function getProperty(obj, key) {
  return obj[key];
}

// Приклад використання:
const user = { id: 1, name: "John", age: 30 };
const userName = getProperty(user, "name");
const userAge = getProperty(user, "age");
```

### Завдання 7: Типізація функції mapObject
Додайте правильну типізацію для функції `mapObject`, яка перетворює значення об'єкта.

```typescript
// Додайте типізацію
function mapObject(obj, transformer) {
  const result = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = transformer(obj[key]);
    }
  }
  
  return result;
}

// Приклад використання:
const user = { id: 1, name: "John", age: 30 };
const userWithUpperCase = mapObject(user, value => 
  typeof value === "string" ? value.toUpperCase() : value
);
```

### Завдання 8: Типізація функції createEnum
Додайте правильну типізацію для функції `createEnum`, яка створює об'єкт-перелік.

```typescript
// Додайте типізацію
function createEnum(values) {
  const enumObject = {};
  
  for (const val of values) {
    enumObject[val] = val;
  }
  
  return enumObject;
}

// Приклад використання:
const Colors = createEnum(["RED", "GREEN", "BLUE"]);
const Directions = createEnum(["NORTH", "SOUTH", "EAST", "WEST"]);
```

### Завдання 9: Типізація функції pick
Додайте правильну типізацію для функції `pick`, яка вибирає властивості з об'єкта.

```typescript
// Додайте типізацію
function pick(obj, keys) {
  const result = {};
  
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

// Приклад використання:
const user = { id: 1, name: "John", age: 30, email: "john@example.com" };
const userBasicInfo = pick(user, ["id", "name"]);
```

### Завдання 10: Типізація функції hasRequiredProperties
Додайте правильну типізацію для функції `hasRequiredProperties`, яка перевіряє наявність обов'язкових властивостей в об'єкті.

```typescript
// Додайте типізацію
function hasRequiredProperties(obj, requiredProps) {
  return requiredProps.every(prop => prop in obj);
}

// Приклад використання:
const user1 = { id: 1, name: "John" };
const user2 = { name: "Jane" };
const isValid1 = hasRequiredProperties(user1, ["id", "name"]); // true
const isValid2 = hasRequiredProperties(user2, ["id", "name"]); // false
```

## Утиліти типів

### Завдання 11: Типізація функції createState
Додайте правильну типізацію для функції `createState`, яка створює об'єкт стану.

```typescript
// Додайте типізацію (використовуйте Partial, Readonly або інші утиліти)
function createState(initialState) {
  let state = { ...initialState };
  
  function setState(newState) {
    state = { ...state, ...newState };
    return state;
  }
  
  function getState() {
    return { ...state };
  }
  
  return { setState, getState };
}

// Приклад використання:
const userState = createState({ name: "John", age: 30 });
userState.setState({ age: 31 });
const currentState = userState.getState();
```

### Завдання 12: Типізація функції createAPI
Додайте правильну типізацію для функції `createAPI`, яка створює API-клієнт.

```typescript
// Додайте типізацію (використовуйте Record, Pick або інші утиліти)
function createAPI(baseURL) {
  return {
    get(endpoint) {
      return fetch(`${baseURL}${endpoint}`).then(res => res.json());
    },
    post(endpoint, data) {
      return fetch(`${baseURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(res => res.json());
    }
  };
}

// Приклад використання:
const api = createAPI("https://api.example.com");
api.get("/users").then(users => console.log(users));
api.post("/users", { name: "John", age: 30 }).then(user => console.log(user));
```

### Завдання 13: Типізація функції createReducer
Додайте правильну типізацію для функції `createReducer`, яка створює редюсер для керування станом.

```typescript
// Додайте типізацію (використовуйте утиліти типів)
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

// Приклад використання:
const initialState = { count: 0 };

const counterReducer = createReducer(initialState, {
  INCREMENT: state => ({ ...state, count: state.count + 1 }),
  DECREMENT: state => ({ ...state, count: state.count - 1 }),
  SET_COUNT: (state, action) => ({ ...state, count: action.payload })
});

const state1 = counterReducer(undefined, { type: "INCREMENT" });
const state2 = counterReducer(state1, { type: "SET_COUNT", payload: 10 });
```

### Завдання 14: Типізація функції createValidator
Додайте правильну типізацію для функції `createValidator`, яка створює валідатор для об'єкта.

```typescript
// Додайте типізацію (використовуйте утиліти типів)
function createValidator(schema) {
  return function validate(data) {
    const errors = {};
    
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const validator = schema[key];
        const value = data[key];
        
        if (!validator(value)) {
          errors[key] = `Invalid value for ${key}`;
        }
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };
}

// Приклад використання:
const userValidator = createValidator({
  name: value => typeof value === "string" && value.length > 0,
  age: value => typeof value === "number" && value >= 18
});

const validationResult = userValidator({ name: "John", age: 30 });
```

### Завдання 15: Типізація функції createStore
Додайте правильну типізацію для функції `createStore`, яка створює простий стор для керування станом.

```typescript
// Додайте типізацію (використовуйте утиліти типів)
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];
  
  function getState() {
    return state;
  }
  
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  }
  
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }
  
  return { getState, dispatch, subscribe };
}

// Приклад використання:
const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer, initialState);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: "INCREMENT" });
```

## Утвердження типів

### Завдання 16: Типізація функції parseJSON
Додайте правильну типізацію для функції `parseJSON`, яка безпечно парсить JSON.

```typescript
// Додайте типізацію з використанням утвердження типів
function parseJSON(json) {
  try {
    return {
      success: true,
      data: JSON.parse(json)
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
}

// Приклад використання:
const result1 = parseJSON('{"name": "John", "age": 30}');
const result2 = parseJSON('invalid json');

if (result1.success) {
  console.log(result1.data.name);
}
```

### Завдання 17: Типізація функції getElementById
Додайте правильну типізацію для функції `getElementById`, яка повертає елемент DOM.

```typescript
// Додайте типізацію з використанням утвердження типів
function getElementById(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found`);
  }
  return element;
}

// Приклад використання:
const button = getElementById("submit-button");
button.addEventListener("click", () => console.log("Clicked!"));

const input = getElementById("username-input");
console.log(input.value);
```

### Завдання 18: Типізація функції tryExecute
Додайте правильну типізацію для функції `tryExecute`, яка безпечно виконує функцію.

```typescript
// Додайте типізацію з використанням утвердження типів
function tryExecute(fn, ...args) {
  try {
    return {
      success: true,
      result: fn(...args)
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
}

// Приклад використання:
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

const result1 = tryExecute(divide, 10, 2);
const result2 = tryExecute(divide, 10, 0);

if (result1.success) {
  console.log(result1.result);
}
```

### Завдання 19: Типізація функції createConstObject
Додайте правильну типізацію для функції `createConstObject`, яка створює незмінний об'єкт.

```typescript
// Додайте типізацію з використанням утвердження типів
function createConstObject(obj) {
  return Object.freeze(obj);
}

// Приклад використання:
const config = createConstObject({
  api: {
    url: "https://api.example.com",
    version: "v1"
  },
  timeout: 5000
});

// config.timeout = 3000; // Має викликати помилку TypeScript
```

### Завдання 20: Типізація функції isOfType
Додайте правильну типізацію для функції `isOfType`, яка перевіряє тип значення.

```typescript
// Додайте типізацію з використанням утвердження типів
function isOfType(value, type) {
  return typeof value === type;
}

// Приклад використання:
const value1 = "hello";
const value2 = 42;

if (isOfType(value1, "string")) {
  console.log(value1.toUpperCase());
}

if (isOfType(value2, "number")) {
  console.log(value2.toFixed(2));
}
```

## Бонусне завдання

### Завдання 21: Типізація функції createFormValidator
Додайте правильну типізацію для функції `createFormValidator`, яка створює валідатор для форми.

```typescript
// Додайте типізацію з використанням всіх вивчених концепцій
function createFormValidator(validationRules) {
  return {
    validate(formData) {
      const errors = {};
      
      for (const field in validationRules) {
        if (validationRules.hasOwnProperty(field)) {
          const rules = validationRules[field];
          const value = formData[field];
          
          for (const rule of rules) {
            const { validator, message } = rule;
            
            if (!validator(value)) {
              if (!errors[field]) {
                errors[field] = [];
              }
              errors[field].push(message);
              break;
            }
          }
        }
      }
      
      return {
        valid: Object.keys(errors).length === 0,
        errors
      };
    }
  };
}

// Приклад використання:
const userFormValidator = createFormValidator({
  username: [
    { 
      validator: value => typeof value === "string" && value.length >= 3,
      message: "Username must be at least 3 characters long"
    }
  ],
  email: [
    {
      validator: value => typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format"
    }
  ],
  age: [
    {
      validator: value => typeof value === "number" && value >= 18,
      message: "You must be at least 18 years old"
    }
  ]
});

const validationResult = userFormValidator.validate({
  username: "john",
  email: "john@example.com",
  age: 30
});

if (!validationResult.valid) {
  console.log(validationResult.errors);
}
```
