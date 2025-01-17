import { useState, useEffect, useRef } from 'react';
import { Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalCloseButton, Text, View } from '@gluestack-ui/themed';
import Login from './session/Login'

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
            <Heading size="lg">Site Access</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Login />
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
}

export default SiteLock;