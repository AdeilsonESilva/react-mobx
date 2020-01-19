import React, { createContext, useContext, useState } from "react";
import { useLocalStore, useObserver } from "mobx-react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    todos: ["Lavar carro"],
    addTodo: todo => {
      store.todos.push(todo);
    },
    get todoCount() {
      return store.todos.length;
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const TodoHeader = () => {
  const store = useContext(StoreContext);
  return useObserver(() => <h1>{store.todoCount} de TODO</h1>);
};

const TodosList = () => {
  const store = useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.todos.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  ));
};

const TodosForm = () => {
  const [todo, setTodo] = useState("");

  const store = useContext(StoreContext);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        store.addTodo(todo);
        setTodo("");
      }}
    >
      <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

function App() {
  return (
    <StoreProvider>
      <TodoHeader />
      <TodosList />
      <TodosForm />
    </StoreProvider>
  );
}

export default App;
