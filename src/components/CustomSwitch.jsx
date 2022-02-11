import React from 'react';

import {
FormControl,
Box,
FormLabel,
Text,
Switch,
Divider
} from '@chakra-ui/react'

export const CustomSwitch = ({
    id,
    formLabel,
    dataToDisplay,
}) => {

    return (
        <>
            <FormControl 
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            >
                <Box>
                {formLabel === "" ? <></> : 
                    <FormLabel htmlFor={id}>
                        {formLabel}
                    </FormLabel>
                }
                <Text>
                    {dataToDisplay}
                </Text>
                </Box>
                <Switch size="lg" id={id} colorScheme="green" />
            </FormControl>
            <Divider />
        </>
    );
}