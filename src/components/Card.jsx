import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import { FiCheck } from 'react-icons/fi'

import { useStore } from '../store'

export const Card = ({campaignName, id}) => {
    const [cardStyle, setCardStyle] = React.useState({
        bgColor: '',
        color: 'black',
        borderColor: 'gray.200',
        fontWeight: 'normal',
        display: 'none'
    });

    const addPreferenceId = useStore(state => state.addPreferenceId);

    return (
        <Box
        borderWidth="1px"
        borderRadius="5px"
        p={5}
        _hover={{boxShadow: "md"}}
        bgColor={cardStyle.bgColor}
        color={cardStyle.color}
        borderColor={cardStyle.borderColor}
        cursor="pointer"
        onClick={() => {

            addPreferenceId(id)

            if(cardStyle.bgColor === 'blue.900') {
                setCardStyle({
                    bgColor: '',
                    color: 'black',
                    borderColor: 'gray.200',
                    fontWeight: 'normal',
                    display: 'none'
                });
            }
            else {
                setCardStyle({
                    bgColor: 'blue.900',
                    color: 'white',
                    borderColor: '',
                    fontWeight: 'semibold',
                    display: ''
                })
            }
        }}
        >
            <Box
            display="flex"
            flex-direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
                <Text
                fontWeight={cardStyle.fontWeight}
                >
                    {campaignName}
                </Text>
                <Box
                bgColor={cardStyle.display === 'none' ? 'white' : 'blue.700'}
                borderRadius="50%"
                p={1}
                display={cardStyle.display}
                >
                    <FiCheck color="white" />
                </Box>
            </Box>
        </Box>
    )
}
