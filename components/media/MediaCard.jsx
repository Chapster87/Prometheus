import { Dimensions, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Badge, BadgeText, Box, Card, Heading, Image } from "@gluestack-ui/themed"

const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.2;

function MediaCard({ mediaID, tmdbID, streamType, xcEnabled, name, image }) {

  const isSeries = (streamType === 'series');
  const mediaType = isSeries ? 'series' : 'movies';

  return (
    <Box key={tmdbID}>
      {(mediaID) ?
        <Link 
          href={{
            pathname: `/${mediaType}/${mediaID}`,
            params: { type: 'xc' }
          }}
        >
          <Card sx={card}>
            <Image
              style={styles.cardImage}
              resizeMode="cover"
              borderRadius="$md"
              alt={name}
              source={{
                uri: image,
              }}
            />
            <Heading style={styles.cardHeading}>{name}</Heading>
          </Card>
        </Link>
      :
        <Link 
          href={{
            pathname: `/${mediaType}/${tmdbID}`,
            params: { type: 'tmdb' }
          }}
        >
          <Card sx={card}>
            {xcEnabled &&
              <Badge style={styles.cardBadge} size="lg" bg="$amber400">
                <BadgeText style={styles.cardBadgeText} color="$white">Coming Soon</BadgeText>
              </Badge>
            }
            <Image
              style={styles.cardImage}
              resizeMode="cover"
              borderRadius="$md"
              alt={name}
              source={{
                uri: image,
              }}
            />
            <Heading style={styles.cardHeading}>{name}</Heading>
          </Card>
        </Link>
      }
    </Box>
  );
}

const card = {
  position: "relative",
  padding: 0,
  width: '100%',
  minHeight: '100%',
}

const styles = StyleSheet.create({
  cardImage: {
    width: imageWidth,
    height: 'auto',
    aspectRatio: '2/3',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  cardBadge: {
    position: "absolute",
    top: 16,
    left: 0,
    paddingVertical: 5,
    paddingHorizontal: 12,
    border: 0,
    zIndex: 10
  },
  cardBadgeText: {
    fontSize: 16,
    fontWeight: 700
  },
  cardHeading: {
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    textAlign: "center"
  }
});

export default MediaCard;