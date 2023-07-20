let listaProductos = [];

async function renderLista() {
  let plantilla = await $.ajax({ url: "templates/template-list.handlebars" });
  let template = Handlebars.compile(plantilla);
  let html = template({ listaProductos });
  $("#lista").html(html);
  let ul = $("ul");
  componentHandler.upgradeElements(ul);
}

$("#btn-entrada-producto").click(() => {
  const input = $("#ingreso-producto");
  let producto = input.val();

  if (producto) {
    listaProductos.push({
      nombre: producto,
      cantidad: 1,
      precio: 0,
    });
    renderLista();
    input.val("");
  }
});
