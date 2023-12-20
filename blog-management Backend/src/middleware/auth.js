const jwt = require('jsonwebtoken');

//Authentication of every request weather it comes from Genuine user or not
const authentication = (request, response, next) => {

    try {
        const token = request.headers[token];

        if(!token) {
            return response.status(400).send({ status: false, message: "Token not found! " });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY, function (error, payload) {
            if (error) {
                return res.status(401).send({ status: false, message: err });
            } else {
                request.userId = payload.userId;
                next();
            }
        })
        
    } catch (error) {
        response.status(500).send({ status: false, message: err.message });
    }
};


//Authorization to access any Post
const authorization = async (request, response, next) => {
    try {
        const token = request.headers[token];
        if(!token){
            return response.status(400).send({status:false, message:"token not found!"});
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        if(!decodedToken){
            return response.status(401).send({status:false, message:"Inavalid token!"});
        }

        const id = request.params._id;
        const post = await postModel.findOne({_id:id});

        if(!post){
            return response.status(401).send({status:false, message:"post Not found!"});
        }
        if(decodedToken.userId != post.userId){
            return response.status(401).send({status:false, message:"Unauthorised access"});
        }
        next()
    } catch (error) {
        response.status(500).send({ status: false, message: err.message });
    }
};


module.exports = {authentication, authorization}