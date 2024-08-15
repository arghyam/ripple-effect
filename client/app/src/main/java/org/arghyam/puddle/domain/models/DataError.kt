package org.arghyam.puddle.domain.models

sealed interface DataError: RootError {

    enum class Network: DataError {
        TOO_MANY_REQUESTS,
        NO_INTERNET,
        REQUEST_TIMEOUT,
        SERVER_ERROR,
        PAYLOAD_TOO_LARGE,
        SERIALIZATION,
        UNKNOWN
    }

    enum class Local: DataError {
        DISK_FULL
    }

}