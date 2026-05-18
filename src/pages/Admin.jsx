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

  // ESTADISTICAS
  const pendientes =
    ordenes.filter(
      (o) => o.estado === "pendiente"
    ).length;

  const confirmados =
    ordenes.filter(
      (o) => o.estado === "confirmado"
    ).length;

  const enviados =
    ordenes.filter(
      (o) => o.estado === "enviado"
    ).length;

  const entregados =
    ordenes.filter(
      (o) => o.estado === "entregado"
    ).length;

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

  // CAMBIAR ESTADO
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

  // EDITAR
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

  // ELIMINAR
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          <div className="rounded-[32px] bg-white p-8 shadow-lg">

            <p className="mb-3 text-gray-500">
              Ventas Totales
            </p>

            <h3 className="text-4xl font-black">

              Q
              {ordenes.reduce(
                (acc, orden) =>
                  acc + Number(orden.total),
                0
              )}

            </h3>

          </div>

          <div className="rounded-[32px] bg-yellow-100 p-8 shadow-lg">

            <p className="mb-3 text-yellow-700">
              Pendientes
            </p>

            <h3 className="text-4xl font-black">
              {pendientes}
            </h3>

          </div>

          <div className="rounded-[32px] bg-blue-100 p-8 shadow-lg">

            <p className="mb-3 text-blue-700">
              Confirmados
            </p>

            <h3 className="text-4xl font-black">
              {confirmados}
            </h3>

          </div>

          <div className="rounded-[32px] bg-purple-100 p-8 shadow-lg">

            <p className="mb-3 text-purple-700">
              Enviados
            </p>

            <h3 className="text-4xl font-black">
              {enviados}
            </h3>

          </div>

          <div className="rounded-[32px] bg-green-100 p-8 shadow-lg">

            <p className="mb-3 text-green-700">
              Entregados
            </p>

            <h3 className="text-4xl font-black">
              {entregados}
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

          </div>

          <form
            onSubmit={guardarProducto}
            className="grid gap-5 md:grid-cols-2"
          >

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              className="rounded-2xl border border-gray-300 px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) =>
                setPrecio(e.target.value)
              }
              className="rounded-2xl border border-gray-300 px-5 py-4 outline-none"
            />

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

              {imagen && (

                <img
                  src={imagen}
                  alt="preview"
                  className="mt-5 h-40 w-40 rounded-2xl object-cover"
                />

              )}

            </div>

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

      </main>

    </div>

  );

}


