package org.arghyam.puddle.presentation.waterfootprint_calculator

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.ParagraphStyle
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.auth.events.LoginEvent
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily

@Preview
@Composable
fun WFCOnboard1Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(80.dp)
            ) {
                Text(
                    text = "Hi there!", style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )

                Image(
                    modifier = Modifier.scale(2f),
                    painter = painterResource(id = R.drawable.puddle_logo),
                    contentDescription = "onboard_container",

                    )

                Text(
                    modifier = Modifier.fillMaxWidth(0.6f),
                    text = buildAnnotatedString {
                        append("As you may know, ")
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("water ")
                        }
                        append("is a ")
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("precious resource")
                        }
                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard2Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                    .align(Alignment.TopCenter)
                    .offset(y = 30.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(80.dp)
            ) {
                Text(
                    text = "How much water do you think an average human consumes everyday?", style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )

                Image(
                    modifier = Modifier
                        .scale(2.8f)
                        .offset(x = -20.dp),
                    painter = painterResource(id = R.drawable.twenty_liters),
                    contentDescription = "twenty liters"
                )

                Image(
                    modifier = Modifier
                        .scale(2.8f)
                        .offset(x = 20.dp, y = -30.dp),
                    painter = painterResource(id = R.drawable.eighty_liters),
                    contentDescription = "eighty liters"
                )

                Image(
                    modifier = Modifier
                        .scale(2.8f)
                        .offset(x = -10.dp, y = -45.dp),
                    painter = painterResource(id = R.drawable.treehundred_liters),
                    contentDescription = "treehundred liters"
                )

            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}


@Preview
@Composable
fun WFCOnboard3Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                    ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(80.dp)
            ) {
                Text(
                    text = buildAnnotatedString {
                        append("The average human consumes around\n")
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold, fontSize = 25.sp)) {
                            append("3000 litres\n")
                        }
                        append("of water everyday")
                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )

                Image(
                    modifier = Modifier.scale(2.8f),
                    painter = painterResource(id = R.drawable.surprised_span),
                    contentDescription = "surprised span"
                )


            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard4Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(50.dp)
            ) {

                Image(
                    modifier = Modifier.scale(2.8f),
                    painter = painterResource(id = R.drawable.water_ft_span),
                    contentDescription = "water ft span"
                )
                Text(
                    text = "is the amount of water use, direct and indirect to support human consumption activities",
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )




            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard5Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(80.dp)
            ) {

                Text(
                    text = buildAnnotatedString {
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("Direct water use\n")
                        }
                        append("in the household, like")
                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )

                Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                    Image(
                        modifier = Modifier
                            .scale(2.8f)
                            .offset(x = -20.dp),
                        painter = painterResource(id = R.drawable.coocking_span),
                        contentDescription = "coocking span"
                    )

                    Image(
                        modifier = Modifier
                            .scale(2.8f)
                            .offset(x = 20.dp, 0.dp),
                        painter = painterResource(id = R.drawable.cleaning_span),
                        contentDescription = "cleaning span"
                    )

                    Image(
                        modifier = Modifier
                            .scale(2.8f)
                            .offset(x = 20.dp, y = 30.dp),
                        painter = painterResource(id = R.drawable.flushing_span),
                        contentDescription = "flushing span"
                    )

                    Image(
                        modifier = Modifier
                            .scale(2.8f)
                            .offset(x = -20.dp, 30.dp),
                        painter = painterResource(id = R.drawable.bathing_span),
                        contentDescription = "bathing span"
                    )
                }

                Spacer(modifier = Modifier.height(0.dp))
                Text(
                    text = buildAnnotatedString {
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("Direct water use\n")
                        }
                        append("in the household, like")
                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )




            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard6Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(80.dp)
            ) {


                Text(
                    text = buildAnnotatedString {
                        append("The rest of it is in the form of ")
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("virtual or indirect water use")
                        }

                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )



            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard7Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(50.dp)
            ) {

                Image(
                    modifier = Modifier
                        .scale(2.8f)
                        ,
                    painter = painterResource(id = R.drawable.agri_sector_span),
                    contentDescription = "coocking span"
                )
                Text(
                    text = buildAnnotatedString {
                        append("accounts for ")
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("80-90% ")
                        }
                        append("of the virtual water use")
                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )



            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard8Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(80.dp)
            ) {

                Text(
                    text = buildAnnotatedString {
                        append("It takes a lot of water to grow, process and transport the ")
                        withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                            append("food ")
                        }
                        append("that you consume.")
                    },
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )





            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard9Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(50.dp)
            ) {

                Text(
                    text = "To reduce your water footprint, you need to",
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )

                Image(
                    modifier = Modifier
                        .scale(2.8f)
                    ,
                    painter = painterResource(id = R.drawable.be_mindful_span),
                    contentDescription = "be mindful span"
                )


            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}

@Preview
@Composable
fun WFCOnboard10Screen(

) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Text(
            modifier = Modifier.align(Alignment.End),
            text = "Skip",
            style = TextStyle(
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                fontFamily = openSansFontFamily,
                color = Color(0XFFDCE1DE)
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.wfc_onboard_container),
                contentDescription = "onboard_container"
            )
            Column(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                ,
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(50.dp)
            ) {

                Text(
                    text = "Let’s find out your diet water footprint!",
                    style = TextStyle(
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        fontStyle = FontStyle.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color(0XFFFFFFFF)
                    )

                )

                Button(
                    modifier = Modifier
                        .fillMaxWidth()
                    ,
                    onClick = {

                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0XFFEEF9BF),
                        contentColor = Color(0xFF216869)
                    ),
                    shape = RoundedCornerShape(15.dp)
                ) {
                    Text(
                        modifier = Modifier.fillMaxWidth(),
                        text = "Calculate Now",
                        style = TextStyle(
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 24.sp,
                            fontFamily = puddleFontFamily,
                            lineHeight = 21.79.sp,
                            textAlign = TextAlign.Center
                        )
                    )
                }


            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = 25.dp)
                .align(Alignment.CenterEnd), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.next_btn),
                    contentDescription = "next",
                    tint = Color.Unspecified
                )
            }

            IconButton(modifier = Modifier
                .size(65.dp)
                .offset(x = -25.dp)
                .align(Alignment.CenterStart), onClick = { /*TODO*/ }) {
                Icon(
                    modifier = Modifier.size(65.dp),
                    painter = painterResource(id = R.drawable.prev_btn),
                    contentDescription = "prev",
                    tint = Color.Unspecified
                )
            }
        }
    }

}