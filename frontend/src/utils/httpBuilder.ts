
async function sendRequset(url : string, options : object) {
    const response = await fetch(url, options);
    return           await response.json();
}

async function sendRequsetWithAuth(url : string) {
    return await sendRequset(url, {
        headers : new Headers({
            'Authentification' : `Bearer ${localStorage.token}`,
        }),
    });
}

const exportFunctions = {
    sendRequset,
    sendRequsetWithAuth,
};
export default exportFunctions;
