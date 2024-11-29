const options = async (req, res, next) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
            'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    };
    res.set(headers);
    next();
};

export default options;
