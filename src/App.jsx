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
    <div className="bg-[#f7f4ef] text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-[#f7f4ef]/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold">
            Glam Gems
          </h1>

          <div className="hidden items-center gap-8 md:flex">

            <a href="#inicio" className="text-sm hover:text-gray-500">
              Inicio
            </a>

            <a href="#catalogo" className="text-sm hover:text-gray-500">
              Catálogo
            </a>

            <a href="#beneficios" className="text-sm hover:text-gray-500">
              Beneficios
            </a>

          </div>

          <a
            href="https://wa.me/50252914227"
            className="rounded-full bg-black px-5 py-2 text-sm text-white"
          >
            WhatsApp
          </a>

        </div>

      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-36 lg:grid-cols-2"
      >

        {/* TEXTO */}
        <div>

          <p className="mb-4 text-xs uppercase tracking-[5px] text-[#b08b57]">
            Glam Gems
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
            Joyas que elevan tu estilo
          </h1>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600">
            Accesorios elegantes y regalos especiales para cada ocasión.
          </p>

          <a
            href="https://wa.me/50252914227"
            className="inline-block rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800"
          >
            Comprar por WhatsApp
          </a>

        </div>

        {/* IMAGEN */}
        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="Joyas"
            className="h-[500px] w-full max-w-[500px] rounded-[30px] object-cover shadow-xl"
          />

        </div>

      </section>

      {/* PRODUCTOS */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-6 py-20"
      >

        {/* TITULO */}
        <div className="mb-14 text-center">

          <p className="mb-3 text-xs uppercase tracking-[5px] text-[#b08b57]">
            Catálogo
          </p>

          <h2 className="text-5xl font-bold">
            Productos Destacados
          </h2>

        </div>

        {/* FILTROS */}
        <div className="mb-14 flex flex-wrap justify-center gap-3">

          {categorias.map((categoria) => (

            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                categoriaActiva === categoria
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {categoria}
            </button>

          ))}

        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="overflow-hidden rounded-[24px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGEN */}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-[320px] w-full object-cover"
              />

              {/* INFO */}
              <div className="space-y-5 p-6">

                <div>

                  <h3 className="mb-2 text-2xl font-semibold">
                    {producto.nombre}
                  </h3>

                  <p className="text-gray-500">
                    {producto.descripcion ||
                      "Joya elegante y sofisticada"}
                  </p>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-3xl font-bold">
                    Q{producto.precio}
                  </span>

                  <a
                    href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${encodeURIComponent(
                      producto.nombre
                    )}`}
                    className="rounded-full bg-black px-5 py-2 text-sm text-white"
                  >
                    Comprar
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="bg-white py-20"
      >

        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">

          <div className="rounded-[24px] bg-[#f7f4ef] p-8">

            <h3 className="mb-4 text-2xl font-semibold">
              Calidad Premium
            </h3>

            <p className="leading-relaxed text-gray-600">
              Joyas seleccionadas cuidadosamente para resaltar tu estilo.
            </p>

          </div>

          <div className="rounded-[24px] bg-[#f7f4ef] p-8">

            <h3 className="mb-4 text-2xl font-semibold">
              Envíos
            </h3>

            <p className="leading-relaxed text-gray-600">
              Entregas rápidas y seguras.
            </p>

          </div>

          <div className="rounded-[24px] bg-[#f7f4ef] p-8">

            <h3 className="mb-4 text-2xl font-semibold">
              Atención Personalizada
            </h3>

            <p className="leading-relaxed text-gray-600">
              Te ayudamos a elegir el regalo perfecto.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black py-14 text-center text-white">

        <h2 className="mb-3 text-4xl font-bold">
          Glam Gems
        </h2>

        <p className="mb-4 text-gray-400">
          Joyas y regalos especiales
        </p>

        <p className="text-sm text-gray-500">
          © 2026 Glam Gems
        </p>

      </footer>

    </div>
  );
}
