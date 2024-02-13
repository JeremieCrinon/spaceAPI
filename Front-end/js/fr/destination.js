const Destination_nav = document.getElementById('Destination_nav');
const Destination_text_title = document.getElementById('Destination_text_title');
const Destination_text_subtitle = document.getElementById('Destination_text_subtitle');
const Destination_text_distance = document.getElementById('Destination_text_distance');
const Destination_text_time = document.getElementById('Destination_text_time');
const Destination_img = document.getElementById('Destination_img');
const Destination_content = document.getElementById('Destination_content');

function HandleApiError(){
    Destination_content.innerHTML = '<h2 class="Destination--error">Erreur 500 : Erreur serveur, veuillez réessayer plus tard!</h2>';
}

function LoadPlanet(id){
    fetch(`http://localhost:8000/api/planet/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        Destination_text_title.textContent = data.fr_name;
        Destination_text_subtitle.textContent = data.fr_description;
        Destination_text_distance.textContent = data.distance;
        Destination_text_time.textContent = data.time;
        imagePath = data.image;
        imagePath = imagePath.replace('img/', '');
        Destination_img.src = "http://localhost:8000/api/planetImg/" + imagePath;

    })
    .catch(HandleApiError);
}

window.addEventListener('load', () => {
    fetch('http://localhost:8000/api/planets')
    .then(response => response.json())
    .then(data => {
        if(typeof(sessionStorage.getItem('planetToGo')) !== 'undefined' && sessionStorage.getItem('planetToGo') != null && sessionStorage.getItem('planetToGo') != "null"){
            // console.log('planetToGo', typeof(sessionStorage.getItem('planetToGo')));
            LoadPlanet(sessionStorage.getItem('planetToGo'));
            sessionStorage.setItem('planetToGo', null);
        } else {
            LoadPlanet(data[0].id);
        }
        console.log(data);
        data.forEach(planet => {
            let a = document.createElement('a');
            a.classList.add('Destination--nav__link');
            a.textContent = planet.en_name;
            Destination_nav.appendChild(a);
            a.addEventListener('click', () => {
                LoadPlanet(planet.id);
                let current = document.querySelector('.Destination--nav__link__current');
                current.classList.remove('Destination--nav__link__current');
                a.classList.add('Destination--nav__link__current');
            });
        });
        const firstLink = document.querySelector('.Destination--nav__link');
        firstLink.classList.add('Destination--nav__link__current');
    })
    .catch(HandleApiError);
});