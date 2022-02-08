let allFilias = []
let inputsFilias = []

let _filias = []
let _filiasSelected = []

function sortList(a, b) {
    return a - b
}

fetch(window.location.origin + '/filiais', {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    mode: 'cors',
}).then(res => res.json())
    .then(filias => {
        allFilias = Object.values(filias.data)
        writeFilias(allFilias)
        document.querySelector('.loadind-wrap').style.visibility = 'hidden'
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
        let n_filial = filial.n_filial
        let str = n_filial + "-" + filial.bandeira + "-" + filial.nome

        slcFilias.innerHTML +=
            `<li>
                <input type="checkbox" name="select-f${n_filial}" id="select-f${n_filial}" value="${n_filial}" class="slc">
                <label  for="select-f${n_filial}">${str}</label>
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
            event.target.parentElement.removeAttribute('style')
            event.target.parentElement.children[1].removeAttribute('style')
        })
    })
}

function selectFilias(arr) {
    _filias = []
    _filiasSelected = []

    totalFilial.innerHTML = _filiasSelected.length
    sFilial.value = _filiasSelected

    let filtered = arr

    inputsFilias.forEach((input) => {
        input.checked = false

        let idx = filtered.indexOf(Number(input.defaultValue))

        if (input.defaultValue == filtered[idx]) {
            input.checked = true

            _filiasSelected.push(input.defaultValue)

            totalFilial.innerHTML = _filiasSelected.length
            sFilial.value = _filiasSelected
        }
    })
    return _filias = _filiasSelected
}

//#region Regionais
const r_sao_luis = document.querySelector('#r-sao-luis')
r_sao_luis.addEventListener('click', () => selectFilias(select()))
const r_maranhao = document.querySelector('#r-maranhao')
r_maranhao.addEventListener('click', () => selectFilias(select()))
const r_ceara = document.querySelector('#r-ceara')
r_ceara.addEventListener('click', () => selectFilias(select()))
const r_piaui = document.querySelector('#r-piaui')
r_piaui.addEventListener('click', () => selectFilias(select()))
const r_pernambuco = document.querySelector('#r-pernambuco')
r_pernambuco.addEventListener('click', () => selectFilias(select()))
const r_bahia = document.querySelector('#r-bahia')
r_bahia.addEventListener('click', () => selectFilias(select()))
const r_para = document.querySelector('#r-para')
r_para.addEventListener('click', () => selectFilias(select()))
//#endregion

//#region Bandeira
const b_mateus = document.querySelector('#b-mateus')
b_mateus.addEventListener('click', () => selectFilias(select()))
const b_camino = document.querySelector('#b-camino')
b_camino.addEventListener('click', () => selectFilias(select()))
const b_pontomax = document.querySelector('#b-pontomax')
b_pontomax.addEventListener('click', () => selectFilias(select()))
const b_eletro = document.querySelector('#b-eletro')
b_eletro.addEventListener('click', () => selectFilias(select()))
//#endregion

//#region  Tipo de loja
const t_mix = document.querySelector('#t-mix')
t_mix.addEventListener('click', () => selectFilias(select()))
const t_varejo = document.querySelector('#t-varejo')
t_varejo.addEventListener('click', () => selectFilias(select()))
//#endregion

function select() {
    let fil = []

    allFilias.filter(item => _filter(item, fil))
    return fil
}
function _filter(item, fil) {
    if (r_sao_luis.checked) {
        onFilter(item, fil, "saoLuis")
    }
    if (r_maranhao.checked) {
        onFilter(item, fil, "maranhao")
    }
    if (r_ceara.checked) {
        onFilter(item, fil, "ceara")
    }
    if (r_piaui.checked) {
        onFilter(item, fil, "piaui")
    }
    if (r_pernambuco.checked) {
        onFilter(item, fil, "pernambuco")
    }
    if (r_bahia.checked) {
        onFilter(item, fil, "bahia")
    }
    if (r_para.checked) {
        onFilter(item, fil, "para")
    }
}

function onFilter(item, fil, region) {

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
            fil.push(item.n_filial)
    }
    if (b_camino.checked && t_varejo.checked) {
        if (regional && (carone || posterus))
            fil.push(item.n_filial)
    }
    if (b_pontomax.checked && t_varejo.checked) {
        if (regional && (pontoMax))
            fil.push(item.n_filial)
    }

    if (b_eletro.checked) {
        if (regional && eletro)
            fil.push(item.n_filial)
    }
    if (b_mateus.checked && t_mix.checked && !t_varejo.checked) {
        if (regional && mateus && atacarejo)
            fil.push(item.n_filial)
    }
    if (b_mateus.checked && t_varejo.checked && !t_mix.checked) {
        if (regional && mateus && varejo)
            fil.push(item.n_filial)
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
    if (filiasContent.getAttribute("class") == "filias-content hidden") return

    let numpad = "Numpad" + event.key
    let digit = "Digit" + event.key

    if (event.code == numpad || event.code == digit) {

        if (searchValue.length == 0 && event.key == 0) return

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

sFilial.addEventListener('paste', (event) => {
    let paste = []

    _filias = []
    _filiasSelected = []

    totalFilial.innerHTML = _filiasSelected.length

    setTimeout(() => {
        paste = event.target.value.split(/[ -.:;?!~,`"&eE|()<>{}\[\]\t\s\r\n/\\]+/)

        let filtered = paste

        inputsFilias.forEach((input) => {
            input.checked = false

            let idx = filtered.indexOf(input.defaultValue)

            if (input.defaultValue == filtered[idx]) {
                input.checked = true

                _filiasSelected.push(input.defaultValue)

                totalFilial.innerHTML = _filiasSelected.length
                sFilial.value = _filiasSelected.sort(sortList)

                return _filias = _filiasSelected
            }
        })

    }, 500);
})
//#endregion