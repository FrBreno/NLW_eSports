// Formas de Importar dependências:
// Primeira Forma ("type": "commonjs"):
// const express = require('express')
// Forma mais elegante ("type": "module"):
import express, { request, response } from 'express'
import cors from 'cors'

import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

// Conhecimentos necessários:
// 1. HTTP methods
// 2. API RESTful
// 3. HTTP Codes
// 4. Parâmetros HTTP (Query, Route e Body)

// Listagem de games com contagem de anúncios:
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count:{
        select:{
          ads: true
        }
      }
    }
  })

  return response.json(games)
})

// Criação de um novo anúncio:
app.post('/games/:id/ads', async (request, response) =>{
  const gameId = request.params.id;
  const body: any = request.body

  const ad = await prisma.ad.create({
    data:{
      gameId: gameId,
      name: body.name,  
      yearsPlaying: body.yearsPlaying,  
      discord: body.discord,  
      weekDays: body.weekDays.join(','),  
      hourStart: convertHourStringToMinutes(body.hourStart),  
      hourEnd: convertHourStringToMinutes(body.hourEnd),  
      useVoiceChannel: body.useVoiceChannel
    }
  })
  return response.status(201).json(ad)
})

// Listagem de anuncios por game:
app.get('/games/:id/ads', async (request, response) => {
  //Request são as informações enviadas no acesso e response são as retornadas no acesso.
  // Vamos usar response para retornar um array de objetos via json:
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select:{
      id:true,
      name:true,
      weekDays:true,
      useVoiceChannel:true,
      yearsPlaying:true,
      hourStart:true,
      hourEnd:true
    },
    where:{
      gameId: gameId
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  }))
}) //O primeiro parâmetro é o endereço de acesso e o segundo é uma função que irá "rodar" nesse endereço.

// Buscar discord pelo ID de anúncio:
app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord:true
    },
    where:{
      id:adId
    }
  })

  return response.json([{
    discord: ad.discord
  }])
})

app.listen(3333)