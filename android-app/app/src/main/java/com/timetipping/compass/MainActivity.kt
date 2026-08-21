package com.timetipping.compass

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject

class MainActivity : AppCompatActivity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val webView = findViewById<WebView>(R.id.time_tipping_webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.webViewClient = WebViewClient()
        webView.addJavascriptInterface(AndroidWidgetBridge(this), "AndroidWidgetBridge")
        webView.loadUrl("file:///android_asset/pwa/index.html")
    }
}

class AndroidWidgetBridge(private val activity: MainActivity) {
    @JavascriptInterface
    fun updateSummary(rawSummary: String) {
        try {
            val summary = JSONObject(rawSummary)
            activity.getSharedPreferences(WIDGET_PREFS, AppCompatActivity.MODE_PRIVATE).edit()
                .putInt(KEY_COMPLETED, summary.optInt("completed", 0))
                .putInt(KEY_TOTAL, summary.optInt("total", 0))
                .putString(KEY_NEXT_TITLE, summary.optString("nextTitle", "오늘의 루틴을 추가해 보세요"))
                .apply()
            TodayRoutineWidgetProvider.refreshAll(activity)
        } catch (_: Exception) { }
    }
}

const val WIDGET_PREFS = "time_tipping_widget"
const val KEY_COMPLETED = "completed"
const val KEY_TOTAL = "total"
const val KEY_NEXT_TITLE = "next_title"
