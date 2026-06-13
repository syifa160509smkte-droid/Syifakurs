let cart = [];
let filtered = [...books];

function toast(msg){
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.style.opacity = "1";

    setTimeout(() => {
        t.style.opacity = "0";
    }, 2000);
}

function renderBooks(data){
    let container = document.getElementById("bookContainer");
    container.innerHTML = "";

    data.forEach((b) => {

        container.innerHTML += `
        <div style="width:110px;text-align:center;color:white;">

            <div style="
                width:90px;
                height:130px;
                margin:auto;
                background:white;
                border-radius:8px;
                overflow:hidden;
                box-shadow:0 2px 8px rgba(0,0,0,.3);
            ">
                <img src="${b.cover}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                ">
            </div>

            <p style="font-size:9px;margin-top:5px;">
                ID: ${b.id}
            </p>

            <p style="
                font-size:10px;
                font-weight:bold;
                min-height:28px;
            ">
                ${b.judul}
            </p>

            <p style="font-size:11px;">Genre: ${b.genre}</p>
            <p style="font-size:11px;">Rp ${b.harga}</p>
            <p style="font-size:11px;">Stok: ${b.stok}</p>
            <p style="font-size:11px;">Penulis: ${b.penulis}</p>
            <p style="font-size:11px;">Penerbit: ${b.penerbit}</p>

            <button
                onclick="pinjam('${b.id}')"
                ${b.stok === 0 ? "disabled" : ""}
                style="
                    margin-top:5px;
                    padding:3px 8px;
                    border:none;
                    border-radius:5px;
                    color:white;
                    background:${b.stok === 0 ? '#9ca3af' : '#16a34a'};
                    cursor:pointer;
                ">
                ${b.stok === 0 ? "Habis" : "Pinjam"}
            </button>

        </div>
        `;
    });
}

function searchBooks(){
    let key = document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    filtered = books.filter(b => {
        let text =
        `${b.id} ${b.judul} ${b.penulis} ${b.penerbit} ${b.genre} ${b.harga}`
        .toLowerCase();

        return text.includes(key);
    });

    renderBooks(filtered);
}

function filterGenre(g){
    filtered =
        g === "Semua"
        ? [...books]
        : books.filter(b => b.genre === g);

    renderBooks(filtered);
}

function pinjam(id){
    let book = books.find(b => b.id === id);

    if(!book) return;

    if(book.stok <= 0){
        toast("⚠️ Buku sudah habis!");
        return;
    }

    book.stok--;

    cart.push({
        id: book.id,
        judul: book.judul
    });

    updateCart();
    renderBooks(filtered);

    toast("📚 Buku berhasil dipinjam!");

    if(book.stok === 0){
        setTimeout(() => {
            toast(`🚫 ${book.judul} sudah habis!`);
        }, 500);
    }
}

function updateCart(){
    document.getElementById("cartCount").innerText =
    `🛒 Keranjang (${cart.length})`;

    let list = document.getElementById("cartList");

    if(cart.length === 0){
        list.innerHTML = "Belum ada buku dipinjam";
        return;
    }

    list.innerHTML = cart.map((b, i) =>
        `${i + 1}. ${b.id} - ${b.judul}<br>`
    ).join("");
}

function toggleCart(){
    let c = document.getElementById("cartList");

    c.style.display =
    c.style.display === "block"
    ? "none"
    : "block";
}

document
.getElementById("searchInput")
.addEventListener("input", searchBooks);

renderBooks(books);
updateCart();