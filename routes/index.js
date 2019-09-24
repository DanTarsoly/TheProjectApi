const router = require('express').Router();

router.get('/', (req, res, next) => {
    const help = {
        message: 'Welcome to the-project-api',
        endpoints: {
            places: [
                'POST   ~/places      : Create new place',
                'GET    ~/places      : Read all the places',
                'GET    ~/places/{id} : Read the place with given ID',
                'PUT    ~/places/{id} : Update the place with given ID',
                'DELETE ~/places/{id} : Delete the place with given ID'
            ],
            users: [
                'POST   ~/users      : Create new user',
                'GET    ~/users      : Read all the users',
                'GET    ~/users/{id} : Read the user with given ID',
                'PUT    ~/users/{id} : Update the user with given ID',
                'DELETE ~/users/{id} : Delete the user with given ID'
            ],
            reviews: [
                'POST   ~/reviews      : Create new review',
                'GET    ~/reviews      : Read all the reviews',
                'GET    ~/reviews/{id} : Read the review with given ID',
                'PUT    ~/reviews/{id} : Update the review with given ID',
                'DELETE ~/reviews/{id} : Delete the review with given ID'
            ],
            auth: [
                'POST   ~/auth/register          : Register user with email and password',
                'POST   ~/auth/google            : Authenticate/register with Google',
                'POST   ~/auth/facebook          : Authenticate/register with Facebook',
                'GET    ~/auth                   : Authenticate with JWT',
                'GET    ~/auth/basic             : Authenticate with email and password',
                'GET    ~/auth/google/callback   : Callback URL for Google login',
                'GET    ~/auth/facebook/callback : Callback URL for Facebook login'
            ],
        }
    };
    return res.status(200).json( help );
});

module.exports = router;
