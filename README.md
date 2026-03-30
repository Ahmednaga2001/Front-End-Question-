**Interview Questions & Concepts**

A collection of JavaScript and React exercises covering common interview questions and language gotchas.

**How to Run**

```bash
node main.js
```

> **Note:** Task 7 uses ES module `import`/`export` syntax and won't run directly with `node main.js`.

---

<details>
<summary><b>JavaScript Questions</b></summary>

**1. Object References vs Spread Copy**

```js
const obj1 = { prop: 1 };
const obj2 = obj1;        // same reference in memory
const obj3 = { ...obj1 }; // shallow copy

obj1.prop = 2;

console.log(obj1); // { prop: 2 }
console.log(obj2); // { prop: 2 } — same reference, reflects the change
console.log(obj3); // { prop: 1 } — independent copy, unchanged
```

**2. Closures and `var` in Loops**

```js
function func() {
  var par1 = [];
  for (var i = 0; i < 10; i++) {
    par1[i] = function () {
      return i;
    };
  }
  return par1;
}

var par1 = func();
par1[5](); // 10 — all closures share the same `i`, which is 10 after the loop
```

**3. `this` Binding in Nested Functions**

```js
let instabugObject = {
  bug: "instabug",
  func: function () {
    let self = this;
    console.log(this.bug);  // "instabug"
    console.log(self.bug);  // "instabug"
    (function () {
      console.log(this.bug);  // undefined — `this` is global/undefined in strict mode
      console.log(self.bug);  // "instabug" — `self` still references the outer `this`
    })();
  },
};
instabugObject.func();
```

**4. Event Loop & setTimeout**

```js
(function () {
  console.log(1);                              // 1st — synchronous
  setTimeout(function () { console.log(2); }, 1000); // 4th — delayed 1s
  setTimeout(function () { console.log(3); }, 0);    // 3rd — deferred to next tick
  console.log(4);                              // 2nd — synchronous
})();
// Output: 1, 4, 3, 2
```

**5. Sparse Arrays**

```js
let perfTechniques = ["web workers", "code splitting"];
perfTechniques[100] = "service workers";
console.log(perfTechniques.length); // 101 — JS extends the array with empty slots
```

**6. Async/Await & Promise States**

```js
async function fetchData() {
  return await Promise.resolve("data");
}

const data = fetchData();
console.log(data); // Promise { <pending> } — not awaited

fetchData().then(result => console.log(result)); // "data"
```

**7. ES6 Module Exports Are Read-Only**

```js
// counter.js
let counter = 0;
export default counter;

// main.js
import counter from './counter.js';
counter++; // Error — default exports are read-only bindings
```

**8a. setInterval Return Value**

```js
const id = setInterval(() => console.log('Hi'), 1000);
// Returns a unique interval ID (e.g. 1) used with clearInterval(id)
```

**8b. Object Reference Equality**

```js
function guessMyIdentity(data) {
  if (data === { name: 'Ahmed', age: 25 }) {
    console.log("object 1");
  } else if (data == { name: 'Ahmed', age: 25 }) {
    console.log("object 2");
  } else {
    console.log("object 3");
  }
}

guessMyIdentity({ name: 'Ahmed', age: 25 }); // "object 3" — every {} creates a new reference
```

**9. Array.sort Default Behavior**

```js
var savings = [2, 4, 16, 28, 1, 32, 8, 10];
savings.sort();
console.log(savings); // [1, 10, 16, 2, 28, 32, 4, 8]
// Default sort converts elements to strings and sorts by Unicode code points

// Fix: provide a comparator
savings.sort((a, b) => a - b); // [1, 2, 4, 8, 10, 16, 28, 32]
```

**10. Object Keys vs Set Values**

```js
const obj = { 1: 'one', 2: 'two', 3: 'three' };
const set = new Set([1, 2, 3]);

obj.hasOwnProperty('1'); // true
obj.hasOwnProperty(1);   // true — 1 is coerced to '1'

set.has('1'); // false — Set keeps original types, '1' !== 1
set.has(2);   // true
```

**11. Falsy Values**

