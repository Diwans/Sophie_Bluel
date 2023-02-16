const gallery = document.querySelector('.gallery')
const img = document.querySelectorAll('.imgGallery')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')


fetch(`http://localhost:5678/api/works`)
    .then(res => {
        console.log(res);

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < 12; i++){
                gallery.innerHTML +="<figure>"+"<img src='"+data[i].imageUrl+"'>"+"<figcaption>"+data[i].title+"</figcaption>"+"</figure>";
            }
            })
        } else {
            console.log("ERREUR");
        }
    });

