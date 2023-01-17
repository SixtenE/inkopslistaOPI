import { Box, Checkbox, Flex, IconButton, ScaleFade, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'

export default function ItemRow(props: any) {
    const { item, updateItem, deleteItem, showDeleteIcon } = props

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(item.is_checked)
    }, [item])

    function handleCheck() {
        setChecked(!checked)
        updateItem(item.item_id, !item.is_checked)
    }

    function handleDelete() {
        deleteItem(item.item_id)
    }

    return (
        <Flex
            w='100%'
            h='40px'

            borderTop='1px solid'
            borderColor='gray.400'
        >
            <Box w='90%'>
                <Text
                    casing='capitalize'
                    lineHeight='40px'
                    h='100%'
                    textDecoration={checked ? 'line-through' : 'none'}
                >
                    {item.item_name}
                </Text>
            </Box>
            <Flex
                w='10%'
            >
                <Box
                    ml='auto'
                    my='auto'
                >
                    <form>
                        {
                            showDeleteIcon ? (
                                <IconButton
                                    size='xs'
                                    bg='transparent'
                                    aria-label='delete'
                                    icon={<CloseIcon />}
                                    onClick={handleDelete}
                                />
                            ) : (
                                <Checkbox size='lg'
                                    colorScheme='green'
                                    isChecked={checked}
                                    onChange={handleCheck}
                                />
                            )
                        }
                    </form>
                </Box>
            </Flex>
        </Flex>
    )
}