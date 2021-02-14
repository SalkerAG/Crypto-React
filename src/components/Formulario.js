import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useMoneda } from "../hooks/useMoneda";
import { useCryptomoneda } from "../hooks/useCrypyomoneda";
import { Error } from "./Error";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda, setCrypto }) => {
  // State del listado de cryptos
  const [listacrypto, setListaCrypto] = useState([]);
  const [error, setError] = useState(false);
  const MONEDAS = [
    {
      codigo: "USD",
      nombre: "Dolar de Estados Unidos",
    },
    {
      codigo: "MXN",
      nombre: "Peso Mexicano",
    },
    {
      codigo: "EUR",
      nombre: "Euro",
    },
    {
      codigo: "GBP",
      nombre: "Libra Esterlina",
    },
  ];
  // Utilizar useMoneda
  const [moneda, SelectMonedas, setState] = useMoneda(
    "Elige tu Moneda",
    "",
    MONEDAS
  );
  const [cryptomoneda, SelectCrypto] = useCryptomoneda(
    "Elige tu Cryptomoneda",
    "",
    listacrypto
  );

  //Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);
      setListaCrypto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();
    if (moneda === "" || cryptomoneda === "") {
      setError(true);
      return;
    }
    setError(false);
    setMoneda(moneda);
    setCrypto(cryptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCrypto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export { Formulario };
