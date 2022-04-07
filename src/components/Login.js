import React from "react";

function Login() {
  return (
    <div className="flex flex-col bg-white w-96 p-10">
      <div className="self-center my-3 font-bold">Connectez-vous</div>
      <form action="" method="get">
        <div className="flex flex-col mt-6">
          <label className="mb-2 font-semibold" htmlFor="mail">
            Adresse email
          </label>
          <input
            className="border py-2 px-3 rounded-md"
            type="text"
            name="mail"
            id="mail"
            placeholder="Entrez votre adresse email"
          />
        </div>
        <div className="flex flex-col mt-6">
          <label className="mb-2 font-semibold" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="border py-2 px-3 rounded-md"
            type="text"
            name="password"
            id="password"
            placeholder="Mot de passe"
          />
        </div>
        <button
          className="bg-goodfoodRed-500 py-2 px-5 rounded-md w-full mt-8 text-white"
          type="submit"
          name="submit"
          id="submit"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;
