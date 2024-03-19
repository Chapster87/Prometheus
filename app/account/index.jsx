import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../components/session/AuthContext';
import { Box, Button, ButtonText, Heading, Text } from '@gluestack-ui/themed';
import Auth from '../../components/session/Login'
import Account from '../../components/Account';
import Spark from '../../components/Spark';

export default function Page() {
  const [session, setSession] = useContext(AuthContext);
  const [account, setAccount] = useState();

  // initialize api engine
  const spark = new Spark(session);

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      spark.getAccountInfo()
        .then(data => setAccount(data));
    }
  }, [session]);

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
          <Text>Username: {account.username}</Text>
          <Text>Password: {account.password}</Text>
          <Text>Account Status: {account.status}</Text>
          <Text>No. of Connections: {account.max_connections}</Text>
          <Text>Expiration: {new Date(account.exp_date * 1000).toString()}</Text>
          <Text>Created: {new Date(account.created_at * 1000).toString()}</Text>
        </Box>
      </Box>
      }
    </Box>
  );
}