import {randomUUID} from 'node:crypto'

export class Database {
	#videos = new Map()

	list(search) {
		return Array.from(this.#videos.entries()).map((v) => {
			const id = v[0]
			const data = v[1]

			return {
				id, 
				...data
			}
		}).filter(v => {
			if(search){
				return v.title.includes(search)
			}
			return true
		})
	}

	create(video){
		const videoId = randomUUID()

		this.#videos.set(videoId, video)
	}

	update(id, video){
		this.#videos.set(id, video)
	}

	delete(id){ 
		this.#videos.delete(id)
	}
}