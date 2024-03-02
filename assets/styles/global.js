// low-level global StyleSheet
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  // descriptions: style function that takes originalWidth, originalHeight as parameters and return
  // aspectRatio of originalWidth / originalHeight
  // params: originalWidth, originalHeight
  // returns: aspectRatio of originalWidth / originalHeight
  aspect_ratio: (originalWidth, originalHeight) => ({
    aspectRatio: originalWidth / originalHeight,
  })
});