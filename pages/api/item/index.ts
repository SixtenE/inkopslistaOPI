import { supabase } from '../../../lib/initSupabase'
import { redis } from '../../../lib/initRedis'

export default async function handler(req: any, res: any) {
  const method = req.method
  const { item_id, author_id, item_name } = req.body

  switch (method) {
    case 'GET': {
      const cache = await redis.get('items')

      if (!!cache) {
        return res.status(200).json({ data: JSON.parse(cache) })
      }

      const { data, error } = await supabase
        .from('items')
        .select('item_id, is_checked, item_name, author_id, created_at')
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })

      if (error) {
        return res.status(400).json({ data: [], error: error })
      }

      await redis.set('items', JSON.stringify(data))
      return res.status(200).json({ data })
    }

    case 'POST': {
      const { data, error } = await supabase
        .from('items')
        .insert([{ item_id, author_id, item_name }])
        .select('item_id, is_checked, item_name, author_id')

      if (error) {
        return res.status(400).json({ data: [], error: error })
      }

      await redis.del('items')
      return res.status(200).json({ data })
    }

    default: {
      res.status(405).json({ data: [], error: 'METHOD NOT ALLOWED' })
    }
  }
}