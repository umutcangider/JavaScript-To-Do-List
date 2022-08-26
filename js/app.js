const UL_DOM = document.getElementById("list"); 
const TOAST_LIVE = document.getElementById("liveToast"); 
const TOAST_TITLE = document.querySelector("#toast-title"); 
const TOAST_MESSAGE = document.querySelector(".toast-body"); 
const NEW_TASK = document.querySelector("#task"); 

const DELETE_ALL_BUTTON = document.querySelector("#deleteAllButton");

let liCollection = document.getElementsByTagName("li");
let taskList = [];


function updateLocalStorage() {
    taskList = [];
    localStorage.clear();
    for (let i = 0; i < liCollection.length; i++) {
        taskList.push(liCollection[i].innerText);
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
}
updateLocalStorage();

function newItem() {
    if (NEW_TASK.value.trim()) {
        const LI_DOM = document.createElement("li");
        LI_DOM.innerHTML = `${NEW_TASK.value}<button type="button" onclick="deleteItem(this)" class="btn-close float-end" aria-label="Close"></button>`;
        LI_DOM.setAttribute("onclick", "changeStatus(this)");
        UL_DOM.appendChild(LI_DOM);
        updateLocalStorage();
        
        TOAST_TITLE.classList.remove("text-danger");
        TOAST_TITLE.classList.remove("text-primary");
        TOAST_TITLE.classList.add("text-success");
        TOAST_TITLE.innerText = "BAŞARILI!";
        TOAST_MESSAGE.innerText = "Görev başarıyla listeye eklendi.";
        DELETE_ALL_BUTTON.disabled = false;
    } else {
        TOAST_TITLE.classList.remove("text-success");
        TOAST_TITLE.classList.remove("text-primary");
        TOAST_TITLE.classList.add("text-danger");
        TOAST_TITLE.innerText = "HATA!";
        TOAST_MESSAGE.innerText = "Lütfen bir görev giriniz!";
    }

    const TOAST = new bootstrap.Toast(TOAST_LIVE);
    TOAST.show();

    NEW_TASK.value = "";
}

function changeStatus(item) {
    item.classList.toggle("checked"); 
}

function deleteItem(item) {
    item.parentElement.remove();
    updateLocalStorage();
    TOAST_TITLE.classList.remove("text-success");
    TOAST_TITLE.classList.remove("text-primary");
    TOAST_TITLE.classList.add("text-danger");
    TOAST_TITLE.innerText = "SİLİNDİ!";
    TOAST_MESSAGE.innerText = "Görev Silindi";
    if(taskList.length == 0){
        DELETE_ALL_BUTTON.disabled = true;
    }

    const TOAST = new bootstrap.Toast(TOAST_LIVE);
    TOAST.show();

    NEW_TASK.value = "";
}

function deleteTaskList() {
    let text = "UYARI!\nListenin tamamı silinecek. Bu işlem geri alınamaz. Emin misiniz?";
    if (confirm(text)) {
        for (let i = liCollection.length - 1; i >= 0; --i) {
        liCollection[i].remove();
        }   
    updateLocalStorage();
    TOAST_TITLE.classList.remove("text-success");
    TOAST_TITLE.classList.remove("text-danger"); 
    TOAST_TITLE.classList.add("text-primary");
    TOAST_TITLE.innerText = "TEMİZLENDİ!";
    TOAST_MESSAGE.innerText = "Listen tamamen silindi";
    
    const TOAST = new bootstrap.Toast(TOAST_LIVE);
    TOAST.show();

    NEW_TASK.value = "";

    DELETE_ALL_BUTTON.disabled = true;
    }
}