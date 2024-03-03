import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Link, LinkText } from '@gluestack-ui/themed';

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
            <Link href="/tv">
              <LinkText size="lg">Live TV</LinkText>
            </Link>
            <Link href="/movies">
              <LinkText size="lg">Movies</LinkText>
            </Link>
            <Link href="/series">
              <LinkText size="lg">Series</LinkText>
            </Link>
            <Link href="/account">
              <LinkText size="lg">Account</LinkText>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;