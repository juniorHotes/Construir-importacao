const btn_w_remover = document.querySelector('#btn-w-remover')
const rm_closed = document.querySelector('#rm-closed')
const content_rm_codigo = document.querySelector('.content-rm-codigo')

btn_w_remover.addEventListener('click', function () {
    content_rm_codigo.classList.remove('hidden')
    rm_txt_area_in.focus()
})
rm_closed.addEventListener('click', function () {
    content_rm_codigo.classList.add('hidden')
})

const btn_remover = document.querySelector('#btn-remover')
const btn_desfazer = document.querySelector('#btn-desfazer')
btn_remover.style.visibility = 'hidden'
btn_desfazer.style.visibility = 'hidden'

const rm_txt_area_in = document.querySelector('#rm-txt-area-in')
const rm_txt_area_out = document.querySelector('#rm-txt-area-out')
rm_txt_area_out.setAttribute('disabled', 'disabled')

let originalList = []
btn_remover.addEventListener('click', () => {

    rm_txt_area_in.value = rm_txt_area_in.value.trim()
    textareaIn.value = textareaIn.value.trim()

    const textIn = textareaIn.value.split('\n')
    const codeIn = textIn.map((item, idx) => item = textIn[idx].split(/[\t\s]+/)[0].trim())

    const lines = rm_txt_area_in.value.split('\n')
    const code = lines.map((item, idx) => item = lines[idx].split(/[-/\t\s]+/)[0].trim())

    rm_txt_area_out.value = ""

    code.map(item => {
        let rm = codeIn.indexOf(item)

        if (rm == -1) return

        console.log(textIn[rm])
        rm_txt_area_out.value += textIn[rm] + "\n"

        codeIn.splice(rm, 1)
        textIn.splice(rm, 1)

    })
    textareaIn.value = ""
    textIn.map(item => textareaIn.value += item + "\n")

    btn_desfazer.style.visibility = 'visible'

    btnGerar.click()

    Alert("Itens removidos!\nGerando arquivo novamente...", false)

    rm_closed.click()

    rm_txt_area_out.removeAttribute('disabled', 'disabled')
    rm_txt_area_out.setAttribute('enabled', 'enabled')

    btn_remover.style.visibility = 'hidden'
})
btn_desfazer.addEventListener('click', () => {

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

    rm_closed.click()
})
textareaIn.addEventListener('paste', () => {
    setTimeout(() => {
        return originalList = textareaIn.value.split('\n')
    }, 200);
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

