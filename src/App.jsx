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
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3ef] text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-[#e7e2dc] bg-[#f7f3ef]/90 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <h1 className="text-4xl font-semibold tracking-tight">
            Glam Gems
          </h1>

          {/* MENU */}
          <div className="hidden items-center gap-12 text-base font-medium md:flex">

            <a
              href="#inicio"
              className="border-b-2 border-black pb-1"
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
            className="rounded-full bg-black px-7 py-3 text-sm text-white transition hover:scale-105"
          >
            WhatsApp
          </a>

        </div>

      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="px-6 pb-32 pt-40"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* TEXTO */}
          <div className="max-w-xl">

            <p className="mb-6 text-sm uppercase tracking-[8px] text-[#b08b57]">
              Glam Gems
            </p>

            <h1 className="mb-8 text-6xl font-semibold leading-[1.05] md:text-7xl">
              Joyas que elevan tu estilo
            </h1>

            <p className="mb-10 text-2xl leading-relaxed text-gray-600">
              Accesorios elegantes y regalos especiales para cada ocasión.
            </p>

            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-black px-10 py-5 text-lg text-white transition hover:scale-105"
            >
              Comprar por WhatsApp
            </a>

          </div>

          {/* IMAGEN */}
          <div className="flex justify-center lg:justify-end">

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              alt="Joyas"
              className="h-[620px] w-full max-w-[620px] rounded-[40px] object-cover shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section
        id="catalogo"
        className="px-6 py-24"
      >

        <div className="mx-auto max-w-7xl">

          {/* TITULO */}
          <div className="mb-16 text-center">

            <p className="mb-5 text-sm uppercase tracking-[8px] text-[#b08b57]">
              Catálogo
            </p>

            <h2 className="text-6xl font-semibold">
              Productos Destacados
            </h2>

          </div>

          {/* FILTROS */}
          <div className="mb-20 flex flex-wrap justify-center gap-5">

            {categorias.map((categoria) => (

              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`rounded-full border px-8 py-4 text-sm font-medium transition ${
                  categoriaActiva === categoria
                    ? "border-black bg-black text-white"
                    : "border-[#ddd4cb] bg-white hover:bg-[#ece6df]"
                }`}
              >
                {categoria}
              </button>

            ))}

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">

            {productosFiltrados.map((producto) => (

              <div
                key={producto.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* IMAGEN */}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-[340px] w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* CONTENIDO */}
                <div className="flex flex-col gap-6 p-8">

                  {/* NOMBRE */}
                  <h3 className="text-3xl font-semibold">
                    {producto.nombre}
                  </h3>

                  {/* DESCRIPCION */}
                  <p className="min-h-[80px] text-lg leading-relaxed text-gray-500">
                    {producto.descripcion ||
                      "Joya elegante y sofisticada"}
                  </p>

                  {/* PRECIO + BOTON */}
                  <div className="flex items-center justify-between pt-2">

                    <span className="text-4xl font-bold">
                      Q{producto.precio}
                    </span>

                    <a
                      href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${encodeURIComponent(
                        producto.nombre
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-black px-7 py-3 text-sm text-white transition hover:scale-105"
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
        className="px-6 py-28"
      >

        <div className="mx-auto grid max-w-7xl gap-16 border-t border-[#ddd4cb] pt-20 md:grid-cols-3">

          {/* ITEM */}
          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f1ebe4] text-3xl">
              
            </div>

            <div>

              <h3 className="mb-4 text-3xl font-semibold">
                Calidad Premium
              </h3>

              <p className="text-lg leading-relaxed text-gray-600">
                Joyas seleccionadas cuidadosamente para resaltar tu estilo.
              </p>

            </div>

          </div>

          {/* ITEM */}
          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f1ebe4] text-3xl">
              
            </div>

            <div>

              <h3 className="mb-4 text-3xl font-semibold">
                Envíos
              </h3>

              <p className="text-lg leading-relaxed text-gray-600">
                Entregas rápidas y seguras a todo el país.
              </p>

            </div>

          </div>

          {/* ITEM */}
          <div className="flex items-start gap-6">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f1ebe4] text-3xl">
              🎧
            </div>

            <div>

              <h3 className="mb-4 text-3xl font-semibold">
                Atención Personalizada
              </h3>

              <p className="text-lg leading-relaxed text-gray-600">
                Te ayudamos a elegir el regalo perfecto.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black px-6 py-20 text-center text-white">

        <h2 className="mb-6 text-6xl font-semibold">
          Glam Gems
        </h2>

        <p className="mb-6 text-2xl text-gray-300">
          Joyas y regalos especiales 
        </p>

        <p className="text-lg text-gray-500">
          © 2026 Glam Gems. Todos los derechos reservados.
        </p>

      </footer>

    </div>
  );
}
