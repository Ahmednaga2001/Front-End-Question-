# Interview Questions & Concepts

A collection of JavaScript and React exercises covering common interview questions and language gotchas.

## How to Run

```bash
node main.js
```

> **Note:** Task 7 uses ES module `import`/`export` syntax and won't run directly with `node main.js`.

## Questions

### Task 1 — Object References vs Spread Copy
What is the difference between assigning an object by reference (`obj2 = obj1`) and using the spread operator (`obj3 = {...obj1}`)? What happens when you mutate the original?

### Task 2 — Closures and `var` in Loops
Why does `par1[5]()` return `10` instead of `5`? Demonstrates how `var` is function-scoped and closures capture the variable, not its value.

### Task 3 — `this` Binding in Nested Functions
What does `this` refer to inside a regular nested function vs the outer method? How does the `self = this` pattern solve context loss?

### Task 4 — Event Loop & setTimeout
What is the output order of `console.log(1)`, `setTimeout(..., 1000)`, `setTimeout(..., 0)`, `console.log(4)`? Answer: `1, 4, 3, 2`.

### Task 5 — Sparse Arrays
What is `perfTechniques.length` after setting index `100` on a 2-element array? Answer: `101` — JS extends the array with empty slots.

### Task 6 — Async/Await & Promise States
Why does `console.log(fetchData())` print `Promise { <pending> }` instead of the resolved value?

### Task 7 — ES6 Module Exports Are Read-Only
What happens when you try to increment an imported default export? Answer: Error, because default exports are read-only bindings.

### Task 8a — setInterval Return Value
What does `setInterval()` return? Answer: A unique interval ID used with `clearInterval()`.

### Task 8b — Object Reference Equality
Why does `{name: 'Ahmed'} === {name: 'Ahmed'}` evaluate to `false`? Objects are compared by reference, not by value.

### Task 9 — Array.sort Default Behavior
Why does `[2, 4, 16, 28, 1, 32, 8, 10].sort()` produce `[1, 10, 16, 2, 28, 32, 4, 8]`? Default sort converts elements to strings and sorts by Unicode code points.

### Task 10 — Object Keys vs Set Values
Object keys are coerced to strings (`obj.hasOwnProperty(1)` is `true` because `1` becomes `'1'`). Sets preserve type, so `set.has('1')` is `false` when the set contains the number `1`.

### Task 11 — Falsy Values
Which are falsy: `0`, `new Number(0)`, `''`, `' '`, `new Boolean(false)`, `undefined`, `null`, `NaN`? Wrapper objects like `new Number(0)` and `new Boolean(false)` are truthy.

### Task 12 — Catch Block Variable Scoping
The `x` inside `catch(x)` is a separate variable scoped to the catch block. Assigning to it does not affect the outer `x`.

### Task 13 — Array.reduce
What does `[[0,1],[2,3]].reduce((acc, val) => acc.concat(acc), [1,2])` return? Trace through the accumulator at each step.

### Task 14 — Method Binding & `this` Loss
Why does `stoleUserId()` return `undefinedundefined`? When a method is assigned to a variable, it loses its original `this` context.

### Task 15 — indexOf Falsy Trap
Why does `if(fruit.indexOf('apple'))` enter the `else` branch? `indexOf` returns `0` for the first element, and `0` is falsy.

---

## React Questions

### 1. What is JSX and How Does It Work?
JSX, short for JavaScript XML, is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes building React components easier. JSX gets converted into JavaScript function calls, often by Babel.

```jsx
// JSX
<div>Hello, world!</div>

// Gets transformed into
React.createElement('div', null, 'Hello, world!')
```

### 2. What Are React Fragments Used For?
React Fragments allow you to group multiple elements without adding extra nodes to the DOM. They are particularly useful when you need to return multiple elements from a component but don't want to wrap them in a container element.

```jsx
// Using shorthand syntax
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
}

// Using React.Fragment (needed when passing keys)
function List({ items }) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ));
}
```

