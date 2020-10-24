const textareaIn = document.querySelector('#textarea-in')
const textareaOut = document.querySelector('#textarea-out')
const btnGerar = document.querySelector('#btn-gerar')
const totalLinhas = document.querySelector('#total-linhas')

let listVarejo = []
let lisAtacado = []

function creatList(list, cat, _numFilias) {
    for (let index = 0; index < inLine.length; index++) {
        if (isModel) {
            list.push(
                _filias[_numFilias] + "\t" +
                _tipoPromocao + "\t" +
                cat + "\t" +
                inLine[index] + "\t" +
                _dataIni + "\t" +
                _dataFim
            )
        } else {
            list.push(
                _filias[_numFilias] + "\t" +
                cat + "\t" +
                _tipoPromocao + "\t" +
                _motivoMidia + "\t" +
                inLine[index] + "\t" +
                _dataIni + "\t" +
                _dataFim
            )
        }
        textareaOut.innerHTML += list[list.length - 1] + "\n"

        let total = _categoria == 3 ? list.length * 2 : list.length
        totalLinhas.innerHTML = "Total de linhas: " + total
    }
}
function listcreat(value) {
    let categ = 1 ? value : 1;

    let numFilias = 0
    while (numFilias < _filias.length) {
        creatList(listVarejo, categ, numFilias)
        numFilias++

        if (_categoria == 3 && numFilias == _filias.length) {
            numFilias = 0
            while (numFilias < _filias.length) {
                creatList(lisAtacado, 2, numFilias)
                numFilias++
            }
        }
    }
}

var inLine = []
btnGerar.addEventListener('click', () => {

    if (_dataFim == "") {
        return alert("Defina a data final da promoção")
    } else if (_dataIni == "") {
        return alert("Defina a data inicial da promoção")
    } else if (_filias.length == 0) {
        return alert("Selecione ao menos uma loja")
    }

    textareaOut.innerHTML = ""

    inLine = textareaIn.value.split('\n')

    let exed = _filias.length * inLine.length
    if (_categoria == 3)
        exed *= 2

    if (exed > 10000)
        return alert("O número de linhas exede o total de 10000")

    if (inLine[inLine.length - 1] == "") {
        inLine.splice(inLine.length - 1, 1)
    }

    listVarejo = []
    lisAtacado = []

    if (_categoria == 1) {
        listcreat(1)
    } else if (_categoria == 2) {
        listcreat(2)
    } else {
        listcreat(1)
    }
})

const btnLimpar = document.querySelector('#btn-limpar')
const btnSplit = document.querySelector('#btn-split')
const btnCopiar = document.querySelector('#btn-copiar')

btnLimpar.addEventListener('click', () => {
    textareaIn.value = ""
    textareaIn.focus()
})
btnCopiar.addEventListener('click', () => {
    textareaOut.select()
    document.execCommand("copy");
})

document.addEventListener('keypress', (event) => {
    if (event.ctrlKey === false && event.code != 'KeyG') return

    if (event.ctrlKey === true && event.code === 'KeyG') {
        console.log(event)
        btnGerar.focus()
        btnGerar.click()
    }
})

textareaIn.addEventListener('paste', () => {
    setTimeout(() => {
        textareaIn.value = textareaIn.value.trim()
    }, 200);
})

// btnSplit.addEventListener('click', () => {
//     const ar1 = textareaIn.value.split('\n')

//     let code = []
//     let price = []

//     ar1.forEach(element => {
//         var posCode = element.indexOf('\t');
//         var slcCode = element.slice(0, posCode).trim()

//         var multSplice = slcCode.split(/[ -.:;?!~,`"&|()<>{}\[\]\t\s\r\n/\\]+/)

//         console.log(multSplice)

//         var posPrice = element.lastIndexOf("\t");
//         var slcPreco = element.slice(posPrice, element.lenght).trim()

//         var isBar = slcCode.split(/[ -.:;?!~,`"&|()<>{}\[\]\t\s\r\n/\\]+/)

//         // console.log(parseInt(slcCode) + "-" + slcPreco)
//         // console.log(slcCode)

//     });

//     // console.log(code)
//     // console.log(price)

// })
const progress_bar = document.querySelector('.progress-bar')
