import axios from 'axios'

const searchPersonURL = 'https://apigateway.gpaatest.gov.za/person-details/api/v1/person/search'
const searchPersonByIdURL = 'https://apigateway.gpaatest.gov.za/person-details/api/v1/person/integration/profile/idnumber/'
const findPreferencesByRoleURL = 'https://apigateway.gpaatest.gov.za/Gpaa-Business-Service/gpaa-communication-service/api/v1/campaign/searchable/self/service/list/role/'

export async function searchPerson(data) {
    try {
        const response = await axios.post(searchPersonURL, data);
        return response;
    } catch (error) {
        return error;        
    }
}

export async function searchPersonById(idNo) {
    try {
        const response = await axios.get(`${searchPersonByIdURL}${idNo}`);
        return response;
    } catch (error) {
        return error; 
    }
}

export async function findPreferencesByRole(role) {
    try {
        const response = await axios.get(`${findPreferencesByRoleURL}${role}`);
        return response;
    } catch (error) {
        return error; 
    }
}