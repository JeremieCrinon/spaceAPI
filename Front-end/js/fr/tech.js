const tech_menu = document.getElementById('tech_menu');
const tech_content = document.getElementById('tech_content');
const Tech_img = document.getElementById('Tech_img');
const tech_name = document.getElementById('tech_name');
const tech_description = document.getElementById('tech_description');
let countTech = 1;

function HandleApiError(){
    tech_content.innerHTML = '<h2 class="Destination--error">Error 500 : Internal server error, please try again later!</h2>';
}

function LoadTech(id){
    fetch(`http://localhost:8000/api/tech/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        tech_name.textContent = data.fr_name;
        tech_description.textContent = data.fr_description;
        imagePath = data.image;
        imagePath = imagePath.replace('img/', '');
        Tech_img.src = "http://localhost:8000/api/techImg/" + imagePath;
    })
    .catch(HandleApiError);
}

fetch('http://localhost:8000/api/teches')
.then(response => response.json())
.then(data => {
    console.log(data);
    LoadTech(data[0].id);
    data.forEach(tech => {
        let a = document.createElement('a');
        a.classList.add('Tech--text--nav--link');
        a.textContent = countTech;
        countTech++;
        let li = document.createElement('li');
        li.appendChild(a);
        tech_menu.appendChild(li);
        a.addEventListener('click', () => {
            LoadTech(tech.id);
            let current = document.querySelector('.Tech--text--nav--link--current');
            current.classList.remove('Tech--text--nav--link--current');
            a.classList.add('Tech--text--nav--link--current');
        });
    });
    const firstLink = document.querySelector('.Tech--text--nav--link');
    firstLink.classList.add('Tech--text--nav--link--current');
})
.catch(HandleApiError);