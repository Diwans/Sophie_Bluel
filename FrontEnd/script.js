const gallery = document.querySelector('.gallery')





async function apiData(){
    fetch(`http://localhost:5678/api/works`)
        .then(res => res.json())
        .then(data => console.log(data))
}

apiData()