<Box grid="row">
  <Box grid="col" columns='12' columnsMd='9'>
    <Tabs defaultValue={`tab-1`}>
      <TabsTabList>
        {xcData.seasons.map((season, index) => 
          <TabsTab value={`tab-${season.season_number}`} key={season.id}>
              <TabsTabTitle color='$white'>{season.name}</TabsTabTitle>
          </TabsTab>
          )}
      </TabsTabList>
      <TabsTabPanels>
        {xcData.seasons.map((season, index) => {
        let episodeIndex = xcData && xcData.episodes.length && xcData.episodes[0].length > 0 ? index : index + 1;
          return (
          <TabsTabPanel value={`tab-${episodeIndex}`} key={season.id} sx={{ marginTop: 20 }}>
            {(xcData.episodes[episodeIndex]) &&
              xcData.episodes[episodeIndex].map(episode => {
                // http(s)://domain:port/series/username/password/streamID.ext
                const episodeURL = `${spark.config.xcUrl}/series/${spark.config.xcAuth.username}/${spark.config.xcAuth.password}/${episode.id}.${episode.container_extension}`;
                return (
                  <Box grid='row' key={episode.id} sx={{ marginBottom: 20 }}>
                      <Box grid='col' columns='12' columnsMd='6' columnsLg='3'>
                        <Image
                            borderRadius="$none"
                            alt={episode.title}
                            sx={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                            source={{
                            uri: episode.info.movie_image
                            }}
                        />
                        <Button onPress={() => handleShow(episodeURL)} ref={ref}>
                            <ButtonText>Show Modal</ButtonText>
                        </Button>
                      </Box>
                      <Box grid='col' columns='12' columnsMd='6' columnsLg='9'>
                        <Heading size='xl'>{episode.title}</Heading>
                        <VStack space="md" reversed={false}>
                            <Box><Text><strong>Runtime:</strong> {episode.info.duration}</Text></Box>
                            <Box><Text><strong>Rating:</strong> <strong>{episode.info.rating}</strong> / 10</Text></Box>
                            <Box><Text>{episodeURL}</Text></Box>
                            <Box><Text>{episode.info.plot}</Text></Box>
                        </VStack>
                      </Box>
                  </Box>
                )
              }
            )}
          </TabsTabPanel>
          )
        })}
      </TabsTabPanels>
    </Tabs>
  </Box>
</Box>