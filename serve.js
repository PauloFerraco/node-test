import 'dotenv/config'
import {fastify} from 'fastify'
// import { Database } from './databese-memory.js'
import { Database } from './database-postgres.js'

const server = fastify()
const database = new Database()

// server.get('/', () => {
// 	return 'hello world';
// })

server.get('/videos', async () => {
	const videos = await database.list()
	return videos
})

server.post('/videos', async (request, reply) => {
	const body =  request.body

	await database.create({
		title: body.title,
		desc: body.desc,
		duration: body.duration
	})
	return reply.status(201).send()
})

server.put('/videos/:id', (request, reply) => {
	const videosId = request.params.id
	const { title, desc, duration} = request.body

	const video = database.update(videosId, {
		title,
		desc,
		duration
	})

	return reply.status(204).send()
})
server.delete('/videos/:id', (request, reply) => {
	const videoId = request.params.id

	database.delete(videoId)
	return reply.status(204).send()
})

server.listen({
	port: process.env.PORT ?? 3333
})