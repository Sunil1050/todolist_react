import { useState } from "react"
import { MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './index.css'

const TodoCard = ({ todoItem, checkableStatus, deleteTodo }) => {
    const [edit, setEdit] = useState(false)
    const { id, todo, isChecked } = todoItem
    const [label, setlabel] = useState(todo)

    const onChangeCheckbox = (event) => {
        console.log(event.target.checked)
        checkableStatus(event.target.checked, id)
    }

    const onDelete = () => {
        deleteTodo(id)
    }

    const onEdit = (event) => {
        setlabel(event.target.value)
    }

    const onSave = () => {
        setEdit(!edit)
    }

    const todoStatus = isChecked ? "checkbox-complete-label" : "checkbox-label"

    return (
        <li class="todo-item-container d-flex flex-row" id="todo1">
            <input type="checkbox" id={id} className="checkbox-input" onChange={onChangeCheckbox} />
            <div className="label-container d-flex flex-row rounded">
                <label htmlFor={id} id="label1" className={todoStatus}>{edit ? label : todo}</label>
                <div className="delete-icon-container">
                    <Popup
                        modal
                        trigger={
                            <button type="button" className="delete-button" onClick={onEdit} id={id}>
                                <FiEdit className="edit-icon" />
                            </button>
                        }
                        position="top right"
                    >
                        {
                            close => (
                                <div className="p-3">
                                    <input type="text" className="form-control" onChange={onEdit} value={label} />
                                    <br />
                                    <div>
                                        <button className="btn btn-primary mr-2" onClick={onSave}>Save</button>
                                        <button className="btn btn-secondary mr-2" onClick={() => close()}>Close</button>

                                    </div>
                                </div>
                            )
                        }
                    </Popup>

                    <button type="button" className="delete-button" onClick={onDelete} id={id}>
                        <MdDelete className="delete-icon" />
                    </button>
                </div>
            </div>
        </li>
    )
}
export default TodoCard;