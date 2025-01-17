import React, { useState } from 'react'
import { Box, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, HStack, Pressable, Input, InputField, Text } from '@gluestack-ui/themed';
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../config/supabase'

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function demoAccount() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@pixelfoundry.app',
      password: 'demo',
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  // async function signUpWithEmail() {
  //   setLoading(true)
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   })

  //   if (error) Alert.alert(error.message)
  //   if (!session) Alert.alert('Please check your inbox for email verification!')
  //   setLoading(false)
  // }

  return (
    <>
      <Text mb="$5">If you have a user account, sign in and verify that your TMDB API Read Access Token is set.</Text>
      <HStack>
          <Pressable
            sx={activeTab === 'demo' ? tabActive : tab}
            onPress={() => setActiveTab('demo')}
          >
            <Text sx={{ color: activeTab === 'demo' ? '$primary0' : '$white' }}>Demo Account</Text>
          </Pressable>
          <Pressable
            sx={activeTab === 'signIn' ? tabActive : tab}
            onPress={() => setActiveTab('signIn')}
          >
            <Text sx={{ color: activeTab === 'signIn' ? '$primary0' : '$white' }}>Sign In</Text>
          </Pressable>
      </HStack>
      <Box sx={{ ...tabMain, display: activeTab === 'demo' ? 'block' : 'none' }}>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <Box sx={{ padding: 30 }}>
              <Button variant="gradient" disabled={loading} onPress={() => demoAccount()}>
                <ButtonText>View Demo</ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ...tabMain, display: activeTab === 'signIn' ? 'block' : 'none' }}>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <Box grid='row' mb="$5">
              <Box grid='col' columns='12'>
                <FormControl>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="email"
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                      placeholder="email@address.com"
                      autoCapitalize={'none'}
                    />
                  </Input>
                </FormControl>
              </Box>
            </Box>
            <Box grid='row'>
              <Box grid='col' columns='12' mb="$5">
                <FormControl>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      secureTextEntry={true}
                      placeholder="Password"
                      autoCapitalize={'none'}
                    />
                  </Input>
                </FormControl>
              </Box>
            </Box>
            <Box grid='row' mb="$3">
              <Box grid='col' columns='3'>
                <Button variant="gradient" disabled={loading} onPress={() => signInWithEmail()}>
                  <ButtonText>Sign In</ButtonText>
                </Button>
              </Box>
            </Box>
            {/* <View>
              <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View> */}
          </Box>
        </Box>
      </Box>
    </>
  )
}

const tab = {
  background: 'rgba(0, 0, 0, 0.8)',
  color: '$white',
  paddingVertical: 12,
  paddingHorizontal: 18
};

const tabActive = {
  background: 'rgba(0, 0, 0, 0.6)',
  paddingVertical: 12,
  paddingHorizontal: 18
};

const tabMain = {
  background: 'rgba(0, 0, 0, 0.6)',
  padding: 14,
  borderTopRightRadius: 6,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6
};