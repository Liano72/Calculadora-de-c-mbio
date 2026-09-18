import React, { useState, useEffect } from "react";
import Entrada from './Entrada';
import Saida from './Saida';
import '../App.css';
import dinheiro from "../faicon/dinheiro.png";

const Conversor = () => {

    const [valor, setValor] = useState("");
    const [moeda, setMoeda] = useState("BRL");
    const [moeda1, setMoeda1] = useState("BRL");
    const [resultado, setResultado] = useState(""); 
    const [cotacoes, setCotacoes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [valorExibido, setValorExibido] = useState("");

    //API cotação em tempo real BRL, USD e EUR
    useEffect(() => {
        fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,BRL-USD,EUR-BRL,BRL-EUR,USD-EUR,EUR-USD")
        .then((response) => response.json())
                .then((data) => {
                    setCotacoes(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Erro ao buscar cotação:', error);
                    setLoading(false);
                });
        }, []);
    //Converte o resultado baseado na moeda de entrada e saida
    const converterMoeda = (valor, moeda, moeda1) => {
        
        if (!cotacoes) return;
        if (moeda === "BRL" && moeda1 === "USD") {

            const cotacaoDolar = parseFloat(cotacoes.USDBRL.bid);
            const resultadoConversao = valor / cotacaoDolar;
            setResultado(formatarValor(resultadoConversao, moeda1));

        } else if (moeda === "BRL" && moeda1 === "EUR") {

            const cotacaoEuro = parseFloat(cotacoes.EURBRL.bid);
            const resultadoConversao = valor / cotacaoEuro;
            setResultado(formatarValor(resultadoConversao, moeda1));

        } else if (moeda === "USD" && moeda1 === "BRL") {

            const cotacaoDolar = parseFloat(cotacoes.USDBRL.bid);
            const resultadoConversao = valor * cotacaoDolar;
            setResultado(formatarValor(resultadoConversao, moeda1));

        } else if (moeda === "USD" && moeda1 === "EUR") {

            const cotacaoDolar = parseFloat(cotacoes.USDBRL.bid);
            const cotacaoEuro = parseFloat(cotacoes.EURBRL.bid);
            const resultadoConversao = (valor * cotacaoDolar) / cotacaoEuro;
            setResultado(formatarValor(resultadoConversao, moeda1));

        } else if (moeda === "EUR" && moeda1 === "BRL") {

            const cotacaoEuro = parseFloat(cotacoes.EURBRL.bid);
            const resultadoConversao = valor * cotacaoEuro;
            setResultado(formatarValor(resultadoConversao, moeda1));

        } else if (moeda === "EUR" && moeda1 === "USD") {

            const cotacaoEuro = parseFloat(cotacoes.EURBRL.bid);
            const cotacaoDolar = parseFloat(cotacoes.USDBRL.bid);
            const resultadoConversao = (valor * cotacaoEuro) / cotacaoDolar;
            setResultado(formatarValor(resultadoConversao, moeda1));
            
        } else {
            setResultado(formatarValor(valor, moeda1));
        }

    }
    //Valida valor inserido e moeda seleciona
    const validarEntrada = (valor, moeda) => {

        setValor(valor);

        if (valor >= 0) {
            converterMoeda(valor, moeda, moeda1);
        }
    };

    const verificarMoeda = (valor, moeda, moeda1) => {
        converterMoeda(valor, moeda, moeda1);
    };
    // Formata o valor para exibição com base na moeda selecionada
    function formatarValor(valor, moedaFormatada) {
        const numero = Number(valor);

        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: moedaFormatada 
        }).format(numero);
    }
    return (
        <div className="
            items-center 
            justify-center 
            flex flex-col 
            h-screen 
             bg-[#0f0f0f]
            text-white
            bg-[linear-gradient(#161616_1px,transparent_1px),linear-gradient(to_right,#161616_1px,#0f0f0f_1px)]
            bg-size-[20px_20px]
        ">         
           <div className="
                flex flex-col
                gap-1
                bg-white
                rounded-lg
                shadow-[0_0_2px_white]
                items-center
                max-w-200
            ">
                <h1 className="text-3xl font-bold py-10 px-2 text-black flex gap-2 items-center">
                    <img
                        src={dinheiro}
                        alt="dinheiro"
                        className="w-10 h-10"
                    />    
                    Calculadora de Câmbio
                    <img
                        src={dinheiro}
                        alt="dinheiro"
                        className="w-10 h-10"
                    /> 
                </h1>
                <div className="  
                    align-items
                    items-center    
                    relative 
                    h-75 
                ">
                   <Entrada
                        valor={valor}
                        moeda={moeda}
                        moeda1={moeda1}
                        valorExibido={valorExibido}
                        setMoeda={setMoeda}
                        setValorExibido={setValorExibido}
                        validarEntrada={validarEntrada}
                        verificarMoeda={verificarMoeda}
                    />
                    <Saida 
                        resultado={resultado} 
                        valor={valor} 
                        moeda={moeda}
                        moeda1={moeda1}  
                        setMoeda1={setMoeda1}
                        verificarMoeda={verificarMoeda}
                        
                    />    
                </div>  
 
            </div>
            <p className="py-2">Desenvolvido por Lucas Liano <span className="font-bold text-purple-900">This Project</span></p>   
        </div>
    )

}

export default Conversor;