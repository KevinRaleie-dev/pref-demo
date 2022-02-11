import React from 'react'
import { 
Heading, 
SimpleGrid, 
Box, 
Container, 
Text, 
Stack, 
Input, 
HStack,
Button,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
useDisclosure,
useToast,
Alert,
AlertIcon
} from '@chakra-ui/react'

import { Form } from './components/Form'
import { CustomSwitch } from './components/CustomSwitch'
import { theme } from './theme'

import { OTP_CONFIG } from './utils'

import { useStore } from './store'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

function App() {

  const { onClose, onOpen, isOpen } = useDisclosure()

  const toast = useToast()

  // form
  const {register, handleSubmit, setError, formState: { errors }} = useForm()

  // state store
  const firstNames = useStore(state => state.firstNames);
  const setFirstNames = useStore(state => state.setFirstNames);
  const searchableDocuments = useStore(state => state.searchableDocuments);
  const cellPhone = useStore(state => state.cellPhone);
  const email = useStore(state => state.email);

  const capitalizeFirstLetter = (firstName) => {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  }

  const handleToast = () => {
    toast({
      duration: 9000,
      position: 'top-right',
      status: 'success',
      isClosable: true,
      title: 'Preferences updated successfully.',
      description: "We've successfully updated your preferences."
    })
  }

  const formatName = (name) => name.split(' ').join('') + '-preferences';

  const onSubmit = (data) => {
    let verify = "09654"
    if (!data.otp) {
      setError("otp", {
        message: "This is a required field."
      }, {
        shouldFocus: true
      })
    }
    if (data.otp === verify) {
      onClose()
      handleToast();
    }
    setError("otp", {
      message: "Please enter a valid OTP number."
    }, { shouldFocus: true})
  }

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(OTP_CONFIG.apiSendOTP, {
        clientId: "website-gepf",
        functionType: "preference-list",
        otpType: "SMS",
        cellNumber: "0634140867",
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <SimpleGrid columns={2} spacing={5}>
        <Box mt={5}>
          <Container>
            <Form />
          </Container>
        </Box>       
          <Container>
            <Box mt={5} px={5} pb={5} overflowY="scroll">
              {
                firstNames ? <React.Fragment>
                   <motion.div
                    variants={{
                      hidden: {
                        opacity: 0
                      },
                      show: {                        
                        opacity: 1,
                        transition: {
                          delay: 0.5,
                          type: "spring",
                          stiffness: 100
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    >
                  <Stack spacing={5}>
                    <Box>
                      <Text
                      fontWeight="light"
                      fontSize="5xl"
                      >Hi {capitalizeFirstLetter(firstNames)}</Text>
                      <Text color="gray.500">Here are a few options for you to configure.</Text>

                      <Heading mt={5}
                      size="md"
                      color="gray.700">
                        Enable preferences on:
                      </Heading>
                    </Box>
                    <Stack spacing={2} align="center"> 
                      <CustomSwitch
                        id="email-preferences"
                        formLabel="Email address"
                        dataToDisplay={email}
                      />
                      <CustomSwitch
                        id="phone-preferences"
                        formLabel="Phone number"
                        dataToDisplay={cellPhone}
                      />
                    </Stack>
                    <Stack spacing={3}>
                    <Alert status='warning'>
                      <AlertIcon />
                      Enable preferences on the following:
                    </Alert>
                    {
                      searchableDocuments.map((item) => (
                        <CustomSwitch
                        key={item.id}
                        dataToDisplay={item.campaignName}
                        id={`${formatName(item.campaignName)}`}
                        />
                      ))
                    }                    
                    </Stack>
                    <HStack>
                      <Button
                      fontWeight="light"                  
                      borderRadius="0px"
                      onClick={() => setFirstNames('')}
                      >
                        Cancel
                      </Button>
                      <Button
                      fontWeight="light"
                      onClick={onOpen}                                  
                      bgColor={theme.primaryColor}
                      colorScheme={theme.primaryColor}
                      color="white"
                      borderRadius="0px"
                      >
                        Save
                      </Button>
                    </HStack>
                  </Stack>
                </motion.div>

                  {/* Save Modal */}
                  <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  isCentered
                  closeOnOverlayClick={false}
                  motionPreset="slideInBottom"
                  >
                    <ModalOverlay />
                      <ModalContent>
                      <ModalHeader>Confirm Changes</ModalHeader>
                      <ModalCloseButton />
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                          <Text
                          color="gray.700"
                          >                  
                            Please enter the OTP number we've just sent you in order to verify and save your changes.
                          </Text>
                          <Input
                          mt={5}
                          type="number"
                          borderRadius="0px"
                          focusBorderColor="none"
                          {...register("otp", { required: true })}
                          placeholder="Enter OTP number"
                          />                    
                          {errors.otp && <Text fontSize="sm" color="red">{errors.otp.message}</Text>}
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            mr={2}
                            fontWeight="light"
                            borderRadius="0px"
                            onClick={onClose}
                          >    
                            Cancel
                          </Button>
                          <Button
                          type="submit"
                          bgColor={theme.primaryColor}
                          colorScheme={theme.primaryColor}
                          color="white"
                          _hover={{
                            bgColor: 'black'
                          }}
                          borderRadius="0px"
                          fontWeight="light"
                          >Verify OTP</Button>
                        </ModalFooter>
                      </form>
                      </ModalContent>
                  </Modal>
                </React.Fragment>
                : null
              }
            </Box>
          </Container>
      </SimpleGrid>
    </React.Fragment>

  )
}

export default App
