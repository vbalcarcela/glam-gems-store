import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";

import { auth, db } from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();

  // PRODUCTOS
  const [productos, setProductos] =
    useState([]);

  // ORDENES
  const [ordenes, setOrdenes] =
    useState([]);

  // FORM
  const [nombre, setNombre] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [imagen, setImagen] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  // CLOUDINARY
  const [subiendoImagen, setSubiendoImagen] =
    useState(false);

  // EDITAR
  const [editandoId, setEditandoId] =
    useState(null);

  // OBTENER DATOS
  useEffect(() => {

    obtenerProductos();

    obtenerOrdenes();

  }, []);

  // PRODUCTOS
  const obtenerProductos = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "productos")
        );

      const productosFirebase =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setProductos(productosFirebase);

    } catch (error) {

      console.log(error);

    }

  };

  // ORDENES
  const obtenerOrdenes = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "ordenes")
        );

      const ordenesFirebase =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setOrdenes(ordenesFirebase);

    } catch (error) {

      console.log(error);

    }

  };

  // CAMBIAR ESTADO ORDEN
  const cambiarEstadoOrden = async (
    id,
    nuevoEstado
  ) => {

    try {

      await updateDoc(
        doc(db, "ordenes", id),
        {
          estado: nuevoEstado,
        }
      );

      setOrdenes(

        ordenes.map((orden) =>

          orden.id === id
            ? {
                ...orden,
                estado: nuevoEstado,
              }
            : orden

        )

      );

    } catch (error) {

      console.log(error);

      alert(
        "Error actualizando estado"
      );

    }

  };

  // SUBIR IMAGEN
  const subirImagen = async (file) => {

    if (!file) return;

    setSubiendoImagen(true);

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      "umxjqir5"
    );

    data.append(
      "cloud_name",
      "dvnz9aq8b"
    );

    try {

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvnz9aq8b/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage =
        await res.json();

      setImagen(
        uploadedImage.secure_url
      );

    } catch (error) {

      console.log(error);

      alert("Error subiendo imagen");

    } finally {

      setSubiendoImagen(false);

    }

  };

  // LIMPIAR
  const limpiarFormulario = () => {

    setNombre("");

    setPrecio("");

    setImagen("");

    setDescripcion("");

    setCategoria("");

    setEditandoId(null);

  };

  // GUARDAR PRODUCTO
  const guardarProducto = async (e) => {

    e.preventDefault();

    if (
      !nombre ||
      !precio ||
      !imagen ||
      !descripcion ||
      !categoria
    ) {

      alert("Completa todos los campos");

      return;

    }

    try {

      const productoData = {

        nombre,
        precio,
        imagen,
        descripcion,
        categoria,

      };

      // EDITAR
      if (editandoId) {

        await updateDoc(
          doc(
            db,
            "productos",
            editandoId
          ),
          productoData
        );

        setProductos(

          productos.map((producto) =>

            producto.id === editandoId
              ? {
                  id: editandoId,
                  ...productoData,
                }
              : producto

          )

        );

        alert("Producto actualizado");

      } else {

        // CREAR
        const docRef = await addDoc(
          collection(db, "productos"),
          productoData
        );

        setProductos([
          ...productos,
          {
            id: docRef.id,
            ...productoData,
          },
        ]);

        alert("Producto agregado");

      }

      limpiarFormulario();

    } catch (error) {

      console.log(error);

      alert("Error guardando");

    }

  };

  // EDITAR PRODUCTO
  const editarProducto = (producto) => {

    setNombre(producto.nombre);

    setPrecio(producto.precio);

    setImagen(producto.imagen);

    setDescripcion(
      producto.descripcion
    );

    setCategoria(
      producto.categoria
    );

    setEditandoId(producto.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {

    const confirmar = window.confirm(
      "¿Eliminar producto?"
    );

    if (!confirmar) return;

    try {

      await deleteDoc(
        doc(db, "productos", id)
      );

      setProductos(

        productos.filter(
          (producto) =>
            producto.id !== id
        )

      );

    } catch (error) {

      console.log(error);

      alert("Error eliminando");

    }

  };

  // LOGOUT
  const cerrarSesion = async () => {

    await signOut(auth);

    navigate("/login");

  };

  return (

    <div className="flex min-h-screen bg-[#f7f4ef]">

      {/* SIDEBAR */}
      <aside className="hidden w-[280px] flex-col border-r border-gray-200 bg-white p-8 lg:flex">

        <h1 className="mb-12 text-4xl font-black">

          Glam Gems

        </h1>

        <nav className="flex flex-1 flex-col gap-4">

          <button className="rounded-2xl bg-black px-5 py-4 text-left text-white">

            Dashboard

          </button>

          <button className="rounded-2xl px-5 py-4 text-left transition hover:bg-gray-100">

            Productos

          </button>

          <button className="rounded-2xl px-5 py-4 text-left transition hover:bg-gray-100">

            Órdenes

          </button>

          <button className="rounded-2xl px-5 py-4 text-left transition hover:bg-gray-100">

            Clientes

          </button>

        </nav>

        <button
          onClick={cerrarSesion}
          className="rounded-2xl bg-red-500 px-5 py-4 text-white transition hover:bg-red-600"
        >
          Cerrar sesión
        </button>

      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 lg:p-10">

        {/* HEADER */}
        <div className="mb-10">

          <h2 className="text-5xl font-black">

            Dashboard

          </h2>

          <p className="mt-2 text-gray-500">

            Bienvenido al panel administrativo.

          </p>

        </div>

        {/* STATS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-[32px] bg-white p-8 shadow-lg">

            <p className="mb-3 text-gray-500">

              Ventas

            </p>

            <h3 className="text-4xl font-black">

              Q
              {ordenes.reduce(
                (acc, orden) =>
                  acc +
                  Number(orden.total),
                0
              )}

            </h3>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-lg">

            <p className="mb-3 text-gray-500">

              Productos

            </p>

            <h3 className="text-4xl font-black">

              {productos.length}

            </h3>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-lg">

            <p className="mb-3 text-gray-500">

              Órdenes

            </p>

            <h3 className="text-4xl font-black">

              {ordenes.length}

            </h3>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-lg">

            <p className="mb-3 text-gray-500">

              Clientes

            </p>

            <h3 className="text-4xl font-black">

              {
                new Set(
                  ordenes.map(
                    (o) => o.cliente
                  )
                ).size
              }

            </h3>

          </div>

        </div>

        {/* FORMULARIO */}
        <div className="mt-10 rounded-[32px] bg-white p-8 shadow-lg">

          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-3xl font-black">

              {editandoId
                ? "Editar Producto"
                : "Agregar Producto"}

            </h3>

            {editandoId && (

              <button
                onClick={limpiarFormulario}
                className="rounded-2xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100"
              >
                Cancelar
              </button>

            )}

          </div>

          <form
            onSubmit={guardarProducto}
            className="grid gap-5 md:grid-cols-2"
          >

            {/* NOMBRE */}
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              className="rounded-2xl border border-gray-300 px-5 py-4 outline-none"
            />

            {/* PRECIO */}
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) =>
                setPrecio(e.target.value)
              }
              className="rounded-2xl border border-gray-300 px-5 py-4 outline-none"
            />

            {/* IMAGEN */}
            <div className="md:col-span-2">

              <label className="mb-3 block font-semibold">

                Imagen del producto

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  subirImagen(
                    e.target.files[0]
                  )
                }
                className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4"
              />

              {subiendoImagen && (

                <p className="mt-3 text-sm text-gray-500">

                  Subiendo imagen...

                </p>

              )}

              {imagen && (

                <img
                  src={imagen}
                  alt="preview"
                  className="mt-5 h-40 w-40 rounded-2xl object-cover"
                />

              )}

            </div>

            {/* DESCRIPCION */}
            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
              className="min-h-[140px] rounded-2xl border border-gray-300 px-5 py-4 outline-none md:col-span-2"
            />

            {/* CATEGORIA */}
            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(
                  e.target.value
                )
              }
              className="rounded-2xl border border-gray-300 px-5 py-4 outline-none"
            >

              <option value="">
                Categoría
              </option>

              <option value="collares">
                Collares
              </option>

              <option value="anillos">
                Anillos
              </option>

              <option value="aretes">
                Aretes
              </option>

            </select>

            {/* BOTON */}
            <button
              type="submit"
              className="rounded-2xl bg-black px-5 py-4 text-white transition hover:bg-gray-800"
            >

              {editandoId
                ? "Guardar Cambios"
                : "Guardar Producto"}

            </button>

          </form>

        </div>

        {/* PRODUCTOS */}
        <div className="mt-10 rounded-[32px] bg-white p-8 shadow-lg">

          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-3xl font-black">

              Productos

            </h3>

            <span className="text-gray-500">

              {productos.length} productos

            </span>

          </div>

          <div className="space-y-5">

            {productos.map((producto) => (

              <div
                key={producto.id}
                className="flex flex-col gap-5 rounded-3xl border border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between"
              >

                {/* IZQUIERDA */}
                <div className="flex items-center gap-5">

                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div>

                    <h4 className="text-xl font-bold">

                      {producto.nombre}

                    </h4>

                    <p className="mt-1 text-gray-500">

                      Q{producto.precio}

                    </p>

                    <p className="mt-2 max-w-md text-sm text-gray-400">

                      {producto.descripcion}

                    </p>

                  </div>

                </div>

                {/* DERECHA */}
                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      editarProducto(
                        producto
                      )
                    }
                    className="rounded-2xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      eliminarProducto(
                        producto.id
                      )
                    }
                    className="rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
                  >
                    Eliminar
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ORDENES */}
        <div className="mt-10 rounded-[32px] bg-white p-8 shadow-lg">

          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-3xl font-black">

              Órdenes

            </h3>

            <span className="text-gray-500">

              {ordenes.length} órdenes

            </span>

          </div>

          <div className="space-y-5">

            {ordenes.map((orden) => (

              <div
                key={orden.id}
                className="rounded-3xl border border-gray-200 p-6"
              >

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h4 className="text-xl font-bold">

                      Cliente:
                      {" "}
                      {orden.cliente}

                    </h4>

                    <p className="mt-1 text-gray-500">

                      Estado:
                      {" "}
                      {orden.estado}

                    </p>

                    {/* BOTONES ESTADO */}
                    <div className="mt-4 flex flex-wrap gap-3">

                      <button
                        onClick={() =>
                          cambiarEstadoOrden(
                            orden.id,
                            "confirmado"
                          )
                        }
                        className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white"
                      >
                        Confirmar
                      </button>

                      <button
                        onClick={() =>
                          cambiarEstadoOrden(
                            orden.id,
                            "enviado"
                          )
                        }
                        className="rounded-xl bg-yellow-500 px-4 py-2 text-sm text-white"
                      >
                        Enviado
                      </button>

                      <button
                        onClick={() =>
                          cambiarEstadoOrden(
                            orden.id,
                            "entregado"
                          )
                        }
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm text-white"
                      >
                        Entregado
                      </button>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-3xl font-black">

                      Q{orden.total}

                    </p>

                  </div>

                </div>

                {/* PRODUCTOS ORDEN */}
                <div className="space-y-4">

                  {orden.productos?.map(
                    (
                      producto,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4"
                      >

                        <img
                          src={
                            producto.imagen
                          }
                          alt={
                            producto.nombre
                          }
                          className="h-20 w-20 rounded-2xl object-cover"
                        />

                        <div>

                          <h5 className="font-bold">

                            {
                              producto.nombre
                            }

                          </h5>

                          <p className="text-gray-500">

                            Q
                            {
                              producto.precio
                            }

                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>

  );

}




