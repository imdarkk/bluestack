import React, {useState, useEffect} from "react";
import { Container, Box, Flex, Text, Button, Select as ChakraSelect, RadioGroup, Radio } from "@chakra-ui/react";
import Select from 'react-select'
import '../styles/checklist-overwrites.scss';

const ACInstallCheck = () => {
    const options = [{label: 'Haier', value: 'haier'}, 
                     {label: 'Chigo', value: 'chigo'},
                     {label: 'LG', value: 'lg'},
                     {label: 'Hyundai', value: 'hyundai'},
                     {label: 'Samsung', value: 'samsung'},
                     {label: 'Omnys', value: 'omnys'},
                     {label: 'Daewoo', value: 'daewoo'},
                     {label: 'Ikon', value: 'ikon'}, 
                     {label: 'Toshiba', value: 'toshiba'},
                     {label: 'Midea', value: 'midea'},
                     {label: 'Gree', value: 'gree'}];
    return (
        <Flex justify="center" align="center" direction="column">
            <Flex direction="column" mt={20}>
                <Text>Are there any tools missing?</Text>
                <RadioGroup name="missing-tools">
                    <Radio value='yes'>Yes</Radio>
                    <Radio value='no'>No</Radio>
                </RadioGroup>
            </Flex>
            <Flex direction="column">
                <Text>What brand was the AC?</Text>
                <Select options={options} isSearchable className="select-searchable" />
            </Flex>
            <Flex direction="column">
                <Text>What size was the AC?</Text>
                <ChakraSelect w="87vw" className="chakra-select">
                    <option>9000BTU</option>
                    <option>12000BTU</option>
                    <option>18000BTU</option>
                    <option>24000BTU</option>
                </ChakraSelect>
            </Flex>
        </Flex>
    );
};

export default ACInstallCheck;
