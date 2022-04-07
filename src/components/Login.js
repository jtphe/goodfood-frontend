import React from 'react';
// import logo from '../../public/logo_corporate.png';

function Login() {
  return (
    <div className="flex flex-col bg-white p-10 w-2/5 rounded-md shadow-md">
      <div className="self-center">
        <img
          src="./logo_corporate.png"
          alt="good food logo corporate"
          width="223px"
          height="206px"
        />
      </div>
      <div className="self-center my-3 font-bold text-3xl">Connectez-vous</div>
      <form action="" method="get">
        <div className="flex flex-col mt-6">
          <label className="mb-2 font-semibold" htmlFor="mail">
            Adresse email
          </label>
          <input
            className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
            type="text"
            name="mail"
            id="mail"
            placeholder="Entrez votre adresse email"
          />
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex justify-between">
            <label className="mb-2 font-semibold" htmlFor="password">
              Mot de passe
            </label>
            <a href="#" className="font-bold text-red-600">
              Mot de passe oublié?
            </a>
          </div>
          <input
            className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
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
