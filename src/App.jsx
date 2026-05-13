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
    <div>

      {/* HERO */}
      <section className="h-screen bg-[#f8f5f2] flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="uppercase tracking-[6px] text-sm text-gray-500 mb-4">
              Glam Gems
            </p>

            <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
              Joyas que elevan tu estilo
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              Accesorios elegantes y regalos especiales para cada ocasión.
            </p>

            <a
              href="https://wa.me/50200000000"
              target="_blank"
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition"
            >
              Comprar por WhatsApp
            </a>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              alt="joyas"
              className="rounded-3xl shadow-2xl h-[600px] w-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <p className="uppercase tracking-[5px] text-gray-500 text-sm mb-3">
              Catálogo
            </p>

            <h2 className="text-5xl font-semibold">
              Productos Destacados
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            {productos.map((producto) => (

              <div
                key={producto.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
              >

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-80 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                <div className="p-6">

                  <h3 className="text-2xl font-semibold mb-2">
                    {producto.nombre}
                  </h3>

                  <p className="text-gray-500 mb-4">
                    {producto.descripcion}
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="text-2xl font-bold">
                      Q{producto.precio}
                    </span>

                    <a
                      href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${producto.nombre}`}
                      target="_blank"
                      className="bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition"
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
      <section className="py-24 bg-white px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Calidad Premium
            </h3>

            <p className="text-gray-600">
              Joyas seleccionadas cuidadosamente para resaltar tu estilo.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Envíos
            </h3>

            <p className="text-gray-600">
              Entregas rápidas y seguras.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Atención Personalizada
            </h3>

            <p className="text-gray-600">
              Te ayudamos a elegir el regalo perfecto.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 text-center">

        <h2 className="text-3xl font-semibold mb-4">
          Glam Gems
        </h2>

        <p className="text-gray-400 mb-4">
          Joyas y regalos especiales
        </p>

        <p className="text-gray-500">
          © 2026 Glam Gems
        </p>

      </footer>

    </div>
  );
}