class ApiResponse extends Error {
  constructor(status, error, message, data) {
    super()
    this.status = status
    this.error = error
    this.message = message
    this.data = data
  }

  static OK(message, data) {
    return new ApiResponse(200, false, message, data)
  }
  
  static BadRequest(message, data) {
    return new ApiResponse(400, true, message, data)
  }

  static Unauthorized(message, data) {
    return new ApiResponse(401, true, message, data)
  }

  static Forbidden(message, data) {
    return new ApiResponse(403, true, message, data)
  }

  static NotFound(message, data) {
    return new ApiResponse(404, true, message, data)
  }
}

export default ApiResponse
