import Swal from 'sweetalert2'

const Popup = (titleText, showLoading = false, position = 'center', background = 'white', timer = 2000) => {
    if (showLoading) {
        Swal.fire({
            text: titleText,
            allowOutsideClick: false
        })

        Swal.showLoading()
    } else {
        Swal.mixin({
            toast: true,
            position,
            showConfirmButton: false,
            timerProgressBar: true,
            timer
        }).fire({
            background,
            color: background.startsWith('black') ? 'white': 'green',
            icon: 'success',
            title: titleText
        })
    }
}

export default Popup
