package org.arghyam.puddle.presentation.waterfootprint_calculator

//@OptIn(ExperimentalFoundationApi::class)
//@Preview
//@Composable
//fun WaterFtCalculatorScreen(
//    waterFtCalcViewModel: WaterFtCalcViewModel = koinViewModel(),
//    onNavigate: (String) -> Unit = {}
//) {
//
//    val selectedIngId = waterFtCalcViewModel.selectedIngredientId.intValue
//
//    val fetchIngredientsState = waterFtCalcViewModel.fetchIngredientsState.collectAsState()
//
//    val context = LocalContext.current
//
//    LaunchedEffect(key1 = true) {
//        waterFtCalcViewModel.onEvent(WaterFtCalcEvent.FetchIngredients)
//
//        waterFtCalcViewModel.eventFlow.collectLatest { event ->
//
//            when(event) {
//                is WaterFtCalcUiEvent.WaterFootprintCalculated -> {
//                    Toast.makeText(context, "Water Footprint Calculated", Toast.LENGTH_SHORT).show()
//                    onNavigate(Routes.CalculateResultScreen.route + "?" + "water_footprint=${event.result}")
//                }
//                is WaterFtCalcUiEvent.WaterFootprintCalculationFailed -> {
//                    Toast.makeText(context, "Water Footprint Calculation Failed", Toast.LENGTH_SHORT).show()
//                }
//
//                else -> Unit
//            }
//        }
//    }
//
//    Column(
//        modifier = Modifier
//            .fillMaxSize()
//            .background(color = Color(0XFF00072D))
//            .verticalScroll(rememberScrollState()),
//
//        ) {
//
//        Text(
//            modifier = Modifier.padding(horizontal = 10.dp, vertical = 10.dp),
//            text = "What did you eat\ntoday?",
//            style = TextStyle(
//                fontWeight = FontWeight.ExtraBold,
//                fontFamily = puddleFontFamily,
//                fontSize = 32.sp,
//                color = MaterialTheme.colorScheme.primary,
//                lineHeight = 35.2.sp
//            )
//        )
//
//        fetchIngredientsState.value.data.forEach { row ->
//            LayoutOne(
//                row = row,
//                selectedIngreId = selectedIngId,
//            ) {
//
//                row.patternItems.forEach { item ->
//
//                    Box(
//                        modifier = Modifier.layoutId(item.name),
//                        contentAlignment = Alignment.Center
//                    ) {
//
//                        AsyncImage(
//                            modifier = Modifier
//                                .scale(item.scaleFactor)
//                                .clickable(enabled = selectedIngId == 0) {
//                                    waterFtCalcViewModel.onEvent(
//                                        WaterFtCalcEvent.SelectIngredient(
//                                            item.id
//                                        )
//                                    )
//                                }
//                                .blur(if (selectedIngId != item.id && selectedIngId != 0) 3.dp else 0.dp),
//                            model = if (selectedIngId == item.id) "${BuildConfig.SERVER_URL}${item.selectedBgImageUrl.replace("xml", "png")}" else "${BuildConfig.SERVER_URL}${item.unselectedBgImageUrl.replace("xml", "png")}",
//                            contentDescription = item.name + "image",
//                        )
//                        Column(
//                            modifier = Modifier.blur(if (selectedIngId != item.id && selectedIngId != 0) 3.dp else 0.dp),
//                            horizontalAlignment = Alignment.CenterHorizontally,
//                            verticalArrangement = Arrangement.spacedBy(5.dp)
//                        ) {
//
//                            val existingAmt = waterFtCalcViewModel.findAmtOfIngredient(item.id)
//
//                            if (selectedIngId != item.id && (existingAmt == "0" || existingAmt.isNullOrBlank())) {
//                                AsyncImage(
//                                    modifier = Modifier
//                                        .size(
//                                            item.sampleImageSize.dp
//                                        ),
//                                    model = ImageRequest.Builder(context).data(R.drawable.ixd_vegetables).build(),
//                                    contentDescription = item.name + "image",
//                                )
//                            } else {
//                                BasicTextField2(
//                                    modifier = Modifier.width(40.dp),
//                                    enabled = selectedIngId == item.id,
//                                    value = if (selectedIngId == item.id) waterFtCalcViewModel.selectedIngredientAmt.value + item.unit else existingAmt + item.unit,
//                                    onValueChange = {
//                                        if (it != "-" && it != " " && it != "." && it != ",") {
//                                            waterFtCalcViewModel.onEvent(
//                                                WaterFtCalcEvent.ChangeAmt(
//                                                    item.id,
//                                                    it.trim(item.unit.last())
//                                                )
//                                            )
//                                        }
//                                    },
//                                    textStyle = TextStyle(
//                                        color = Color.White,
//                                        fontFamily = puddleFontFamily,
//                                        fontSize = if (selectedIngId == item.id && selectedIngId != 0) {
//                                            22.sp
//                                        } else {
//                                            if (selectedIngId == 0) {
//                                                22.sp
//                                            } else {
//                                                18.sp
//                                            }
//
//                                        }
//                                    ),
//                                    lineLimits = TextFieldLineLimits.SingleLine,
//                                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
//                                    cursorBrush = SolidColor(MaterialTheme.colorScheme.onPrimary)
//
//                                )
//                            }
//
//
//                            Text(
//                                text = item.name,
//                                style = TextStyle(
//                                    color = Color.White,
//                                    fontFamily = puddleFontFamily,
//                                    fontSize = 15.sp
//                                )
//                            )
//                        }
//
//
//                        if (item.id == selectedIngId) {
//                            IconButton(modifier = Modifier
//                                .offset(item.doneXOffSet.dp, item.doneYOffSet.dp)
//                                .scale(item.iconScaleFactor)
//                                .align(Alignment.TopCenter),
//                                onClick = {
//                                    waterFtCalcViewModel.onEvent(
//                                        WaterFtCalcEvent.DoneAndUnSelectIngredient(
//                                            item.id
//                                        )
//                                    )
//                                }) {
//                                Icon(
//                                    painter = painterResource(id = R.drawable.ic_done),
//                                    contentDescription = "done",
//                                    tint = Color.Unspecified
//                                )
//                            }
//
//                            IconButton(modifier = Modifier
//                                .offset(item.pluseXOffSet.dp, item.pluseYOffSet.dp)
//                                .scale(item.iconScaleFactor)
//                                .align(if (item.cornerType == CornerType.CENTER.name || item.cornerType == CornerType.LEFT.name) Alignment.CenterEnd else Alignment.CenterStart)
//                                ,
//                                onClick = {
//                                    waterFtCalcViewModel.onEvent(
//                                        WaterFtCalcEvent.IncrementAmt(
//                                            item.id
//                                        )
//                                    )
//                                }) {
//                                Icon(
//
//                                    painter = painterResource(id = R.drawable.ic_inc),
//                                    contentDescription = "add",
//                                    tint = Color.Unspecified
//                                )
//                            }
//
//                            IconButton(modifier = Modifier
//                                .offset(item.minusXOffSet.dp, item.minusYOffSet.dp)
//                                .scale(item.iconScaleFactor)
//                                .align(if (item.cornerType == CornerType.RIGHT.name || item.cornerType == CornerType.LEFT.name) Alignment.BottomCenter else Alignment.CenterStart),
//                                onClick = {
//                                    waterFtCalcViewModel.onEvent(
//                                        WaterFtCalcEvent.DecrementAmt(
//                                            item.id
//                                        )
//                                    )
//                                }) {
//                                Icon(
//                                    painter = painterResource(id = R.drawable.ic_dec),
//                                    contentDescription = "minus",
//                                    tint = Color.Unspecified
//                                )
//                            }
//                        }
//
//                    }
//
//
//
//                }
//
//            }
//
//
//
//
//        }
//
//        Spacer(modifier = Modifier.height(150.dp))
//        Row(
//            modifier = Modifier.padding(10.dp).fillMaxWidth(),
//            horizontalArrangement = Arrangement.End
//        ) {
//            Button(
//                shape = RoundedCornerShape(15.dp),
//                colors = ButtonDefaults.buttonColors(
//                    containerColor = Color5
//                ),
//                onClick = { waterFtCalcViewModel.onEvent(WaterFtCalcEvent.Complete)}
//            ) {
//                Text(
//                    text = "Done!",
//                    style = TextStyle(
//                        fontSize = 25.sp,
//                        fontFamily = puddleFontFamily,
//                        fontStyle = FontStyle.Normal,
//                        fontWeight = FontWeight.Bold,
//                        color = Color3
//                    )
//                )
//            }
//        }
//
//        Spacer(modifier = Modifier.height(100.dp))
//
//
//    }
//
//}