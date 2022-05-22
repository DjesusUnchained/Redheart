const checkbox = document.getElementById("terminos");
const btns = document.getElementsByClassName("btn-grid")

checkbox.addEventListener("change", function() {
  const checked = this.checked;
  for (const btn of btns) {
    checked ? (btn.disabled = false) : (btn.disabled = true);
  }
});


const formulario = document.getElementById("Formulario");
const cuadroAlerta = document.querySelector(".container h4");

function validarFormulario(evento) {
  evento.preventDefault();
  var nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const textarea = document.getElementById('textarea').value;
    

    if (nombre.length === 0) {
      console.log(nombre)
      cuadroAlerta.innerHTML = "No has escrito ningun nombre";
  
      return;
    }

    if (apellido.length == 0) {
      cuadroAlerta.innerHTML = "No has escrito ningun apellido";
      return;
    }

    if (email.length == 0) {
      cuadroAlerta.innerHTML = "No has escrito ningun correo";
      return;
    }

    
    if (!emailValido(email)) {
      cuadroAlerta.innerHTML = "Por favor, escribe un correo electrónico válido";
      return;
    }

    if (telefono.length == 0) {
      cuadroAlerta.innerHTML = "No has escrito ningun numero de telefono";
      return;
    }

    // if (!telefonoValido(telefono)) {
    //   cuadroAlerta.innerHTML = "Por favor, escribe un numero de telefono valido";
    //   return;
    // }

    if (textarea.length < 20) {
      cuadroAlerta.innerHTML = "Escribe un mensaje de al menos 20 caracteres";
      return;
    }

    formulario.submit();

  }

const emailValido = function(email) {
  const num =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return num.test(String(email).toLowerCase());
}

// const telefonoValido = function(telefono) {
//   let num = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
//   return num.test(String(telefono).toLocaleLowerCase());
// }


formulario.addEventListener("submit", validarFormulario);