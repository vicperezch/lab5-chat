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
    text-align: center;
    `

    await displayMessages(section)
    drawInput(section)

    structure[0].style = `
    width: 100dvw;
    height: 100px;
    border-bottom: 2px solid grey;
    background-color: #1B1A1F;
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
    // const messageList = await fetch("http://calicheoficial.lat/chatapi/messages") 
    // console.log(messageList)

    const mensajes = [
        { id: 1, text: "Hola", user: "Víctor" },
        { id: 2, text: "¿Cómo estás?", user: "María" },
        { id: 3, text: "Todo bien, gracias.", user: "Víctor" },
        { id: 4, text: "Me alegra escuchar eso.", user: "María" },
        { id: 5, text: "¿Vamos al cine hoy?", user: "Víctor" },
        { id: 6, text: "¡Claro! ¿A qué hora?", user: "María" },
        { id: 7, text: "A las 7 pm, ¿te parece bien?", user: "Víctor" },
        { id: 8, text: "Sí, perfecto. Nos vemos luego.", user: "María" }
    ];
    
    const div = document.createElement("div")
    const ul = document.createElement("ul")

    mensajes.forEach(element => {
        const li = document.createElement("li")
        li.innerText = element.text
        li.style = `
        color: white;
        padding: 10px;
        width: fit-content;
        `
        if (element.user === "Víctor") {
            li.style.backgroundColor = "#2C2B32"
            li.style.textAlign = "right"

        } else {
            li.style.backgroundColor = "#7363F1"
        }

        ul.appendChild(li)
    })

    div.style = `
    flex: 5;
    `

    ul.style = `
    margin: 0;
    list-style-type: none;
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
    height: 50px;
    width: 600px;
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