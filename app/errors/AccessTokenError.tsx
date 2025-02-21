class AccessTokenError extends Error {
    public statusCode: number;
    public errorCode: string;
  
    constructor(message: string, statusCode: number, errorCode: string) {
      super(message);
      this.name = 'AccessTokenError'; // Set the name of the error
      this.statusCode = statusCode; // Custom property for HTTP status code
      this.errorCode = errorCode; // Custom property for error code
      Object.setPrototypeOf(this, AccessTokenError.prototype); // Restore prototype chain
    }

    // Type guard to check if an object is an AccessTokenError
    static isAccessTokenError(error: unknown): error is AccessTokenError {
        return (
        error instanceof AccessTokenError ||
        (error instanceof Error && error.name === 'AccessTokenError')
        // (error.name === 'AccessTokenError')
        );
    }
  }
  
  export default AccessTokenError;