import TodoController from './todocontroller';
import TodoService from './todoservice';
import Storage from './storage';

window.onload = () => {
    let storage = new Storage('todoDB');
    let service = new TodoService(storage);
    let controller = new TodoController(service);
}
