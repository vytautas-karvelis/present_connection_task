//External API
const JSONPLACEHOLDER_URI = 'https://jsonplaceholder.typicode.com/posts';

//variables

const userIdElement = document.querySelector("#userID")
const idElement = document.querySelector("#ID")
const titleElement = document.querySelector("#title")
const bodyElement = document.querySelector("#body")

//functions
const windowLoadedHandler = async() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
   
    let response = await fetch(JSONPLACEHOLDER_URI+`/${id}`)
    let post = await response.json()  
    console.log(post)
    userIdElement.innerHTML += " " + post.userId
    idElement.innerHTML += " " + post.id
    titleElement.innerHTML += " " + post.title
    bodyElement.innerHTML += " " + post.body
}


//events
window.addEventListener('load', windowLoadedHandler)