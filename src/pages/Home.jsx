import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Home() {

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");

  // OBTENER PRODUCTOS
  useEffect(() => {

    const obtenerProductos = async () => {

      const querySnapshot = await getDocs(
        collection(db, "productos")
      );

      const productosFirebase =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setProductos(productosFirebase);

    };

    obtenerProductos();

  }, []);

  // AGREGAR AL CARRITO
  const agregarCarrito = (producto) => {

    setCarrito([...carrito, producto]);

  };

  // ELIMINAR
  const eliminarProducto = (index) => {

    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(index, 1);

    setCarrito(nuevoCarrito);

  };

  // TOTAL
  const total = carrito.reduce(
    (acc, item) => acc + item.precio,
    0
  );

  // FINALIZAR PEDIDO
  const finalizarPedido = async () => {

    if (carrito.length === 0) {

      alert("Tu carrito está vacío");

      return;

    }

    try {

      await addDoc(collection(db, "ordenes"), {

        productos: carrito,
        total,
        estado: "pendiente",
        fecha: new Date(),

      });

      alert("Pedido realizado");

      setCarrito([]);

    } catch (error) {

      console.log(error);

      alert("Error al finalizar pedido");

    }

  };

  // FILTRAR PRODUCTOS
  const productosFiltrados = productos.filter((producto) => {

    const coincideBusqueda =
      producto.nombre
        ?.toLowerCase()
        .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "todos" ||
      producto.categoria === categoria;

    return (
      coincideBusqueda &&
      coincideCategoria
    );

  });

  return (

    <div className="min-h-screen bg-[#f7f4ef] text-black">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#f7f4ef]/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <h1 className="text-3xl font-black">
            Glam Gems
          </h1>

          <nav className="hidden gap-10 md:flex">

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

          </nav>

          <div className="flex items-center gap-4">

            <div className="rounded-full border border-black px-4 py-2 text-sm font-semibold">

              🛒 {carrito.length}

            </div>

            <a
              href="https://wa.me/50200000000"
              target="_blank"
              className="rounded-full bg-black px-5 py-2 text-white transition hover:bg-gray-800"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2"
      >

        <div>

          <p className="mb-4 tracking-[8px] text-[#b68b4c]">
            GLAM GEMS
          </p>

          <h2 className="mb-6 text-5xl font-black leading-tight md:text-7xl">

            Joyas que elevan tu estilo

          </h2>

          <p className="mb-8 max-w-xl text-xl text-gray-600">

            Accesorios elegantes y regalos especiales
            para cada ocasión.

          </p>

          <a
            href="#catalogo"
            className="rounded-full bg-black px-8 py-4 text-lg text-white transition hover:bg-gray-800"
          >
            Ver Catálogo
          </a>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
            alt="joyas"
            className="h-[650px] w-full rounded-[40px] object-cover shadow-2xl"
          />

        </div>

      </section>

      {/* CARRITO */}
      <section className="mx-auto mb-20 max-w-7xl px-6">

        <div className="rounded-[35px] bg-white p-8 shadow-xl">

          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-4xl font-black">
              Carrito
            </h3>

            <span className="text-3xl font-black">
              Q{total}
            </span>

          </div>

          {carrito.length === 0 ? (

            <p className="text-lg text-gray-500">
              Tu carrito está vacío
            </p>

          ) : (

            <div className="space-y-4">

              {carrito.map((producto, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 p-5"
                >

                  <div>

                    <h4 className="text-xl font-bold">
                      {producto.nombre}
                    </h4>

                    <p className="text-gray-500">
                      Q{producto.precio}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      eliminarProducto(index)
                    }
                    className="text-red-500 transition hover:text-red-700"
                  >
                    Eliminar
                  </button>

                </div>

              ))}

              <button
                onClick={finalizarPedido}
                className="mt-6 w-full rounded-2xl bg-black p-5 text-lg text-white transition hover:bg-gray-800"
              >
                Finalizar Pedido
              </button>

            </div>

          )}

        </div>

      </section>

      {/* CATÁLOGO */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-6 pb-24"
      >

        <div className="mb-16 text-center">

          <p className="mb-4 tracking-[8px] text-[#b68b4c]">
            CATÁLOGO
          </p>

          <h2 className="text-5xl font-black">
            Productos Destacados
          </h2>

        </div>

        {/* FILTROS */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none md:max-w-md"
          />

          <div className="flex flex-wrap gap-4">

            {[
              "todos",
              "collares",
              "anillos",
              "aretes",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setCategoria(item)}
                className={`rounded-full px-6 py-3 capitalize transition ${
                  categoria === item
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* PRODUCTOS */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="overflow-hidden rounded-[35px] bg-white shadow-lg transition hover:-translate-y-2"
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-[340px] w-full object-cover"
              />

              <div className="p-7">

                <h3 className="mb-3 text-3xl font-black">
                  {producto.nombre}
                </h3>

                <p className="mb-6 text-gray-600">
                  {producto.descripcion}
                </p>

                <div className="flex items-center justify-between">

                  <span className="text-3xl font-black">
                    Q{producto.precio}
                  </span>

                  <button
                    onClick={() =>
                      agregarCarrito(producto)
                    }
                    className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                  >
                    Comprar
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
        className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-3"
      >

        <div className="rounded-[35px] bg-white p-10 shadow-lg">

          <h3 className="mb-4 text-3xl font-black">
            Calidad Premium
          </h3>

          <p className="text-gray-600">
            Joyas seleccionadas cuidadosamente para
            resaltar tu estilo.
          </p>

        </div>

        <div className="rounded-[35px] bg-white p-10 shadow-lg">

          <h3 className="mb-4 text-3xl font-black">
            Envíos
          </h3>

          <p className="text-gray-600">
            Entregas rápidas y seguras.
          </p>

        </div>

        <div className="rounded-[35px] bg-white p-10 shadow-lg">

          <h3 className="mb-4 text-3xl font-black">
            Atención Personalizada
          </h3>

          <p className="text-gray-600">
            Te ayudamos a elegir el regalo perfecto.
          </p>

        </div>

      </section>

    </div>

  );

}
