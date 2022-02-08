let dataIniValue = document.querySelector('#data-ini')
let dataFimValue = document.querySelector('#data-fim')

let _dataIni = ""
let _dataFim = ""

function setDateIni() {
    const dateNow = new Date()
    const day   = dateNow.getDate() + 1
    const mont  = dateNow.getMonth() + 1
    const yar   = dateNow.getFullYear()

    function zero(e) {
        if (e < 10) {
            return "0" + e
        } else {
            return e
        }
    }

    dataIniValue.value = yar + "-" + zero(mont) + "-" + zero(day)
    _dataIni = dateConvert(dataIniValue)
}

function dateConvert(event) {
    let parseDate = event.value.split('-')
    let day = parseDate[2]
    let mont = parseDate[1]
    let yar = parseDate[0]

    return par = day + "/" + mont + "/" + yar
    
}

dataIniValue.addEventListener('change', () => {
    _dataIni = dateConvert(dataIniValue)
})
dataFimValue.addEventListener('change', () => {
    _dataFim = dateConvert(dataFimValue)
})

setDateIni()

