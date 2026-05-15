import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [productos, setProductos] = useState([]);

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

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-black overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-[#f8f5f2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <h1 className="text-2xl font-bold tracking-wide md:text-3xl">
            Glam Gems
          </h1>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#inicio" className="transition hover:text-gray-500">
              Inicio
            </a>
            <a href="#catalogo" className="transition hover:text-gray-500">
              Catálogo
            </a>
            <a href="#beneficios" className="transition hover:text-gray-500">
              Beneficios
            </a>
          </div>

          <a
            href="https://wa.me/50252914227"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black px-5 py-2.5 text-sm text-white transition hover:bg-gray-800"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" className="px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm uppercase tracking-[5px] text-gray-500">
              Glam Gems
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Joyas que elevan tu estilo
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Accesorios elegantes y regalos especiales para cada ocasión.
            </p>

            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-black px-8 py-4 text-base text-white transition hover:bg-gray-800 md:text-lg"
            >
              Comprar por WhatsApp
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              alt="Joyas elegantes"
              className="h-[420px] w-full max-w-[560px] rounded-[28px] object-cover shadow-2xl md:h-[560px]"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="catalogo" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center md:mb-18">
            <p className="mb-4 text-sm uppercase tracking-[5px] text-gray-500">
              Catálogo
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
              Productos Destacados
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="overflow-hidden rounded-[26px] bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-72 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                <div className="space-y-5 p-6 md:p-7">
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold">
                      {producto.nombre}
                    </h3>

                    <p className="min-h-[64px] text-base leading-relaxed text-gray-500">
                      {producto.descripcion || "Joya elegante y sofisticada"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-2xl font-bold">
                      Q{producto.precio}
                    </span>

                    <a
                      href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${encodeURIComponent(
                        producto.nombre
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-black px-6 py-3 text-center text-sm text-white transition hover:bg-gray-800"
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
      <section id="beneficios" className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-3 md:gap-12">
          <div className="px-4">
            <h3 className="mb-4 text-2xl font-semibold md:text-3xl">
              Calidad Premium
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              Joyas seleccionadas cuidadosamente para resaltar tu estilo.
            </p>
          </div>

          <div className="px-4">
            <h3 className="mb-4 text-2xl font-semibold md:text-3xl">
              Envíos
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              Entregas rápidas y seguras.
            </p>
          </div>

          <div className="px-4">
            <h3 className="mb-4 text-2xl font-semibold md:text-3xl">
              Atención Personalizada
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              Te ayudamos a elegir el regalo perfecto.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 py-14 text-center text-white">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">Glam Gems</h2>

        <p className="mb-4 text-lg text-gray-400">
          Joyas y regalos especiales
        </p>

        <p className="text-sm text-gray-500">© 2026 Glam Gems</p>
      </footer>
    </div>
  );
}
