package com.timetipping.compass

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews

class TodayRoutineWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) { appWidgetIds.forEach { update(context, appWidgetManager, it) } }
    companion object {
        fun refreshAll(context: Context) {
            val manager = AppWidgetManager.getInstance(context)
            val component = android.content.ComponentName(context, TodayRoutineWidgetProvider::class.java)
            manager.getAppWidgetIds(component).forEach { update(context, manager, it) }
        }
        private fun update(context: Context, manager: AppWidgetManager, widgetId: Int) {
            val preferences = context.getSharedPreferences(WIDGET_PREFS, Context.MODE_PRIVATE)
            val completed = preferences.getInt(KEY_COMPLETED, 0)
            val total = preferences.getInt(KEY_TOTAL, 0)
            val nextTitle = preferences.getString(KEY_NEXT_TITLE, "앱을 열어 오늘 루틴을 확인하세요") ?: "앱을 열어 오늘 루틴을 확인하세요"
            val views = RemoteViews(context.packageName, R.layout.widget_today_routine)
            views.setTextViewText(R.id.widget_progress, "$completed/$total 완료")
            views.setTextViewText(R.id.widget_next_routine, nextTitle)
            val openApp = PendingIntent.getActivity(context, 0, Intent(context, MainActivity::class.java).apply { flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP }, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
            views.setOnClickPendingIntent(R.id.widget_root, openApp)
            manager.updateAppWidget(widgetId, views)
        }
    }
}
