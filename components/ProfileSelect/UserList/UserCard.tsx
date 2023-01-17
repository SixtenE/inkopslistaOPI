import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'

export default function UserCard(props: any) {
    const { user, setUser } = props

    const imageURL = `https://avatars.dicebear.com/api/initials/${user?.user_name}.png`

    return (
        <VStack
            mb='20px'
            mx='20px'
        >
            <Button
                onClick={() => setUser(user)}
                borderRadius='10px'
                overflow='hidden'
                userSelect='none'
                w='100px'
                h='100px'
                backgroundImage={imageURL}
                backgroundSize='cover'
                boxShadow='md'
                _hover={{}}
                _active={{
                    opacity: '0.7'
                }}
            />
            <Text
                fontWeight='semibold'
                textAlign='center'
            >
                {user?.user_name}
            </Text>
        </VStack>
    )
}
