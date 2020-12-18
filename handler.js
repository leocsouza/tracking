'use strict';
const apphuggy = require('./huggy');
const { rastrearEncomendas } = require('correios-brasil');

module.exports.track = async event => {
const corpo = JSON.parse(event.body)
//console.log(corpo.apiKey)

    let codRastreio = []
    codRastreio[0] = corpo.codRastreio
    let chatID = corpo.chatID
    let apiKey = corpo.apiKey

    rastrearEncomendas(codRastreio).then((response) => {
        //    console.log("response: ", response[0]);
        let result = response[0]
        let resultado = result[response[0].length - 1]
        
        

        apphuggy.sendLoop(`Codigo Rastreio: ${JSON.stringify(resultado)}`, chatID, apiKey);
        return response
    });
};
