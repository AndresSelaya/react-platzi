import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import React from 'react';

// const defaultTodos = [
//   {text:'Cortar cebolla', completed: true},
//   {text:'Curso react.js', completed: false},
//   {text:'Tarea 1', completed: false},
//   {text:'Lalala', completed: false},
//   {text:'tarea 2', completed: true}
// ]

// localStorage.setItem('TODOS_v1', JSON.stringify(defaultTodos))
// localStorage.removeItem('TODOS_v1')

function useLocalStorage(itemName, initialValue){
  
  const localStorageItem = localStorage.getItem(itemName, initialValue);
  let parsedItem;
  if(!localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(initialValue))
    parsedItem = initialValue; 
  }else{
    parsedItem = JSON.parse(localStorageItem);
  }
  
  const [item, setItem] = React.useState(parsedItem)
  
  const saveItem = (newItem) =>{
    localStorage.setItem(itemName, JSON.stringify(newItem))
    setItem(newItem);
  }

  return [item, saveItem]
}

function App() {
  

  const [todos, saveTodos] = useLocalStorage('TODOS_v1', []);
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
    saveTodos(newTodos);
  }

  //Eliminar 1 todo
  const deleteTodo = (text)=>{
    const newTodos = [...todos];
    const indexTodo = newTodos.findIndex((todo) => todo.text === text)
    newTodos.splice(indexTodo,1);
    saveTodos(newTodos);
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
