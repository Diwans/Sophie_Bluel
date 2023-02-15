const gallery = document.querySelector('.gallery')
const img = document.querySelectorAll('.imgGallery')


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
    })

