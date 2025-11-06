import React, { useMemo, useState } from 'react';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

type Todo = { id: string; title: string };

const initialTodos: Todo[] = [
  { id: 'a', title: 'Learn React DevTools' },
  { id: 'b', title: 'Fix a state bug' },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Bug #1: derived count uses length *and* a prop that never exists
  // (pretend someone copy-pasted this)
  // It references window.__APP_MULTIPLIER__ which may be undefined.
  // const derivedCount = useMemo(() => {
  //   // ts-expect-error intentionally unsafe access
  //   const multiplier = (window as any).__APP_MULTIPLIER__ ?? 1;
  //   return todos.length * multiplier;
  // }, [todos]);
  const derivedCount = useMemo(() => todos.length, [todos]);

  // Add a todo
  function addTodo() {
    const n = todos.length + 1;
    setTodos([...todos, { id: String(Math.random()), title: `New item ${n}` }]);
  }

  // Bug #2: using index as key down in <TodoList> will cause state mix-ups later
  return (
    <div style={{ padding: 24 }}>
      <h1>Debugging Playground</h1>
      <p>Derived count (buggy): {derivedCount}</p>

      {/*Bug #3: passing a string where a number is expected */}
      {/* <Counter initialCount={"5" as any} /> */}
      <Counter initialCount={5} />

      <hr style={{ margin: '16px 0' }} />

      <button onClick={addTodo}>Add Todo</button>
      <TodoList todos={todos} />
    </div>
  );
}
