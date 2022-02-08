function Alert(msn, confirme) {
    const alert_content = document.querySelector('.alert-content');
    const btn_alert_cancel = alert_content.querySelector('#btn-alert-cancel');
    const btn_alert_ok = alert_content.querySelector('#btn-alert-ok');

    alert_content.classList.remove('hidden');

    if (confirme == null) {
        btn_alert_ok.style.visibility = "visible"
        btn_alert_cancel.style.visibility = "hidden"
    }
    else if (confirme) {
        btn_alert_ok.style.visibility = "visible"
        btn_alert_cancel.style.visibility = "visible"
    } else {
        btn_alert_ok.style.visibility = "hidden"
        btn_alert_cancel.style.visibility = "hidden"
    }


    alert_content.querySelector('p').innerHTML = msn

    btn_alert_cancel.addEventListener('click', function () {
        alert_content.classList.add('hidden');
    })
    btn_alert_ok.addEventListener('click', function () {
        alert_content.classList.add('hidden');
    })
}
