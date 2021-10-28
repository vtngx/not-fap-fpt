import * as jwt from 'jsonwebtoken'

const verifyToken = (token) => {
    return jwt.verify(token, 'b1/m4^.t', function(err) {
        if (err) return false

        // TODO: api verify userId
        // const userId = decoded.id

        return true
    })
}

export default verifyToken