import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import React from 'react';

const defaultTodos = [
  {text:'Cortar cebolla', completed: true},
  {text:'Curso react.js', completed: false},
  {text:'Tarea 1', completed: false},
  {text:'Lalala', completed: false},
  {text:'tarea 2', completed: true}
]

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  //estados derivados
  //todos completos
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  //todos totales listados
  const totalTodos = todos.length;

  //todos buscados
  const searchedTodos = todos.filter((todo) =>{
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase()
    return todoText.includes(searchText)
  })
  
  //Completar 1 todo (buscar cual todo se clickeo complete V y actualizar)
  const completeTodo = (text)=>{
    const newTodos = [...todos];
    const indexTodo = newTodos.findIndex((todo) => todo.text === text)
    newTodos[indexTodo].completed = true;
    setTodos(newTodos);
  }

  //Eliminar 1 todo
  const deleteTodo = (text)=>{
    const newTodos = [...todos];
    const indexTodo = newTodos.findIndex((todo) => todo.text === text)
    newTodos.splice(indexTodo,1);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoCounter completed={completedTodos} total={totalTodos}/>
      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem 
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={()=> deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </>
  );
}


export default App;
