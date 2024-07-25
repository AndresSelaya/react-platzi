import './TodoCounter.css';

function TodoCounter({ total, completed }){
  let res;
  if(total===completed){
    res = `Felicidades! has completado todos los TODOs`
  }else{
    res = `Has completado <span>${completed}</span> de <span>${total}</span> TODOs`
  }
  return(
    <h1 className='TodoCounter'>
      {res}
    </h1>
  );
}

export { TodoCounter }