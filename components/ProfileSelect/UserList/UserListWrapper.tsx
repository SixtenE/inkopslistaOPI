import { Box, Flex, Heading, ScaleFade, Spinner, VStack } from '@chakra-ui/react'
import AddUserButton from './AddUserButton'
import UserCard from './UserCard'

export default function UserListWrapper(props: any) {
    const { users, setShowForm, setUser } = props

    const activeUsers = users.filter((user: any) => user.activated)

    return (
        <Flex
            justifyContent='center'
            p='4'
        >
            {
                users.length > 0 ? (
                    <VStack
                        mt={{ base: '50px', lg: '50px' }}
                        w='100%'
                    >
                        <Flex
                            h='40px'
                        >
                            <Heading
                                w='100%'
                                lineHeight='40px'
                                textAlign='center'
                                size='xl'
                            >
                                Välj användare
                            </Heading>
                        </Flex>

                        <ScaleFade initialScale={0.9} in={true}>
                            <Flex
                                w={{ base: '280px', sm: '420px', md: '560px' }}
                                wrap='wrap'
                                mt='30px'
                                justifyContent='space-evenly'
                            >
                                {
                                    activeUsers.map((user: any, index: number) => (
                                        <UserCard
                                            user={user}
                                            key={index}
                                            setUser={setUser}
                                        />
                                    ))
                                }
                                <AddUserButton setShowForm={setShowForm} />
                            </Flex>
                        </ScaleFade>
                    </VStack>
                ) : (
                    <Flex
                        h='90vh'
                        alignItems='center'
                    >
                        <Spinner size='xl' color='purple.900' thickness='5px' />
                    </Flex>
                )
            }
        </Flex >
    )
}
