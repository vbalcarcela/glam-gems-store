import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const iniciarSesion = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin");

    } catch (error) {

      alert("Credenciales incorrectas");

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef] px-6">

      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">

        {/* TITULO */}
        <div className="mb-10 text-center">

          <h1 className="mb-3 text-5xl font-black">

            Glam Gems

          </h1>

          <p className="text-gray-500">

            Panel administrativo

          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={iniciarSesion}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-600">

              Correo electrónico

            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-600">

              Contraseña

            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
            />

          </div>

          {/* BOTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
          >

            {loading
              ? "Ingresando..."
              : "Ingresar"}

          </button>

        </form>

      </div>

    </div>

  );

}

