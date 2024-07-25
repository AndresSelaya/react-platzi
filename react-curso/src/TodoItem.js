import { DeleteIcon } from './DeleteIcon';
import { CompleteIcon } from './CompleteIcon';
import './TodoItem.css';

function TodoItem(props){//{ text, completed, onComplete(text), onDelete(text) }
    return(
      <li className='TodoItem'>
        <CompleteIcon
          completed={props.completed}
          onComplete={props.onComplete/*Se ejecuta la funcion que se le paso,envia el text*/}
        />

        <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>
        
        <DeleteIcon
          onDelete={props.onDelete/*Se ejecuta la funcion que se le paso,envia el text*/}
        />

      </li>
    );
}

export { TodoItem }