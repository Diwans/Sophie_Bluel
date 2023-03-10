const eMail = document.querySelector('#mail')
const passWord = document.querySelector('#passWord')
const form = document.querySelector('form')

function errorMsg(){alert('identifiant ou mot de passe incorrect')}


form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const user = {
        email: eMail.value,
        password : passWord.value,
    };

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

    .then((data) =>{
        sessionStorage.setItem("token", data.token);
        document.location.href = "index.html";
    })
})