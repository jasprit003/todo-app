const icons = {
  default: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
              viewBox="0 0 256 256">
              <path
                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z">
              </path>
            </svg>`,
  clear: `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
              <path
                d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z">
              </path>
            </svg>`,
  delete: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg> `,
};

let todosList = [];

document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const addTodo = document.getElementById("add-todo");
  const todos = document.getElementById("todos");

  // Get data from localstorage
  function getData() {
    const data = localStorage.getItem("todosList");

    if (!data) {
      console.log("no local storage found!");
      return;
    }

    todosList = JSON.parse(data);
    console.log(todosList);
  }

  function render() {
    // Reset the todos tree before updating
    todos.innerHTML = "";

    // Loop thorugh each todo
    todosList.forEach((todo) => {
      // Create a list element
      const li = document.createElement("li");
      li.classList.add("todo");

      // Create a button to mark done
      const clearBtn = document.createElement("button");
      clearBtn.classList.add("icon");
      clearBtn.innerHTML = todo.isComplete ? icons.clear : icons.default;
      clearBtn.addEventListener("click", () => clearTodoFunc(todo));

      // Create a span element
      const span = document.createElement("span");
      span.innerText = todo.task;
      if (todo.isComplete) {
        span.classList.add("clear");
      }

      // Create a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      deleteBtn.innerHTML = icons.delete;
      deleteBtn.addEventListener("click", () => deleteTodoFunc(todo.id));

      // Append the elements to the list element
      li.appendChild(clearBtn);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      // Append li to parent ul
      todos.appendChild(li);

      // Save lo localstorage
    });
    localStorage.setItem("todosList", JSON.stringify(todosList));
  }

  // Add todo function
  function addTodoFunc() {
    // Get task from the input
    const task = inputTodo.value;

    // If empty input, return
    if (!task.trim()) {
      return;
    }

    // Generate a random ID
    const id = Math.floor(Math.random() * 100000000);
    console.log(id);

    // Create a todo object and push it to the main list
    const todo = {
      id,
      task,
      isComplete: false,
    };
    todosList.push(todo);

    render();
    inputTodo.value = "";
  }

  addTodo.addEventListener("click", addTodoFunc);

  function deleteTodoFunc(id) {
    // Filter the array
    let todo = todosList.filter((todo) => todo.id !== id);

    todosList = todo;
    render();
  }

  function clearTodoFunc(todo) {
    console.log(todo);

    todo.isComplete = !todo.isComplete;
    render();
  }

  // Add enter key event
  inputTodo.addEventListener("keypress", (e) => {
    // Check for input and key
    if (inputTodo.value && e.key === "Enter") {
      addTodoFunc();
    }
  });

  getData();
  render();
});
