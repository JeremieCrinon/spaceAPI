const register_form = document.getElementById('register_form');

register_form.addEventListener('submit', (e) => {
    e.preventDefault(); //Empêche le rechargement de la page

    // Récupération des données du formulaire
    const formData = new FormData(register_form);

    // Envoyer les données du formulaire à l'API
    fetch('http://localhost:8000/api/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Traiter la réponse de l'API
    })
    .catch(error => {
        console.error(error); // Gérer les erreurs éventuelles
    });
});