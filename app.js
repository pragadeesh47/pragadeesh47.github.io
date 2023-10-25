// const projectContainer = document.querySelector(".project-images");
// const showBtn = document.querySelector(".show-btn");

// showBtn.addEventListener("click", function(){
//     projectContainer.classList.toggle("overflow-class");
//     if(!projectContainer.classList.contains("overflow-class")){
//         showBtn.textContent = "Hide All";
//     }
//     else{
//         showBtn.textContent = "Show All";
//     }

// })
const projectsData = [
    {
        image : '/projectimages/blog.png',
        name : 'Blog Website'
    },
    {
        image : '/projectimages/pos.png',
        name : 'Point of Sale Website'
    },
    {
        image : '/projectimages/el.png',
        name  : 'E Learning Website'
    },
    {
        image : '/projectimages/event.png',
        name  : 'Landing Page',
    },
    {
        image  : '/projectimages/dice.png',
        name : 'Dice Game'
    }
]

let currentIndex = 0;
const imageElement = document.getElementById('projectImage');
const titleElement = document.getElementById('projectTitle');
imageElement.src = projectsData[currentIndex].image;
titleElement.textContent = projectsData[currentIndex].name;
function imageChanger(){
    setInterval(() => {
        imageElement.style.opacity = 0.2; // Start fading out the image
        titleElement.style.opacity = 0.2; // Start fading out the title

        setTimeout(() => {
            if (currentIndex >= projectsData.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }

            imageElement.src = projectsData[currentIndex].image;
            titleElement.textContent = projectsData[currentIndex].name;

            imageElement.style.opacity = 1; // Start fading in the new image
            titleElement.style.opacity = 1; // Start fading in the new title
        }, 1000); // Wait for 1 second for the fade-out animation to complete
    }, 5000);
}

imageChanger()


const next = document.getElementById('nextButton');
const prev = document.getElementById('prevButton');
function handleNext(){
    if(currentIndex >= projectsData.length - 1){
        currentIndex = 0;
        imageElement.src = projectsData[currentIndex].image;
        titleElement.textContent = projectsData[currentIndex].name;
        return
    }
    currentIndex++;
    imageElement.src = projectsData[currentIndex].image;
    titleElement.textContent = projectsData[currentIndex].name;
}

function handlePrev(){
    if(currentIndex <= 0){
        currentIndex = projectsData.length - 1;
        imageElement.src = projectsData[currentIndex].image;
        titleElement.textContent = projectsData[currentIndex].name;
        return
    }
    currentIndex--;
    imageElement.src = projectsData[currentIndex].image;
    titleElement.textContent = projectsData[currentIndex].name;
}


next.addEventListener('click', handleNext)
prev.addEventListener('click', handlePrev)