import { supabase } from '../../../lib/initSupabase'
import { redis } from '../../../lib/initRedis'

export default async function handler(req: any, res: any) {
    const method = req.method
    const { user_id } = req.body;

    switch (method) {
        case 'GET': {
            const cache = await redis.get('users')

            if (!!cache) {
                return res.status(200).json({ data: JSON.parse(cache) })
            }

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('activated', { ascending: false })
                .order('user_name', { ascending: true })

            if (error) {
                return res.status(400).json({ error: error })
            }

            await redis.set('users', JSON.stringify(data))
            return res.status(200).json({ data })
        }
        case 'PUT': {
            const { data, error } = await supabase
                .from('users')
                .update({ activated: true })
                .eq('user_id', user_id)
                .select()

            if (error) {
                return res.status(400).json({ error: error })
            }

            if (data.length === 0) {
                return res.status(404).json({ error: 'NO USER FOUND' })
            }

            await redis.del('users')
            return res.status(200).json({ data })
        }

        default: {
            res.status(405).json({ message: 'NOT ALLOWED' })
        }
    }
}