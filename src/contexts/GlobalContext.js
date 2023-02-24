import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export function InfoProvider({ children }) {
  const valor = 250;
  const [nome, setNome] = useState("Renato");

  return (
    <GlobalContext.Provider
      value={{
        valor,
        nome,
        setNome
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
