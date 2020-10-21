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
    sFilial.setAttribute("placeholder", _filiasSelected.sort(sortList))

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
    })

    document.querySelector('#select-all').addEventListener('change', event => selectFilias(event, select()))
}

function selectFilias(event, arr) {
    _filias = []
    _filiasSelected = []

    totalFilial.innerHTML = _filiasSelected.length
    sFilial.setAttribute("placeholder", _filiasSelected)

    if (event.target.checked) {
        let filtered = arr

        inputsFilias.forEach((input) => {
            input.checked = false

            let idx = filtered.indexOf(input.defaultValue)

            if (input.defaultValue == filtered[idx]) {
                input.checked = true

                _filiasSelected.push(input.defaultValue)

                totalFilial.innerHTML = _filiasSelected.length
                sFilial.setAttribute("placeholder", _filiasSelected)
            }
        })
    } else {
        inputsFilias.forEach(input => {
            input.checked = false
        })
    }

    console.log(_filias)
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

    let mateus = (item.bandeira == "MATEUS SUPERMERCADOS")
    let posterus = (item.bandeira == "POSTERUS SUPERMERCADOS")
    let carone = (item.bandeira == "MERCADINHO CARONE")
    let pontoMax = (item.bandeira == "CONVENIERE SUPERMERCADOS")
    let eletro = (item.bandeira == "ELETRO MATEUS")
    let varejo = (item.tipo == "varejo")
    let atacarejo = (item.tipo == "atacarejo")

    if (b_mateus.checked && t_mix.checked && t_varejo.checked) {
        if (regional && mateus)
            fil.push(item.id)
    }
    if (b_camino.checked) {
        if (regional && (carone || posterus))
            fil.push(item.id)
    }
    if (b_pontomax.checked) {
        if (regional && (pontoMax))
            fil.push(item.id)
    }

    if (b_eletro.checked) {
        t_mix.checked = true
        t_varejo.checked = true

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