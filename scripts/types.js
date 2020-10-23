/* Regra de tipo de promoção, varejo e atacado */

const m402 = document.querySelector('#m402')
const m1118 = document.querySelector('#m1118')

const append_categoria_402 = document.querySelector('#append-categoria-402')
const append_categoria_1118 = document.querySelector('#append-categoria-1118')
const contentCategoria = document.querySelector('#categoria')

const tipoPromo = document.querySelector('#t-promocao')
const motivoMidia = document.querySelector('#motivo-midia')
const ctt_motivo_midia = document.querySelector('.ctt-motivo-midia')

const catgVarejo = document.querySelector('#c-varejo')
const catgAtacado = document.querySelector('#c-atacado')

let isModel = true

let _tipoPromocao = 0
let _motivoMidia = 0

let _categoria = 0

function onLoad() {
    _tipoPromocao = tipoPromo.value
    if (catgVarejo.checked && catgAtacado.checked)
        _categoria = 3
}
m402.addEventListener('click', () => {
    isModel = true
    ctt_motivo_midia.classList.add('hidden')
    
    contentCategoria.remove()
    append_categoria_402.appendChild(contentCategoria)
})
m1118.addEventListener('click', () => {
    isModel = false
    ctt_motivo_midia.classList.remove('hidden')

    contentCategoria.remove()
    append_categoria_1118.appendChild(contentCategoria)
})

tipoPromo.addEventListener('change', (event) => {
    _tipoPromocao = event.target.value
})
motivoMidia.addEventListener('change', (event) => {
    _motivoMidia = event.target.value
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
    else if (catgVarejo.checked == false && catgAtacado.checked)
        _categoria = 2
}

onLoad()
