// import React, { useEffect, useState } from 'react';

// export default function Counter({ initialCount }: { initialCount: number }) {
//   // Bug #4: coerce a string to number poorly + rely on props during updates
//   const [count, setCount] = useState<number>(Number(initialCount as any));

//   // Bug #5: effect without deps flips count on every render (infinite updates risk)
//   useEffect(() => {
//     if (count < 0) {
//       setCount(0);
//     }
//   }); // missing []

//   function increment() {
//     // Bug #6: use current state in async-like scenario incorrectly
//     // should use functional update to avoid stale closures
//     setCount(count + 1);
//   }

//   function decrement() {
//     setCount(count - 1);
//   }

//   return (
//     <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
//       <h3>Counter</h3>
//       <p>Count: {count}</p>
//       <div style={{ display: 'flex', gap: 8 }}>
//         <button onClick={decrement}>-</button>
//         <button onClick={increment}>+</button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';

export default function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState<number>(initialCount);

  // Fix #5: add dependency array so it only runs when `count` changes
  useEffect(() => {
    if (count < 0) {
      setCount(0);
    }
  }, [count]);

  // Fix #6: functional updates avoid stale state in async/rapid updates
  function increment() {
    setCount(c => c + 1);
  }

  function decrement() {
    setCount(c => c - 1);
  }

  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

