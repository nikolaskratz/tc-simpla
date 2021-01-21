const PackingBtn = document.querySelector('#start_packing')
const UploadBtn = document.querySelector('#Upload')


PackingBtn.addEventListener('click', () => {
    window.open("Select_Container.html", "_self")
})

UploadBtn.addEventListener('click', () => {
    window.open("3d_container.html", "_self")
})