import {Todo} from './todo';

export class TodoManager {

    constructor() {
        this.todoList = [];
        this.itemsLeft = 0;
        this.todoInput = document.getElementById('todoInput');
        this.todoListView = document.getElementById('todoList');
        this.todoFooter = document.getElementById('listFooter');
        this.todoCounter = document.getElementById('counter');
        this.toggleFooter();
        document.addEventListener('keypress', e => this.processTodo(e)); //use an arrow function to maintain scope of `this` as class.
    }

    processTodo(e) {
        if(e.keyCode === 13) {
            let val = this.todoInput.value;
            let todo = new Todo(val);
            this.todoList.push(todo);
            this.todoInput.value = '';
            this.addItem(todo);
        }
    }

    addItem(item) {
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
        this.itemsLeft++;
        this.updateCounter();
        this.toggleFooter();
    }

    removeItem(e) {
        let identifier = e.target.id;
        let node = e.target.parentNode;
        for(let [index, item] of this.todoList.entries()) {
            if (item.description === identifier) {
                if (!item.isFinished) {
                    this.itemsLeft --;
                }
                this.todoList.splice(index,1);
                this.todoListView.removeChild(node);
            }
        }
        this.updateCounter();
        this.toggleFooter();
    }

    completeItem(e) {
        let identifier = e.target.name;
        let sibling = e.target.nextSibling;
        for(let [index, item] of this.todoList.entries()) {
            if (item.description === identifier && !item.isFinished) {
                item.isFinished = true;
                this.itemsLeft--;
                sibling.classList.add('item__completed');
            } else if (item.description === identifier && item.isFinished) {
                item.isFinished = false;
                this.itemsLeft++;
                sibling.classList.remove('item__completed');
            }
        }
        this.updateCounter();
    }

    toggleFooter() {
        if (this.todoList.length === 0) {
            this.todoFooter.classList.add('hidden');
        } else if (this.todoList.length > 0 && this.todoFooter.classList.contains('hidden')) {
            this.todoFooter.classList.remove('hidden');
        }
    }

    updateCounter() {
        if (this.itemsLeft < 0) {
            this.itemsLeft = 0;
        }
        this.todoCounter.innerHTML = `${this.itemsLeft}`;
    }
}
