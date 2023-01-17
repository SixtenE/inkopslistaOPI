import { Input, Box, FormLabel } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function ItemInput(props: any) {
    const { createItem } = props

    const [inputValue, setInputValue] = useState<string>('')

    async function onAddItem(event: React.FormEvent) {
        event.preventDefault()

        if (inputValue === '') return

        createItem(inputValue)
        setInputValue('')
    }


    return (
        <Box>
            <form onSubmit={onAddItem}>
                <Input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
            </form>
        </Box>
    )
}