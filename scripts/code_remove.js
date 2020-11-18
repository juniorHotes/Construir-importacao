const btn_w_remover = document.querySelector('#btn-w-remover')
const rm_closed = document.querySelector('#rm-closed')
const content_rm_codigo = document.querySelector('.content-rm-codigo')
const btn_remover = document.querySelector('#btn-remover')
const btn_desfazer = document.querySelector('#btn-desfazer')
const rm_txt_area_in = document.querySelector('#rm-txt-area-in')
const rm_txt_area_out = document.querySelector('#rm-txt-area-out')

let originalList = []

btn_remover.style.visibility = 'hidden'
btn_desfazer.style.visibility = 'hidden'

rm_txt_area_out.setAttribute('disabled', 'disabled')

btn_remover.addEventListener('click', () => {

    if (_filias.length === 0)
        return Alert("Selecione ao menos uma loja")
    else if (_tipoPromocao == "")
        return Alert("Defina o tipo de promoção")
    else if (isModel === false && _motivoMidia == "")
        return Alert("Defina o motivo de mídia")
    else if (_dataIni == "")
        return Alert("Defina a data inicial da promoção")
    else if (_dataFim == "")
        return Alert("Defina a data final da promoção")
    else if (textareaIn.value == "")
        return Alert("Não a dados na entrada!")


    rm_txt_area_in.value = rm_txt_area_in.value.trim()
    textareaIn.value = textareaIn.value.trim()

    const textIn = textareaIn.value.split('\n')
    const codeIn = textIn.map((item, idx) => item = textIn[idx].split(/[\t\s]+/)[0].trim())

    const lines = rm_txt_area_in.value.split('\n')
    const code = lines.map((item, idx) => item = lines[idx].split(/[-/\t\s]+/)[0].trim())

    codeIn.map(_ => {
        code.map(item2 => {
            let rm = codeIn.indexOf(item2)

            if (rm == -1) return

            rm_txt_area_out.value += textIn[rm] + "\n"

            codeIn.splice(rm, 1)
            textIn.splice(rm, 1)
        })
    })

    textareaIn.value = ""
    textIn.map(item => textareaIn.value += item + "\n")

    btn_desfazer.style.visibility = 'visible'
    btn_remover.style.visibility = 'hidden'

    rm_txt_area_out.removeAttribute('disabled', 'disabled')
    rm_txt_area_out.setAttribute('enabled', 'enabled')

    btnGerar.click()

    Alert("Removendo itens e gerando arquivo...", false)

})
btn_desfazer.addEventListener('click', () => {

    if (_filias.length === 0)
        return Alert("Selecione ao menos uma loja")
    else if (_tipoPromocao == "")
        return Alert("Defina o tipo de promoção")
    else if (isModel === false && _motivoMidia == "")
        return Alert("Defina o motivo de mídia")
    else if (_dataIni == "")
        return Alert("Defina a data inicial da promoção")
    else if (_dataFim == "")
        return Alert("Defina a data final da promoção")
    else if (textareaIn.value == "")
        return Alert("Não a dados na entrada!")


    if (originalList.length == 0) return

    textareaIn.value = ""
    originalList.map(item => textareaIn.value += item + "\n")

    btn_desfazer.style.visibility = 'hidden'
    btn_remover.style.visibility = 'visible'

    rm_txt_area_out.value = ""
    rm_txt_area_out.removeAttribute('enabled', 'enabled')
    rm_txt_area_out.setAttribute('disabled', 'disabled')

    btnGerar.click()

    Alert("Restaurando arquivo original...", false)
})
rm_txt_area_in.addEventListener('paste', () => {
    btn_remover.style.visibility = 'visible'
    btn_desfazer.style.visibility = 'hidden'

    if (rm_txt_area_in.value != "")
        rm_txt_area_in.value += "\n"
})
document.addEventListener('keyup', () => {
    if (rm_txt_area_in.value == "") {
        btn_remover.style.visibility = 'hidden'
        btn_desfazer.style.visibility = 'hidden'

        rm_txt_area_out.removeAttribute('enabled', 'enabled')
        rm_txt_area_out.setAttribute('disabled', 'disabled')

        rm_txt_area_out.value = ""
    } else {
        btn_remover.style.visibility = 'visible'
    }
})

btn_w_remover.addEventListener('click', function () {
    content_rm_codigo.classList.remove('hidden')
    rm_txt_area_in.focus()
})
rm_closed.addEventListener('click', function () {
    content_rm_codigo.classList.add('hidden')
})
