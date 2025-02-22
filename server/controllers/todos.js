import fs from "fs";

const readTodo = () => JSON.parse(fs.readFileSync('./server/data/todos.json'))

const writeTodo = (newTodo) => { fs.writeFileSync('./server/data/todos.json', JSON.stringify(newTodo)) }

/* controlers */
function getTodos(req,res,next){
    try{
        const todos = readTodo();
        req.todos = todos;
        req.todosLength = todos.length
        next()
    } catch(err) {
        res.status(500).json({
            status:500,
            message:'Some thing went wrong while reading data!'
        })
    }
}

function getTodoRouteCtl(req,res){
    const todosLength = req.todosLength;
    if(todosLength>0){
        const todos = req.todos;
        const active = req.todos.filter((todo)=>todo.completed === true);
        const working = req.todos.filter((todo)=>todo.completed === false);
        const activeTodosLength = req.todos.filter((todo)=>todo.completed === true).length;
        const workingTodosLength = req.todos.filter((todo)=>todo.completed === false).length;
        res.status(200).json({
            status:200,
            todosLength,
            activeTodosLength,
            workingTodosLength,
            active,
            working,
            todos
        })
    } else {
        res.status(404).json({
            status:404,
            todosLength:0,
            activeTodosLength:0,
            workingTodosLength:0,
            message:`There is no todo on database!Please first enter a todo!`
        })
    }
}

function postTodoRouteCtl(req,res){
    const todos = req.todos ?? [];
    const {todo} = req.body;

    const newTodo = {
        id: todos[todos.length-1]?.id+1 || 1,
        todo,
        completed:false
    }
    todos.push(newTodo)
    try{
        writeTodo(todos)
        res.status(201).json({ 
            status: 201, 
            message: 'new todo added!'
        })
    } catch(err){
        res.status(500).json({ 
            status: 500, 
            message: 'Some thing went wrong while writing data!'
        })
    }
}

function deleteTodoRouteCtl(req, res) {
    if(req.todos.length>0){
        const todos = req.todos;
        const indexofTodo = todos.findIndex((todo) => todo.id === Number(req.params.id))
        if (indexofTodo >= 0) {
            todos.splice(indexofTodo, 1)
            try {
                writeTodo(todos)
                res.status(200).json({ 
                    status: 200, 
                    message: 'This todo deleted successfully!' 
                })
            } catch (err) {
                res.status(500).json({
                    status: 500,
                    message: 'Some thing went wrong while writing data!'
                })
            }
        } else {
            res.status(404).json({
                status:404,
                message:'There is no todo with this id'
            })
        }
    }
}

function patchTodoRouteCtl(req,res){
    try{
        let todos = readTodo();
        const {
            todo,
            completed
        } = req.body;
        let editedTodoIndex = todos.findIndex((todo)=>todo.id === Number(req.params.id))
        if(todo) todos[editedTodoIndex].todo = todo;
        if(completed) todos[editedTodoIndex].completed = completed === 'true' ?? false;
        try{
            writeTodo(todos);
            res.status(200).json({
                status:200,
                message:'Todo edited successfully!'
            })
        } catch(err) {
            res.status(500).json({ 
                status: 500, 
                message: 'Some thing went wrong while writing data!'
            })
        }
    } catch(err) {
        res.status(500).json({ 
            status: 500, 
            message: 'Some thing went wrong while reading data!'
        })
    }
}

/* routes */
export const getTodoRoute = [
    getTodos,
    getTodoRouteCtl
]
export const postTodoRoute = [
    getTodos,
    postTodoRouteCtl
]
export const patchTodoRoute = [
    getTodos,
    patchTodoRouteCtl
]
export const deleteTodoRoute = [
    getTodos,
    deleteTodoRouteCtl
]
