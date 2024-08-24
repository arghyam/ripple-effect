package org.arghyam.puddle.data.dto.responses.signin

import org.arghyam.puddle.domain.models.User
import kotlinx.serialization.Serializable

@Serializable
data class UserInfo(
    val id: String,
    val name: String,
    val email: String
) {

    fun toUser(): User = User(id, name)

}