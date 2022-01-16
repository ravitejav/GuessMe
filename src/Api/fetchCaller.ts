export const makeRequest = async (url: string, method: string, token: string, body?: any) => {

    const headers = {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
    }

    const options: RequestInit = {
        method: 'post',
        headers
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    const results = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.log(err))

    return results;
}