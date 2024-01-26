const Destination_nav = document.getElementById('Destination_nav');
const Destination_text_title = document.getElementById('Destination_text_title');
const Destination_text_subtitle = document.getElementById('Destination_text_subtitle');
const Destination_text_distance = document.getElementById('Destination_text_distance');
const Destination_text_time = document.getElementById('Destination_text_time');
const Destination_img = document.getElementById('Destination_img');

function LoadPlanet(id){
    fetch(`http://localhost:8000/api/planet/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        Destination_text_title.textContent = data.en_name;
        Destination_text_subtitle.textContent = data.en_description;
        Destination_text_distance.textContent = data.distance;
        Destination_text_time.textContent = data.time;
        imagePath = data.image;
        imagePath = imagePath.replace('img/', '');
        Destination_img.src = "http://localhost:8000/api/planetImg/" + imagePath;

    })
    .catch(err => console.log(err));
}

window.addEventListener('load', () => {
    fetch('http://localhost:8000/api/planets')
    .then(response => response.json())
    .then(data => {
        LoadPlanet(data[0].id);
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
    .catch(err => console.log(err));
});