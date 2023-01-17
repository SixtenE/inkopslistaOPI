import { useEffect, useState } from 'react'
import { supabase } from '../lib/initSupabase'
import {
  Button,
  Box,
  HStack,
  Text,
  Grid,
  GridItem,
  IconButton,
  background,
} from '@chakra-ui/react'

/*import Title from '../components/Title'

import { AddIcon } from '@chakra-ui/icons'
import Avatar from '../components/Avatar'
import ProfileGrid from '../components/ProfileGrid'
import Userlist from '../components/Userlist'
import UserMenu from '../components/UserMenu' */

interface IUser {
  user_id?: string
  user_name?: string
}

export default function Home() {
  /* const [user, setUser] = useState(null)

  async function checkLocal() {
    const localUser = localStorage.getItem('user_id')

    if (localUser) {
      let { data, error } = await supabase.from('users').select('user_name, user_id').eq('user_id', localUser)

      if (error) console.log(error)

      if (data) {
        setUser(data[0])
      }
    }
  }

  function handleBub() {
    localStorage.removeItem('user_id')
    setUser(null)
  }

  useEffect(() => {
    checkLocal()
  }, [])
 */
  return (
    <>
      {
        /* user ? (
          <Box>
            <Button
              onClick={handleBub}
              size={'sm'}
              m={'10px 0 0 20px'}
            >
              Tillbaka
            </Button>
            <Userlist user={user} />
          </Box>
        ) : (
          <UserMenu setUser={setUser} />
        ) */
      }
    </>
  )
}

/*

[user, setUser] = {}

if !user {
  <ProfileMenu {user}>
} else {
  <ShoppingList>
}


*/

/*

[addNew, setAddNew] = {false}

if addNew {
  <AddForm>
} else {
  <AvatarGrid>
}

*/