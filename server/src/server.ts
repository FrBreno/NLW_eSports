// Formas de Importar dependências:
// Primeira Forma ("type": "commonjs"):
// const express = require('express')
// Forma mais elegante ("type": "module"):
import express from 'express'

const app = express()

app.get('/ads', (request, response) => {
  //Request são as informações enviadas no acesso e response são as retornadas no acesso.
  // Vamos usar response para retornar um array de objetos via json:
  return response.json([
    { id: 1, name: 'Anúncio 1' },
    { id: 2, name: 'Anúncio 2' },
    { id: 3, name: 'Anúncio 3' },
    { id: 4, name: 'Anúncio 4' },
    { id: 5, name: 'Anúncio 5' }
  ])
}) //O primeiro parâmetro é o endereço de acesso e o segundo é uma função que irá "rodar" nesse endereço.

app.listen(3333)

// Aula 01 - 1:06:00
