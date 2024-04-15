// tienda albumes
// Alumna: Ornella Luján Mansilla
localStorage.removeItem('carrito');
let stock = [
    new Album(1, "Midnights", "Taylor Swift", "The Til Dawn", "LP", "1:20 hs", 74000, 30),
    new Album(2, "Born Pink", "BLACKPINK", "Rose Ver.", "CD + BoxSet", "24 min", 45000, 30),
    new Album(3, "Proof", "BTS", "-", "KITplayer", "2:08 hs", 23000, 30),
    new Album(4, "Voicenotes", "Charlie Puth", "City Edition", "Jewel Case", "2:08 hs", 25000, 30)
];

localStorage.setItem('stock', JSON.stringify(stock));
let carrito = [];

function MostrarProductos() {
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    let productos = '';
    stock.forEach((producto) => {
        productos +=        `<article class="producto">
                                <div class="producto-info">
                                    <h3>${producto.Nombre}</h3>
                                    <p>Artista: ${producto.Artista}</p>
                                    <p>Versión: ${producto.Version}</p>
                                    <p>Formato: ${producto.Formato}</p>
                                    <p>Precio: $${producto.Precio}</p>
                                    <button class="btn" onclick="AgregarAlCarrito(${producto.ID})">Agregar al carrito</button>
                                </div>
                                
                                <div class="producto-img" id="${producto.ID}">
                                    <img src="imagenes/${producto.Nombre}.jpg" alt="Nombre del álbum">
                                </div>
                            </article>`
    });

    document.querySelector('.productos').innerHTML = productos;
}


function GuardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function AgregarAlCarrito(id) {
    let producto = stock.find((album) => { return album.ID === id });

    if (producto) {
        let itemEnCarrito = carrito.find((item) => { return item.Producto.ID === id })
        if (itemEnCarrito) {
            itemEnCarrito.Cantidad++
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "¡El álbum se agregó con éxito!",
                showConfirmButton: false,
                timer: 1000
              });
        } else {
            let nuevoItem = new Item (producto, 1)
            carrito.push(nuevoItem)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "¡El álbum se agregó con éxito!",
                showConfirmButton: false,
                timer: 1000
            });
        }
        GuardarCarrito();
        MostrarCarrito();
    }else{
        Swal.fire("Está ocurriendo un error, no podemos agregar este producto al carrito.");
    }
}

function MostrarCarrito() {
    let itemsCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let items = '';
    itemsCarrito.forEach((item) => {
        items +=            `<article class="item">
                                <div class="item-info">
                                    <h3>${item.Producto.Nombre}</h3>
                                    <p>Artista: ${item.Producto.Artista}</p>
                                    <p>Precio: $${item.Producto.Precio}</p>
                                    <p>Cantidad: ${item.Cantidad}</p>
                                    <button class="btn" onclick="EliminarDelCarrito(${item.Producto.ID})">Eliminar del carrito</button>
                                </div>
                                <div class="item-img" id="${item.Producto.ID}">
                                    <img src="imagenes/${item.Producto.Nombre}.jpg" alt="Nombre del álbum">
                                </div>
                            </article>`
    })

    document.querySelector('.carrito').innerHTML = items;
}

function EliminarDelCarrito(id){
    let indice = carrito.findIndex(item => item.Producto.ID === id);
    if (indice !== -1) {
        if (carrito[indice].Cantidad > 1) {
            carrito[indice].Cantidad--;
        } else {
            carrito.splice(indice, 1);
        }
        GuardarCarrito();
        MostrarCarrito();
    }
}

function Checkout(){
    let total = 0;
    total = carrito.reduce((acumulador, elemento) => acumulador + elemento.CalcularTotalPorItem(), 0);

    Swal.fire({
        title: "Estas vez más cerca de disfrutar tu música",
        text: `El total de tu compra es: $${total}`,
        confirmButtonText: "Pagar"
        
      });
    localStorage.removeItem('carrito');
    MostrarCarrito();
    CloseDrawer();
}

function OpenDrawer() {
    document.getElementById("carrito-drawer").style.right = "0";
    document.querySelector('.carrito').style.display = 'block';
}

function CloseDrawer() {
    document.getElementById("carrito-drawer").style.right = "-350px";
    document.querySelector('.carrito').style.display = 'none';
}
document.addEventListener("DOMContentLoaded", () => {
    MostrarProductos();
    MostrarCarrito();
});

