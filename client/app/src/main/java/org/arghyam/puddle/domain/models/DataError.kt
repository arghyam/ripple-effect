package org.arghyam.puddle.domain.models

sealed interface DataError : RootError {

    enum class Network : DataError {
        TOO_MANY_REQUESTS,      // HTTP 429
        NO_INTERNET,
        REQUEST_TIMEOUT,        // HTTP 408
        SERVER_ERROR,           // HTTP 500
        PAYLOAD_TOO_LARGE,      // HTTP 413
        BAD_REQUEST,            // HTTP 400
        UNAUTHORIZED,           // HTTP 401
        FORBIDDEN,              // HTTP 403
        NOT_FOUND,              // HTTP 404
        UNSUPPORTED_MEDIA_TYPE, // HTTP 415
        CONFLICT,               // HTTP 409
        INTERNAL_SERVER_ERROR,  // HTTP 500
        SERVICE_UNAVAILABLE,    // HTTP 503
        GATEWAY_TIMEOUT,        // HTTP 504
        SERIALIZATION,
        UNKNOWN
    }

    enum class Local : DataError {
        DISK_FULL,
        DATABASE_ERROR,
        FILE_NOT_FOUND,
        PERMISSION_DENIED
    }
}
