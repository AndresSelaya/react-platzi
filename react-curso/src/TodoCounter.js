import React from 'react';
import './TodoCounter.css';

function TodoCounter({ total, completed }){
  
  const allComplete = total === completed
  const titulo = {
    true: <h1 className='TodoCounter'>
            Felicidades! Has completado todos los TODOs
          </h1>,
    false: <h1 className='TodoCounter'>
              Has completado <span>{completed}</span> de <span>{total}</span> TODOs
            </h1>, 
  }
  return(
    <h1 className='TodoCounter'>
      {/* Has completado <span>{completed}</span> de <span>{total}</span> TODOs */}
      {titulo[allComplete]}
    </h1>
  );
  
  
}

export { TodoCounter }