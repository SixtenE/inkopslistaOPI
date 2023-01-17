import { Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import ProfileSelect from '../components/ProfileSelect'
import ShoppingList from '../components/ShoppingList'

export default function Kuk() {
    const [user, setUser] = useState<any>(null)
    const [users, setUsers] = useState<[]>([])

    return (
        <Flex
            justifyContent='center'
            direction='column'
        >
            {user ? (
                <ShoppingList
                    user={user}
                    setUser={setUser}
                    otherUsers={users.filter((otherUser: any) => otherUser.user_id !== user.user_id)}
                />
            ) : (
                <ProfileSelect
                    setUser={setUser}
                    users={users}
                    setUsers={setUsers}
                />
            )}
        </Flex>
    )
}