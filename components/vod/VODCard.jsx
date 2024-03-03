import { Dimensions, StyleSheet } from "react-native";
import { Badge, BadgeText, Card, Image, Link, Heading, View } from "@gluestack-ui/themed"

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.1666666;
const cardAR = 400 / 660;
const cardHeight = cardWidth / cardAR;
const imageWidth = cardWidth;
const imageAR = 400 / 593;
const imageHeight = imageWidth / imageAR;

function VODCard({ mediaID, streamType, name, image }) {

  const isSeries = (streamType === 'series');
  const mediaType = isSeries ? 'series' : 'movies';

  return (
    <View
      style={styles.container}
      key={mediaID}
    >
      {(mediaID) ?
        <Link 
          href={`/${mediaType}/${mediaID}`}
          height="100%"
        >
          <Card style={styles.card}>
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
      <Card style={styles.card}>
        <Badge style={styles.cardBadge} size="lg" bg="$amber400">
          <BadgeText style={styles.cardBadgeText} color="$white">Coming Soon</BadgeText>
        </Badge>
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
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    minHeight: cardHeight,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  card: {
    position: "relative",
    padding: 0,
    height: "100%"
  },
  cardImage: {
    width: imageWidth,
    height: imageHeight,
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

export default VODCard;