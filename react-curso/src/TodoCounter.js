import React from 'react';
import './TodoCounter.css';

function TodoCounter({ total, completed }){
  
  const allComplete = total === completed? "completo" : "incompleto"
  const titulo = {
    "completo": <h1 className='TodoCounter'>
            Felicidades! Has completado todos los TODOs
          </h1>,
    "incompleto": <h1 className='TodoCounter'>
              Has completado <span>{completed}</span> de <span>{total}</span> TODOs
            </h1> 
  }
  return(
    <>
      {titulo[allComplete]}
    </>
  );
  
  
}

export { TodoCounter }