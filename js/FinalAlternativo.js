//dar la bienvenida me sirve para resetear el carro
Swal.fire({
  position: "center",
  backdrop: false,
  color: "rgb(255,255,255)",
  background: "rgb(0,50,100)",
  title: "WELCOME !",
  showConfirmButton: false,
  timer: 1500,
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    if(recuperarUsuario(localStorage) === null){
      carrito.length = 0;
      updateCarrito();
      crearCarrito();
    }else{
      console.log(totaldeCompra);
      if(totaldeCompra !== 0){
        mostrarAlert()
      }
    }
  }
});

//Fetch Clima
window.addEventListener("load", () => {
  let lon, lat;
  // const apikeyGeo = "97079671e4842d6974419e3e7aa830bd";
  let tempValor = document.getElementById("tempValor");
  let humedad = document.getElementById("humedad");
  let ubicacion = document.getElementById("ubicacion");
  let iconoAnimado = document.getElementById("iconoAnim");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?id=61&units=metric&lat=${lat}&lon=${lon}&lang=sp&appid=97079671e4842d6974419e3e7aa830bd`;
      console.log(url);

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let temp = Math.round(data.main.temp);
          tempValor.textContent = `Temperatura: ${temp}ºC`;

          let hum = Math.round(data.main.humidity);
          humedad.textContent = `Humedad: ${hum}%`;

          let city = data.name;
          ubicacion.textContent = `${city}`;

          switch (data.weather[0].main) {
            case "Thunderstorm":
              iconoAnimado.src = "./svgicons/animated/thunder.svg";
              console.log("TORMENTA");
              break;
            case "Drizzle":
              iconoAnimado.src = "./svgicons/animated/rainy-2.svg";
              console.log("LLOVIZNA");
              break;
            case "Rain":
              iconoAnimado.src = "./svgicons/animated/rainy-7.svg";
              console.log("LLUVIA");
              break;
            case "Snow":
              iconoAnimado.src = "./svgicons/animated/snowy-6.svg";
              console.log("NIEVE");
              break;
            case "Clear":
              iconoAnimado.src = "./svgicons/animated/day.svg";
              console.log("LIMPIO");
              break;
            case "Atmosphere":
              iconoAnimado.src = "./svgicons/animated/weather.svg";
              console.log("ATMOSFERA");
              break;
            case "Clouds":
              iconoAnimado.src = "./svgicons/animated/cloudy-day-1.svg";
              console.log("NUBES");
              break;
            default:
              iconoAnimado.src = "./svgicons/animated/cloudy-day-1.svg";
              console.log("por defecto");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});

//Array Eventos
const Events = [
  {
    id: 1,
    name: "Evento Rojo",
    price: 2100.0,
    description: "Evento para disfrutar del buen sonido rojo",
    type: "publico",
    img: "img/rojo.jpg",
    age: "mayor",
    place: "La Plata",
    quantity: 1,
    capacity: 300,
    time: "21:30",
    category: "Electronica",
    date: "5/22/2022",
    artist: "Sahar Z, Mariano Mellino, Khen",
  },
  {
    id: 2,
    name: "Evento Verde",
    price: 1200.0,
    description: "Evento para disfrutar del buen sonido verde",
    type: "publico",
    img: "img/verde.jpg",
    age: "mayor",
    place: "Ensenada",
    quantity: 1,
    capacity: 500,
    time: "20:00",
    category: "Reggae",
    date: "2/24/2022",
    artist: "Marley, Nonpa, Sumo",
  },
  {
    id: 3,
    name: "Evento Azul",
    price: 3100.0,
    description: "Evento para disfrutar del buen sonido azul",
    type: "publico",
    img: "img/azul.jpg",
    age: "mayor",
    place: "Berisso",
    quantity: 1,
    capacity: 1000,
    time: "22:30",
    category: "Rock",
    date: "12/31/2022",
    artist: "Pappo, Pity, Muddy Waters",
  },
];

let timerInterval;

//dom
const contenedorProductos = document.getElementById("productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const botonVaciarCarrito = document.getElementById("vaciarCarrito");

const botonConfirmarCarrito = document.getElementById("confirmarCarrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const totalCarrito = document.getElementById("carritoTotal");

const fecha = document.getElementById("fecha");

let date = new Date();

fecha.innerText = date.toLocaleDateString();



botonConfirmarCarrito.addEventListener("click", () => {

  if(localStorage.getItem('carrito') && totaldeCompra !== 0){
   
    sweet1("Felicidades has realizado la compra de tus entradas! Gracias por usar Multieventos", "success");
    mandarRecibo();
    vaciarelCarro();
  }else{
    sweet1("Agrega entradas a tu carrito para realizar una compra", "info");
  }
});

botonVaciarCarrito.addEventListener("click", () => {
  sweet1("Su carrito de compras ha sido borrado!", "warning");
  vaciarelCarro();
});

function vaciarelCarro () {
  localStorage.removeItem("carrito");
  sessionStorage.removeItem("carrito");
  carrito.quantity = 0;
  carrito.length = 0;
  updateCarrito();
};

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
    updateCarrito();
  }
});

Events.forEach((element) => {
  const div = document.createElement('div');
  
  div.className = "col-12 col-sm-12 card my-3 ";
  div.innerHTML = `
  <div class=" card-group">
  <div class="card-body d-flex flex-column align-items-center" >
  <h5 class="card-title mb-4">${element.name.toUpperCase()}</h5>
  <img src=${element.img} alt="" class="col-1">
  <p class="card-text mt-3">${element.category.toUpperCase()}</p>
  <p class="card-text">DESCRIPCION: ${element.description}</p>
  <p class="card-text">FECHA: ${element.date}</p>
  <p class="card-text">HORARIO: ${element.time} hs</p>
  <p class="card-text">ARTISTAS: ${element.artist}</p>
  <p class="card-text">PRECIO: $ ${element.price}</p>
  <button id="agregar${element.id}" class="boton-agregar btn btn-success">AGREGAR 1 ENTRADA AL <i class="fas fa-shopping-cart"></i></button>
  `;
  contenedorProductos.appendChild(div)

  const botton = document.getElementById(`agregar${element.id}`);
  
  botton.addEventListener('click', () => {
    agregarEntrada(element.id,element.name);
  });

});


const agregarEntrada = (iD,name) => {

      const sumaCantidad = carrito.some(element => element.id === iD);
      if (sumaCantidad) {
        const element = carrito.map( element => {
          if(element.id === iD){
            element.quantity++;
          }

        });
      }else {
      const item = Events.find((element) => element.id === iD);
        carrito.push(item);
      }
      console.log(carrito);
      updateCarrito();
        // alert //
  let message =
  "AÑADISTE 1 ENTRADA PARA  \n EL " +
  name.toUpperCase();

  toast1(message);

  mostrarAlert() ;

}

const eliminarItem = (iD) => {
  const item = Events.find((element) => element.id === iD);
  const indice = carrito.indexOf(item);

  carrito.splice(indice, 0);
  carrito.forEach((element) => {
    if(element.id === iD){
    element.quantity = 0;
    }});
    console.log(carrito);
    console.log(indice);
  updateCarrito();

}

let totaldeCompra = 0;

const updateCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((item) => {
    const div = document.createElement('div');
    div.className = "col d-flex mx-0 my-2 ";
    div.innerHTML = `
    <p>${item.name.toUpperCase()}</p>
    <p>FECHA: ${item.date}</p>
    <p>PRECIO: $${item.price}</p>
    <p>CANTIDAD: <span id="cantidad">${item.quantity}</span></pclass=>
    <div><button class="btn btn-danger" onclick = "eliminarItem(${item.id})"><i class="fas fa-trash-alt"></i></button></div>
    `

    contenedorCarrito.appendChild(div);

    localStorage.setItem('carrito', JSON.stringify(carrito));
  })

  contadorCarrito.innerText = carrito.reduce((acc, item) => acc + item.quantity, 0);
  totaldeCompra = carrito.reduce((acc, item) => acc + item.quantity * item.price, 0);
  totalCarrito.innerText = totaldeCompra;

}

//crear carrito 
function crearCarrito() {
  let cart = [];

  for (const element of Events) {
    cart.push({
      id: element.id,
      name: element.name,
      price: element.price,
      description: element.description,
      type: element.type,
      img: element.img,
      age: element.age,
      place: element.place,
      capacity: element.capacity,
      time: element.time,
      category: element.category,
      date: element.date,
      artist: element.artist,
      quantity: 0,
      total: 0,
      timeofBuy: new Date(),
    });
  }
  localStorage.setItem("carrito", JSON.stringify(cart));
}

//para el login

let mailReg = document.getElementById("emailLogin");
let nameReg = document.getElementById("nameLogin");
let recordar = document.getElementById("recordarme");
let btnLogin = document.getElementById("login");
let modalEl = document.getElementById("modalLogin");

let modal = new bootstrap.Modal(modalEl);

let toggles = document.querySelectorAll(".toggles");
let bb = document.querySelectorAll(".bb");

function guardarDatos(storage) {
  let user = mailReg.value;
  let nameUser = nameReg.value;

  const usuario = {
    user: user,
    name: nameUser,
  };

  storage === "sessionStorage" &&
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  storage === "localStorage" &&
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

function borrarDatos() {
  localStorage.removeItem("usuario");
  sessionStorage.removeItem("usuario");
  localStorage.removeItem("carrito");
  sessionStorage.removeItem("carrito");
  location.reload();
}

function recuperarUsuario(storage) {
  let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
  return usuarioEnStorage;
}

function saludar(usuario) {
  nombreUsuario.innerHTML = `Bienvenidx ! <span>${usuario.name.toUpperCase()}</span> Aprovecha tus Descuentos !`;
}

function isLogged(usuario) {
  if (usuario) {
    saludar(usuario);
    presentarInfo(toggles, "d-none");
    presentarInfo(bb, "iframe2");
  }
}

function presentarInfo(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

//introduccion de email y name
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !mailReg.value ||
    mailReg.value.indexOf("@") === -1 ||
    mailReg.value.indexOf(".") === -1 ||
    mailReg.value.indexOf(" ") !== -1 ||
    !nameReg.value
  ) {
    // si no hay valor y si no se encuentra "@" o . o espacio
    sweet1("Ingrese sus datos correctamente", "error");
    //alert("Ingrese sus datos correctamente");
  } else {
    if (recordar.checked) {
      guardarDatos("localStorage");
      saludar(recuperarUsuario(localStorage));
    } else {
      guardarDatos("sessionStorage");
      saludar(recuperarUsuario(sessionStorage));
    }
    modal.hide();

    presentarInfo(toggles, "d-none");
    presentarInfo(bb, "iframe2");
  }
});

btnLogout.addEventListener("click", () => {
  borrarDatos();
  presentarInfo(toggles, "d-none");
  presentarInfo(bb, "iframe2");
});

isLogged(recuperarUsuario(localStorage));

//enviar mail de compra
function mandarRecibo() {
  console.log(mailReg.value);
  emailjs.send("service_dwm6j8j","template_6fqxvyr",{
    from_name: nameReg.value,
    emailLogin: mailReg.value,
    total: totaldeCompra.toString(),
  });
}

//alertas
function toast1(texto) {
  Toastify({
    text: texto,
    gravity: "top",
    position: "left",
    close: false,
    style: {
      color: "rgb(255,255,255)",
      background: "rgb(0, 205, 85,0.7)",
    },
  }).showToast();
}

function sweet1(texto, icono) {
  Swal.fire({
    position: "top",
    icon: icono,
    title: texto,
    showConfirmButton: false,
    timer: 1500,
  });
}

function mostrarAlert() {
  Swal.fire({
    title: "Tenes entradas en el carrito",
    html: "Te quedan <b></b> segundos para confirmar tu compra!",
    width: "18rem",
    timer: 30000,
    color: "white",
    background: "rgb(0, 30, 150,0.7)",
    timerProgressBar: false,
    position: "bottom-start",
    backdrop: false,
    showConfirmButton: false ,
    didOpen: () => {
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = (Swal.getTimerLeft() / 1000)
        .toFixed(0)
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      localStorage.removeItem("carrito");
      sessionStorage.removeItem("carrito");
      carrito.forEach((item) => {
      item.quantity = 1;
      })
      carrito.length = 0;
      updateCarrito();
      crearCarrito();
    }
  });
}

