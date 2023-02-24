import { createContext, useEffect, useState } from "react";
import { pegarProdutos, salvarProduto } from "../services/requisicoes/Produtos";

export const ProdutosContext = createContext({});

export function ProdutosProvider({ children }) {
  const [quantidade, setQuantidade] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [ultimosVistos, setUltimosVistos] = useState([]);
  

  useEffect(() => {
    async function produtos() {
      const resultado = await pegarProdutos();
      setCarrinho(resultado);
      setQuantidade(resultado.length);
    }
    produtos();
  }, []);

  async function viuProduto(produto) {
    setQuantidade(quantidade + 1);
    const resultado = await salvarProduto(produto);
    let novoCarrinho = carrinho;
    novoCarrinho.push(resultado);
    setCarrinho(novoCarrinho);

    let novoUltimosVistos = new Set(ultimosVistos);
    novoUltimosVistos.add(produto);
    setUltimosVistos([...novoUltimosVistos]);

    
  }

  return (
    <ProdutosContext.Provider
      value={{
        quantidade,
        carrinho,
        ultimosVistos,
        viuProduto,
        setQuantidade,
        setCarrinho,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}
