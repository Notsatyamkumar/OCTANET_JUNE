// Selectors
const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const errorElement = document.getElementById("error");
const countValueElement = document.querySelector(".count-value");

let taskCount = 0;

// Functions
const displayCount = (count) => {
  countValueElement.innerText = count;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();

  // Clear error message
  errorElement.style.display = "none";

  if (!taskName) {
    // Show error message after 200ms
    setTimeout(() => {
      errorElement.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
      <input type="checkbox" class="task-check">
      <span class="taskname">${taskName}</span>
      <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>`;

  tasksContainer.insertAdjacentHTML("beforeend", task);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    });
  });

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      let targetElement = e.target;
      if (!(e.target.classList.contains("edit"))) {
        targetElement = e.target.parentElement;
      }
      const taskNameElement = targetElement.previousElementSibling;
      taskNameElement.contentEditable = "true";
      taskNameElement.focus();
    });
  });

  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      checkbox.nextElementSibling.classList.toggle("completed");
      if (checkbox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    });
  });
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
