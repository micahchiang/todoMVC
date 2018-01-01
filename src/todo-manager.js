import {Todo} from './todo';

export class TodoManager {

    constructor() {
        this.todoList = [];
        this.itemsLeft = 0;
        // use these flags to reset classlist before filtering.
        this.showActive = false;
        this.showCompleted = false;
        this.todoInput = document.getElementById('todoInput');
        this.todoListView = document.getElementById('todoList');
        this.todoFooter = document.getElementById('listFooter');
        this.todoCounter = document.getElementById('counter');
        this.showAllBtn = document.getElementById('showAllBtn');
        this.showActiveBtn = document.getElementById('showActiveBtn');
        this.showCompletedBtn = document.getElementById('showCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllCompletedBtn');
        this.toggleFooter();
        document.addEventListener('keypress', e => this.processTodo(e)); //use an arrow function to maintain scope of `this` as class.
        this.showAllBtn.addEventListener('click', e => this.toggleAll());
        this.showActiveBtn.addEventListener('click', e => this.toggleActive());
        this.showCompletedBtn.addEventListener('click', e => this.toggleCompleted());
        this.clearAllBtn.addEventListener('click', e => this.clearAll());
    }

    processTodo(e) {
        if(e.keyCode === 13) {
            let val = this.todoInput.value;
            if (val === '') {
                return;
            }
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
        this.showClearAllBtn();
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

    showClearAllBtn() {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].isFinished) {
                this.clearAllBtn.classList.add('shown');
                return;
            } else {
                this.clearAllBtn.classList.remove('shown');
            }
        }
    }

    toggleAll() {
        // if a list item has the class list__item-hidden, remove it.
        let listItems = document.getElementsByClassName('list__item');
            for(let listItem of listItems) {
                if (listItem && listItem.classList.contains('list__item-hidden')) {
                    listItem.classList.remove('list__item-hidden');
                }
            }
            this.showCompleted = false;
            this.showActive = false;
        }

    toggleActive() {
        // search list for all items with isFinished = true, grab them in dom, add display none;
        // there's probably a better way to do this...
        let listItems = document.getElementsByClassName('list__item');
        if (this.showCompleted) {
            this.toggleAll();
        }
        for(let todo of this.todoList) {
            if (todo && todo.isFinished) {
                for(let listItem of listItems) {
                    if (listItem && listItem.children[1].innerText === todo.description) {
                       listItem.classList.add('list__item-hidden');
                    }
                }
            }
        }
        this.showActive = true;
    }

    toggleCompleted() {
        // this is just the opposite of toggleActive;
        let listItems = document.getElementsByClassName('list__item');
        if (this.showActive) {
            this.toggleAll();
        }
        for(let todo of this.todoList) {
            if (todo && !todo.isFinished) {
                for(let listItem of listItems) {
                    if (listItem && listItem.children[1].innerText === todo.description) {
                        listItem.classList.add('list__item-hidden');
                    }
                }
            }
        }
        this.showCompleted = true;
    }

    clearAll() {
        let listItems = document.getElementsByClassName('list__item');
        let counter = 0; // use this because removing nodes will shift index matching
        for(counter; counter < this.todoList.length; counter++) {
            if (this.todoList[counter].isFinished) {
                this.todoListView.removeChild(listItems[counter]);
                this.todoList.splice(counter,1);
                counter = 0; // reset counter to match indexes
                listItems = document.getElementsByClassName('list__item'); // reset list to match indexes
            }
        }
        this.clearAllBtn.classList.remove('shown');
    }
}
