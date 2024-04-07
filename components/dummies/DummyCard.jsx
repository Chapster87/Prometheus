import { Dimensions } from "react-native";
import { Box, Card } from '@gluestack-ui/themed';

import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

function DummyCard() {
  return (
    <>
      <Card sx={card} size="md" variant="elevated" m="$3">
        <Box sx={placeholderCardImg} color='$trueGray500'>
          <ImgPlaceholder width={120} height={40} />
        </Box>
      </Card>
    </>
  );
}

const card = {
  position: "relative",
  padding: 0
};

const placeholderCardImg = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'auto',
  aspectRatio: '2/3',
};

export default DummyCard;