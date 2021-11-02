export const authHeader = () => {
    let token = localStorage.getItem('token-a')

    if (token)
        return { 'Authorization': 'Bearer ' + token }
    else
        return {}
}

export const authHeaderStu = () => {
    let token = localStorage.getItem('token-s')

    if (token)
        return { 'Authorization': 'Bearer ' + token }
    else
        return {}
}