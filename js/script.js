const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

// button submit
const onGenerateSubmit = (e) => {
    e.preventDefault()
    clearUI()

    const url = document.getElementById('url').value
    const size = document.getElementById('size').value

    // vaidate url
    if (url === '') {
        alert('plaese enter a url')
    } else {
        showSpinner()

        // show spinner for 1 second
        setTimeout(() => {
            hideSpinner()
            generateQRCode(url, size)

            //generate the save button after the qr code image src is resdy
            setTimeout(() => {
                // get save url
                const saveUrl = qr.querySelector('img').src
                //create save button
                createSaveBtn(saveUrl)
            }, 50)
        }, 1000)
    }
}

//genearet qr code
const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size
    })
}

//clear qr code and save button
const clearUI = () => {
    qr.innerHTML = ''
    const saveBtn = document.getElementById('save-link')
    if (saveBtn) {
        saveBtn.remove()
    }
}

// show spinner 
const showSpinner = () => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'block'
}

// hide spinner

const hideSpinner = () => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'none'
}

// create save button to donload qr code as image
const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a')
    link.id = 'save-link'
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl
    link.download = 'qrcode'
    link.innerHTML = 'Save Image'
    document.getElementById('generated').appendChild(link)
}

hideSpinner()

form.addEventListener('submit', onGenerateSubmit)