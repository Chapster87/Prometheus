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