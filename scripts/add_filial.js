const num_filial = document.querySelector('#num-filial')
const nome_loja = document.querySelector('#nome-loja')
const add_regional = document.querySelector('#add-regional')
const add_bandeira = document.querySelector('#add-bandeira')
const add_tipo = document.querySelector('#add-tipo')

const btn_salvar = document.querySelector('#btn-salvar')
const btn_excluir = document.querySelector('#btn-excluir')

btn_excluir.style.display = "none"
btn_salvar.style.display = "none"

let filial
num_filial.addEventListener('keyup', (event) => {
    let numpad = "Numpad" + event.key
    let digit = "Digit" + event.key

    if (event.code == numpad || event.code == digit) {
        let value = event.target.value

        setTimeout(() => {
            let filialId = allFilias.filter((item) => {
                return item.id == value
            })

            if (filialId.length == 1) {
                btn_salvar.style.display = "none"
                btn_excluir.style.display = "block"

                enabledDisabled("enabled", "disabled")

                event.target.value = `${filialId[0].id}-${filialId[0].bandeira}-${filialId[0].nome}`

                event.target.select()

                return filial = filialId[0].id
            } else {
                btn_salvar.style.display = "block"
                btn_excluir.style.display = "none"

                enabledDisabled("disabled", "enabled")

                event.target.value = value

                event.target.select()
                
                return filial = value
            }
        }, 1000);
    }

    if (event.code == "Backspace" && event.target.value == "") {
        btn_salvar.style.display = "none"
        btn_excluir.style.display = "none"

        enabledDisabled("enabled", "disabled")
    }
})
num_filial.addEventListener("click", (event) => {
    event.target.select()
})

function enabledDisabled(rmAttr, setAttr) {
    nome_loja.removeAttribute(rmAttr)
    add_regional.removeAttribute(rmAttr)
    add_bandeira.removeAttribute(rmAttr)
    add_tipo.removeAttribute(rmAttr)

    nome_loja.setAttribute(setAttr, setAttr)
    add_regional.setAttribute(setAttr, setAttr)
    add_bandeira.setAttribute(setAttr, setAttr)
    add_tipo.setAttribute(setAttr, setAttr)
}

btn_salvar.addEventListener("click", () => {

    if (nome_loja.value == "" || add_regional.value == "" || add_bandeira.value == "" || add_tipo.value == "") {
        return alert("Todos os campos são obrigatórios. \nInsira as informações que correspondem para a filial que deseja cadastrar")
    } else {
        const loja = {
            id: filial,
            bandeira: add_bandeira.value,
            nome: nome_loja.value.toUpperCase(),
            regional: add_regional.value,
            tipo: add_tipo.value
        }

        allFilias.push(loja)

        allFilias.sort((a, b) => { return a.id - b.id })

        saveFile(allFilias)

        alert("Loja "+ loja.id +" cadastrada")

        setTimeout(() => {
            window.location = "index.html"
        }, 500);
    }
})

btn_excluir.addEventListener("click", () => {

    const idfilial = allFilias.findIndex(item => {
        return item.id == filial
    })

    var r = confirm("Tem certeza que deseja excluir a filial "+ filial +"?")
    if (r == true) {
        console.log("OK!")

        num_filial.value = ""

        allFilias.splice(idfilial, 1)

        saveFile(allFilias)

        alert("Filial "+ filial +" foi excuída")
        setTimeout(() => {
            window.location = "index.html"
        }, 500);
    }
    else {
        console.log("Cancelado!")

        num_filial.focus()
    }
})

// Save file
const fs = require("fs")

function saveFile(obj) {

    let str = JSON.stringify(obj)

    fs.writeFile('resources/app/json/filias.json', str, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
