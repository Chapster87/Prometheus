import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Box, HStack, Link, LinkText } from '@gluestack-ui/themed';

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
            <HStack space="4xl" reversed={false} style={styles.nav}>
              <Link href="/" style={styles.navLink}>
                <LinkText size="lg" style={styles.navLinkText}>Home</LinkText>
              </Link>
              <Link href="/tv" style={styles.navLink}>
                <LinkText size="lg" style={styles.navLinkText}>Live TV</LinkText>
              </Link>
              <Link href="/movies" style={styles.navLink}>
                <LinkText size="lg" style={styles.navLinkText}>Movies</LinkText>
              </Link>
              <Link href="/series" style={styles.navLink}>
                <LinkText size="lg" style={styles.navLinkText}>Series</LinkText>
              </Link>
              <Link href="/account" style={styles.navLink}>
                <LinkText size="lg" style={styles.navLinkText}>Account</LinkText>
              </Link>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    height: 80
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navLinkText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Header;