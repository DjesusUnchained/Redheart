const botonMenu = document.getElementById("boton-menu");
const contenidoNav = document.getElementById("nav");

botonMenu.addEventListener("click", function(){
    botonMenu.classList.toggle("close");
    contenidoNav.classList.toggle("show");
  });

contenidoNav.addEventListener("click", e => {
    if (e.target.id === "nav") {
        contenidoNav.classList.remove("show");
        botonMenu.classList.remove("close");
}
});