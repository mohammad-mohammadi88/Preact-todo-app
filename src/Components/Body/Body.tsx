import { Dispatch, FC, SetStateAction, useEffect, useState } from "preact/compat";
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

const Body :FC<Props> = ({change,setChange}) => {
    const [todosPage, setTodosPage] = useState<string>('todos')
    const {data,refetch,isLoading,isError,isSuccess} = getTodos()
    useEffect(()=>{
        refetch()
    },[change])
    const success = data && data[todosPage] && isSuccess;
    return (
        <main className='container'>
            <div className="todos-header">
                <button onClick={()=>setTodosPage('todos')} className={`${todosPage === 'todos' ? 'active' : ''}`}>
                    All Todos <div style={{backgroundColor:'rgb(186, 186, 186)'}}>{isSuccess && data?.todosLength || 0}</div>
                </button>
                <button onClick={()=>setTodosPage('active')} className={`${todosPage === 'active' ? 'active' : ''}`}>
                    Active <div style={{backgroundColor:'lime'}}>{isSuccess && data?.activeTodosLength || 0}</div>
                </button>
                <button onClick={()=>setTodosPage('working')} className={`${todosPage === 'working' ? 'active' : ''}`}>
                    Working <div style={{backgroundColor:'orange'}}>{isSuccess && data?.workingTodosLength || 0}</div>
                </button>
            </div>
            <section className="show-todos">
                {success && data[todosPage].map(({id,todo,completed}:todoInterface)=> 
                    <Todo 
                        completed={completed} 
                        setChange={setChange} 
                        todo={todo}
                        key={id}
                        id={id} 
                    />
                )}
                {isError && <h2 className="empty-todo-message">There is no todo on database!<br />Please first enter a todo!</h2>}
                {isLoading && <h2 className='loading'>Loading...</h2>}
            </section>
        </main>
    )
}
export default Body