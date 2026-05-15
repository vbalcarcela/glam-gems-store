import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { db, auth } from "../firebase";

export default function Admin() {

  // LOGIN
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  // USUARIO
  const [usuario, setUsuario] = useState(null);

  // PRODUCTO
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");

  // SUBIDA
  const [subiendo, setSubiendo] = useState(false);

  // ÓRDENES
  const [ordenes, setOrdenes] = useState([]);

  // VERIFICAR LOGIN
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      setUsuario(user);

    });

    return () => unsubscribe();

  }, []);

  // OBTENER ÓRDENES
  useEffect(() => {

    const obtenerOrdenes = async () => {

      const querySnapshot = await getDocs(
        collection(db, "ordenes")
      );

      const ordenesFirebase =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setOrdenes(ordenesFirebase);

    };

    obtenerOrdenes();

  }, []);

  // LOGIN
  const iniciarSesion = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        correo,
        password
      );

    } catch (error) {

      alert("Credenciales incorrectas");

    }

  };

  // LOGOUT
  const cerrarSesion = async () => {

    await signOut(auth);

  };

  // SUBIR IMAGEN
  const subirImagen = async (file) => {

    setSubiendo(true);

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      "mmrgqwre"
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

      const uploadedImage = await res.json();

      setImagen(uploadedImage.secure_url);

    } catch (error) {

      console.log(error);

      alert("Error subiendo imagen");

    }

    setSubiendo(false);

  };

  // AGREGAR PRODUCTO
  const agregarProducto = async (e) => {

    e.preventDefault();

    try {

      await addDoc(collection(db, "productos"), {

        nombre,
        precio: Number(precio),
        descripcion,
        imagen,
        categoria,

      });

      alert("Producto agregado");

      // LIMPIAR
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setImagen("");
      setCategoria("");

    } catch (error) {

      console.log(error);

      alert("Error al agregar producto");

    }

  };

  return (

    <div className="min-h-screen bg-[#f7f4ef] p-4 md:p-10">

      <div className="mx-auto max-w-5xl">

        {!usuario ? (

          // LOGIN
          <form
            onSubmit={iniciarSesion}
            className="space-y-6 rounded-3xl bg-white p-8 shadow-lg md:p-10"
          >

            <h1 className="text-3xl font-bold md:text-4xl">
              Login Administrador
            </h1>

            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-black p-4 text-white transition hover:bg-gray-800"
            >
              Iniciar Sesión
            </button>

          </form>

        ) : (

          // PANEL ADMIN
          <>

            {/* HEADER */}
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <h1 className="text-4xl font-bold md:text-5xl">
                Panel Administrador
              </h1>

              <button
                onClick={cerrarSesion}
                className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
              >
                Cerrar Sesión
              </button>

            </div>

            {/* FORMULARIO */}
            <form
              onSubmit={agregarProducto}
              className="space-y-6 rounded-3xl bg-white p-8 shadow-lg md:p-10"
            >

              <h2 className="text-3xl font-bold">
                Agregar Producto
              </h2>

              {/* NOMBRE */}
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
                required
              />

              {/* PRECIO */}
              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
                required
              />

              {/* DESCRIPCIÓN */}
              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
                rows="4"
                required
              />

              {/* IMAGEN */}
              <div className="space-y-4">

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    subirImagen(e.target.files[0])
                  }
                  className="w-full rounded-2xl border border-gray-300 p-4"
                />

                {subiendo && (

                  <p className="text-sm text-gray-500">
                    Subiendo imagen...
                  </p>

                )}

                {imagen && (

                  <img
                    src={imagen}
                    alt="preview"
                    className="h-52 w-full rounded-2xl object-cover"
                  />

                )}

              </div>

              {/* CATEGORÍA */}
              <input
                type="text"
                placeholder="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
                required
              />

              {/* BOTÓN */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-black p-4 text-white transition hover:bg-gray-800"
              >
                Agregar Producto
              </button>

            </form>

            {/* ÓRDENES */}
            <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg md:p-10">

              <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                Órdenes
              </h2>

              <div className="space-y-6">

                {ordenes.length === 0 ? (

                  <p className="text-gray-500">
                    No hay órdenes todavía
                  </p>

                ) : (

                  ordenes.map((orden) => (

                    <div
                      key={orden.id}
                      className="rounded-2xl border border-gray-200 p-6"
                    >

                      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                        <span className="font-semibold capitalize">
                          Estado: {orden.estado}
                        </span>

                        <span className="text-lg font-bold">
                          Q{orden.total}
                        </span>

                      </div>

                      <div className="space-y-2">

                        {orden.productos?.map(
                          (producto, index) => (

                            <p key={index}>
                              • {producto.nombre}
                            </p>

                          )
                        )}

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </>

        )}

      </div>

    </div>

  );
}
