import React, { useState } from 'react'
import { Box, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, Heading, Input, InputField, Text } from '@gluestack-ui/themed';
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../config/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <>
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
    </>
  )
}