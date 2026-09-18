import React, { useState, useEffect, useRef } from "react";
import brasil from "../bandeiras/brasil.png";
import eua from "../bandeiras/eua.png";
import europa from "../bandeiras/europa.png";

const Saida = ({ valor, resultado, setMoeda1,moeda, moeda1, verificarMoeda}) => {

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
    ]   ;
    
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
        <div className="flex px-10 relative">
            <div className="    
                    w-45
                    border
                    border-gray-300
                    text-gray-400 
                    rounded-lg
                    px-2 py-2 mr-2
                    whitespace-nowrap
                    overflow-x-auto"         
                type="text"
            >       
                {resultado || "Resultado"}
            </div>
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
                        src={moedas.find(item => item.codigo === moeda1)?.bandeira}
                        alt={moeda1}
                        className="w-6 h-4 object-cover"
                    />
                    <span>{moeda1}</span>
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
                                            value={moeda1}
                                            onClick={(e) => {
                                                const novaMoeda1 = item.codigo;
                                                setMoeda1(novaMoeda1);

                                                verificarMoeda(valor, moeda, novaMoeda1)

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

export default Saida;