import { Flex, ScaleFade, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import ItemRow from './ItemRow'

export default function Items(props: any) {
    const { items, updateItem, deleteItem, showDeleteIcon } = props

    const sortedItemsByName = items.sort((a: any, b: any) => a.item_name.localeCompare(b.item_name))
    const sortedItemsByStatus = sortedItemsByName.sort((a: any, b: any) => Number(a.is_checked) - Number(b.is_checked))

    return (
        <VStack
            w='100%'
            spacing='0'
        >
            {
                sortedItemsByStatus.map((item: any, index: number) => (
                    <ItemRow
                        key={index}
                        item={item}
                        showDeleteIcon={showDeleteIcon}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                    />
                ))
            }
        </VStack>
    )
}