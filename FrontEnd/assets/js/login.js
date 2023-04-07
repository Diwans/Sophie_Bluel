//declaration des const qui me serviront pour la suite du script
const eMail = document.querySelector('#mail')
const passWord = document.querySelector('#passWord')
const form = document.querySelector('form')

//script pour envoyer les informations necessaires a l'API pour se connecter 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    //creation d'une const user pour recupérer les infos necessaires a la connection
    const user = {
        email: eMail.value,
        password : passWord.value,
    };

    if(eMail.value == ""){
        const mailRequiredField = document.getElementById('mailRequiredField');
        mailRequiredField.innerText="*champs requis*";
    }

    if(passWord.value == ""){
        const mdpRequiredField = document.getElementById('mdpRequiredField');
        mdpRequiredField.innerText="*champs requis*";
    }
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
    })
    //recuperation et stockage du token de connection et redirection vers la home page 
    .then((data) =>{
        sessionStorage.setItem("token", data.token);
        document.location.href = "index.html";
    })
})