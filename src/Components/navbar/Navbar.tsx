import { Dispatch, FC, FormEvent, SetStateAction, useState } from "preact/compat"
import "./style.css"
import { postRequestInterface, postTodo } from "../../fetchingData"
import { toast, Bounce} from "react-toastify"
interface Props{
    setChange:Dispatch<SetStateAction<number>>
}
const Navbar : FC<Props> = ({setChange}) => {
    const [todo, setTodo] = useState('')
    async function submitHandler(e:FormEvent){
        e.preventDefault();
        if(todo.length>0){
            const response:postRequestInterface = await postTodo(todo)
            setTodo('')
            if(typeof response == 'object') {
                toast[response.status===201 ? 'success' : 'error'](response.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    theme: "dark",
                    transition: Bounce,
                });
            }
            setChange(Date.now())
        }
    }
    return (
        <nav className='navbar'>
            <div>
                This is a simple todo app written by Preact 
            </div>
            <div className="add-todo">
                <h1>Add New Todo</h1>
                <form className='add-todo-form' onSubmit={submitHandler}>
                    <input type="text" id="Text Input" value={todo} onChange={(e:any)=>setTodo(e.target.value)} />
                    <button type='submit' className='add-todo-button'>Add Todo</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar