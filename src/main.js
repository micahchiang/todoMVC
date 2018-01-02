import TodoManager from './todo-manager';
import Storage from './storage';

window.onload = () => {
    let storage = new Storage('todoDB');
    let manager = new TodoManager(storage);
}
