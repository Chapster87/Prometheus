import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Box, HStack, Link, LinkText, Pressable, Text } from '@gluestack-ui/themed';

function Header() {
  
  useEffect(() => {
    // do something
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Box grid='container'>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <HStack reversed={false} sx={NavSX}>
              {/* <Text>Prometheus</Text> */}
              <Link href="/" sx={LinkSX}>
                <LinkText>Home</LinkText>
              </Link>
              <Link href="/tv" sx={LinkSX}>
                <LinkText>Live TV</LinkText>
              </Link>
              <Link href="/movies" sx={LinkSX}>
                <LinkText>Movies</LinkText>
              </Link>
              <Link href="/series" sx={LinkSX}>
                <LinkText>Series</LinkText>
              </Link>
              <Link href="/account" sx={LinkSX}>
                <LinkText>Account</LinkText>
              </Link>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const NavSX = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  height: 80,
  gap: 75
}

const LinkSX = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  _text: {
    color: '$white',
    fontSize: 24,
    fontWeight: '700',
    textDecoration: 'none',
    borderBottomWidth: 3,
    borderColor: 'transparent',
    textTransform: 'uppercase'
  },
  ":hover": {
    _text: {
      borderBottomWidth: 3,
      borderColor:'$borderLight200',
    }
    
  }
}

export default Header;