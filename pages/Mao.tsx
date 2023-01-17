import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
//import ShoppingList from '../components/ShoppingList'
import { supabase } from '../lib/initSupabase'
//import SelectUser from '../components/SelectUser'

export default function Mao(props: any) {
	const [users, setUsers] = useState<any>(null)
	const [user, setUser] = useState<any>(null)

	async function getLocalUser() {
		const localUser = localStorage.getItem('user_id')

		if (localUser) {
			let { data, error } = await supabase.from('users').select('user_name, user_id').eq('user_id', localUser)

			if (error) return

			if (data) setUser(data[0] as any)
		}
	}

	async function handleUserClick({ users, id }: { users: Array<any>, id: string }) {
		const pickedUser = users.find(x => x.user_id === id)

		setUser(pickedUser)
		localStorage.setItem('user_id', id)
	}

	useEffect(() => {
		getLocalUser()
	}, [])

	return (
		<Box>
			{
				/* user ? (
					<ShoppingList users={users} user={user} setUser={setUser} />
				) : (
					<SelectUser users={users} setUsers={setUsers} handleUserClick={handleUserClick} />
				) */
			}
		</Box>
	)
}
