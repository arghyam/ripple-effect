package org.arghyam.puddle.utils.chartUtils.extensions

fun split(
    count: Int,
    minValue: Double,
    maxValue: Double,
):List<Double>{
    val step = (maxValue - minValue) / (count - 1)
    val result = (0 until count).map { (maxValue - it * step) }
    return result
}