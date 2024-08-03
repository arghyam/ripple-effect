package org.arghyam.puddle

import android.app.Application
import org.arghyam.puddle.di.appModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin

class PuddleApplication: Application() {

    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidContext(this@PuddleApplication)
            androidLogger()
            modules(appModule)
        }
    }
}