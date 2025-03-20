const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

console.log(3);
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
  // todoList와 doneList의 내용을 초기화
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  // todos 배열을 순회하면서 할 일을 추가
  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);  // li를 todoList에 추가
  });

  // doneTasks 배열을 순회하면서 완료된 일을 추가
  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);  // li를 doneList에 추가
  });
};

const getTodoText = (): string => {
  return todoInput.value.trim();
};

const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = '';
  renderTasks();
};

const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id !== todo.id);  // todo.id가 일치하는 항목만 제거
  doneTasks.push(todo);
  renderTasks();
};

const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);  // 완료된 목록에서 해당 todo 제거
  renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = todo.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');

  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#28a745';
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#007bff';
  }

  button.addEventListener('click', (): void => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li;  // li 요소를 반환
};

todoForm.addEventListener('submit', (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTasks();  // 초기 렌더링
