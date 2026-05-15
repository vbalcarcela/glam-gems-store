import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));

      const productosFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(productosFirebase);
    };

    obtenerProductos();
  }, []);

  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter(
          (producto) => producto.categoria === categoriaActiva
        );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f5f2] text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-[#f8f5f2]/90 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <h1 className="text-3xl font-bold tracking-wide">
            Glam Gems
          </h1>

          {/* MENU */}
          <div className="hidden items-center gap-10 text-sm font-medium md:flex">

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

          {/* BOTON */}
          <a
            href="https://wa.me/50252914227"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-800"
          >
            WhatsApp
          </a>

        </div>

      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="px-6 pb-40 pt-44"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-24 lg:grid-cols-2">

          {/* TEXTO */}
          <div className="max-w-2xl">

            <p className="mb-6 text-sm uppercase tracking-[6px] text-gray-500">
              Glam Gems
            </p>

            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Joyas que elevan tu estilo
            </h1>

            <p className="mb-10 text-xl leading-relaxed text-gray-600">
              Accesorios elegantes y regalos especiales para cada ocasión.
            </p>

            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-black px-10 py-4 text-lg text-white transition hover:bg-gray-800"
            >
              Comprar por WhatsApp
            </a>

          </div>

          {/* IMAGEN */}
          <div className="flex justify-center lg:justify-end">

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              alt="Joyas elegantes"
              className="h-[620px] w-full max-w-[560px] rounded-[36px] object-cover shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section
        id="catalogo"
        className="px-6 py-36"
      >

        <div className="mx-auto max-w-7xl">

          {/* TITULO */}
          <div className="mb-20 text-center">

            <p className="mb-4 text-sm uppercase tracking-[6px] text-gray-500">
              Catálogo
            </p>

            <h2 className="text-5xl font-bold md:text-7xl">
              Productos Destacados
            </h2>

          </div>

          {/* FILTROS */}
          <div className="mb-20 flex flex-wrap justify-center gap-4">

            {categorias.map((categoria) => (

              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                  categoriaActiva === categoria
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {categoria}
              </button>

            ))}

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">

            {productosFiltrados.map((producto) => (

              <div
                key={producto.id}
                className="flex h-full flex-col overflow-hidden rounded-[30px] bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* IMAGEN */}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-72 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* CONTENIDO */}
                <div className="flex h-full flex-col p-8 pb-10">

                  {/* NOMBRE */}
                  <h3 className="mb-3 text-2xl font-semibold">
                    {producto.nombre}
                  </h3>

                  {/* DESCRIPCION */}
                  <p className="mb-6 min-h-[60px] text-base leading-relaxed text-gray-500">
                    {producto.descripcion ||
                      "Joya elegante y sofisticada"}
                  </p>

                  {/* PRECIO + BOTON */}
                  <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                    <span className="text-3xl font-bold">
                      Q{producto.precio}
                    </span>

                    <a
                      href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${encodeURIComponent(
                        producto.nombre
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full rounded-full bg-black px-5 py-3 text-center text-sm text-white transition hover:bg-gray-800 sm:w-auto"
                    >
                      Comprar
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="bg-white px-6 py-32"
      >

        <div className="mx-auto grid max-w-6xl gap-20 text-center md:grid-cols-3">

          {/* BENEFICIO 1 */}
          <div className="px-4">

            <h3 className="mb-6 text-3xl font-semibold">
              Calidad Premium
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              Joyas seleccionadas cuidadosamente para resaltar tu estilo.
            </p>

          </div>

          {/* BENEFICIO 2 */}
          <div className="px-4">

            <h3 className="mb-6 text-3xl font-semibold">
              Envíos
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              Entregas rápidas y seguras.
            </p>

          </div>

          {/* BENEFICIO 3 */}
          <div className="px-4">

            <h3 className="mb-6 text-3xl font-semibold">
              Atención Personalizada
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              Te ayudamos a elegir el regalo perfecto.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black px-6 py-20 text-center text-white">

        <h2 className="mb-5 text-5xl font-bold">
          Glam Gems
        </h2>

        <p className="mb-4 text-xl text-gray-400">
          Joyas y regalos especiales
        </p>

        <p className="text-sm text-gray-500">
          © 2026 Glam Gems
        </p>

      </footer>

    </div>
  );
}
