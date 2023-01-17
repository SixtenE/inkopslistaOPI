import { Box, Button, Flex, Heading, ScaleFade, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import UserForm from './UserForm'

export default function UserFormWrapper(props: any) {
    const { users, setShowForm } = props

    return (
        <Flex
            w='100%'
            justifyContent='center'

            p='4'
        >
            <VStack>
                <Flex
                    w='100%'
                    h='40px'
                    px='15px'
                    pos='relative'
                >
                    <Button
                        position='absolute'
                        bg='purple.900'
                        color='white'
                        onClick={() => setShowForm(false)}
                        _hover={{
                            bg: 'purple.900'
                        }}
                    >
                        Tillbaka
                    </Button>
                    <Heading
                        w='100%'
                        lineHeight='40px'
                        textAlign='center'
                        size='lg'
                    >
                        Ny användare
                    </Heading>
                </Flex>
                <ScaleFade initialScale={0.9} in={true}>
                    <UserForm users={users} setShowForm={setShowForm} />
                </ScaleFade>
            </VStack>
        </Flex>
    )
}
