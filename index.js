let lastIndex = -1

function main() {
    createLayout()
    setInterval(drawMessages, 10000)
}

async function createLayout() {
    document.getElementsByTagName("body")[0].style = "margin: 0;\nheight: 100dvh;\nwidth: 100dvw;"
    const structure = [
        document.createElement("header"),
        document.createElement("main")
    ]

    const section = document.createElement("section")
    section.style = `
    height: 100%;
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    `

    const title = document.createElement("h1")
    title.textContent = "Chat"
    title.style = `
    margin: 0;
    color: white;
    `

    createMessagesLayout(section)
    drawInput(section)

    structure[0].style = `
    width: 100dvw;
    height: 100px;
    border-bottom: 2px solid grey;
    background-color: #1B1A1F;
    display: flex;
    align-items: center;
    justify-content: center;
    `

    structure[1].style = `
    width: 100dvw;
    height: calc(100% - 100px);
    background-color: #1B1A1F;
    `

    structure[0].appendChild(title)
    structure[1].appendChild(section)

    structure.forEach(element => {
        document.body.appendChild(element)
    })
}

function createMessagesLayout(section) {
    const div = document.createElement("div")
    const ul = document.createElement("ul")

    drawMessages()

    div.style = `
    flex: 5;
    overflow: scroll;
    display: flex;
    flex-direction: column-reverse;
    padding-top: 25px;
    `

    ul.style = `
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    `

    div.appendChild(ul)
    section.appendChild(div)
}

async function drawMessages() {
    const response = await fetch("https://chat.calicheoficial.lat/messages")
    const messageList = await response.json()

    const ul = document.getElementsByTagName("ul")[0]

    messageList.slice(lastIndex + 1).forEach(message => {
        if (message.user === "" || message.text === "") {
            return
        }

        const li = document.createElement("li")
        const name = document.createElement("p")
        const content = document.createElement("p")

        name.innerText = message.user
        content.innerText = message.text

        li.style = `
        color: white;
        width: fit-content;
        display: flex;
        flex-direction: column;
        gap: 5px;
        `

        name.style = `
        margin: 0;
        `

        content.style = `
        margin: 0;
        padding: 10px;
        border-radius: 10px;
        max-width: 500px;
        overflow-wrap: break-word;
        `

        if (message.user === "victor") {
            name.style.textAlign = "right"
            name.style.paddingRight = "5px"
            content.style.backgroundColor = "#2C2B32"
            li.style.alignSelf = "end"

        } else {
            name.style.paddingLeft = "5px"
            content.style.backgroundColor = "#7363F1"
        }

        li.appendChild(name)
        li.appendChild(content)

        if (/\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(message.text)) {
            const image = document.createElement("img")
            image.src = message.text
            image.style = `
            width: 300px;
            border-radius: 10px;
            `
            
            li.appendChild(image)
        }

        ul.appendChild(li)
    })

    lastIndex = messageList.length - 1
}

function drawInput(section) {
    const div = document.createElement("div")
    const chatInput = document.createElement("textArea")
    const button = document.createElement("button")
    const image = document.createElement("img")

    div.style = `
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    `

    chatInput.placeholder = "Escribe un mensaje..."
    chatInput.style = `
    padding: 10px;
    height: 40px;
    width: 590px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #26272E;
    `

    button.style = `
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #FC5699;
    border: none;
    padding: 3px 3px 0 0;
    `

    image.src = "./images/send.png"
    image.style = `
    width: 25px;
    `

    button.addEventListener("click", async function() {
        if (chatInput.value === "") {
            return

        } else if (chatInput.value.length > 140) {
            alert("No se permiten mensajes con maś de 140 caracteres.")
            return
        }
        
        const response = await fetch("https://chat.calicheoficial.lat/messages", 
            {
                method: "POST",
                body: JSON.stringify({text: chatInput.value, user: "victor"})
            }
        )

        chatInput.value = ""
    })

    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            button.click()
        }
    })

    button.appendChild(image)
    div.appendChild(chatInput)
    div.appendChild(button)
    section.appendChild(div)
}

main()