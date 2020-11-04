let allFilias = []
let inputsFilias = []

let _filias = []
let _filiasSelected = []

function sortList(a, b) {
    return a - b
}

fetch('json/filias.json')
    .then(res => res.json())
    .then(filias => {
        allFilias = Object.values(filias)
        writeFilias(allFilias)
    })

const totalFilial = document.querySelector('#total-filial')
const sFilial = document.querySelector('#slc-filias')

function onSelect(event) {
    const isChecked = event.target.checked

    const idFilial = event.target.defaultValue

    if (isChecked) {
        const item = _filiasSelected.indexOf(idFilial)

        if (_filiasSelected[item] != idFilial) {
            _filiasSelected.push(idFilial)
        }
    } else {
        const index = _filiasSelected.findIndex((item) => {
            return item == idFilial
        })

        _filiasSelected.splice(index, 1)
    }

    totalFilial.innerHTML = _filiasSelected.length
    sFilial.value = _filiasSelected.sort(sortList)

    return _filias = _filiasSelected.sort(sortList)
}

function writeFilias(param) {
    const slcFilias = document.querySelector('.filias-content ul')
    for (filial of param) {
        let id = filial.id
        let str = id + "-" + filial.bandeira + "-" + filial.nome

        slcFilias.innerHTML +=
            `<li>
                <input type="checkbox" name="select-f${id}" id="select-f${id}" value="${id}" class="slc">
                <label  for="select-f${id}">${str}</label>
            </li>`
    }

    inputsFilias = document.querySelectorAll('.slc')
    inputsFilias.forEach(input => {
        input.addEventListener('change', onSelect)

        input.addEventListener('focus', (event) => {
            event.target.parentElement.style.background = "#0000fdb3"
            event.target.parentElement.children[1].style.color = "#FFF"
        })
        input.addEventListener('blur', (event) => {
            event.target.parentElement.style.background = "#FFF"
            event.target.parentElement.children[1].style.color = "#000"
        })
    })

    const selectElement = document.querySelector('#select-all')
    selectElement.addEventListener('change', event => selectFilias(event, select()))

}

function selectFilias(event, arr) {
    _filias = []
    _filiasSelected = []

    totalFilial.innerHTML = _filiasSelected.length
    sFilial.value = _filiasSelected

    if (event.target.checked) {
        let filtered = arr

        inputsFilias.forEach((input) => {
            input.checked = false

            let idx = filtered.indexOf(input.defaultValue)

            if (input.defaultValue == filtered[idx]) {
                input.checked = true

                _filiasSelected.push(input.defaultValue)

                totalFilial.innerHTML = _filiasSelected.length
                sFilial.value = _filiasSelected
            }
        })
    } else {
        inputsFilias.forEach(input => {
            input.checked = false
        })
    }

    return _filias = _filiasSelected
}

// Regionais
const r_sao_luis = document.querySelector('#r-sao-luis')
r_sao_luis.addEventListener('change', event => selectFilias(event, select()))
const r_maranhao = document.querySelector('#r-maranhao')
r_maranhao.addEventListener('change', event => selectFilias(event, select()))
const r_para = document.querySelector('#r-para')
r_para.addEventListener('change', event => selectFilias(event, select()))

// Bandeira
const b_mateus = document.querySelector('#b-mateus')
b_mateus.addEventListener('change', event => selectFilias(event, select()))
const b_camino = document.querySelector('#b-camino')
b_camino.addEventListener('change', event => selectFilias(event, select()))
const b_pontomax = document.querySelector('#b-pontomax')
b_pontomax.addEventListener('change', event => selectFilias(event, select()))
const b_eletro = document.querySelector('#b-eletro')
b_eletro.addEventListener('change', event => selectFilias(event, select()))

// Tipo de loja
const t_mix = document.querySelector('#t-mix')
t_mix.addEventListener('change', event => selectFilias(event, select()))
const t_varejo = document.querySelector('#t-varejo')
t_varejo.addEventListener('change', event => selectFilias(event, select()))

function select() {

    let fil = []

    allFilias.filter((item) => {
        _filter(item, fil)
    })
    return fil
}
function _filter(item, fil) {
    if (r_sao_luis.checked) {
        saoLuis(item, fil, "saoLuis")
    }

    if (r_maranhao.checked) {
        saoLuis(item, fil, "maranhao")
    }
    if (r_para.checked) {
        saoLuis(item, fil, "para")
    }

}

function saoLuis(item, fil, region) {
    let regional = (item.regional == region)

    let mateus = (item.bandeira == "MATEUS SUPERMERCADOS"),
        posterus = (item.bandeira == "POSTERUS SUPERMERCADOS"),
        carone = (item.bandeira == "MERCADINHO CARONE"),
        pontoMax = (item.bandeira == "CONVENIERE SUPERMERCADOS"),
        eletro = (item.bandeira == "ELETRO MATEUS"),
        varejo = (item.tipo == "varejo"),
        atacarejo = (item.tipo == "atacarejo")

    if (b_mateus.checked && t_mix.checked && t_varejo.checked) {
        if (regional && mateus)
            fil.push(item.id)
    }
    if (b_camino.checked && t_varejo.checked) {
        if (regional && (carone || posterus))
            fil.push(item.id)
    }
    if (b_pontomax.checked && t_varejo.checked) {
        if (regional && (pontoMax))
            fil.push(item.id)
    }

    if (b_eletro.checked) {
        if (regional && eletro)
            fil.push(item.id)
    }
    if (b_mateus.checked && t_mix.checked && !t_varejo.checked) {
        if (regional && mateus && atacarejo)
            fil.push(item.id)
    }
    if (b_mateus.checked && t_varejo.checked && !t_mix.checked) {
        if (regional && mateus && varejo)
            fil.push(item.id)
    }
}

//#region inpute de seleção de filias
const filiasContent = document.querySelector('.filias-content')

sFilial.addEventListener('click', function (event) {
    if (event.target.id == "slc-filias")
        filiasContent.classList.toggle('hidden')
})
filiasContent.addEventListener('click', function () {
    filiasContent.classList.remove('hidden')
})
document.addEventListener('click', function (event) {
    if (event.target.classList[0] == "slc") return

    if (event.target.id != "slc-filias")
        filiasContent.classList.add('hidden')
});
// pesquise a loja na lista ao digitar no teclado númerico
let searchValue = []
document.addEventListener('keypress', (event) => {
    if(filiasContent.getAttribute("class") == "filias-content hidden") return

    let numpad = "Numpad" + event.key
    let digit = "Digit" + event.key

    if (event.code == numpad || event.code == digit) {

        if(searchValue.length == 0 && event.key == 0) return

        searchValue.push(event.key)

        let search = searchValue.join('')
        let time = 700

        inputsFilias.forEach(input => {
            if (search == input.value) {
                input.focus()

                setTimeout(() => {
                    searchValue = []
                    search = ""
                }, time)
            }
        })
    }
})        
//#endregion