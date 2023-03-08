const eMail = document.querySelector('#mail')
const passWord = document.querySelector('#passWord')
const connect = document.querySelector('#connect')
function eMailValue (){
    eMail.addEventListener('keyup', (e) =>{
        let value = e.target.value
        console.log(value)
        return value
    })
}
eMailValue()

function passWordValue (){
    passWord.addEventListener('keyup', (e)=>{
        let value = e.target.value
        console.log(value)
        return value
    })
}
passWordValue()

function errorMsg(){alert('identifiant ou mot de passe incorrect')}

function connection(){
    connect.addEventListener('click', ()=>{
        fetch('http://localhost:5678/api/users/login', {
            method:"POST",
            body: JSON.stringify({"email":eMailValue(), "password":passWordValue()}),
            headers: {'Content-type': 'application/json'}
        })
        .then((res) => {
            if (res.ok){
                res => res.json();
            }
            else{
                errorMsg();
            }
        })
        .then((data) =>{
            if (data.userId != 0){
                localStorage.setItem("token", value.token);
                document.location.href = "/index.html"
            }
        })
    })
}
connection()