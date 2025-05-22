# TypeScript з React

React є однією з найпопулярніших бібліотек для створення користувацьких інтерфейсів, а TypeScript додає статичну типізацію, що робить розробку більш надійною. У цьому розділі ми розглянемо, як використовувати TypeScript з React.

## Налаштування проекту React з TypeScript

### Створення нового проекту

Найпростіший спосіб створити новий проект React з TypeScript - використати Create React App:

```bash
npx create-react-app my-app --template typescript
```

Або з використанням Vite (більш швидкий інструмент збірки):

```bash
npm create vite@latest my-app -- --template react-ts
```

### Додавання TypeScript до існуючого проекту React

Якщо у вас вже є проект React, ви можете додати TypeScript:

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

Потім створіть файл `tsconfig.json` в кореневій директорії проекту:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## Основи TypeScript в React

### Функціональні компоненти

```tsx
// Простий функціональний компонент
import React from 'react';

// Визначення типу пропсів
interface GreetingProps {
  name: string;
  age?: number; // Необов'язковий проп
}

// Функціональний компонент з типізованими пропсами
const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Привіт, {name}!</h1>
      {age !== undefined && <p>Вам {age} років</p>}
    </div>
  );
};

export default Greeting;
```

Використання компонента:

```tsx
import React from 'react';
import Greeting from './Greeting';

const App: React.FC = () => {
  return (
    <div>
      <Greeting name="Іван" age={30} />
      <Greeting name="Марія" />
    </div>
  );
};

export default App;
```

### Класові компоненти

```tsx
import React, { Component } from 'react';

// Визначення типів пропсів та стану
interface CounterProps {
  initialCount: number;
}

interface CounterState {
  count: number;
}

// Класовий компонент з типізованими пропсами та станом
class Counter extends Component<CounterProps, CounterState> {
  // Значення за замовчуванням для пропсів
  static defaultProps: Partial<CounterProps> = {
    initialCount: 0
  };

  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialCount
    };
  }

  increment = (): void => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  decrement = (): void => {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
  };

  render() {
    return (
      <div>
        <h2>Лічильник: {this.state.count}</h2>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

export default Counter;
```

## Хуки з TypeScript

### useState

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // Простий useState з примітивним типом
  const [count, setCount] = useState<number>(0);

  // useState з об'єктом
  const [user, setUser] = useState<{ name: string; age: number }>({ name: '', age: 0 });

  // useState з union типом
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <div>
      <h2>Лічильник: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      
      <div>
        <input
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
          placeholder="Ім'я"
        />
        <input
          type="number"
          value={user.age}
          onChange={e => setUser({ ...user, age: parseInt(e.target.value) || 0 })}
          placeholder="Вік"
        />
      </div>
      
      <div>
        <p>Статус: {status}</p>
        <button onClick={() => setStatus('loading')}>Завантаження</button>
        <button onClick={() => setStatus('success')}>Успіх</button>
        <button onClick={() => setStatus('error')}>Помилка</button>
      </div>
    </div>
  );
};

export default Counter;
```

### useEffect

```tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Функція для завантаження даних користувача
    const fetchUser = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Невідома помилка');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Залежність від userId

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!user) return <div>Користувача не знайдено</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
```

### useRef

```tsx
import React, { useRef, useEffect } from 'react';

const TextInputWithFocus: React.FC = () => {
  // Типізація useRef для HTML елементів
  const inputRef = useRef<HTMLInputElement>(null);

  // Типізація useRef для примітивних значень
  const countRef = useRef<number>(0);

  useEffect(() => {
    // Фокусування на інпуті при монтуванні компонента
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Збільшення лічильника при кожному рендері
    countRef.current += 1;
    console.log(`Компонент рендерився ${countRef.current} разів`);
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Цей інпут отримає фокус" />
    </div>
  );
};

export default TextInputWithFocus;
```

### useReducer

```tsx
import React, { useReducer } from 'react';

// Визначення типів для стану та дій
interface State {
  count: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset'; payload: number };

// Редюсер з типізацією
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload };
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  // useReducer з типізованим редюсером
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>Лічильник: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>Скинути</button>
    </div>
  );
};

