import {Todo} from './todo';

export class TodoManager {

    constructor() {
        this.todoList = [];
        this.todoInput = document.getElementById('todoInput');
        this.todoListView = document.getElementById('todoList');
        document.addEventListener('keypress', e => this.processTodo(e)); //use an arrow function to maintain scope of `this` as class.
    }

    processTodo(e) {
        if(e.keyCode === 13) {
            let val = this.todoInput.value;
            let todo = new Todo(val);
            this.todoList.push(todo);
            this.todoInput.value = '';
            this.updateListView(todo);
        }
    }

    updateListView(item) {
        let entry = document.createElement('li');
        let description = document.createElement('p');
        let doneButton = document.createElement('input');
        let deleteButton = document.createElement('i');
        deleteButton.innerText = 'clear';
        deleteButton.setAttribute('id', `${item.description}`);
        deleteButton.addEventListener('click', e => this.removeItem(e));
        deleteButton.classList.add('material-icons');
        deleteButton.classList.add('delete__btn');
        doneButton.setAttribute('name', `${item.description}`);
        doneButton.setAttribute('type', 'checkbox');
        doneButton.addEventListener('click', e => this.completeItem(e));
        description.innerHTML = item.description;
        description.classList.add('item__description');
        doneButton.classList.add('done__btn');
        entry.classList.add('list__item');
        entry.appendChild(doneButton);
        entry.appendChild(description);
        entry.appendChild(deleteButton);
        this.todoListView.appendChild(entry);
    }

    removeItem(e) {
        let identifier = e.target.id;
        let node = e.target.parentNode;
        for(let [index, item] of this.todoList.entries()) {
            if (item.description === identifier) {
                this.todoList.splice(index,1);
                this.todoListView.removeChild(node);
            }
        }
    }

    completeItem(e) {
        let identifier = e.target.name;
        let sibling = e.target.nextSibling;
        for(let [index, item] of this.todoList.entries()) {
            if (item.description === identifier && !item.isFinished) {
                item.isFinished = true;
                sibling.classList.add('item__completed');
            } else {
                item.isFinished = false;
                sibling.classList.remove('item__completed');
            }
        }
    }
}
