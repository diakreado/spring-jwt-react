
async function sendRequset(url : string, options : object) {
    const response = await fetch(url, options);
    const data     = await response.json();
    return           data;
}

async function sendRequsetWithAuth(url : string) {
    return await sendRequset(url, {
        headers : new Headers({
            'Authorization' : `Bearer ${localStorage.token}`,
        }),
    });
}

const exportFunctions = {
    sendRequset,
    sendRequsetWithAuth,
};
export default exportFunctions;
