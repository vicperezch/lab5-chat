function main() {
    createLayout()
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

    await displayMessages(section)
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

async function displayMessages(section) {
    const response = await fetch("http://chat.calicheoficial.lat/messages")
    const messageList = await response.json()
    
    const div = document.createElement("div")
    const ul = document.createElement("ul")

    messageList.forEach(message => {
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

        if (message.user === "Víctor") {
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
            `
            
            li.appendChild(image)
        }

        ul.appendChild(li)
    })

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

function drawInput(section) {
    const div = document.createElement("div")
    const chatInput = document.createElement("textArea")
    const button = document.createElement("button")

    div.style = `
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    `

    chatInput.placeholder = "Type a message..."
    chatInput.style = `
    padding: 10px;
    height: 40px;
    width: 590px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #26272E;
    `

    button.innerText = "Enviar"

    div.appendChild(chatInput)
    div.appendChild(button)
    section.appendChild(div)
}

main()