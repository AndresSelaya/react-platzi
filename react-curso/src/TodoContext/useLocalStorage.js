import React from "react";

function useLocalStorage(itemName, initialValue){
    const [item, setItem] = React.useState(initialValue)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
  
    
    React.useEffect(()=>{
      setTimeout(()=>{
        try {
          const localStorageItem = localStorage.getItem(itemName, initialValue);
          let parsedItem;
          if(!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(initialValue))
            parsedItem = initialValue; 
          }else{
            parsedItem = JSON.parse(localStorageItem);
            setItem(parsedItem)
          }
  
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setError(true)
        }
      }, 2000)
    })

    
    
    const saveItem = (newItem) =>{
      localStorage.setItem(itemName, JSON.stringify(newItem))
      setItem(newItem);
    }
  
    return {
      item,
      saveItem, 
      loading, 
      error
    }
  }

export { useLocalStorage }

// const defaultTodos = [
//   {text:'Cortar cebolla', completed: true},
//   {text:'Curso react.js', completed: false},
//   {text:'Tarea 1', completed: false},
//   {text:'Lalala', completed: false},
//   {text:'tarea 2', completed: true}
// ]

// localStorage.setItem('TODOS_v1', JSON.stringify(defaultTodos))
// localStorage.removeItem('TODOS_v1')