```js
0;                 // falsy
new Number(0);     // truthy — it's an object
'';                // falsy
' ';               // truthy — contains a space character
new Boolean(false);// truthy — it's an object
undefined;         // falsy
null;              // falsy
NaN;               // falsy
```

**12. Catch Block Variable Scoping**

```js
(() => {
  let x, y;
  try {
    throw new Error("An error occurred");
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x); // 1 — catch block's own `x`
  }
  console.log(x); // undefined — outer `x` was never assigned
  console.log(y); // 2 — `y` references the outer variable
})();
```

**13. Array.reduce**

```js
[[0, 1], [2, 3]].reduce((acc, val) => {
  return acc.concat(acc);
}, [1, 2]);
// Step 1: acc = [1,2], val = [0,1] → acc.concat(acc) → [1,2,1,2]
// Step 2: acc = [1,2,1,2], val = [2,3] → acc.concat(acc) → [1,2,1,2,1,2,1,2]
```

**14. Method Binding & `this` Loss**

```js
let auth = {
  username: "admin",
  token: "z2z21z",
  getUserId() {
    return this.username + this.token;
  },
};

let stoleUserId = auth.getUserId;
console.log(auth.getUserId()); // "adminz2z21z"
console.log(stoleUserId());   // "undefinedundefined" — `this` lost, points to global
```

**15. indexOf Falsy Trap**

```js
const fruit = ['apple', 'banana', 'cherry'];
if (fruit.indexOf('apple')) {
  console.log('Found it!');
} else {
  console.log('Not found!'); // This runs — indexOf returns 0, which is falsy
}

// Fix: use !== -1 or includes()
if (fruit.indexOf('apple') !== -1) { /* ... */ }
if (fruit.includes('apple')) { /* ... */ }
```

</details>

---

<details>
<summary><b>React Questions</b></summary>

**1. What is JSX and How Does It Work?**
JSX, short for JavaScript XML, is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes building React components easier. JSX gets converted into JavaScript function calls, often by Babel.

```jsx
// JSX
<div>Hello, world!</div>

// Gets transformed into
React.createElement('div', null, 'Hello, world!')
```

**2. What Are React Fragments Used For?**
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

**3. What Are Stateless Components?**
Stateless components do not manage internal state; they receive data via props and focus solely on rendering UI based on that data.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

**4. What Are Stateful Components?**
Stateful components manage their own internal state and can update their UI based on user interactions or other events.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**5. What Is the Difference Between Controlled and Uncontrolled Components?**

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

**6. What Are the Benefits of Using Hooks in React?**
- Allow using state and lifecycle features in functional components (no need for classes)
- Enable reusing stateful logic across components via custom hooks
- Simplify component logic and make it easier to read and test
- Reduce boilerplate compared to class components

**7. What Are the Rules of React Hooks?**
1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — either React components or custom hooks, never regular JS functions
3. **Use hooks in the same order** — hooks must be called in the same order on every render to keep state consistent
4. **Don't call hooks conditionally** — always call them unconditionally so React can track them correctly

**8. What Is Lazy Loading in React?**
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

**9. How Would You Lift State Up, and Why Is It Necessary?**
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

**10. Why Does React Recommend Against Mutating State?**
React relies on reference comparison to detect changes. Mutating state directly doesn't create a new reference, so React won't detect the change and won't re-render. Always return a new object or array.

```jsx
// Wrong — mutates existing state
state.items.push(newItem);
setState(state);

// Correct — creates a new array
setState({ ...state, items: [...state.items, newItem] });
```

**11. What Does Re-rendering Mean in React?**
Re-rendering is the process of updating the UI when a component's state or props change. This involves:

1. Recalculating the JSX returned by the component
2. Comparing the new JSX with the previous one (using the Virtual DOM)
3. Updating the real DOM with only the differences (efficient reconciliation)

Re-rendering ensures the UI stays in sync with the component's state and props.

**12. What Are Error Boundaries in React?**
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

**13. What Are React Portals Used For?**
React Portals allow rendering children into a DOM node outside the parent component's hierarchy. This is useful for modals or tooltips that need to escape parent `overflow` or `z-index` constraints.

```jsx
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}
```

**14. What Is Code Splitting in a React Application?**
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

**15. Explain Prop Drilling**
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

</details>
