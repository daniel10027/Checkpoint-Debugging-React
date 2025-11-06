import React, { useState } from 'react';

type Todo = { id: string; title: string };

export default function TodoList({ todos }: { todos: Todo[] }) {
  // Local UI state per row (e.g., checkbox) to show why keys matter
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div style={{ marginTop: 12 }}>
      <h3>Todos</h3>
      <ul>
        {/* Bug #2: App uses index as key (we’ll fix there).
            If index keys change, rows can swap their local state. */}
        {/* {todos.map((t, index) => (
          <li key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={!!checkedIds[t.id]}
              onChange={() => toggle(t.id)}
            />
            <span>{t.title}</span>
          </li>
        ))} */}
        {todos.map((t) => (
        <li key={t.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={!!checkedIds[t.id]}
            onChange={() => toggle(t.id)}
          />
          <span>{t.title}</span>
        </li>
      ))}

      </ul>
    </div>
  );
}
