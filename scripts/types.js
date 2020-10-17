/* Regra de tipo de promoção, varejo e atacado */

const tipoPromo = document.querySelector('#t-promocao')
const catgVarejo    = document.querySelector('#c-varejo')
const catgAtacado   = document.querySelector('#c-atacado')

let _tipoPromocao   = 0
let _categoria = 0

function onLoad() {
    _tipoPromocao = tipoPromo.value
    if (catgVarejo.checked && catgAtacado.checked)
        _categoria = 3
}

tipoPromo.addEventListener('change', (event) => {
    _tipoPromocao = event.target.value
})

catgVarejo.addEventListener('change', () => {
    checkCategoria()
    if (catgVarejo.checked == false && catgAtacado.checked == false) {
        catgAtacado.checked = true
        _categoria = 2
    }
})

catgAtacado.addEventListener('change', () => {
    checkCategoria()
    if (catgVarejo.checked == false && catgAtacado.checked == false) {
        catgVarejo.checked = true
        _categoria = 1
    }
})

function checkCategoria() {
    if (catgVarejo.checked && catgAtacado.checked)
        _categoria = 3
    else if (catgVarejo.checked && catgAtacado.checked == false)
        _categoria = 1
    else if (catgVarejo.checked  == false && catgAtacado.checked)
        _categoria = 2
}

onLoad()
