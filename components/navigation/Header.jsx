import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { Avatar, AvatarFallbackText, Box, Heading, HStack, Icon, LinkText, Menu, MenuItem, MenuItemLabel, Pressable, SettingsIcon, View } from '@gluestack-ui/themed';
import { CircleUserRound, LogOut, Menu as MenuIcon, Search, X } from 'lucide-react-native';
import { supabase } from '../../config/supabase'
import PrometheusIcon from '../svgs/PrometheusIcon';

function Header({ session }) {
  const [account, setAccount] = useState(session);
  const [menuState, setMenuState] = useState(mainNav);

  useEffect(() => {
    const handleResize = () => {
      setMenuState(mainNav);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function mobileMenuOpen() {
    setMenuState(mainNavMobileOpen);
  }

  function mobileMenuClose() {
    setMenuState(mainNav);
  }

  return (
    <>
      <StatusBar style="auto" />
      <Box grid='container-fluid' sx={{ position: 'sticky', zIndex: 10, top: 0, paddingTop: 10, marginBottom: 20 }}>
        <Box grid='row' sx={{ background: 'rgba(0, 0, 0, 0.6)' }}>
          <Box grid='col' columns='12'>
            <Box grid="container">
              <Box grid='row'>
                <Box grid='col' columns='12' sx={navStyles}>
                  <Box sx={navOpenBtn}>
                    <Pressable onPress={mobileMenuOpen}>
                      <Icon as={MenuIcon} size="2xl" color="$white" />
                    </Pressable>
                  </Box>
                  <Box sx={siteLogo}>
                    <Link href="/" style={logoContainer}>
                      <PrometheusIcon width={75} height={94} />
                      {/* <Heading style={logoText}>Prometheus</Heading> */}
                    </Link>
                  </Box>
                  <View sx={menuState}>
                    <Pressable sx={navCloseBtn} onPress={mobileMenuClose}>
                      <Icon as={X} size="2xl" color="$white" />
                    </Pressable>
                    <Link href="/" style={LinkSX}>
                      <LinkText sx={LinkTextSX}>Home</LinkText>
                    </Link>
                    {(account && account.user.user_metadata.xcUrl) &&
                      <Link href="/tv" style={LinkSX}>
                        <LinkText sx={LinkTextSX}>Live TV</LinkText>
                      </Link>
                    }
                    <Link href="/movies" style={LinkSX}>
                      <LinkText sx={LinkTextSX}>Movies</LinkText>
                    </Link>
                    <Link href="/series" style={LinkSX}>
                      <LinkText 
                        sx={{
                          ...LinkTextSX,
                          ":hover": {
                            borderBottomWidth: 3,
                            borderColor:'$borderLight200',
                          }
                        }}
                      >
                        Series
                      </LinkText>
                    </Link>
                  </View>
                  <HStack reversed={false} sx={SecondaryNavSX}>
                    <Link href="/search" style={LinkSX}>
                      <Icon as={Search} size="xl" color="$white" />
                    </Link>
                    {(session) ?
                      <>
                        <Menu
                          placement="bottom"
                          trigger={({ ...triggerProps }) => {
                            return (
                              <Pressable {...triggerProps}>
                                <Avatar bgColor="$green600" size="md" borderRadius="$full">
                                  <AvatarFallbackText>{`${session.user.user_metadata.firstName} ${session.user.user_metadata.lastName}`}</AvatarFallbackText>
                                </Avatar>
                              </Pressable>
                            )
                          }}
                        >
                          <MenuItem key="Settings" textValue="Settings" onPress={() => {window.location.href = '/account'}}>
                            <Icon as={SettingsIcon} size="sm" mr="$2" />
                            <MenuItemLabel size="sm">Settings</MenuItemLabel>
                          </MenuItem>
                          <MenuItem key="SignOut" textValue="Settings" onPress={() => supabase.auth.signOut()}>
                            <Icon as={LogOut} size="sm" mr="$2" />
                            <MenuItemLabel size="sm">Sign Out</MenuItemLabel>
                          </MenuItem>
                        </Menu>
                      </>
                      :
                      <Link href="/series" style={LinkSX}>
                        <Icon as={CircleUserRound} size="xl" mr="$2" color="$white"/>
                        <LinkText sx={LinkTextSX}>Sign In</LinkText>
                      </Link>
                    }
                  </HStack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const logoContainer = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  '@lg_up': {
    justifyContent: 'center',
    width: 'auto'
  }
}

const logoText = {
  minHeight: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
  textAlign: "center"
}

const navStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const navOpenBtn = {
  display: 'flex',
  justifyContent: 'center',
  height: 80,
  '@lg_up': {
    display: 'none'
  }
}

const navCloseBtn = {
  position: 'absolute',
  right: -45,
  top: 5,
  background: 'rgba(0, 0, 0, 0.94)',
  height: 40,
  width: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@lg_up': {
    display: 'none'
  }
}

const siteLogo = {
  display: 'flex',
  height: 80
}

const mainNav = {
  display: 'flex',
  height: '100vh',
  width: 280,
  maxWidth: '83%',
  gap: 20,
  position: 'fixed',
  top: 0,
  left: '-115%',
  transition: 'left 0.3s ease',
  background: 'rgba(0, 0, 0, 0.94)',
  padding: 20,
  zIndex: 10,
  '@lg_up': {
    gap: 75,
    height: 80,
    maxWidth: 'none',
    flexDirection: 'row',
    position: 'static',
    backgroundColor: 'transparent',
    padding: 0
  }
}

const mainNavMobileOpen = {
  ...mainNav,
  left: 0
}

const LinkSX = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  '@lg_up': {
    justifyContent: 'center',
    width: 'auto'
  }
}

const LinkTextSX = {
  color: '$white',
  fontSize: 24,
  fontWeight: '700',
  textDecoration: 'none',
  borderBottomWidth: 3,
  borderColor: 'transparent',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap'
}

const SecondaryNavSX = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 80,
  gap: 75
}

export default Header;