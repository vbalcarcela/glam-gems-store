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

  // FILTRAR PRODUCTOS
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

  // ELIMINAR
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

    <div className="min-h-screen bg-[#f7f4ef] text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-[#f7f4ef]/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <h1 className="text-3xl font-bold">
            Glam Gems
          </h1>

          {/* LINKS */}
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
          <div className="flex items-center gap-4">

            {/* CARRITO ICON */}
            <div className="rounded-full bg-white px-5 py-2 shadow-sm">

              🛒 {carrito.length}

            </div>

            {/* BOTÓN */}
            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-7xl items-center gap-24 px-6 py-32 lg:grid-cols-2"
      >

        {/* TEXTO */}
        <div>

          <p className="mb-4 text-sm uppercase tracking-[6px] text-[#b08b57]">
            Glam Gems
          </p>

          <h1 className="mb-8 text-6xl font-bold leading-tight">

            Joyas que elevan tu estilo

          </h1>

          <p className="mb-10 max-w-xl text-xl leading-relaxed text-gray-600">

            Accesorios elegantes y regalos especiales para cada ocasión.

          </p>

          <a
            href="#catalogo"
            className="rounded-full bg-black px-8 py-4 text-lg text-white transition hover:bg-gray-800"
          >
            Ver Catálogo
          </a>

        </div>

        {/* IMAGEN */}
        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="Joyas"
            className="h-[600px] w-full max-w-[550px] rounded-[32px] object-cover shadow-2xl"
          />

        </div>

      </section>

      {/* CARRITO */}
      <section className="mx-auto mb-32 max-w-7xl px-6">

        <div className="rounded-[28px] bg-white p-8 shadow-md">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-4xl font-bold">

              Carrito

            </h2>

            <span className="text-2xl font-semibold">

              Total: Q{total}

            </span>

          </div>

          {carrito.length === 0 ? (

            <p className="text-lg text-gray-500">

              Tu carrito está vacío

            </p>

          ) : (

            <div className="space-y-5">

              {carrito.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 p-5"
                >

                  <div>

                    <h3 className="text-xl font-semibold">

                      {item.nombre}

                    </h3>

                    <p className="mt-1 text-gray-500">

                      Q{item.precio}

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      eliminarDelCarrito(index)
                    }
                    className="text-red-500 transition hover:text-red-700"
                  >
                    Eliminar
                  </button>

                </div>

              ))}

              {/* FINALIZAR */}
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
                className="block rounded-2xl bg-black p-5 text-center text-lg text-white transition hover:bg-gray-800"
              >
                Finalizar Pedido
              </a>

            </div>

          )}

        </div>

      </section>

      {/* PRODUCTOS */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-6 py-32"
      >

        {/* TITULO */}
        <div className="mb-16 text-center">

          <p className="mb-4 text-sm uppercase tracking-[6px] text-[#b08b57]">

            Catálogo

          </p>

          <h2 className="text-6xl font-bold">

            Productos Destacados

          </h2>

        </div>

        {/* FILTROS */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">

          {categorias.map((categoria) => (

            <button
              key={categoria}
              onClick={() =>
                setCategoriaActiva(categoria)
              }
              className={`rounded-full px-6 py-3 transition ${
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
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* IMAGEN */}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-[360px] w-full object-cover"
              />

              {/* INFO */}
              <div className="space-y-6 p-7">

                <div>

                  <h3 className="mb-3 text-3xl font-semibold">

                    {producto.nombre}

                  </h3>

                  <p className="leading-relaxed text-gray-500">

                    {producto.descripcion ||
                      "Joya elegante y sofisticada"}

                  </p>

                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between">

                  <span className="text-4xl font-bold">

                    Q{producto.precio}

                  </span>

                  <button
                    onClick={() =>
                      agregarAlCarrito(producto)
                    }
                    className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
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
        className="bg-white py-32"
      >

        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">

          {/* ITEM */}
          <div className="rounded-[28px] bg-[#f7f4ef] p-10 shadow-sm">

            <h3 className="mb-5 text-3xl font-semibold">

              Calidad Premium

            </h3>

            <p className="leading-relaxed text-gray-600">

              Joyas seleccionadas cuidadosamente para resaltar tu estilo.

            </p>

          </div>

          {/* ITEM */}
          <div className="rounded-[28px] bg-[#f7f4ef] p-10 shadow-sm">

            <h3 className="mb-5 text-3xl font-semibold">

              Envíos

            </h3>

            <p className="leading-relaxed text-gray-600">

              Entregas rápidas y seguras.

            </p>

          </div>

          {/* ITEM */}
          <div className="rounded-[28px] bg-[#f7f4ef] p-10 shadow-sm">

            <h3 className="mb-5 text-3xl font-semibold">

              Atención Personalizada

            </h3>

            <p className="leading-relaxed text-gray-600">

              Te ayudamos a elegir el regalo perfecto.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-24 bg-black py-20 text-center text-white">

        <h2 className="mb-4 text-5xl font-bold">

          Glam Gems

        </h2>

        <p className="mb-4 text-lg text-gray-400">

          Joyas y regalos especiales

        </p>

        <p className="text-sm text-gray-500">

          © 2026 Glam Gems

        </p>

      </footer>

    </div>

  );
}


