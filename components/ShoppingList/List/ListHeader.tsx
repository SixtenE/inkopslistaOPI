import { Button, Flex, Heading, Switch } from '@chakra-ui/react'

export default function ListHeader(props: any) {
    const { setUser, showDeleteIcon, setShowDeleteIcon } = props

    return (
        <Flex
            w='100%'
            h='40px'
            pos='relative'
        /* bg='pink.200' */
        >
            <Button
                pos='absolute'
                left='0'
                bg='purple.900'
                color='white'
                onClick={() => { setUser(null) }}
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
                Inköpslista
            </Heading>
            <Flex
                h='100%'
                pos='absolute'
                right='0'
                alignItems='center'
            >
                <Switch
                    size='lg'
                    colorScheme='red'
                    onChange={() => setShowDeleteIcon(!showDeleteIcon)}
                />
            </Flex>
        </Flex>
    )
}