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

console.log(productos);

return (
    <div className="min-h-screen bg-[#f8f5f2]">

      {/* NAVBAR */}
      <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800">
  Comprar
</button>

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 items-center px-6 md:px-20 py-16 md:py-20 gap-12">

        <div>
          <p className="uppercase tracking-[4px] text-gray-500 mb-4">
            Joyas exclusivas
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Elegancia que resalta tu esencia
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Descubre joyas y regalos diseñados para momentos especiales.
            Elegancia, delicadeza y detalles que enamoran.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-black text-white px-7 py-3 rounded-full hover:bg-gray-800">
              Ver catálogo
            </button>

            <button className="border border-black px-7 py-3 rounded-full hover:bg-black hover:text-white transition">
              Contactar
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop"
            alt="Joyas"
            className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
          />
        </div>

      </section>

      {/* CATEGORÍAS */}
      <section className="px-8 md:px-20 py-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition cursor-pointer">
            <h3 className="text-2xl font-semibold text-gray-800">
              Collares
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition cursor-pointer">
            <h3 className="text-2xl font-semibold text-gray-800">
              Pulseras
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition cursor-pointer">
            <h3 className="text-2xl font-semibold text-gray-800">
              Anillos
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition cursor-pointer">
            <h3 className="text-2xl font-semibold text-gray-800">
              Regalos
            </h3>
          </div>

        </div>

      </section>
      {/* PRODUCTOS DESTACADOS */}
      <section className="px-8 md:px-20 py-20">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-gray-500 mb-3">
            Colección
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            Productos Destacados
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition"
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
                <h3 className="text-2xl font-semibold text-gray-800">
                  {producto.nombre}
                </h3>

                <p className="text-gray-500 mt-2">
                  {producto.descripcion}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-xl font-bold text-black">
                    {producto.precio}
                  </span>
                  <a
  href={`https://wa.me/50252914227?text=Hola,%20quiero%20comprar:%20${producto.nombre}%20-%20${producto.precio}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800"
>
  Comprar
</a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* BOTÓN WHATSAPP */}
      <a
        href="https://wa.me/50252914227"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-current"
        >
          <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.82.736 5.57 2.135 7.992L0 32l7.84-2.058a15.932 15.932 0 0 0 8.16 2.24h.006c8.836 0 16-7.164 16-16S24.842.396 16.006.396H16zm0 29.08a13.29 13.29 0 0 1-6.77-1.85l-.485-.288-4.65 1.22 1.24-4.53-.315-.466a13.272 13.272 0 0 1-2.05-7.166c0-7.32 5.96-13.28 13.29-13.28 3.544 0 6.876 1.38 9.38 3.886a13.174 13.174 0 0 1 3.89 9.39c-.004 7.324-5.964 13.284-13.28 13.284z"/>
        </svg>
      </a>

    </div>
  )
}