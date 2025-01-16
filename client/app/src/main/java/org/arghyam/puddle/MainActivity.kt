package org.arghyam.puddle


import android.content.SharedPreferences
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import org.arghyam.puddle.navigation.RootNavGraph
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.PuddleTheme
import org.koin.android.ext.android.inject

class MainActivity : ComponentActivity() {

    private val sharedPref by inject<SharedPreferences>()

    override fun onCreate(savedInstanceState: Bundle?) {

        enableEdgeToEdge()

        super.onCreate(savedInstanceState)

        val existingUserId = sharedPref.getString("userId", "")


        setContent {
            PuddleTheme {


                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color1
                ) {
                    RootNavGraph(startDestination = if (!existingUserId.isNullOrBlank()) Routes.AppGraph.route else Routes.Login.route)
                }
            }
        }
    }
}
