// import { Button, Heading, Input } from 'components';
// import { MouseEvent, useState } from 'react';
// import { Todo } from 'types';
// import { Todos } from 'components/Todos';
// import './main.css';

// const App = () => {
//   const [state, setState] = useState<Todo[]>([]);
//   const completed = state.filter((todo) => todo.completed);
//   const inProgress = state.filter((todo) => !todo.completed);

//   const addTodo = () => {
//     setState((prev) => {
//       return [
//         ...prev,
//         {
//           id: `${new Date().getTime()}`,
//           title: `${new Date().getTime()}`,
//           icon: 'O',
//           completed: false,
//         },
//       ];
//     });
//   };

//   const changeStatus = (event: MouseEvent) => {
//     const todo_itemEl: HTMLLIElement = event.target as HTMLLIElement;
//     const id = todo_itemEl.getAttribute('data-id');
//     const todo_item = state.find((todo) => todo.id === id);

//     todo_item && (todo_item.completed = !todo_item.completed);

//     setState((prev) => {
//       return [...prev];
//     });
//   };

//   return (
//     <>
//       <div className="app-item">
//         <Heading className="heading" title="------ Button Component ------" />
//         <Button
//           tagName="button"
//           title="Click me!"
//           size="sm"
//           variant="primary"
//         />
//         <Button
//           tagName="button"
//           title="Click me!"
//           size="sm"
//           variant="success"
//         />
//         <Button
//           tagName="button"
//           title="Click me!"
//           size="md"
//           variant="secondary"
//         />
//         <Button
//           tagName="button"
//           title="Click me!"
//           size="md"
//           variant="default"
//         />
//         <Button tagName="button" title="Click me!" size="lg" variant="danger" />
//       </div>
//       <div className="app-item">
//         <Heading className="heading" title="------ Input Component ------" />
//         <Input placeholder="Please enter text here..." />
//         <br />
//         <Input placeholder="Please enter text here..." type="password" />
//         <br />
//         <Input placeholder="Please enter text here..." type="checkbox" />
//         <br />
//         <Input placeholder="Please enter text here..." type="color" />
//         <br />
//         <Input placeholder="Please enter text here..." type="date" />
//         <br />
//         <Input placeholder="Please enter text here..." type="range" />
//       </div>
//       <div className="app-item">
//         <Heading className="heading" title="------ Lifting State Up ------" />
//         <Button
//           tagName="button"
//           title="Add Todo"
//           size="md"
//           variant="danger"
//           onClick={addTodo}
//         />
//         <div className="app-item">
//           <Heading
//             tag="h3"
//             className="heading"
//             title="------ In-progress ------"
//           />
//           <Todos todos={inProgress} onClick={changeStatus} />
//         </div>
//         <div className="app-item">
//           <Heading
//             tag="h3"
//             className="heading"
//             title="------ Completed ------"
//           />
//           <Todos todos={completed} onClick={changeStatus} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

import { useCallback, useEffect, useMemo, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);

  // const fetchData = () => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setData(response);
  //       // console.log("response", response);
  //     });
  // };

  const fetchData = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        // console.log("response", response);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log('data', useMemo(() => data,[data.length]));

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
