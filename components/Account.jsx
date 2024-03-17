import { useState, useEffect } from 'react';
import { Box, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, Heading, Input, InputField } from '@gluestack-ui/themed';
import { supabase } from '../config/supabase'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tmdbApiKey, setTmdbApiKey] = useState('');
  const [tmdbApiRAT, setTmdbApiRAT] = useState('');
  const [xcUrl, setXcUrl] = useState('');
  const [xcUsername, setXcUsername] = useState('');
  const [xcPassword, setXcPassword] = useState('');


  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setFirstName(data.firstName)
          setLastName(data.lastName)
          setTmdbApiKey(data.tmdbApiKey)
          setTmdbApiRAT(data.tmdbApiReadAccessToken)
          setXcUrl(data.xcUrl)
          setXcUsername(data.xcUsername)
          setXcPassword(data.xcPassword)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])
  
  async function updateProfile(event) {
    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      firstName,
      lastName,
      tmdbApiKey,
      tmdbApiReadAccessToken: tmdbApiRAT,
      xcUrl,
      xcUsername,
      xcPassword,
      updated_at: new Date(),
    }

    async function updateDatabase() {
      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        alert(error.message)
      }
    }

    async function updateAuth() {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) {
        alert(error.message)
      }
    }

    updateDatabase();
    updateAuth();

    setLoading(false)
  }
  
  return (
    <>
      <Box grid='row' mb="$5">
        <Box grid='col' columns='3'>
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input isDisabled={true}>
              <InputField
                type="email"
                value={session.user.email}
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='3' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>First Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                placeholder="First Name"
              />
            </Input>
          </FormControl>
        </Box>
        <Box grid='col' columns='3' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Last Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                placeholder="Last Name"
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='3' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>XC Url</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => setXcUrl(text)}
                value={xcUrl}
                placeholder="XC Url"
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='3' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>XC Username</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => setXcUsername(text)}
                value={xcUsername}
                placeholder="XC Username"
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='3' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>XC Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                onChangeText={(text) => setXcPassword(text)}
                value={xcPassword}
                placeholder="XC Password"
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='6' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>TMDB API Key</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => setTmdbApiKey(text)}
                value={tmdbApiKey}
                placeholder="TMDB API Key"
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='6' mb="$5">
          <FormControl>
            <FormControlLabel mb="$1">
              <FormControlLabelText>TMDB API Read Access Token</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => setTmdbApiRAT(text)}
                value={tmdbApiRAT}
                placeholder="TMDB API Read Access Token"
              />
            </Input>
          </FormControl>
        </Box>
      </Box>
      <Box grid='row'>
        <Box grid='col' columns='2'>
          <Button variant="gradient" isDisabled={loading} onPress={() => updateProfile()}>
            <ButtonText>{loading ? 'Loading ...' : 'Update Profile'}</ButtonText>
          </Button>
          <Button variant="gradient" isDisabled={loading} onPress={() => supabase.auth.signOut()}>
            <ButtonText>{loading ? 'Loading ...' : 'Sign Out'}</ButtonText>
          </Button>
        </Box>
      </Box>
    </>
  )
}