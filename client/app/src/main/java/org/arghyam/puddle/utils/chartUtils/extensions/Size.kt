package org.arghyam.puddle.utils.chartUtils.extensions

fun Float.spaceBetween(itemCount:Int, index:Int): Float {
    if (itemCount == 1)return 0f
    val itemSize = this / (itemCount - 1)
    val positions = (0 until itemCount).map { it * itemSize }
    val result = positions[index]
    return result
}