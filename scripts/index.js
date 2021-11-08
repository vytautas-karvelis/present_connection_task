//External API
const JSONPLACEHOLDER_URI = 'https://jsonplaceholder.typicode.com/posts';

//Variables
const tbodyElement = document.querySelector('tbody');
let tbodyRow
//Functions
const getPosts = async () => {
    let response = await fetch(JSONPLACEHOLDER_URI)
    let posts = await response.json()

    tbodyElement.innerHTML = posts.reduce((total, post)=>{
         total += `
            <tr>             
                <td>${post.id}</td>  
                <td>${post.title}</td>                  
            </tr>
         `
        return total
    }, '')

    tbodyRow = document.querySelectorAll("tbody tr")
    tbodyRowCount = tbodyRow.length 

    for(let i=0; i<tbodyRowCount; i++){
        tbodyRow[i].addEventListener("mouseover", highlightRow)
        tbodyRow[i].addEventListener("mouseout", deHighlightRow)
        tbodyRow[i].addEventListener("click", handleClick)
    }
}

const highlightRow = (e) => {
    if(e.target.parentNode.tagName ==="TR"){
        e.target.parentNode.style = "background:skyblue; cursor:pointer"
    }  
}

const deHighlightRow = (e) => {
    if(e.target.parentNode.tagName ==="TR"){
        e.target.parentNode.style = "background:white;"
    }  
}

const handleClick = (e) => {
  const postId = e.target.parentNode.children[0].innerHTML  
  let params = new URLSearchParams()
  params.append("id", postId)

  let url = "details.html?"+ params.toString()
  location.href = url 
  window.open(url)
}

//Events
document.addEventListener("DOMContentLoaded", getPosts)


