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
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");

  // MENU MOBILE
  const [menuAbierto, setMenuAbierto] = useState(false);

  // OBTENER PRODUCTOS
  useEffect(() => {

    const obtenerProductos = async () => {

      const querySnapshot = await getDocs(
        collection(db, "productos")
      );

      const productosFirebase =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setProductos(productosFirebase);

    };

    obtenerProductos();

  }, []);

  // AGREGAR AL CARRITO
  const agregarCarrito = (producto) => {

    setCarrito([...carrito, producto]);

  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = (index) => {

    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(index, 1);

    setCarrito(nuevoCarrito);

  };

  // TOTAL
  const total = carrito.reduce(
    (acc, item) => acc + Number(item.precio),
    0
  );

  // FINALIZAR PEDIDO
  const finalizarPedido = async () => {

    if (carrito.length === 0) {

      alert("Tu carrito está vacío");

      return;

    }

    try {

      await addDoc(collection(db, "ordenes"), {

        productos: carrito,
        total,
        estado: "pendiente",
        fecha: new Date(),

      });

      alert("Pedido realizado correctamente");

      setCarrito([]);

    } catch (error) {

      console.log(error);

      alert("Error al finalizar pedido");

    }

  };

  // FILTROS
  const productosFiltrados = productos.filter((producto) => {

    const coincideBusqueda =
      producto.nombre
        ?.toLowerCase()
        .includes(busqueda.toLowerCase());

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

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">

          {/* LOGO */}
          <h1 className="text-2xl font-black md:text-3xl">

            Glam Gems

          </h1>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-10 md:flex">

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
          <div className="flex items-center gap-3">

            {/* CARRITO */}
            <div className="rounded-full border border-black px-4 py-2 text-sm font-semibold">

              {carrito.length}

            </div>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-black px-5 py-2 text-sm text-white transition hover:bg-gray-800 md:block"
            >
              WhatsApp
            </a>

            {/* BOTON MENU */}
            <button
              onClick={() =>
                setMenuAbierto(!menuAbierto)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black md:hidden"
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
        className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20"
      >

        {/* TEXTO */}
        <div className="text-center md:text-left">

          <p className="mb-4 text-sm tracking-[6px] text-[#b68b4c]">

            GLAM GEMS

          </p>

          <h2 className="mb-5 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">

            Joyas que elevan tu estilo

          </h2>

          <p className="mb-7 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg">

            Accesorios elegantes y regalos especiales
            para cada ocasión.

          </p>

          <a
            href="#catalogo"
            className="inline-block rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800"
          >
            Ver Catálogo
          </a>

        </div>

        {/* IMAGEN */}
        <div>

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="joyas"
            className="h-[260px] w-full rounded-[28px] object-cover shadow-2xl md:h-[500px]"
          />

        </div>

      </section>

      {/* CARRITO */}
      <section className="mx-auto mb-20 max-w-7xl px-4 md:px-6">

        <div className="rounded-[28px] bg-white p-6 shadow-xl md:p-8">

          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-2xl font-black md:text-4xl">

              Carrito

            </h3>

            <span className="text-2xl font-black md:text-3xl">

              Q{total}

            </span>

          </div>

          {carrito.length === 0 ? (

            <p className="text-gray-500">
              Tu carrito está vacío
            </p>

          ) : (

            <div className="space-y-4">

              {carrito.map((producto, index) => (

                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-5 md:flex-row md:items-center md:justify-between"
                >

                  <div>

                    <h4 className="text-lg font-bold">

                      {producto.nombre}

                    </h4>

                    <p className="text-gray-500">

                      Q{producto.precio}

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      eliminarProducto(index)
                    }
                    className="font-semibold text-red-500 transition hover:text-red-700"
                  >
                    Eliminar
                  </button>

                </div>

              ))}

              <button
                onClick={finalizarPedido}
                className="mt-4 w-full rounded-2xl bg-black p-4 text-lg text-white transition hover:bg-gray-800"
              >
                Finalizar Pedido
              </button>

            </div>

          )}

        </div>

      </section>

      {/* CATALOGO */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-4 pb-24 md:px-6"
      >

        {/* TITULO */}
        <div className="mb-14 text-center">

          <p className="mb-3 text-sm tracking-[6px] text-[#b68b4c]">

            CATÁLOGO

          </p>

          <h2 className="text-4xl font-black md:text-5xl">

            Productos Destacados

          </h2>

        </div>

        {/* FILTROS */}
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none md:max-w-md"
          />

          <div className="flex flex-wrap gap-3">

            {[
              "todos",
              "collares",
              "anillos",
              "aretes",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setCategoria(item)}
                className={`rounded-full px-5 py-2 capitalize transition ${
                  categoria === item
                    ? "bg-black text-white"
                    : "border border-gray-300 bg-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* PRODUCTOS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-lg transition duration-300 hover:-translate-y-2"
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-[280px] w-full object-cover md:h-[320px]"
              />

              <div className="p-6">

                <h3 className="mb-3 text-2xl font-black">

                  {producto.nombre}

                </h3>

                <p className="mb-6 text-gray-600">

                  {producto.descripcion}

                </p>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-2xl font-black">

                    Q{producto.precio}

                  </span>

                  <button
                    onClick={() =>
                      agregarCarrito(producto)
                    }
                    className="rounded-full bg-black px-5 py-3 text-white transition hover:bg-gray-800"
                  >
                    Comprar
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 md:grid-cols-3 md:px-6"
      >

        <div className="rounded-[28px] bg-white p-8 shadow-lg">

          <h3 className="mb-4 text-2xl font-black">

            Calidad Premium

          </h3>

          <p className="leading-relaxed text-gray-600">

            Joyas seleccionadas cuidadosamente
            para resaltar tu estilo.

          </p>

        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-lg">

          <h3 className="mb-4 text-2xl font-black">

            Envíos

          </h3>

          <p className="leading-relaxed text-gray-600">

            Entregas rápidas y seguras.

          </p>

        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-lg">

          <h3 className="mb-4 text-2xl font-black">

            Atención Personalizada

          </h3>

          <p className="leading-relaxed text-gray-600">

            Te ayudamos a elegir el regalo perfecto.

          </p>

        </div>

      </section>

    </div>

  );

}




