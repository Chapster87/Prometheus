import { useState, useEffect, useRef } from 'react';
import { Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalCloseButton, Text, View } from '@gluestack-ui/themed';
import Auth from './Auth'

function SiteLock() {
  const [showModal, setShowModal] = useState(true)
  const ref = useRef(null)
  
  useEffect(() => {
    // do something
  }, []);

  return (
    <View sx={{ width: '100vh', height: '100vh' }}>
      <Modal
        isOpen={showModal}
        closeOnOverlayClick={false}
        onClose={() => {
          setShowModal(false)
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Sign In For Site Access</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text mb="$5">If you have a user account, sign in and verify that your TMDB API Read Access Token is set.</Text>
            <Auth />
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
}

export default SiteLock;