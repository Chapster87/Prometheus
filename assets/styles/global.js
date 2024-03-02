// low-level global StyleSheet
import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
  // descriptions: style function that takes originalWidth, originalHeight as parameters and return
  // aspectRatio of originalWidth / originalHeight
  // params: originalWidth, originalHeight
  // returns: aspectRatio of originalWidth / originalHeight
  aspect_ratio: (originalWidth, originalHeight) => ({
    aspectRatio: originalWidth / originalHeight,
  }),
  wrappedHStack: {
    flexWrap: 'wrap'
  }
});