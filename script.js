document.addEventListener("DOMContentLoaded", () => {
  let todos = [];

  const inputTodo = document.getElementById("input-todo");
  const addTodoBtn = document.getElementById("add-todo");
  const todosList = document.getElementById("tasks-list");

  function render() {
    todosList.innerHTML = "";

    todos.forEach((todo) => {
      const liElement = document.createElement("li");

      const spanElement = document.createElement("span");
      spanElement.textContent = todo.task;

      const deteleBtnElement = document.createElement("button");
      deteleBtnElement.addEventListener("click", () => deleteTodo(todo.id));
      deteleBtnElement.innerText = "Delete";

      liElement.appendChild(spanElement);
      liElement.appendChild(deteleBtnElement);
      todosList.appendChild(liElement);
    });
  }

  function getRandomId() {
    return Math.floor(Math.random() * 1000);
  }

  function addTodoFunc() {
    const text = inputTodo.value;
    const randomId = getRandomId();

    todos.push({ id: randomId, task: text });

    inputTodo.value = "";
    render();
  }

  function deleteTodo(todoId) {
    let newTodo = [];
    todos.forEach((todo) => {
      if (todo.id != todoId) {
        newTodo.push(todo);
      }
    });
    todos = newTodo;
    render();
  }

  addTodoBtn.addEventListener("click", addTodoFunc);

  inputTodo.addEventListener("keyup", (e) => {
    if (e.key === "Enter") addTodoBtn.click();
  });

  render();
});
