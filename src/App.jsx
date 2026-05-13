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
    <div className="bg-[#f8f5f2] min-h-screen">

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">

  <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">

    {/* TEXTO */}
    <div className="max-w-xl">

      <p className="uppercase tracking-[6px] text-sm text-gray-500 mb-4">
        Glam Gems
      </p>

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight mb-6">
        Joyas que elevan tu estilo
      </h1>

      <p className="text-gray-600 text-lg mb-8">
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
        className="w-full max-w-[550px] h-[350px] md:h-[650px] object-cover rounded-3xl shadow-2xl"
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

            <h2 className="text-4xl md:text-6xl font-semibold">
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

                {/* IMAGEN PRODUCTO */}
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

                  <h3 className="text-xl font-semibold mb-2">
                    {producto.nombre}
                  </h3>

                  <p className="text-gray-500 text-sm mb-5 min-h-[40px]">
                    {producto.descripcion || "Joya elegante y sofisticada"}
                  </p>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-xl font-bold">
                      Q{producto.precio}
                    </span>

                    <a
                      href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar%20${producto.nombre}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition text-sm whitespace-nowrap"
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
      <section className="bg-white py-24 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

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
      <footer className="bg-black text-white py-12 text-center">

        <h2 className="text-3xl font-semibold mb-3">
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