import { Box, Button, Flex, Heading, others, ScaleFade, Spinner, Switch, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/initSupabase'
import { v4 as uuidv4 } from 'uuid'

import Input from './List/Input'
import List from './List/List'
import ListHeader from './List/ListHeader'

export default function ShoppingList(props: any) {
    const { user, setUser, otherUsers } = props

    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<any>([])
    const [newItem, handleNewItem] = useState<any>(null)
    const [deletedItem, handleDeletedItem] = useState<any>(null)
    const [showDeleteIcon, setShowDeleteIcon] = useState<boolean>(false)

    const currentUserItems = items.filter((item: any) => item.author_id === user.user_id)
    const otherUserItems = items.filter((item: any) => item.author_id !== user.user_id)

    async function fetchItems() {
        const response = await fetch('/api/item', { method: 'GET' })
        const data = await response.json()
        setItems(data.data)
    }

    async function createItem(item_name: string) {
        const itemUUID = uuidv4()

        const itemObject = {
            item_id: itemUUID,
            author_id: user.user_id,
            item_name: item_name
        }

        handleNewItem({ ...itemObject, is_checked: false })

        const response = await fetch(`/api/item/`, {
            method: 'POST',
            body: JSON.stringify(
                itemObject
            ),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    async function updateItem(item_id: string, is_checked: boolean) {
        const response = await fetch(`/api/item/${item_id}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    is_checked: is_checked
                }
            ),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()
        return fetchItems()
    }

    async function deleteItem(item_id: string) {
        handleDeletedItem(item_id)
        const response = await fetch(`/api/item/${item_id}`, {
            method: 'DELETE'
        })
    }

    useEffect(() => {
        fetchItems().then(() => {
            setLoading(false)
        })

        const itemListener = supabase
            .channel('public:items')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'items' },
                (payload: any) => {
                    if (payload.new.author_id !== user.user_id) {
                        fetchItems()
                    }
                }
            )
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'items' },
                (payload: any) => {
                    fetchItems()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(itemListener)
        }
    }, [])

    useEffect(() => {
        if (newItem) setItems((prev: any) => [...prev, newItem])
    }, [newItem])

    useEffect(() => {
        if (deletedItem) setItems(items.filter((item: any) => item.item_id !== deletedItem))
    }, [deletedItem])

    return (
        <Flex
            w={{ base: '100vw', sm: '1100px' }}
            justifyContent='center'
            mb='500px'
        >
            <Flex
                w='100%'
                direction={{ base: 'column', md: 'row' }}
                justifyContent='space-between'
                wrap='wrap'

                p='4'
            >
                <ListHeader setUser={setUser} showDeleteIcon={showDeleteIcon} setShowDeleteIcon={setShowDeleteIcon} />
                {
                    !loading ? (
                        <ScaleFade initialScale={0.9} in={true}>
                            <Box mt='50px'>
                                <List
                                    items={currentUserItems}
                                    yourList={true}
                                    updateItem={updateItem}
                                    deleteItem={deleteItem}
                                    showDeleteIcon={showDeleteIcon}
                                />
                                <Input user={user} createItem={createItem} />
                            </Box>
                            {
                                otherUsers.map((otherUser: any) => (
                                    <Box key={otherUser.user_id}>
                                        <List
                                            user={otherUser}
                                            items={otherUserItems.filter((item: any) => item.author_id === otherUser.user_id)}
                                            yourList={false}
                                            updateItem={updateItem}
                                            deleteItem={deleteItem}
                                            showDeleteIcon={showDeleteIcon}
                                        />
                                    </Box>
                                ))
                            }

                        </ScaleFade>
                    ) : (
                        <Flex
                            h='90vh'
                            alignItems='center'
                            justifyContent='center'
                            p='4'
                        >
                            <Spinner size='xl' color='purple.900' thickness='5px' />
                        </Flex>
                    )
                }
            </Flex>
        </Flex >
    )
}