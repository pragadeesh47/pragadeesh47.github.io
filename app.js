const projectContainer = document.querySelector(".project-images");
const showBtn = document.querySelector(".show-btn");

showBtn.addEventListener("click", function(){
    projectContainer.classList.toggle("overflow-class");
    if(!projectContainer.classList.contains("overflow-class")){
        showBtn.textContent = "Hide All";
    }
    else{
        showBtn.textContent = "Show All";
    }

})
