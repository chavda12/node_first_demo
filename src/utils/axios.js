const axios = require("axios");

const RestAPI = {
    get: async (url, params = {}, headers = {}) => {
        try {
          return  await axios.get(url, { params, headers });
            // return response.data;
        } catch (error) {
            // console.error(`GET request to ${url} failed:`, error);
            // throw error;
        }
    },

    post: async ({ url, data = {}, headers = {} }) => {
        try {
           return await axios.post(url, data, { headers });
            // if(response != '')
            // return response.data;
        } catch (error) {
            // if (error.response) {
            //     // The request was made and the server responded with a status code
            //     console.error(`Server responded with status ${error.response.status}`);
            //     console.error(error.response.data);
            // } else if (error.request) {
            //     // The request was made but no response was received
            //     console.error('No response received from server');
            //     console.error(error.request);
            // } else {
            //     // Something happened in setting up the request that triggered an Error
            //     console.error('Error setting up the request:', error.message);
            // }
            // throw error; // Re-throw the error for further handling
        }
    }
};

module.exports = RestAPI;