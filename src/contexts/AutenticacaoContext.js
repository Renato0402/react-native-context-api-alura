import { createContext, useState } from "react";

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  function login(email, senha) {
    if (email == "renato@email.com" && senha == 123) {
      setUsuario({
        nome: "Renato",
        email: email,
        endereco: "Av. Teste",
        telefone: "(22) 99999-9999",
      });
      return "ok";
    }

    return "Email ou senha incorretos";
  }

  return (
    <AutenticacaoContext.Provider
      value={{
        usuario,
        login,
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
}
