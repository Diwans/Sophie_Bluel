const gallery = document.querySelector('.gallery')
const img = document.querySelectorAll('img')
console.log(img)




fetch(`http://localhost:5678/api/works`)
    .then(res => {
        console.log(res);

        if(res.ok){
            res.json().then(data => {
                gallery.innerHTML +="<figure>"+"<img>"+"<figcaption>"+data[0].title+"</figcaption>"+"</figure>";
                img.src = data[0].imageUrl
            })
        } else {
            console.log("ERREUR");
        }
    })

