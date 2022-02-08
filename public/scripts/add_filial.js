const num_filial = document.querySelector('#num-filial')
const nome_loja = document.querySelector('#nome-loja')
const add_regional = document.querySelector('#add-regional')
const add_bandeira = document.querySelector('#add-bandeira')
const add_tipo = document.querySelector('#add-tipo')

const btn_salvar = document.querySelector('#btn-salvar')
const btn_excluir = document.querySelector('#btn-excluir')

const loadingWrap = document.querySelector('.loadind-wrap')

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
                return item.n_filial == value
            })

            if (filialId.length == 1) {
                btn_salvar.style.display = "none"
                btn_excluir.style.display = "block"

                enabledDisabled("enabled", "disabled")

                event.target.value = `${filialId[0].n_filial}-${filialId[0].bandeira}-${filialId[0].nome}`

                event.target.select()

                return filial = filialId[0].n_filial
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

btn_salvar.addEventListener("click", async () => {

    if (nome_loja.value == "" || add_regional.value == "" || add_bandeira.value == "" || add_tipo.value == "") {
        return Alert("Todos os campos são obrigatórios. \nInsira as informações que correspondem para a filial que deseja cadastrar")
    } else {
        loadingWrap.style.visibility = 'visible'

        const data = {
            n_filial: filial,
            bandeira: add_bandeira.value,
            nome: nome_loja.value.toUpperCase(),
            regional: add_regional.value,
            tipo: add_tipo.value
        }

        await fetch(window.location.origin + "/add-filial", {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(() => {
            Alert("Loja " + filial + " cadastrada", false)

            setTimeout(() => {
                window.location = "/"
            }, 1000);
            loadingWrap.style.visibility = 'hidden'
        }).catch(err => {
            loadingWrap.style.visibility = 'hidden'
            alert("Erro ao tentar cadastrar loja")
            console.error(err);
        });
    }
})

btn_excluir.addEventListener("click", () => {
    loadingWrap.style.visibility = 'visible'

    fetch(window.location.origin + "/del-filial", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        mode: 'cors',
        body: JSON.stringify({ n_filial: filial })
    }).then(() => {
        Alert("Filial " + filial + " foi excuída", false)

        num_filial.value = ""

        setTimeout(() => {
            window.location = "/"
        }, 1000);
        loadingWrap.style.visibility = 'hidden'
    }).catch(err => {
        loadingWrap.style.visibility = 'hidden'
        alert("Erro ao tentar excluir loja")
        console.error(err);
    });
})