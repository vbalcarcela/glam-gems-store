import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {

  // PRODUCTOS
  const [productos, setProductos] = useState([]);

  // CATEGORÍA
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  // CARRITO
  const [carrito, setCarrito] = useState(() => {

    const carritoGuardado =
      localStorage.getItem("carrito");

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];

  });

  // CARRITO LATERAL
  const [abrirCarrito, setAbrirCarrito] = useState(false);

  // MENU MOBILE
  const [menuAbierto, setMenuAbierto] = useState(false);

  // OBTENER PRODUCTOS
  useEffect(() => {

    const obtenerProductos = async () => {

      const querySnapshot = await getDocs(
        collection(db, "productos")
      );

      const productosFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(productosFirebase);

    };

    obtenerProductos();

  }, []);

  // GUARDAR CARRITO
  useEffect(() => {

    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );

  }, [carrito]);

  // CATEGORÍAS
  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  // PRODUCTOS FILTRADOS
  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaActiva
        );

  // AGREGAR AL CARRITO
  const agregarAlCarrito = (producto) => {

    setCarrito([...carrito, producto]);

  };

  // ELIMINAR DEL CARRITO
  const eliminarDelCarrito = (index) => {

    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(index, 1);

    setCarrito(nuevoCarrito);

  };

  // TOTAL
  const total = carrito.reduce(
    (acc, item) => acc + item.precio,
    0
  );

  return (

    <div className="min-h-screen overflow-x-hidden bg-[#f7f4ef] text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-40 w-full border-b border-gray-200 bg-[#f7f4ef]/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">

          {/* LOGO */}
          <h1 className="text-2xl font-bold md:text-3xl">
            Glam Gems
          </h1>

          {/* LINKS DESKTOP */}
          <div className="hidden items-center gap-10 md:flex">

            <a
              href="#inicio"
              className="transition hover:text-gray-500"
            >
              Inicio
            </a>

            <a
              href="#catalogo"
              className="transition hover:text-gray-500"
            >
              Catálogo
            </a>

            <a
              href="#beneficios"
              className="transition hover:text-gray-500"
            >
              Beneficios
            </a>

          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* CARRITO */}
            <button
              onClick={() =>
                setAbrirCarrito(!abrirCarrito)
              }
              className="rounded-full bg-white px-4 py-2 shadow-sm transition hover:scale-105"
            >

              🛒 {carrito.length}

            </button>

            {/* BOTON MOBILE */}
            <button
              onClick={() =>
                setMenuAbierto(!menuAbierto)
              }
              className="text-3xl md:hidden"
            >

              ☰

            </button>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800 md:block"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </nav>

      {/* MENU MOBILE */}
      {menuAbierto && (

        <div className="fixed top-[76px] left-0 z-30 w-full border-b border-gray-200 bg-[#f7f4ef] p-6 md:hidden">

          <div className="flex flex-col gap-6 text-lg">

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
              className="rounded-full bg-black px-6 py-3 text-center text-white"
            >
              WhatsApp
            </a>

          </div>

        </div>

      )}

      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-32 md:px-6 lg:grid-cols-2 lg:gap-24 lg:py-32"
      >

        {/* TEXTO */}
        <div className="text-center lg:text-left">

          <p className="mb-4 text-xs uppercase tracking-[6px] text-[#b08b57] md:text-sm">

            Glam Gems

          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">

            Joyas que elevan tu estilo

          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg lg:mx-0 lg:text-xl">

            Accesorios elegantes y regalos especiales para cada ocasión.

          </p>

          <a
            href="#catalogo"
            className="inline-block rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800"
          >
            Ver Catálogo
          </a>

        </div>

        {/* IMAGEN */}
        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="Joyas"
            className="h-[420px] w-full max-w-[520px] rounded-[28px] object-cover shadow-2xl md:h-[520px]"
          />

        </div>

      </section>

      {/* CARRITO LATERAL */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full bg-white shadow-2xl transition-transform duration-300 md:w-[380px] ${
          abrirCarrito
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex h-full flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b p-6">

            <h2 className="text-2xl font-bold md:text-3xl">
              Carrito
            </h2>

            <button
              onClick={() =>
                setAbrirCarrito(false)
              }
              className="text-2xl"
            >
              ✕
            </button>

          </div>

          {/* PRODUCTOS */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">

            {carrito.length === 0 ? (

              <p className="text-gray-500">
                Tu carrito está vacío
              </p>

            ) : (

              carrito.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 p-4"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.nombre}
                      </h3>

                      <p className="text-gray-500">
                        Q{item.precio}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      eliminarDelCarrito(index)
                    }
                    className="mt-4 text-sm text-red-500"
                  >
                    Eliminar
                  </button>

                </div>

              ))

            )}

          </div>

          {/* FOOTER */}
          <div className="space-y-4 border-t p-6">

            <div className="flex items-center justify-between text-lg font-bold md:text-xl">

              <span>Total</span>

              <span>Q{total}</span>

            </div>

            <a
              href={`https://wa.me/50252914227?text=${encodeURIComponent(
                carrito
                  .map(
                    (item) =>
                      `${item.nombre} - Q${item.precio}`
                  )
                  .join("\n")
              )}`}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl bg-black p-4 text-center text-white transition hover:bg-gray-800"
            >
              Finalizar Pedido
            </a>

          </div>

        </div>

      </div>

      {/* PRODUCTOS */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32"
      >

        {/* TITULO */}
        <div className="mb-14 text-center md:mb-16">

          <p className="mb-4 text-xs uppercase tracking-[6px] text-[#b08b57] md:text-sm">

            Catálogo

          </p>

          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">

            Productos Destacados

          </h2>

        </div>

        {/* FILTROS */}
        <div className="mb-14 flex flex-wrap justify-center gap-3 md:mb-16 md:gap-4">

          {categorias.map((categoria) => (

            <button
              key={categoria}
              onClick={() =>
                setCategoriaActiva(categoria)
              }
              className={`rounded-full px-5 py-3 text-sm transition md:px-6 ${
                categoriaActiva === categoria
                  ? "bg-black text-white"
                  : "bg-white shadow-sm hover:bg-gray-100"
              }`}
            >
              {categoria}
            </button>

          ))}

        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* IMAGEN */}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-[320px] w-full object-cover md:h-[360px]"
              />

              {/* INFO */}
              <div className="space-y-5 p-6 md:space-y-6 md:p-7">

                <div>

                  <h3 className="mb-3 text-2xl font-semibold md:text-3xl">

                    {producto.nombre}

                  </h3>

                  <p className="leading-relaxed text-gray-500">

                    {producto.descripcion ||
                      "Joya elegante y sofisticada"}

                  </p>

                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between gap-4">

                  <span className="text-3xl font-bold md:text-4xl">

                    Q{producto.precio}

                  </span>

                  <button
                    onClick={() =>
                      agregarAlCarrito(producto)
                    }
                    className="rounded-full bg-black px-5 py-3 text-sm text-white transition hover:bg-gray-800 md:px-6"
                  >
                    Agregar
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
        className="bg-white py-20 md:py-32"
      >

        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:gap-12 md:px-6">

          {/* ITEM */}
          <div className="rounded-[28px] bg-[#f7f4ef] p-8 shadow-sm md:p-10">

            <h3 className="mb-5 text-2xl font-semibold md:text-3xl">

              Calidad Premium

            </h3>

            <p className="leading-relaxed text-gray-600">

              Joyas seleccionadas cuidadosamente para resaltar tu estilo.

            </p>

          </div>

          {/* ITEM */}
          <div className="rounded-[28px] bg-[#f7f4ef] p-8 shadow-sm md:p-10">

            <h3 className="mb-5 text-2xl font-semibold md:text-3xl">

              Envíos

            </h3>

            <p className="leading-relaxed text-gray-600">

              Entregas rápidas y seguras.

            </p>

          </div>

          {/* ITEM */}
          <div className="rounded-[28px] bg-[#f7f4ef] p-8 shadow-sm md:p-10">

            <h3 className="mb-5 text-2xl font-semibold md:text-3xl">

              Atención Personalizada

            </h3>

            <p className="leading-relaxed text-gray-600">

              Te ayudamos a elegir el regalo perfecto.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-20 bg-black py-16 text-center text-white md:mt-24 md:py-20">

        <h2 className="mb-4 text-4xl font-bold md:text-5xl">

          Glam Gems

        </h2>

        <p className="mb-4 text-base text-gray-400 md:text-lg">

          Joyas y regalos especiales

        </p>

        <p className="text-sm text-gray-500">

          © 2026 Glam Gems

        </p>

      </footer>

    </div>

  );
}
