"use strict";

let items = [];

const LOCALSTORAGE_ENTRY__ITEMS = "SuperLista_Items";

const btnAgregar = document.querySelector("#btn-entrada-producto");
const btnBorrar = document.querySelector("#btn-borrar-productos");

const btnGuardar = document.querySelector("#btn-storage-guardar");
const btnCargar = document.querySelector("#btn-storage-cargar");
const btnLimpiar = document.querySelector("#btn-storage-limpiar");

function crearItem({ id, nombre, cantidad }) {
  const li = document.createElement("li");
  li.classList.add("mdl-list__item");

  const spanNombre = document.createElement("span");
  spanNombre.innerHTML = nombre;
  spanNombre.classList.add("mdl-list__item-primary-content");
  spanNombre.style.flexGrow = "0";
  li.appendChild(spanNombre);

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.id = `input__cantidad__${id}`;
  inputCantidad.onchange = (e) => {
    const cantidadIngresada = e.target.value;
    items[id].cantidad = cantidadIngresada;
  };
  inputCantidad.value = Number(cantidad);

  li.appendChild(inputCantidad);

  return li;
}

function renderItems() {
  let ul = document.querySelector("#ul_lista");
  // Borrar los elementos actuales
  ul.innerHTML = "";
  // Cargar los elementos de la lista
  items.forEach((producto, indice) => {
    ul.appendChild(
      crearItem({
        id: indice,
        nombre: producto.nombre,
        cantidad: producto.cantidad,
      })
    );
  });
  // Actualizar los estilos de MaterialDesign
  componentHandler.upgradeElements(ul);
}

function guardar() {
  localStorage.setItem(LOCALSTORAGE_ENTRY__ITEMS, JSON.stringify(items));
}

function cargar() {
  items = JSON.parse(localStorage.getItem(LOCALSTORAGE_ENTRY__ITEMS));
  renderItems();
}

function limpiar() {
  localStorage.removeItem(LOCALSTORAGE_ENTRY__ITEMS);
}

btnAgregar.addEventListener("click", () => {
  let input = document.querySelector("#ingreso-producto");
  let producto = input.value;

  if (producto != "") {
    items.push({
      nombre: producto,
      cantidad: 1,
    });
    renderItems();
  }

  input.value = "";
});

btnGuardar.addEventListener("click", guardar);

btnCargar.addEventListener("click", cargar);

btnLimpiar.addEventListener("click", limpiar);

function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then((registracion) => {
        console.log("Service worker registrado", registracion.scope);
      });
  }
}

function desregistrarServiceWorker() {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    for (let reg of regs) {
      reg.unregister();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  registrarServiceWorker();
});
