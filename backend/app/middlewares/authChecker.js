const authChecker = (req, res, next) => {
    // Vérifie que l'utilisateur actuel est bien celui de la session
    if (!req.session.user) {
        // then request  
        return res.status(403).send({
            error : {
                statusCode: 403,
                message: {
                    en:"Unauthorized to perform this action. Sign in and retry", 
                    fr:"Autorisation refusée pour cette opération. Se connecter puis réessayer"
                }
            }
        });
    }
    console.log(">> la session est bien associée à l'utilisateur");
    // if that's the case then move on
    next(); 
    
}; 

module.exports = authChecker; 