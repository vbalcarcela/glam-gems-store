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
    <div className="bg-[#f8f5f2] text-black overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#f8f5f2]/90 backdrop-blur-md border-b border-gray-200 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-bold tracking-wide">
            Glam Gems
          </h1>

          <div className="hidden md:flex gap-8 text-sm font-medium">

            <a href="#inicio" className="hover:text-gray-500 transition">
              Inicio
            </a>

            <a href="#catalogo" className="hover:text-gray-500 transition">
              Catálogo
            </a>

            <a href="#beneficios" className="hover:text-gray-500 transition">
              Beneficios
            </a>

          </div>

          <a
            href="https://wa.me/50252914227"
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
          >
            WhatsApp
          </a>

        </div>

      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="pt-32 pb-20 px-6"
      >

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* TEXTO */}
          <div>

            <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-4">
              Glam Gems
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Joyas que elevan tu estilo
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Accesorios elegantes y regalos especiales para cada ocasión.
            </p>

            <a
              href="https://wa.me/50252914227"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition"
            >
              Comprar por WhatsApp
            </a>

          </div>

          {/* IMAGEN */}
          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              alt="joyas"
              className="w-full max-w-[520px] h-[500px] object-cover rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section
        id="catalogo"
        className="py-20 px-6"
      >

        <div className="max-w-7xl mx-auto">

          {/* TITULO */}
          <div className="text-center mb-16">

            <p className="uppercase tracking-[5px] text-gray-500 text-sm mb-3">
              Catálogo
            </p>

            <h2 className="text-4xl md:text-6xl font-bold">
              Productos Destacados
            </h2>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {productos.map((producto) => (

              <div
                key={producto.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
              >

                {/* IMAGEN */}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* INFO */}
                <div className="p-6">

                  <h3 className="text-2xl font-semibold mb-2">
                    {producto.nombre}
                  </h3>

                  <p className="text-gray-500 mb-6">
                    {producto.descripcion || "Joya elegante y sofisticada"}
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="text-2xl font-bold">
                      Q{producto.precio}
                    </span>

                    <a
                      href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${producto.nombre}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition text-sm"
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
        className="bg-white py-20 px-6 mt-10"
      >

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

          <div>

            <h3 className="text-3xl font-semibold mb-4">
              Calidad Premium
            </h3>

            <p className="text-gray-600">
              Joyas seleccionadas cuidadosamente para resaltar tu estilo.
            </p>

          </div>

          <div>

            <h3 className="text-3xl font-semibold mb-4">
              Envíos
            </h3>

            <p className="text-gray-600">
              Entregas rápidas y seguras.
            </p>

          </div>

          <div>

            <h3 className="text-3xl font-semibold mb-4">
              Atención Personalizada
            </h3>

            <p className="text-gray-600">
              Te ayudamos a elegir el regalo perfecto.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 text-center">

        <h2 className="text-3xl font-bold mb-3">
          Glam Gems
        </h2>

        <p className="text-gray-400 mb-2">
          Joyas y regalos especiales
        </p>

        <p className="text-gray-500 text-sm">
          © 2026 Glam Gems
        </p>

      </footer>

    </div>
  );
}

