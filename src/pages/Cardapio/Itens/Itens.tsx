import styles from "./Itens.module.scss";
import cardapio from "./itens.json";
import Item from "./Item/Item";
import { useState, useEffect } from "react";

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: Props) {
  const [lista, setLista] = useState(cardapio);
  const { busca, filtro, ordenador } = props;

  function testaBusca(title: string) {
    const regex = RegExp(busca, "i");
    return regex.test(title);
  }

  function testaFiltro(id: number) {
    if (filtro !== null) return filtro === id;
    return true;
  }

  function ordemCrescente(
    lista: typeof cardapio,
    propriedade: keyof Pick<
      (typeof cardapio)[0],
      "size" | "serving" | "price" | "title"
    >
  ) {
    return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  }

  function ordenar(novaLista: typeof cardapio) {
    switch (ordenador) {
      case "porcao":
        return ordemCrescente(novaLista, "size");
      case "qtd_pessoas":
        return ordemCrescente(novaLista, "serving");

      case "preco":
        return ordemCrescente(novaLista, "price");

      case "alfabetica":
        return ordemCrescente(novaLista, "title");

      default:
        return novaLista;
    }
  }

  useEffect(() => {
    const novaLista = cardapio.filter(
      (item) => testaBusca(item.title) && testaFiltro(item.category.id)
    );
    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);
  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
