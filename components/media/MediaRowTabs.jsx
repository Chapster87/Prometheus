import { useState } from 'react';

import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";

import MediaRow from './MediaRow'
import DummyRow from '../dummies/DummyRow';

function MediaRowTabs({ tabGroups, defaultTab, xcEnabled, session }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    (tabGroups) ?
        <>
          <HStack>
            {tabGroups.map((tabContent, index) => {
              return (
                <Pressable
                  sx={tabContent.id === activeTab ? tabActive : tab}
                  onPress={() => setActiveTab(tabContent.id)}
                  key={index}
                >
                  <Text sx={{ color: tabContent.id === activeTab ? '$primary0' : '$white' }}>{tabContent.title}</Text>
                </Pressable>
              )
            })}
          </HStack>
          {tabGroups.map((tabContent, index) => {
            return (
              <Box sx={{ ...tabMain, display: tabContent.id === activeTab ? 'block' : 'none' }} key={index}>
                <MediaRow
                  mediaData={tabContent.mediaData}
                  rowPadding='17.5'
                  xcEnabled={xcEnabled}
                  session={session}
                />
              </Box>
            )
          })}
        </>
    :
      <DummyRow rowPadding='17.5' />
  );
}

const tab = {
  background: 'rgba(0, 0, 0, 0.8)',
  color: '$white',
  paddingVertical: 12,
  paddingHorizontal: 18
};

const tabActive = {
  background: 'rgba(0, 0, 0, 0.6)',
  paddingVertical: 12,
  paddingHorizontal: 18
};

const tabMain = {
  background: 'rgba(0, 0, 0, 0.6)',
  padding: 14,
  borderTopRightRadius: 6,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6
};

export default MediaRowTabs;