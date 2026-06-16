let carrito = [];
let total = 0;

function toggleCarrito() {
    const panel = document.getElementById('carritoPanel');
    const overlay = document.getElementById('overlayCarrito');

    panel.classList.toggle('abierto');
    overlay.classList.toggle('activo');
}

function agregarCarrito(nombre, precio, precioNum) {
    precioNum = Number(precioNum);

    carrito.push({ nombre, precio, precioNum });
    total += precioNum;

    actualizarCarrito();

    const btn = document.activeElement;
    const original = btn.innerHTML;

    btn.innerHTML = 'Agregado ✓';
    btn.style.background = '#25d366';

    setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
    }, 1200);
}

function actualizarCarrito() {
    const items = document.getElementById('carritoItems');
    const contador = document.getElementById('contador-carrito');
    const totalEl = document.getElementById('totalCarrito');

    contador.textContent = carrito.length;
    totalEl.textContent = 'S/. ' + total.toFixed(2);

    if (carrito.length === 0) {
        items.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        return;
    }

    items.innerHTML = carrito.map((item, i) => `
        <div class="carrito-item">
            <div>
                <strong>${item.nombre}</strong><br>
                <span>${item.precio}</span>
            </div>
            <button onclick="eliminarItem(${i})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function eliminarItem(index) {
    total -= Number(carrito[index].precioNum);
    carrito.splice(index, 1);
    actualizarCarrito();
}

function mostrarFormularioPago() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const resumen = document.getElementById('resumenCompra');

    resumen.innerHTML = `
        <strong>Resumen del pedido:</strong><br><br>
        ${carrito.map(i => `• ${i.nombre} — ${i.precio}`).join('<br>')}
        <br><br>
        <strong>Total: S/. ${total.toFixed(2)}</strong>
    `;

    document.getElementById('modalPago').classList.add('activo');
    document.getElementById('modalOverlay').classList.add('activo');
    toggleCarrito();
}

function confirmarCompra() {
    alert('Compra realizada con éxito. FarmaExpress se comunicará contigo pronto.');

    carrito = [];
    total = 0;

    actualizarCarrito();
    cerrarModal('modalPago');
}

function cerrarModal(id) {
    document.getElementById(id).classList.remove('activo');
    document.getElementById('modalOverlay').classList.remove('activo');
}

function cerrarTodosModales() {
    document.getElementById('modalPago').classList.remove('activo');
    document.getElementById('modalOverlay').classList.remove('activo');
}

function filtrar(categoria, btn) {
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');

    document.querySelectorAll('#grid-productos .card').forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
function abrirLogin() {
    document.getElementById("loginModal").classList.add("activo");
    document.getElementById("loginOverlay").classList.add("activo");
}

function cerrarLogin() {
    document.getElementById("loginModal").classList.remove("activo");
    document.getElementById("loginOverlay").classList.remove("activo");
}