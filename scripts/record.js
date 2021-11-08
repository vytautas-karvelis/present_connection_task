//variables
const formElement = document.querySelector("form")
const userIdM1Element = document.querySelector('#userIdM1')
const userIdM2Element = document.querySelector('#userIdM2')
const bodyM1Element = document.querySelector("#bodyM1")
const titleM1Element = document.querySelector("#titleM1")

const userIdInputElement = document.querySelector("#userId")
const bodyInputElement = document.querySelector("#body")
const titleInputElement = document.querySelector("#title")

const messageHeadingElement = document.querySelector("#messageHeading")
const messageUserIdElement = document.querySelector("#messageUserIdContent")
const messageTitleElement = document.querySelector("#messageTitleContent")
const messageBodyElement = document.querySelector("#messageBodyContent")

const messageContainer = document.querySelector(".message-container")
//functions
const submitHandler = (e) => {
    e.preventDefault()

    const userId = e.target.userId.value
    const body = e.target.body.value
    const title = e.target.title.value
    let isEmpty = false

    if(!userId){        
        manageClassLists(userIdM2Element, "display-visible", "display-hidden")
        manageClassLists(userIdInputElement, "border-red", "border-green")
        isEmpty = true
    }
    if(!body){        
        manageClassLists(bodyM1Element, "display-visible", "display-hidden")
        manageClassLists(bodyInputElement, "border-red", "border-green")
        isEmpty = true
    }
    if(!title){
        manageClassLists(titleM1Element, "display-visible", "display-hidden")
        manageClassLists(titleInputElement, "border-red", "border-green")
        isEmpty = true
    }
    if(isNaN(userId)){
        manageClassLists(userIdM1Element, "display-visible", "display-hidden")
        isEmpty = true
    }

    if(isEmpty){
        return
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) =>{
        messageHeadingElement.textContent = "New record added"
        messageTitleElement.textContent = data.title
        messageUserIdElement.textContent = data.userId
        messageBodyElement.textContent = data.body

        manageClassLists(messageHeadingElement, "opacity-visible", "opacity-hidden")
    });
    }

const onChangeHandler = (e) => {
    if(e.target.value.length>0){
        if(e.target.id === "userId" && isNaN(+e.target.value)){            
            manageClassLists(userIdM1Element, "display-visible", "display-hidden")
            manageClassLists(userIdM2Element, "display-hidden", "display-visible")
            manageClassLists(e.target, "border-red", "border-green")
            return
        } else if (e.target.id === "userId" && !isNaN(+e.target.value)) {
            manageClassLists(userIdM1Element, "display-hidden", "display-visible")
            manageClassLists(userIdM2Element, "display-hidden", "display-visible")
            manageClassLists(e.target, "border-red", "border-green")
        }
        manageClassLists(e.target.nextElementSibling, "display-hidden", "display-visible" )
        manageClassLists(e.target, "border-green", "border-red")
    } else if(e.target.value.length === 0) {
        if(e.target.id === "userId"){  
            manageClassLists(userIdM1Element, "display-hidden", "display-visible")
        }
       manageClassLists(e.target, "border-red", "border-green")
       manageClassLists(e.target.nextElementSibling, "display-visible", "display-hidden" )
       console.log('fires2')
    }    
}

const manageClassLists = (element, addClassList, removeClassList) =>{
    element.classList.add(addClassList)
    element.classList.remove(removeClassList)
}

//events
formElement.addEventListener("submit", submitHandler)
userIdInputElement.addEventListener("input", onChangeHandler)
bodyInputElement.addEventListener("input", onChangeHandler)
titleInputElement.addEventListener("input", onChangeHandler)