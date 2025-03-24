import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url: url,
        data: reqBody,
        headers: reqHeader || { "Content-Type": "application/json" }  
    };

    return await axios(reqConfig)
        .then((result) => result)
        .catch((err) => err.response); 
};

