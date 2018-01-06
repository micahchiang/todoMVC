import Storage from './storage';

export default class TodoService {

    constructor(storage) {
        this.storage = storage;
    }

    get list() {
        return this.storage.getLocalStorage();
    }

    get itemsRemaining() {
        let itemsRemaining = this.storage.getLocalStorage().filter(todo => {
            if (!todo.isFinished) {
                return true;
            }
        });
        return itemsRemaining.length;
    }
    // consume a new task
    processTodo(todo) {
        this.storage.insert(todo);
    }

    // update the description of a task
    updateTodo(id, desc) {
        this.storage.update(id, desc);
    }

    // remove a task
    removeTodo(id) {
        this.storage.delete(id);
    }

    // update the status of a task to complete
    completeTodo(id, status) {
        this.storage.toggleComplete(id, status);
    }

    // remove all completed tasks
    clearAllComplete() {
        this.storage.clearCompleted();
    }

    filteredList(query) {
        let list = this.storage.getLocalStorage().filter(todo => {
            if(todo.isFinished === query['query']) {
                return true;
            }
        });
        return list;
    }

}