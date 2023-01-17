import { Box, Button, Flex, Select, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export default function UserForm(props: any) {
    const [userOptions, setUserOptions] = useState<Array<number>>([1, 1, 1])
    const [selectedOption, setSelectedOption] = useState<any>(null)

    const { users, setShowForm } = props

    async function onAddUser(event: React.FormEvent) {
        event.preventDefault()

        const response = await fetch('/api/user', {
            method: 'PUT',
            body: JSON.stringify(
                {
                    user_id: selectedOption.user_id
                }
            ),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()
        setShowForm(false)
        console.log(response)
    }

    function handleSelectChange(event: any) {

        const selectedUser = users.find((x: any) => x.user_name === event.target.value)

        setSelectedOption(selectedUser)
    }

    return (
        <Box
            w={{ base: '100vw', sm: '450px' }}

            mt='50px'
            p='4'
        >
            <form onSubmit={onAddUser}>
                <VStack spacing='20px' userSelect='none'>
                    <Select
                        size='lg'
                        variant='filled'
                        placeholder='Välj namn'
                        value={selectedOption ? selectedOption.user_name : ''}
                        onChange={handleSelectChange}
                        w='100%'
                    >
                        {
                            users.map((user: any, index: number) => (
                                <option disabled={user.activated} key={index}>{user.user_name}</option>
                            ))
                        }
                    </Select>
                    <Button
                        as='button'
                        w='100%'
                        h='50px'
                        borderRadius='md'
                        disabled={!selectedOption}
                        type='submit'
                        color='white'
                        bg='purple.900'
                        fontWeight='semibold'
                        _hover={{
                            bg: 'purple.900'
                        }}
                    >
                        Lägg till
                    </Button>
                </VStack>
            </form>
        </Box >
    )
}
