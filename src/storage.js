export default class Storage {

    constructor(name) {

        const localStorage = window.localStorage;
        let liveTodos;

        this.getLocalStorage = () => {
            return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
        }

        this.setLocalStorage = (todos) => {
            localStorage.setItem(name, JSON.stringify(liveTodos = todos));
        }
    }

    // add todoItem to array
    insert(item) {
        const todoList = this.getLocalStorage();
        todoList.push(item);
        this.setLocalStorage(todoList);
    }

    // update task's status
    toggleComplete(id, status) {
        const todoList = this.getLocalStorage();
        for(let todo of todoList) {
            if (todo.id === id) {
                todo.isFinished = status;
            }
        }
        this.setLocalStorage(todoList);
    }


    // delete a task
    delete(id) {
        const todoList = this.getLocalStorage();
        for(let [index, todo] of todoList.entries()) {
            if (todo.id === id) {
                todoList.splice(index, 1);
            }
        }
        this.setLocalStorage(todoList);
    }

    // clear all completed todos
    clearCompleted() {
        const todoList = this.getLocalStorage().filter(todo => {
            if (!todo.isFinished) {
                return true;
            }
        });
        this.setLocalStorage(todoList);
    }
}