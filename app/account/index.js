import { useState, useEffect } from 'react';
import { Text, Pressable } from "react-native";
import { Link } from 'expo-router';
import Player from '../../components/Player';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// initialize player line api
const player = new Player();

export default function Page() {
  const [account, setAccount] = useState();
  
  useEffect(() => {
  player.getAccountInfo()
    .then(data => setAccount(data));
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Link href="/" className={`btn btn-primary`} asChild>
              <Pressable>
                <Text>Home</Text>
              </Pressable>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container fluid className='account'>
        <Row>
          <Col>
            <h1>Account Info</h1>
          </Col>
        </Row>
        {(account) &&
        <Row>
          <Col xs='12'>
            <h3>{account.message}</h3>
            <hr/>
            <p><strong>Username:</strong> {account.username}</p>
            <p><strong>Password:</strong> {account.password}</p>
            <p><strong>Account Status:</strong> {account.status}</p>
            <p><strong>No. of Connections:</strong> {account.max_connections}</p>
            <p><strong>Expiration:</strong> {new Date(account.exp_date * 1000).toString()}</p>
            <p><strong>Created:</strong> {new Date(account.created_at * 1000).toString()}</p>
          </Col>
        </Row>
        }
      </Container>
    </>
  );
}