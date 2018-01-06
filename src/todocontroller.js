import Todo from './todo';
import TodoService from './todoservice';

export default class TodoController {

    constructor(service) {
        this.service = service;
        this.todoList = this.service.list;
        this.itemsLeft = this.service.itemsRemaining;
        this.todoInput = document.getElementById('todoInput');
        this.todoListView = document.getElementById('todoList');
        this.todoFooter = document.getElementById('listFooter');
        this.todoCounter = document.getElementById('counter');
        this.showAllBtn = document.getElementById('showAllBtn');
        this.showActiveBtn = document.getElementById('showActiveBtn');
        this.showCompletedBtn = document.getElementById('showCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllCompletedBtn');
        this.toggleFooter();
        document.addEventListener('keypress', e => this.processTodo(e));
        this.showAllBtn.addEventListener('click', e => this.showAll());
        this.showActiveBtn.addEventListener('click', e => this.filterList(false));
        this.showCompletedBtn.addEventListener('click', e => this.filterList(true));
        this.clearAllBtn.addEventListener('click', e => this.clearAll());

        if (this.todoList.length > 0) {
            this.buildDomList(this.todoList);
        }
    }

    processTodo(e) {
        if(e.keyCode === 13) {
            let val = this.todoInput.value;
            if (val === '') {
                return;
            }
            let id = Date.now();
            let todo = new Todo(val, id);
            this.service.processTodo(todo);
            this.todoList = this.service.list;
            this.itemsLeft = this.service.itemsRemaining;
            this.todoInput.value = '';
            this.addItemToView(todo);
        }
    }

    addItemToView(item) {
        let entry = document.createElement('li');
        let description = document.createElement('p');
        let doneButton = document.createElement('input');
        let deleteButton = document.createElement('i');
        deleteButton.innerText = 'clear';
        deleteButton.setAttribute('id', `${item.id}`);
        deleteButton.addEventListener('click', e => this.removeItem(e));
        deleteButton.classList.add('material-icons');
        deleteButton.classList.add('delete__btn');
        doneButton.setAttribute('name', `${item.description}`);
        doneButton.setAttribute('type', 'checkbox');
        doneButton.addEventListener('click', e => this.completeItem(e));
        doneButton.classList.add('done__btn');
        description.innerHTML = item.description;
        description.classList.add('item__description');
        entry.classList.add('list__item');
        entry.appendChild(doneButton);
        entry.appendChild(description);
        entry.appendChild(deleteButton);
        this.todoListView.appendChild(entry);
        this.updateCounter();
        this.toggleFooter();
    }

    // TODO: add function that changes item from p to input in dom.

    // called by another function that provides id and desc from dom.
    updateItem(id, desc) {
        let identifier = id;
        let updatedDesc = desc;
        this.service.updateTodo(id, desc);
        this.todoList = this.service.list;
    }

    removeItem(e) {
        let identifier = e.target.id;
        let node = e.target.parentNode;
        for(let [index, item] of this.todoList.entries()) {
            if (item.id == identifier) {
                this.service.removeTodo(item.id);
                this.todoList = this.service.list;
                this.itemsLeft = this.service.itemsRemaining;
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
                this.service.completeTodo(item.id, item.isFinished);
                sibling.classList.add('item__completed');
            } else if (item.description === identifier && item.isFinished) {
                item.isFinished = false;
                this.service.completeTodo(item.id, item.isFinished);
                sibling.classList.remove('item__completed');
            }
        }
        this.itemsLeft = this.service.itemsRemaining;
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
        this.todoCounter.innerHTML = this.itemsLeft > 1 ?
            `${this.itemsLeft} items left` :
            `${this.itemsLeft} item left`;
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

    filterList(query) {
        this.todoList = this.service.filteredList({query});
        this.buildDomList(this.todoList);
    }

    showAll() {
        this.todoList = this.service.list;
        this.buildDomList(this.todoList);
    }

    clearAll() {
        this.service.clearAllComplete();
        this.todoList = this.service.list;
        this.buildDomList(this.todoList, true);
        this.clearAllBtn.classList.remove('shown');
    }

    buildDomList(arr, didClearAll = false) {
        if (arr.length === 0 && didClearAll) {
            this.toggleFooter();
        } else {
            while(this.todoListView.firstChild) {
                this.todoListView.removeChild(this.todoListView.firstChild);
            }
            for(let todo of arr) {
                let entry = document.createElement('li');
                let description = document.createElement('p');
                let doneButton = document.createElement('input');
                let deleteButton = document.createElement('i');
                deleteButton.innerText = 'clear';
                deleteButton.setAttribute('id', `${todo.id}`);
                deleteButton.addEventListener('click', e => this.removeItem(e));
                deleteButton.classList.add('material-icons');
                deleteButton.classList.add('delete__btn');
                doneButton.setAttribute('name', `${todo.description}`);
                doneButton.setAttribute('type', 'checkbox');
                doneButton.addEventListener('click', e => this.completeItem(e));
                doneButton.classList.add('done__btn');
                description.innerHTML = todo.description;
                description.classList.add('item__description');
                entry.classList.add('list__item');
                entry.appendChild(doneButton);
                entry.appendChild(description);
                entry.appendChild(deleteButton);
                if (todo.isFinished) {
                    doneButton.setAttribute('checked', 'checked');
                    description.classList.add('item__completed');
                }
                this.todoListView.appendChild(entry);
            }
            this.updateCounter();
        }
    }
}
