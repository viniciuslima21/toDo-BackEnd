const MacAddressValidation = (req, res, next) => {
    if (!req.params.macaddress)
        return res.status(400).json({ error: 'O macAddress é obrigatório!' });
    else 
        next();
};

module.exports = MacAddressValidation;