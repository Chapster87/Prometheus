import { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import { Box, Button, ButtonText, Heading, Text } from '@gluestack-ui/themed';
import { supabase } from '../../config/supabase'
import Auth from '../../components/Auth'
import Account from '../../components/Account';
import Spark from '../../components/Spark';

// initialize api engine
const spark = new Spark();

export default function Page() {
  const [session, setSession] = useState(null);
  const [account, setAccount] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    spark.getAccountInfo()
      .then(data => setAccount(data));
  }, []);

  return (
    <Box grid='container'>
      <Box grid='row'>
        <Box grid='col' columns='12'>
          <Heading size='3xl'>Account Info</Heading>
        </Box>
      </Box>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      {(account) &&
      <Box grid='row'>
        <Box grid='col' columns='12'>
          <Heading size='xl'>{account.message}</Heading>
          <hr/>
          <p><strong>Username:</strong> {account.username}</p>
          <p><strong>Password:</strong> {account.password}</p>
          <p><strong>Account Status:</strong> {account.status}</p>
          <p><strong>No. of Connections:</strong> {account.max_connections}</p>
          <p><strong>Expiration:</strong> {new Date(account.exp_date * 1000).toString()}</p>
          <p><strong>Created:</strong> {new Date(account.created_at * 1000).toString()}</p>
        </Box>
      </Box>
      }
    </Box>
  );
}