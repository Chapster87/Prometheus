import { Dimensions } from "react-native";
import { Box, HStack, Heading } from '@gluestack-ui/themed';

import DummyCard from './DummyCard';

const { width, height } = Dimensions.get('window');

function DummyRow({ title, rowPadding }) {
  let defaultRowPadding = rowPadding ? rowPadding : '12';
  const cardWidth = (width / 10) - defaultRowPadding;

  return (
    <>
      {title && <Heading size="3xl" sx={headingSX}>{title}</Heading>}
      <HStack space="none" reversed={false} wrap={false}>
        {[...Array(10)].map((elementInArray, index) => 
          <Box key={index} sx={{ width: cardWidth }}>
            <DummyCard />
          </Box>
        )}
      </HStack>
    </>
  );
}

const headingSX = {
  marginBottom: '$6'
}

export default DummyRow;