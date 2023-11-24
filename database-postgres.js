import {randomUUID} from 'node:crypto'
import sql from './db.js'

export class Database {

	async list(search) {
		let videos
console.log(search);
		if(search){
			videos = await sql`select * from videos where title ilike ${'%'+search+'%'}%`
		}else{
			videos = await sql`select * from videos`
		}
	}

	async create(video){
		const videoId = randomUUID()
		const { title, desc, duration} = video

		await sql`insert into videos (id, title, description, duration) values (${videoId}, ${title}, ${desc}, ${duration})`
	}

	async update(id, video){
		const { title, desc, duration} = video

		await sql`update videos set title=${title}, description=${desc}, duration=${duration} where id=${id}`
	}

	async delete(id){ 
		await sql`delete from videos where id=${id}`
	}
}