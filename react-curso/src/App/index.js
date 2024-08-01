import React from 'react';
import { useLocalStorage } from './useLocalStorage'
import { AppUI } from './AppUI';
// const defaultTodos = [
//   {text:'Cortar cebolla', completed: true},
//   {text:'Curso react.js', completed: false},
//   {text:'Tarea 1', completed: false},
//   {text:'Lalala', completed: false},
//   {text:'tarea 2', completed: true}
// ]

// localStorage.setItem('TODOS_v1', JSON.stringify(defaultTodos))
// localStorage.removeItem('TODOS_v1')



function App() {
  const {
    item: todos, 
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_v1', []);
  

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

  return(
    <AppUI
      loading={loading}
      error={error}
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo ={deleteTodo}
    />
  )
}


export default App;
