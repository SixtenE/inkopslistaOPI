import { supabase } from '../../../lib/initSupabase'
import { redis } from '../../../lib/initRedis'

export default async function handler(req: any, res: any) {
	const method = req.method
	const { item_id } = req.query
	const { is_checked } = req.body

	switch (method) {
		case 'PUT': {
			const { data, error } = await supabase
				.from('items')
				.update({ is_checked })
				.eq('item_id', item_id)
				.select()

			if (error) {
				return res.status(400).json({ error: error })
			}

			if (data?.length === 0) {
				return res.status(404).json({ error: 'NO ITEM FOUND' })
			}

			await redis.del('items')
			return res.status(200).json({ data })
		}

		case 'DELETE': {
			const { data, error } = await supabase
				.from('items')
				.update({ is_deleted: true })
				.eq('item_id', item_id)
				.select()

			if (error) {
				console.log(error)
				return res.status(400).json({ error: error })
			}

			if (data.length === 0) {
				return res.status(404).json({ error: 'NO ITEM FOUND' })
			}

			await redis.del('items')
			return res.status(200).json({ data })
		}
		default:
			res.status(405).json({ message: 'NOT ALLOWED' })
	}
}