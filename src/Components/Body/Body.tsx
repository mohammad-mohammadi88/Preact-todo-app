import { Dispatch, FC, SetStateAction, useLayoutEffect, useState } from "preact/compat";
import "./style.css";
import { getTodos } from "../../fetchingData";
import Todo from "./Todo";
interface todoInterface{
    id:number;
    todo:string
    completed:boolean;
}
interface Props{
    change:number,
    setChange:Dispatch<SetStateAction<number>>
}
export interface GetTodosInterface{
    status:number;
    todosLength:number;
    workingTodosLength?:number;
    activeTodosLength?:number;
    message?:string;
    working?:todoInterface[];
    active?:todoInterface[];
    todos?:todoInterface[];
}

const Body :FC<Props> = ({change,setChange}) => {
    const [todos, setTodos] = useState<any>()
    const [isTodosEmpty, setIsTodosEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [todosPage, setTodosPage] = useState<string>('todos')
    const getAndSetTodos = async () => {
        const fetchedTodos:GetTodosInterface = await getTodos();
        fetchedTodos.todosLength>0 ? setTodos(fetchedTodos) : setIsTodosEmpty(true)
    }
    useLayoutEffect(()=>{
        getAndSetTodos()
        setIsLoading(false);
    },[change])
    
    return (
        <main className='container'>
            <div className="todos-header">
                <button onClick={()=>setTodosPage('todos')} className={`${todosPage === 'todos' ? 'active' : ''}`}>
                    All Todos <div style={{backgroundColor:'rgb(186, 186, 186)'}}>{todos?.todosLength || 0}</div>
                </button>
                <button onClick={()=>setTodosPage('active')} className={`${todosPage === 'active' ? 'active' : ''}`}>
                    Active <div style={{backgroundColor:'lime'}}>{todos?.activeTodosLength || 0}</div>
                </button>
                <button onClick={()=>setTodosPage('working')} className={`${todosPage === 'working' ? 'active' : ''}`}>
                    Working <div style={{backgroundColor:'orange'}}>{todos?.workingTodosLength || 0}</div>
                </button>
            </div>
            <section className="show-todos">
                {todos && !isTodosEmpty && todos[todosPage] && !isLoading && todos[todosPage].map(({id,todo,completed}:todoInterface)=>{
                    return <Todo key={id} setChange={setChange} id={id} completed={completed} todo={todo}/>
                })}
                {isTodosEmpty && <h2 className="empty-todo-message">There is no todo on database!<br />Please first enter a todo!</h2>}
                {isLoading && <h2>Loading...</h2>}
            </section>
        </main>
    )
}

export default Body