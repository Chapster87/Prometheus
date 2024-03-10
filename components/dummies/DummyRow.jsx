import { HStack, Heading } from '@gluestack-ui/themed';

import DummyCard from './DummyCard';

function DummyRow({ title }) {
  return (
    <>
      {title && <Heading size="3xl" sx={headingSX}>{title}</Heading>}
      <HStack space="none" reversed={false} wrap={false}>
        {[...Array(10)].map((elementInArray, index) => 
          <DummyCard key={index} />
        )}
      </HStack>
    </>
  );
}

const headingSX = {
  marginBottom: '$6'
}

export default DummyRow;