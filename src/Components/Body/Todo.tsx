import { Dispatch, FC, SetStateAction, useState } from "preact/compat"
import { Bounce, toast } from "react-toastify";
import { deleteTodosCheck, patchTodosCheck, patchTodosText } from "../../fetchingData";

interface Props{
    id:number,
    todo:string,
    completed:boolean,
    setChange:Dispatch<SetStateAction<number>>
}
const Todo:FC<Props> = ({id,todo,completed,setChange}) => {
    const [editText, setEditText] = useState<string>(todo)
    const [editing, setEditing] = useState<boolean>(false)
    const [check,setCheck] = useState<boolean>(completed);
    async function editHandler(){
        const result = await patchTodosText(id,editText);
        toast[result.status===200 ? 'success' : 'error'](result.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Bounce,
        })
        setEditing(false)
        setEditText(todo)
        setChange(Date.now())
    }
    async function deleteHandler() {
        const result = await deleteTodosCheck(id)
        toast[result.status===200 ? 'success' : 'error'](result.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Bounce,
        })
        setChange(Date.now())
    }
    async function checkHandler() {
        setCheck(!check)
        const result = await patchTodosCheck(id,!check);
        toast[result.status===200 ? 'success' : 'error'](result.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Bounce,
        })
        setChange(Date.now())
    }
    return (
        <>
            <div className="todo">
                <div>
                    {!editing?
                        <>
                            <input type="checkbox" onInput={checkHandler} defaultChecked={completed} id="checkbox" />
                            <p>&ensp;{todo}</p>
                        </>
                    : 
                    <input type="text" id="editInput" value={editText} onChange={(e:any)=>setEditText(e.target.value)} />
                }
                </div>
                <div>
                    {!editing ? 
                        <>
                            <button className="deleteButton" onClick={deleteHandler}><i className="fa fa-trash-can"></i></button>
                            <button className="editButton" onClick={()=>setEditing(true)}><i class="fa fa-paint-brush"></i></button>
                        </>
                    :
                        <button onClick={editHandler}><i className="fa fa-check"></i></button>
                    }
                </div>
            </div>
        </>
    )
}

export default Todo