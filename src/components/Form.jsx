import React from 'react'
import { 
Input, 
Stack, 
Box, 
FormControl, 
FormLabel, 
Button, 
Text, 
useDisclosure,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
 } from '@chakra-ui/react'

import { theme } from '../theme'
import { searchPerson, searchPersonById, findPreferencesByRole } from '../api'
import { useStore } from '../store'

import { useForm } from 'react-hook-form'

import ReCAPTCHA from 'react-google-recaptcha'

const recaptchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export const Form = () => {

    const { onClose, onOpen, isOpen } = useDisclosure()

    const { register, handleSubmit, formState : { errors, isSubmitting }} = useForm();

    // store state
    const setFirstNames = useStore(state => state.setFirstNames);
    const setSearchableDocuments = useStore(state => state.setSearchableDocuments);
    const setCellPhone = useStore(state => state.setCellPhone);
    const setEmail = useStore(state => state.setEmail);
    const setPartyID = useStore(state => state.setPartyID);

    const [token, setToken] = React.useState(false);

    const onSubmit = async (data) => {

        try {
            const result = await searchPerson({
                ...data,
                surname: data.surname.toUpperCase()
            });
            
            const userData = result.data.person[0];
    
            if (userData === undefined) {
                onOpen();
            }
            else {
                const person = await searchPersonById(userData.idNumber.number);
        
                const role = person.data.userRole.toLowerCase()
        
                const response = await findPreferencesByRole(role);
        
                setSearchableDocuments(response.data.searchableDocuments);
        
                setFirstNames(userData.firstNames);
                setCellPhone(userData.contactDetails.phones.phone[1].number)
                setEmail(userData.contactDetails.email);
                setPartyID(userData.partyID);
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    function reCaptchaOnChange(value) {
        if (value) {
            setToken(true);
        }
    }

    return (
        <>
            <Text
            fontWeight="light"
            fontSize="5xl"
            >
              Communication Preferences
            </Text>
            <Text
            color="gray.500"
            >
              If you have registered on the GEPF Self Service Portal, 
              please enter your details in order to configure your communication preferences.
            </Text>
            <Box mt={5}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>ID Number</FormLabel>
                            <Input
                            py={6}
                            borderRadius={0}
                            type="text"
                            {...register("idNo", { required: true })}
                            placeholder="Enter your ID number"
                            focusBorderColor="none"
                            />
                            {errors.idNo && <Text fontSize="sm" color="red">ID number is a required field</Text>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input                           
                            borderRadius={0}
                            type="date"
                            {...register("dateOfBirth", { required: true })}
                            placeholder="Enter your date of birth"
                            focusBorderColor="none"
                            />
                            {errors.dateOfBirth && <Text fontSize="sm" color="red">Date of birth is a required field</Text>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Surname</FormLabel>
                            <Input
                            py={6}
                            borderRadius={0}
                            type="text"
                            {...register("surname", { required: true })}
                            placeholder="Enter your surname"
                            focusBorderColor="none"
                            />
                            {errors.surname && <Text fontSize="sm" color="red">Surname is a required field</Text>}
                        </FormControl>
                        <Box
                        mt={3}
                        >
                            <ReCAPTCHA
                            sitekey={recaptchaSiteKey}
                            onChange={reCaptchaOnChange}
                            />
                        </Box>
                        <Box>
                            <Button type="submit" mt={5}
                            padding="30px 55px 30px 55px"
                            _focus={{
                                borderColor: theme.primaryColor
                            }}
                            disabled={!token}
                            isLoading={isSubmitting}
                            loadingText="Searching..."
                            borderRadius="0px"
                            bgColor={theme.primaryColor}
                            color="white"
                            colorScheme="red.400"
                            _hover={{bgColor: 'black'}}
                            >
                                <Text
                                fontWeight="light"
                                >
                                    Search
                                </Text>
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Box>

            {/* Error Modal */}
            <Modal
            isCentered
            isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Oops!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        We could not find the account you were looking for, please try again.
                    </Text>
                </ModalBody>

                <ModalFooter>                    
                    <Button
                    onClick={onClose}
                    bgColor={theme.primaryColor}
                    color="white"
                    _hover={{
                        bgColor: "black"
                    }}                    
                    fontWeight="light"
                    borderRadius="0px"
                    >Okay</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
