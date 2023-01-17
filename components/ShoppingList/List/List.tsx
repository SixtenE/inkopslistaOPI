import { Flex, Text } from '@chakra-ui/react'
import Items from './Items/Items'
//import ListHeader from './ListHeader'

export default function List(props: any) {
    const { user, items, yourList, updateItem, deleteItem, showDeleteIcon } = props

    return (
        <Flex
            w={{ base: '100%', md: '320px' }}
            direction='column'
            /* bg='blue.200' */
            px='10px'
            mt='10px'
        >
            <Flex w='100%'>
                <Text
                    fontSize='17px'
                    fontWeight='bold'
                >
                    {yourList ? 'Jag' : user.user_name}
                </Text>
            </Flex>
            {
                items.length > 0 ? (
                    <Items items={items} showDeleteIcon={showDeleteIcon} updateItem={updateItem} deleteItem={deleteItem} />
                ) : (
                    <Flex w='100%' justifyContent='center'>
                        <Text fontSize='17px' color='gray.500'>
                            {yourList ? 'Du' : user.user_name} har inte lagt till något än
                        </Text>
                    </Flex>
                )
            }
        </Flex>
    )
}