### 3. What Are Stateless Components?
Stateless components do not manage internal state; they receive data via props and focus solely on rendering UI based on that data.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### 4. What Are Stateful Components?
Stateful components manage their own internal state and can update their UI based on user interactions or other events.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### 5. What Is the Difference Between Controlled and Uncontrolled Components?

**Controlled components** have their form data managed by React state. The component re-renders on every change.

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

**Uncontrolled components** store form data in the DOM itself, accessed via refs.

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);
  const handleSubmit = () => console.log(inputRef.current.value);
  return <input ref={inputRef} />;
}
```

### 6. What Are the Benefits of Using Hooks in React?
- Allow using state and lifecycle features in functional components (no need for classes)
- Enable reusing stateful logic across components via custom hooks
- Simplify component logic and make it easier to read and test
- Reduce boilerplate compared to class components

### 7. What Are the Rules of React Hooks?
1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — either React components or custom hooks, never regular JS functions
3. **Use hooks in the same order** — hooks must be called in the same order on every render to keep state consistent
4. **Don't call hooks conditionally** — always call them unconditionally so React can track them correctly

### 8. What Is Lazy Loading in React?
Lazy loading loads components or resources only when they are needed, reducing initial load time. React provides `React.lazy` and `Suspense` to implement this.

```jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 9. How Would You Lift State Up, and Why Is It Necessary?
Lifting state up means moving shared state to the closest common ancestor of the components that need it. This is necessary when multiple components need to reflect the same data.

```jsx
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <InputChild value={value} onChange={setValue} />
      <DisplayChild value={value} />
    </>
  );
}
```

### 10. Why Does React Recommend Against Mutating State?
React relies on reference comparison to detect changes. Mutating state directly doesn't create a new reference, so React won't detect the change and won't re-render. Always return a new object or array.

```jsx
// Wrong — mutates existing state
state.items.push(newItem);
setState(state);

// Correct — creates a new array
setState({ ...state, items: [...state.items, newItem] });
```

### 11. What Does Re-rendering Mean in React?
Re-rendering is the process of updating the UI when a component's state or props change. This involves:

1. Recalculating the JSX returned by the component
2. Comparing the new JSX with the previous one (using the Virtual DOM)
3. Updating the real DOM with only the differences (efficient reconciliation)

Re-rendering ensures the UI stays in sync with the component's state and props.

### 12. What Are Error Boundaries in React?
Error boundaries catch JavaScript errors in their child components, log them, and display fallback UI instead of crashing the application. They use `componentDidCatch` and `static getDerivedStateFromError` methods.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

> **Note:** Error boundaries do not catch errors in event handlers or asynchronous code.

### 13. What Are React Portals Used For?
React Portals allow rendering children into a DOM node outside the parent component's hierarchy. This is useful for modals or tooltips that need to escape parent `overflow` or `z-index` constraints.

```jsx
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}
```

### 14. What Is Code Splitting in a React Application?
Code splitting enhances performance by dividing code into smaller chunks loaded on demand, reducing initial load times. This can be achieved through dynamic `import()` statements or using `React.lazy` and `Suspense`.

```jsx
// Route-based code splitting
const Home = React.lazy(() => import('./routes/Home'));
const About = React.lazy(() => import('./routes/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

### 15. Explain Prop Drilling
Prop drilling is when you pass data from a parent component to a deeply nested child component through props, even if intermediate components don't use it. This makes code harder to maintain. Solutions include React Context, state management libraries (Redux, Zustand), or component composition.

```jsx
// Prop drilling — Middle doesn't use "user" but passes it through
function Top() {
  const user = { name: 'Ahmed' };
  return <Middle user={user} />;
}
function Middle({ user }) {
  return <Bottom user={user} />;
}
function Bottom({ user }) {
  return <p>{user.name}</p>;
}

// Solved with Context
const UserContext = React.createContext();
function Top() {
  return (
    <UserContext.Provider value={{ name: 'Ahmed' }}>
      <Middle />
    </UserContext.Provider>
  );
}
function Bottom() {
  const user = useContext(UserContext);
  return <p>{user.name}</p>;
}
```
