class ApiError extends Error {
    constructor (
        statusCode,
        errors = [],
        message = "Something went wrong",
        stack = ""

    ){
        super(message);
        
        this.statusCode = statusCode;
        this.message = message.error;
        this.success = false;
        this.errors = errors;

        if (stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}