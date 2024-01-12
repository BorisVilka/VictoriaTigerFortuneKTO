package com.tigernganme.fantastic

import android.app.Application
import com.onesignal.OneSignal
import io.branch.referral.Branch

class MyApp: Application() {

    override fun onCreate() {
        super.onCreate()
        OneSignal.initWithContext(this)
        OneSignal.setAppId(ONESIGNAL_APP_ID)
        OneSignal.promptForPushNotifications()
        Branch.getAutoInstance(this)
        Branch.enableLogging()
    }

    private val ONESIGNAL_APP_ID = "b12a7041-0f42-4f3c-acbd-0251eec7d362"
}