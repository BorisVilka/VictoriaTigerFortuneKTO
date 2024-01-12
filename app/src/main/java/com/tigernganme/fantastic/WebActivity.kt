package com.tigernganme.fantastic



import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.net.http.SslError
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.Window
import android.view.WindowManager
import android.webkit.CookieManager
import android.webkit.RenderProcessGoneDetail
import android.webkit.SslErrorHandler
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.tigerganme.fantastic.databinding.ActivityWebBinding

class WebActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWebBinding
    private var webView: WebView? = null
    private val mUploadMessage: ValueCallback<Uri>? = null
    var uploadMessage: ValueCallback<Array<Uri>>? = null
    private val count = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
        super.onCreate(savedInstanceState)
        Log.d("TAG", "WEBVIEW CREATE")
        binding = ActivityWebBinding.inflate(layoutInflater)
        setContentView(binding.root)
        webView = binding.web
        if (savedInstanceState != null) webView!!.restoreState(savedInstanceState.getBundle("webViewState")!!)
        else {
            val manager = CookieManager.getInstance()
            manager.setAcceptCookie(true)
            val settings = webView!!.settings
            settings.setRenderPriority(WebSettings.RenderPriority.HIGH)
            settings.cacheMode = WebSettings.LOAD_NO_CACHE
            settings.setGeolocationEnabled(true)
            settings.allowContentAccess = true
            settings.blockNetworkLoads = false
            settings.blockNetworkImage = false
            settings.safeBrowsingEnabled = true
            settings.loadWithOverviewMode = true
            settings.setSupportMultipleWindows(false)
            settings.offscreenPreRaster = true
            // support html viewport
            settings.useWideViewPort = true
            settings.loadWithOverviewMode = true

            // support zoom control
            settings.builtInZoomControls = false
            settings.displayZoomControls = false

            // cache settings
            settings.domStorageEnabled = true
            settings.databaseEnabled = true
            settings.javaScriptCanOpenWindowsAutomatically = true
            settings.javaScriptEnabled = true
            webView!!.webChromeClient = object : WebChromeClient() {
                override fun onShowFileChooser(
                    webView: WebView,
                    filePathCallback: ValueCallback<Array<Uri>>,
                    fileChooserParams: FileChooserParams
                ): Boolean {
                    if (uploadMessage != null) {
                        uploadMessage!!.onReceiveValue(null)
                        uploadMessage = null
                    }
                    uploadMessage = filePathCallback
                    val intent = fileChooserParams.createIntent()
                    try {
                        startActivityForResult(intent, REQUEST_SELECT_FILE)
                    } catch (e: ActivityNotFoundException) {
                        uploadMessage = null
                        Toast.makeText(
                            applicationContext,
                            "Cannot Open File Chooser",
                            Toast.LENGTH_LONG
                        ).show()
                        return false
                    }
                    return true
                }
            }
            webView!!.webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest
                ): WebResourceResponse? {
                    return super.shouldInterceptRequest(view, request)
                }
                override fun onRenderProcessGone(
                    view: WebView?,
                    detail: RenderProcessGoneDetail?
                ): Boolean {
                    // binding.progressBar.visibility = View.GONE
                    return super.onRenderProcessGone(view, detail)
                }
                override fun onReceivedSslError(
                    view: WebView,
                    handler: SslErrorHandler,
                    error: SslError
                ) {
                }

                override fun onReceivedError(
                    view: WebView,
                    request: WebResourceRequest,
                    error: WebResourceError
                ) {
                }

                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    //binding.progressBar.visibility = View.VISIBLE
                    Log.d("TAG",request.url.toString())
                    return if (request.url.toString() == null || request.url.toString().startsWith("http://") || request.url.toString().startsWith("https://")) {
                        view.loadUrl(request.url.toString())
                        true
                    } else
                        try {
                            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(request.url.toString()))
                            view.context.startActivity(intent)
                            true
                        } catch (e: Exception) {
                            //if(request.url.toString().contains("uniwebview")) webView!!.loadUrl(getSharedPreferences("prefs", MODE_PRIVATE).getString("url", "")!!)
                            //else view.goBack()
                            Log.d("TAG", "shouldOverrideUrlLoading Exception:$e")
                            false
                        }
                }
                override fun onPageFinished(view: WebView?, url: String?) {
                    // binding.progressBar.visibility = View.GONE
                    CookieManager.getInstance().flush()
                }
                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    super.onPageStarted(view, url, favicon)
                    //binding.progressBar.visibility = View.GONE
                }
            }
            if(intent.getStringExtra("tmp")!=null) {
                webView!!.loadUrl(intent.getStringExtra("tmp")!!)
            } else {
                val url = getSharedPreferences("prefs",Context.MODE_PRIVATE).getString("link","")
                webView!!.loadUrl(url!!)
            }
        }
    }

    override fun onBackPressed() {
        if (webView!!.canGoBack()) webView!!.goBack() else super.onBackPressed()
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        if (requestCode == REQUEST_SELECT_FILE) {
            if (uploadMessage == null) return
            uploadMessage!!.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, intent))
            uploadMessage = null
        }
    }
    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        val bundle = Bundle()
        binding.web.saveState(bundle)
        outState.putBundle("webViewState", bundle)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        binding.web.restoreState(savedInstanceState)

    }
    companion object {
        const val REQUEST_SELECT_FILE = 100
        private const val FILECHOOSER_RESULTCODE = 1
    }
}