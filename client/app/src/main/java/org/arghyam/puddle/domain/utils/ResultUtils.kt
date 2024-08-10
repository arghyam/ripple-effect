package org.arghyam.puddle.domain.utils

import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.models.RootError

suspend fun <T, E : RootError> Result<T, E>.handleResult(
    onSuccess: suspend (T?) -> Unit,
    onError: suspend (E?) -> Unit = {}
) {

    when (this) {
        is Result.Success -> onSuccess(
            this.data
        )

        is Result.Error -> onError(this.error)
    }
}