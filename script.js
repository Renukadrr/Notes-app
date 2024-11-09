const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}

showNotes();

function updateStorage() {
    
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let noteWrapper = document.createElement("div");
    noteWrapper.className = "note-wrapper";

    let inputTitle = document.createElement("div");
    inputTitle.className = "input-title";
    inputTitle.setAttribute("contenteditable", "true");
    inputTitle.setAttribute("data-placeholder", "Enter title here");

    let inputBox = document.createElement("div");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.setAttribute("data-placeholder", "Enter note here");

    let img = document.createElement("img");
    img.src = "images/delete.png";

    noteWrapper.appendChild(inputTitle);
    noteWrapper.appendChild(inputBox);
    noteWrapper.appendChild(img);
    notesContainer.appendChild(noteWrapper);

    updateStorage();
    addPlaceholderBehavior(inputTitle);
    addPlaceholderBehavior(inputBox);
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.classList.contains("input-box") || e.target.classList.contains("input-title")) {
        notes = document.querySelectorAll(".input-box, .input-title");
        notes.forEach(nt => nt.onkeyup = function () {
            updateStorage();
        });
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter" && (event.target.classList.contains("input-title") || event.target.classList.contains("input-box"))) {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

function addPlaceholderBehavior(element) {
    element.addEventListener("focus", () => {
        if (element.innerText === element.getAttribute("data-placeholder")) {
            element.innerText = "";
        }
    });

    element.addEventListener("blur", () => {
        if (element.innerText.trim() === "") {
            element.innerText = element.getAttribute("data-placeholder");
        }
    });

    // Initialize placeholder text
    if (element.innerText.trim() === "") {
        element.innerText = element.getAttribute("data-placeholder");
    }
}

// Add placeholder behavior to existing elements
document.querySelectorAll(".input-box, .input-title").forEach(addPlaceholderBehavior);
