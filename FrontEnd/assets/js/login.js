//declaration des const qui me serviront pour la suite du script
const eMail = document.querySelector('#mail')
const passWord = document.querySelector('#passWord')
const form = document.querySelector('form')

//fonction pour declencher un message d'alerte a propos de l'identifiant ou du mdp
function errorMsg(){alert('identifiant ou mot de passe incorrect')}

//script pour envoyer les informations necessaires a l'API pour se connecter 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    //creation d'une const user pour recupérer les infos necessaires a la connection
    const user = {
        email: eMail.value,
        password : passWord.value,
    };
    //fetch POST avec la const user en body
    fetch('http://localhost:5678/api/users/login', {
        method:"POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })

    .then((res) =>{
        if(res.ok){
            return res.json();
        }
        else{
            errorMsg()
        }
    })
    //recuperation et stockage du token de connection et redirection vers la home page 
    .then((data) =>{
        sessionStorage.setItem("token", data.token);
        document.location.href = "index.html";
    })
})