export default Counter;
```

### useContext

```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Визначення типу для контексту
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Створення контексту з початковим значенням
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Провайдер контексту
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для використання контексту
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Компонент, що використовує контекст
const ThemedButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px 20px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      Поточна тема: {theme}. Натисніть, щоб змінити.
    </button>
  );
};

// Використання провайдера
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Додаток з темою</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};

export default App;
```

## Обробка подій

```tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Типізований обробник зміни інпута
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Валідація форми
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некоректний email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Повідомлення обов'язкове";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Типізований обробник відправки форми
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (validateForm()) {
      // Відправка даних на сервер
      console.log('Дані форми:', formData);
      
      // Очищення форми
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Ім'я:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="message">Повідомлення:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
      </div>
      
      <button type="submit">Відправити</button>
    </form>
  );
};

export default ContactForm;
```

## Типізація пропсів для дочірніх елементів

```tsx
import React, { ReactNode } from 'react';

// Варіант 1: використання ReactNode
interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

// Варіант 2: використання JSX.Element
interface ButtonProps {
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

// Використання
const App: React.FC = () => {
  return (
    <div>
      <Card title="Привіт, світ!">
        <p>Це дочірній елемент Card компонента.</p>
        <p>Можна додати будь-який вміст.</p>
      </Card>
      
      <Button onClick={() => console.log('Кнопку натиснуто')}>
        <span>Натисни мене</span>
      </Button>
    </div>
  );
};

export default App;
```

## Типізація API запитів

```tsx
import React, { useState, useEffect } from 'react';

// Визначення типів для даних API
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Типізація відповіді API
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

// Функція для виконання типізованих запитів
async function api<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: T = await response.json();
  
  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  };
}

const PostsWithComments: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Завантаження постів
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data.slice(0, 10)); // Обмеження до 10 постів
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Невідома помилка');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Завантаження коментарів при виборі поста
  useEffect(() => {
    if (selectedPost) {
      const fetchComments = async () => {
        try {
          setLoading(true);
          const response = await api<Comment[]>(
            `https://jsonplaceholder.typicode.com/posts/${selectedPost.id}/comments`
          );
          setComments(response.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Невідома помилка');
        } finally {
          setLoading(false);
        }
      };

      fetchComments();
    } else {
      setComments([]);
    }
  }, [selectedPost]);

  if (loading && posts.length === 0) return <div>Завантаження постів...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div>
      <h1>Пости</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {posts.map(post => (
            <div
              key={post.id}
              style={{
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: selectedPost?.id === post.id ? '#f0f0f0' : 'white'
              }}
              onClick={() => setSelectedPost(post)}
            >
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
        
        {selectedPost && (
          <div style={{ flex: 1, padding: '0 20px' }}>
            <h2>Коментарі до "{selectedPost.title}"</h2>
            {loading ? (
              <div>Завантаження коментарів...</div>
            ) : (
              <div>
                {comments.map(comment => (
                  <div key={comment.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #eee' }}>
                    <h4>{comment.name}</h4>
                    <p><em>{comment.email}</em></p>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsWithComments;
```

## Висновок

TypeScript додає статичну типізацію до React додатків, що допомагає виявляти помилки на етапі компіляції, покращує автодоповнення в IDE та робить код більш надійним. Основні переваги використання TypeScript з React:

1. **Типізація пропсів та стану** - запобігає передачі неправильних типів даних
2. **Типізація хуків** - забезпечує правильне використання хуків
3. **Типізація подій** - допомагає правильно обробляти події
4. **Типізація API запитів** - забезпечує правильну обробку даних з сервера

Використання TypeScript з React є рекомендованою практикою для середніх та великих проектів, де типова безпека може значно покращити якість коду та зменшити кількість помилок.
