import { useState, useEffect } from 'react';
import { Box } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';

// initialize api engine
const spark = new Spark();

export default function Page() {
  const [account, setAccount] = useState();
  
  useEffect(() => {
  spark.getAccountInfo()
    .then(data => setAccount(data));
  }, []);

  return (
    <Box grid='container'>
      <Box grid='row'>
        <Box grid='col' columns='12'>
          <h1>Account Info</h1>
        </Box>
      </Box>
      {(account) &&
      <Box grid='row'>
        <Box grid='col' columns='12'>
          <h3>{account.message}</h3>
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