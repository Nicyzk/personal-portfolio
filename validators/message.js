const { body, validationResult } = require('express-validator')

exports.validateMessage = [
    body('name').trim().isLength({min: 1}).withMessage("Please input your name!"),
    body('email').trim().normalizeEmail().isEmail().withMessage("Please enter a valid email address!"),
    body('subject').trim().isLength({min: 1}).withMessage("Please enter a subject!"),
    body('description').trim().isLength({min: 1}).withMessage("Please enter a description"),
]

exports.handleInvalidity = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errorMessage: errors.array()[0].msg
        })
    }
    next()
}