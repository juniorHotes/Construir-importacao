const btn_w_remover = document.querySelector('#btn-w-remover')
const rm_closed = document.querySelector('#rm-closed')
const content_rm_codigo = document.querySelector('.content-rm-codigo')

btn_w_remover.addEventListener('click', function () {
    content_rm_codigo.classList.remove('hidden')
    rm_txt_area.focus()
})
rm_closed.addEventListener('click', function () {
    content_rm_codigo.classList.add('hidden')
})

const btn_remover = document.querySelector('#btn-remover')
const btn_desfazer = document.querySelector('#btn-desfazer')
btn_desfazer.style.visibility = 'hidden'

const rm_txt_area = document.querySelector('#rm-txt-area')

let originalList = []
btn_remover.addEventListener('click', () => {
    rm_txt_area.value = rm_txt_area.value.trim()
    textareaIn.value = textareaIn.value.trim()

    const textIn = textareaIn.value.split('\n')
    const codeIn = textIn.map((item, idx) => item = textIn[idx].split(/[\t\s]+/)[0].trim())

    const lines = rm_txt_area.value.split('\n')
    const code = lines.map((item, idx) => item = lines[idx].split('-')[0].trim())

    code.map(item => {
        let rm = codeIn.indexOf(item)

        if(rm == -1) return

        codeIn.splice(rm, 1)
        textIn.splice(rm, 1)
    })
    textareaIn.value = ""
    textIn.map(item => textareaIn.value += item + "\n")

    btn_desfazer.style.visibility = 'visible'

    alert("Itens removidos!")
})
btn_desfazer.addEventListener('click', () => {

    if(originalList.length == 0) return

    textareaIn.value = ""
    originalList.map(item => textareaIn.value += item + "\n")

    btn_desfazer.style.visibility = 'hidden'

    alert("Desfeito!\nO arquivo original foi restaurado.")
})
textareaIn.addEventListener('paste', () => {
    setTimeout(() => {
        return originalList = textareaIn.value.split('\n')
    }, 200);
})

