import { MdDelete } from 'react-icons/md'
import './index.css'

const TodoCard = ({ todoItem, checkableStatus, deleteTodo }) => {
    const { id, todo, isChecked } = todoItem
    const onChangeCheckbox = (event) => {
        console.log(event.target.checked)
        checkableStatus(event.target.checked, id)
    }

    const onDelete = () => {
        deleteTodo(id)
    }

    const todoStatus = isChecked ? "checkbox-complete-label" : "checkbox-label"

    return (
        <li class="todo-item-container d-flex flex-row" id="todo1">
            <input type="checkbox" id={id} className="checkbox-input" onChange={onChangeCheckbox} />
            <div className="label-container d-flex flex-row">
                <label htmlFor={id} id="label1" className={todoStatus}>{todo}</label>
                <div className="delete-icon-container">
                    <button type="button" className="delete-button" onClick={onDelete} id={id}>
                        <MdDelete className="delete-icon" />
                    </button>
                </div>
            </div>
        </li>
    )
}
export default TodoCard;