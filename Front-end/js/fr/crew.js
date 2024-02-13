const crew_menu1 = document.getElementById('crew_menu1');
const crew_menu2 = document.getElementById('crew_menu2');
const Crew_content = document.getElementById('crew_content');
const crew_image = document.querySelectorAll('.crew_image');
const crew_role = document.querySelector('.Crew--text--role');
const crew_name = document.querySelector('.Crew--text--name');
const crew_description = document.querySelector('.Crew--text--description');

function HandleApiError(){
    const Crew_content = document.getElementById('crew_content');
    Crew_content.innerHTML = '<h2 class="Destination--error">Error 500 : Internal server error, please try again later!</h2>';
}

function LoadCrew(id){
    fetch(`http://localhost:8000/api/crew/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        crew_role.textContent = data.fr_role;
        crew_name.textContent = data.name;
        crew_description.textContent = data.fr_description;
        // Destination_text_subtitle.textContent = data.en_description;
        // Destination_text_distance.textContent = data.distance;
        // Destination_text_time.textContent = data.time;
        imagePath = data.image;
        imagePath = imagePath.replace('img/', '');
        crew_image.forEach(img => {
            img.src = "http://localhost:8000/api/planetImg/" + imagePath;
        });
        

    })
    .catch(error => {
        console.error(error);
        HandleApiError();
    });
}

fetch('http://localhost:8000/api/crews')
    .then(response => response.json())
    .then(data => {
        if(typeof(sessionStorage.getItem('planetToGo')) !== 'undefined' && sessionStorage.getItem('planetToGo') != null && sessionStorage.getItem('planetToGo') != "null"){
            // LoadCrew(sessionStorage.getItem('planetToGo'));
            // sessionStorage.setItem('planetToGo', null);
        } else {
            // LoadPlanet(data[0].id);
        }
        LoadCrew(data[0].id);
        console.log(data);
        data.forEach(crew => {
            let a = document.createElement('a');
            a.classList.add('Crew--text--nav--link');
            a.textContent = "";
            let li = document.createElement('li');
            li.appendChild(a);
            crew_menu2.appendChild(li);

            let a2 = document.createElement('a');
            a2.classList.add('Crew--text--nav--link');
            a2.classList.add('Crew--text--nav--link__mobile');
            a2.textContent = "";
            let li2 = document.createElement('li');
            li2.appendChild(a2);
            crew_menu1.appendChild(li2);

            a.addEventListener('click', () => {
                LoadCrew(crew.id);
                let current = document.querySelector('.Crew--text--nav--link--current:not(.Crew--text--nav--link__mobile)');
                current.classList.remove('Crew--text--nav--link--current');
                a.classList.add('Crew--text--nav--link--current');
            });
    
            a2.addEventListener('click', () => {
                LoadCrew(crew.id);
                let current = document.querySelector('.Crew--text--nav--link--current');
                current.classList.remove('Crew--text--nav--link--current');
                a2.classList.add('Crew--text--nav--link--current');
            });
            
        });
        const firstLink = document.querySelector('.Crew--text--nav--link');
        firstLink.classList.add('Crew--text--nav--link--current');
        const firstLink2 = document.querySelector('.Crew--text--nav--link:not(.Crew--text--nav--link__mobile)');
        firstLink2.classList.add('Crew--text--nav--link--current');
    })
    .catch(error => {
        console.error(error);
        HandleApiError();
    });