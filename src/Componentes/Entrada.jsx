import React, { useState, useEffect, useRef } from "react";
import brasil from "../bandeiras/brasil.png";
import eua from "../bandeiras/eua.png";
import europa from "../bandeiras/europa.png";

const Entrada = ({valor, moeda, moeda1, setMoeda, validarEntrada, verificarMoeda, valorExibido, setValorExibido}) => {
    
    const [aberto, setAberto] = useState(false);
    const dropdownRef = useRef(null);

    const moedas = [
        {
            codigo: "BRL",
            nome: "Real",
            bandeira: brasil
        },
        {
            codigo: "USD",
            nome: "Dólar",
            bandeira: eua
        },
        {
            codigo: "EUR",
            nome: "Euro",
            bandeira: europa
        }
    ];

    useEffect(() => {
        const handleClickFora = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setAberto(false);
            }
        };

        document.addEventListener("mousedown", handleClickFora);

        return () => {
            document.removeEventListener("mousedown", handleClickFora);
        };
    }, []);
    
    return (
        <div className="flex gap-1 py-10 px-10 relative">

            <input
                className="w-45 text-gray-600 border border-gray-300 rounded-lg px-2 py-2 mr-1"
                type="text"
                placeholder="Digite o valor"
                value={valorExibido}
                onChange={(e) => {

                    const valorDigitado = e.target.value;
                    const valorNumerico = valorDigitado.replace(/\D/g, "");
                    const numero = Number(valorNumerico) / 100;
                    
                    const valorFormatado = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: moeda
                    }).format(numero);

                    setValorExibido(valorFormatado);
                   
                    validarEntrada(numero, moeda);
                }}
            />
            <div className="relative">

                <button
                    type="button"
                    onClick={() => setAberto(!aberto)}
                    className="
                        border
                        border-gray-300
                        text-black
                        rounded-lg
                        px-2
                        py-2
                        flex
                        items-center
                        gap-2
                        bg-white
                        w-27
                    "
                    >
                    <img
                        src={moedas.find(item => item.codigo === moeda)?.bandeira}
                        alt={moeda}
                        className="w-6 h-4 object-cover"
                    />
                    <span>{moeda}</span>
                    <span className="ml-auto">▼</span>
                </button>

                {aberto && (
                    <div 
                        ref={dropdownRef}  
                        className="
                            absolute
                            top-full
                            left-0
                            mt-1
                            w-full
                            bg-white
                            border
                            border-gray-300
                            rounded-lg
                            shadow-lg
                            z-50
                        ">
                        {moedas.map((item) => (
                                <button
                                    key={item.codigo}
                                    type="button"
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-2
                                        px-2
                                        py-2
                                        text-black
                                        hover:bg-gray-100
                                        text-left
                                    "
                                   onClick={() => {
                                        const novaMoeda = item.codigo;
                                        setMoeda(novaMoeda);
                                        const valorFormatado = new Intl.NumberFormat(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: novaMoeda
                                            }
                                        ).format(valor);

                                        setValorExibido(valorFormatado);

                                        verificarMoeda(
                                            valor,
                                            novaMoeda,
                                            moeda1
                                        );
                                        setAberto(false);
                                    }}
                                    >
                                    <img
                                        src={item.bandeira}
                                        alt={item.nome}
                                        className="w-6 h-4 object-cover"
                                    />
                                    <span>{item.nome}</span>
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>     
        </div>
    )
}

export default Entrada;