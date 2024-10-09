package org.arghyam.puddle.utils.chartUtils.models

sealed class AnimationMode {
    data class Together(val delayBuilder: (index: Int) -> Long = { 0 }) : AnimationMode()
    data object OneByOne : AnimationMode()
}