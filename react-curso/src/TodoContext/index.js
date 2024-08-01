import React from "react"
import { useLocalStorage } from './useLocalStorage'

const TodoContext = React.createContext()

function TodoProvider({ children }){
    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error
    } = useLocalStorage('TODOS_v1', []);
      
    
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    
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
      
    const addTodo = (text)=>{
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false
        })
        saveTodos(newTodos);
    }

    //Completar 1 todo (buscar cual todo se clickeo complete V y actualizar)
    const completeTodo = (text)=>{
        const newTodos = [...todos];
        const indexTodo = newTodos.findIndex((todo) => todo.text === text)
        // newTodos[indexTodo].completed = true;
        newTodos[indexTodo].completed = !newTodos[indexTodo].completed;
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
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos, 
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider }