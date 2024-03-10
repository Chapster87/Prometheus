import { Box, HStack, Spinner, Text } from '@gluestack-ui/themed';

function DummyHero() {
  return (
    <>
      <Box w="100%" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: "21 / 9" }}>
        <HStack space="md" sx={{ alignItems: 'center' }}>
          <Spinner size="large"/>
          <Text size="lg">Loading</Text>
        </HStack>
      </Box>
    </>
  );
}

export default DummyHero;