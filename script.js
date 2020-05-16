const menu = document.getElementById('menu');
const close = document.getElementById('close');

menu.addEventListener("click", () => {
    document.getElementById('sideMenu').style.display = 'flex'
} )
close.addEventListener("click", () => {
    document.getElementById('sideMenu').style.display = 'none'
} )