import { Button, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import UserFormWrapper from './UserForm/UserFormWrapper'
import UserListWrapper from './UserList/UserListWrapper'

export default function ProfileSelect(props: any) {
    const { setUser, users, setUsers } = props

    const [showForm, setShowForm] = useState(false)

    async function fetchUsers() {
        const response = await fetch('/api/user', { method: 'GET' })
        const data = await response.json()
        setUsers(data.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [showForm])

    return (
        <Flex direction='column'>
            {
                showForm ? (
                    <UserFormWrapper
                        users={users}
                        setShowForm={setShowForm}
                    />
                ) : (
                    <UserListWrapper
                        users={users}
                        setShowForm={setShowForm}
                        setUser={setUser}
                    />
                )
            }
        </Flex>
    )
}