import "./styles.css"

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteTodo(inputText)
}

const createIncompleteTodo = (inputText) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";

  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = inputText;

  const completeButton = document.createElement("button")
  completeButton.innerText = '完了'

  completeButton.addEventListener('click', () => {
    const completeTarget = completeButton.closest('li')
    completeButton.nextElementSibling.remove()
    completeButton.remove()

    const backButton = document.createElement('button')
    backButton.innerText = '戻す'
    backButton.addEventListener('click', () => {
      backButton.closest('li').remove()
      const inputText = backButton.previousElementSibling.innerText
      createIncompleteTodo(inputText)
    })
    completeTarget.firstElementChild.appendChild(backButton)

    document.getElementById('done-list').appendChild(completeTarget)
  })

  const deleteButton = document.createElement('button')
  deleteButton.innerText = '削除'
  deleteButton.addEventListener('click', () => {
    const deleteTarget = deleteButton.closest('li')
    document.getElementById('incomplete-list').removeChild(deleteTarget)
  })

  div.appendChild(p);
  div.appendChild(completeButton)
  div.appendChild(deleteButton)
  li.appendChild(div);

  document.getElementById("incomplete-list").appendChild(li);
}

document.getElementById("add-button").addEventListener("click", onClickAdd);
