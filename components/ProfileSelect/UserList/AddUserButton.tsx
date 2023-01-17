import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react'

export default function UserCard(props: any) {
    const { setShowForm } = props

    return (
        <VStack
            mb='20px'
            mx='20px'
        >
            <IconButton
                onClick={() => setShowForm(true)}
                aria-label='Add user'
                icon={<AddIcon boxSize='8' color='white' />}
                borderRadius='10px'
                userSelect='none'
                w='100px'
                h='100px'
                boxShadow='md'
                bgGradient='linear(to-tr, purple.700, purple.600)'
                _hover={{}}
                _active={{
                    opacity: '0.7'
                }}
            />
            <Text
                fontWeight='semibold'
                textAlign='center'
            >
                Lägg till
            </Text>
        </VStack>
    )
}







