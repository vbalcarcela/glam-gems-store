import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase";


export default function Home() {

  const [productos, setProductos] = useState([]);

  const [carrito, setCarrito] = useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [categoria, setCategoria] =
    useState("todos");

  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [carritoAbierto, setCarritoAbierto] =
    useState(false);

  // OBTENER PRODUCTOS
  useEffect(() => {

    const obtenerProductos = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "productos")
          );

        const productosFirebase =
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setProductos(productosFirebase);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    obtenerProductos();

  }, []);

  // AGREGAR CARRITO
  const agregarCarrito = (producto) => {

    setCarrito([
      ...carrito,
      producto,
    ]);

    setCarritoAbierto(true);

  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = (index) => {

    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(index, 1);

    setCarrito(nuevoCarrito);

  };

  // TOTAL
  const totalCarrito = carrito.reduce(
    (acc, item) =>
      acc + Number(item.precio),
    0
  );
const finalizarPedido = async () => {

  if (carrito.length === 0) {

    alert("Tu carrito está vacío");

    return;

  }

  try {

    // CREAR ORDEN
    const nuevaOrden = {

      cliente: "WhatsApp",

      productos: carrito,

      total: totalCarrito,

      estado: "pendiente",

      fecha: new Date(),

    };

    // GUARDAR FIREBASE
    await addDoc(
      collection(db, "ordenes"),
      nuevaOrden
    );

    // PRODUCTOS TEXTO
    const productosTexto =
      carrito.map(
        (producto) =>

          `• ${producto.nombre} - Q${producto.precio}`

      ).join("%0A");

    // MENSAJE
    const mensaje =

      `Hola, quiero realizar este pedido:%0A%0A${productosTexto}%0A%0ATotal: Q${totalCarrito}`;

    // ABRIR WHATSAPP
    window.open(

      `https://wa.me/50252914227?text=${mensaje}`,

      "_blank"

    );

    // ALERTA
    alert(
      "Pedido enviado correctamente"
    );

    // LIMPIAR
    setCarrito([]);

    setCarritoAbierto(false);

  } catch (error) {

    console.log(error);

    alert(
      "Error procesando pedido"
    );

  }

};


  // FILTRAR PRODUCTOS
  const productosFiltrados =
    productos.filter((producto) => {

      const coincideBusqueda =
        producto.nombre
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          );

      const coincideCategoria =
        categoria === "todos" ||
        producto.categoria === categoria;

      return (
        coincideBusqueda &&
        coincideCategoria
      );

    });

  return (

    <div className="min-h-screen overflow-x-hidden bg-[#f7f4ef] text-black">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#f7f4ef]/90 backdrop-blur">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">

          {/* LOGO */}
          <h1 className="text-3xl font-black">

            Glam Gems

          </h1>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-14 md:flex">

            <a
              href="#inicio"
              className="font-medium transition hover:text-gray-500"
            >
              Inicio
            </a>

            <a
              href="#catalogo"
              className="font-medium transition hover:text-gray-500"
            >
              Catálogo
            </a>

            <a
              href="#beneficios"
              className="font-medium transition hover:text-gray-500"
            >
              Beneficios
            </a>

          </nav>

          {/* DERECHA */}
          <div className="flex items-center gap-4">

            {/* CARRITO */}
            <button
              onClick={() =>
                setCarritoAbierto(
                  !carritoAbierto
                )
              }
              className="rounded-full border border-black px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
            >

              Carrito ({carrito.length})

            </button>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-800 md:block"
            >
              WhatsApp
            </a>

            {/* MENU MOBILE */}
            <button
              onClick={() =>
                setMenuAbierto(
                  !menuAbierto
                )
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black transition hover:bg-black hover:text-white md:hidden"
            >
              ☰
            </button>

          </div>

        </div>

      </header>

      {/* MENU MOBILE */}
      {menuAbierto && (

        <div className="border-b border-gray-200 bg-[#f7f4ef] px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            <a
              href="#inicio"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              Inicio
            </a>

            <a
              href="#catalogo"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              Catálogo
            </a>

            <a
              href="#beneficios"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              Beneficios
            </a>

            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-5 py-3 text-center text-white"
            >
              WhatsApp
            </a>

          </div>

        </div>

      )}

      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-10 lg:grid-cols-2"
      >

        {/* TEXTO */}
        <div>

          <p className="mb-6 text-sm tracking-[10px] text-[#b68b4c]">

            GLAM GEMS

          </p>

          <h2 className="mb-8 text-4xl font-black leading-[1.05] lg:text-6xl">

            Joyas que elevan tu estilo

          </h2>

          <p className="mb-10 max-w-xl text-xl leading-relaxed text-gray-600">

            Accesorios elegantes y regalos especiales
            para cada ocasión.

          </p>

          <a
            href="#catalogo"
            className="inline-block rounded-full bg-black px-8 py-4 text-lg text-white transition hover:bg-gray-800"
          >
            Ver Catálogo
          </a>

        </div>

        {/* IMAGEN */}
        <div>

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="joyas"
            className="h-[520px] w-full rounded-[40px] object-cover shadow-2xl lg:h-[620px]"
          />

        </div>

      </section>

      {/* OVERLAY */}
      {carritoAbierto && (

        <div
          onClick={() =>
            setCarritoAbierto(false)
          }
          className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
        />

      )}

      {/* CARRITO */}
      <section
        className={`fixed right-0 top-0 z-[999] h-screen w-full max-w-[380px] border-l border-gray-200 bg-white shadow-2xl transition-all duration-500 ${
          carritoAbierto
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex h-full flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">

            <h3 className="text-4xl font-black">

              Carrito

            </h3>

            <button
              onClick={() =>
                setCarritoAbierto(false)
              }
              className="text-4xl text-gray-500 transition hover:text-black"
            >
              ×
            </button>

          </div>

          {/* CONTENIDO */}
          <div className="flex-1 overflow-y-auto p-6">

            {carrito.length === 0 ? (

              <div className="flex h-full flex-col items-center justify-center text-center">

                <div className="mb-6 text-5xl">

                  Bolsa

                </div>

                <h4 className="mb-2 text-2xl font-bold">

                  Tu carrito está vacío

                </h4>

                <p className="max-w-xs text-gray-500">

                  Agrega productos para verlos aquí.

                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {carrito.map(
                  (
                    producto,
                    index
                  ) => (

                    <div
                      key={index}
                      className="rounded-3xl border border-gray-200 p-5"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            producto.imagen
                          }
                          alt={
                            producto.nombre
                          }
                          className="h-24 w-24 rounded-2xl object-cover"
                        />

                        <div className="flex-1">

                          <h4 className="font-bold">

                            {
                              producto.nombre
                            }

                          </h4>

                          <p className="mt-1 text-gray-500">

                            Q
                            {
                              producto.precio
                            }

                          </p>

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          eliminarProducto(
                            index
                          )
                        }
                        className="mt-4 text-sm font-semibold text-red-500"
                      >
                        Eliminar
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 p-6">

            <div className="mb-5 flex items-center justify-between">

              <span className="text-2xl font-bold">

                Total

              </span>

              <span className="text-3xl font-black">

                Q{totalCarrito}

              </span>

            </div>

            <button
              onClick={finalizarPedido}
              className="w-full rounded-2xl bg-black p-4 text-lg font-semibold text-white transition hover:bg-gray-800"
            >
              Finalizar Pedido
            </button>

          </div>

        </div>

      </section>

      {/* CATALOGO */}
      <section
        id="catalogo"
        className="mx-auto max-w-[1400px] px-6 pb-20"
      >

        {/* TITULO */}
        <div className="mb-16 text-center">

          <p className="mb-4 text-sm tracking-[10px] text-[#b68b4c]">

            CATÁLOGO

          </p>

          <h2 className="text-5xl font-black">

            Productos Destacados

          </h2>

        </div>

        {/* FILTROS */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
            className="w-full max-w-md rounded-full border border-gray-300 bg-white px-6 py-4 outline-none"
          />

          <div className="flex flex-wrap gap-4">

            {[
              "todos",
              "collares",
              "anillos",
              "aretes",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setCategoria(item)
                }
                className={`rounded-full px-6 py-3 capitalize transition ${
                  categoria === item
                    ? "bg-black text-white"
                    : "border border-gray-300 bg-white hover:bg-black hover:text-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* PRODUCTOS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {loading ? (

            [...Array(6)].map(
              (_, index) => (

                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-[32px] bg-white shadow-lg"
                >

                  <div className="h-[320px] bg-gray-200" />

                  <div className="space-y-4 p-7">

                    <div className="h-6 rounded bg-gray-200" />

                    <div className="h-4 rounded bg-gray-200" />

                    <div className="h-4 w-2/3 rounded bg-gray-200" />

                  </div>

                </div>

              )
            )

          ) : (

            productosFiltrados.map(
              (producto) => (

                <div
                  key={producto.id}
                  className="overflow-hidden rounded-[32px] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <img
                    src={
                      producto.imagen
                    }
                    alt={
                      producto.nombre
                    }
                    className="h-[320px] w-full object-cover"
                  />

                  <div className="space-y-4 p-7">

                    <h3 className="text-2xl font-black">

                      {
                        producto.nombre
                      }

                    </h3>

                    <p className="text-gray-600">

                      {
                        producto.descripcion
                      }

                    </p>

                    <div className="flex items-center justify-between">

                      <span className="text-3xl font-black">

                        Q
                        {
                          producto.precio
                        }

                      </span>

                      <button
                        onClick={() =>
                          agregarCarrito(
                            producto
                          )
                        }
                        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                      >
                        Comprar
                      </button>

                    </div>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="mx-auto grid max-w-[1400px] gap-8 px-6 pb-20 md:grid-cols-3"
      >

        <div className="rounded-[32px] bg-white p-8 shadow-lg">

          <h3 className="mb-4 text-2xl font-black">

            Calidad Premium

          </h3>

          <p className="leading-relaxed text-gray-600">

            Joyas seleccionadas cuidadosamente
            para resaltar tu estilo.

          </p>

        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-lg">

          <h3 className="mb-4 text-2xl font-black">

            Envíos

          </h3>

          <p className="leading-relaxed text-gray-600">

            Entregas rápidas y seguras.

          </p>

        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-lg">

          <h3 className="mb-4 text-2xl font-black">

            Atención Personalizada

          </h3>

          <p className="leading-relaxed text-gray-600">

            Te ayudamos a elegir el regalo perfecto.

          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white">

        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-12 md:grid-cols-3">

          {/* BRAND */}
          <div>

            <h2 className="mb-5 text-4xl font-black">

              Glam Gems

            </h2>

            <p className="max-w-sm leading-relaxed text-gray-400">

              Joyas elegantes y accesorios diseñados
              para elevar tu estilo.

            </p>

          </div>

          {/* LINKS */}
          <div>

            <h3 className="mb-5 text-2xl font-bold">

              Navegación

            </h3>

            <div className="flex flex-col gap-4 text-gray-400">

              <a href="#inicio">
                Inicio
              </a>

              <a href="#catalogo">
                Catálogo
              </a>

              <a href="#beneficios">
                Beneficios
              </a>

            </div>

          </div>

          {/* CONTACTO */}
          <div>

            <h3 className="mb-5 text-2xl font-bold">

              Contacto

            </h3>

            <div className="flex flex-col gap-4 text-gray-400">

              <a
                href="https://wa.me/50252914227"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

              <p>
                Guatemala
              </p>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">

          © 2026 Glam Gems. Todos los derechos reservados.

        </div>

      </footer>

    </div>

  );

}













