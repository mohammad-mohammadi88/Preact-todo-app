import axios, { AxiosRequestConfig } from "axios";
const baseUrl = import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = baseUrl;

export interface postRequestInterface{
    status:number,
    message:string
}

export async function postTodo(todo:string) {
    try{
        const data = new URLSearchParams();
        data.append("todo", todo);
        const config:AxiosRequestConfig = {
            method:"post",
            url:'todos/newTodo',
            data
        }
        const response:postRequestInterface = (await axios.request(config)).data
        return response
    } catch(err){
        return {
            status:400,
            message:'We could not add a new todo'
        }
    }
}
export async function getTodos(){
    try{
        return (await axios.get('todos')).data
    } catch(error:any){
        return error.response.data
    }
}
export async function patchTodosText(id:number,todo?:string){
    try{
        const data = new URLSearchParams();
        if(typeof todo != "undefined") data.append("todo", todo);
        const config:AxiosRequestConfig = {
            method:"patch",
            url:'todos/editTodo/'+id,
            data
        }
        const response: {
            status:number,
            message:string
        } = (await axios.request(config)).data
        return response
    } catch(err){
        return {
            status:400,
            message:"Some thing went wrong white editin todo"
        }
    }
}
export async function patchTodosCheck(id:number,completed?:boolean){
    try{
        const data = new URLSearchParams();
        if(typeof completed != "undefined") data.append("completed", String(completed));
        const config:AxiosRequestConfig = {
            method:"patch",
            url:'todos/editTodo/'+id,
            data
        }
        const response: {
            status:number,
            message:string
        } = (await axios.request(config)).data
        return response
    } catch(err){
        return {
            status:400,
            message:"Some thing went wrong white deleting todo"
        }
    }
}
export async function deleteTodosCheck(id:number){
    try{
        const config:AxiosRequestConfig = {
            method:"delete",
            url:'todos/deleteTodo/'+id,
        }
        const response = await (await axios.request(config)).data
        console.log(response)
        return response
    } catch(err){
        return {
            status:400,
            message:"Some thing went wrong white editin todo"
        }
    }
}