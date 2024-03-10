import { Dimensions } from "react-native";
import { Box, Card } from '@gluestack-ui/themed';

import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.1666666;
const cardAR = 400 / 660;
const cardHeight = cardWidth / cardAR;

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
  width: cardWidth,
  height: cardHeight
};

export default DummyCard;