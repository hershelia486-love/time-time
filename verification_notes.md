# Browser Verification Notes

The public page opens successfully in a standard browser. The first revisit still showed the previous reflection screen without routines because an older service worker cache was controlling the page. The service worker cache version has been raised to `ttc-pwa-v2`; the next verification must use a cache-busting URL to confirm the updated routine screen is fetched.

The cache-busting route now loads the updated Today page and shows the routine summary. The Reflection tab renders a routine creation form, weekly/monthly/yearly starter routines, progress bars, completion counts, and individual “달성 기록 추가” controls.

The current full-screen route renders an accessible top-right full-screen control. Activating it switches the page to a widened layout while keeping the bottom navigation available.

The calendar update renders a fifth navigation tab, monthly grid view, overall and four-area completion percentages, date-specific item creation controls, status selectors, and delete buttons for records.

An added test task appeared immediately in the selected date list, increased the calendar day count, and changed the planned-work total, confirming local add and progress aggregation behavior.

The focused home screen now shows a single next action followed by collapsible past, today, and future task summaries plus collapsible weekly, monthly, and yearly routine summaries. A collapsed past-record group was opened successfully during verification.

The reflection screen renders weekly, monthly, and yearly routine sections with completion, edit, and delete controls, as well as a three-prompt reflection form and an initially empty saved-reflection list.

A three-prompt reflection was saved into the history list with edit and delete controls. Selecting edit repopulated all three form fields and switched the save action into reflection-update mode.

The EDO tool view displayed its recommended use case, a three-step exercise, the guided writing prompt, and record-save control; the same structured guide is available for all ten tools.

After the cache-version update, the public tools screen still rendered all ten tools, and the project view rendered its newly added edit and delete controls.

The latest project screen continued to render the create form and inline edit/delete controls for existing projects after the record-management update.

The focused command-center home screen rendered four area shortcuts, a one-action focus card, priority metadata, and compact past/today/future lists. Selecting the personal area immediately filtered the focus card, achievement summary, and today list to personal records.

The calendar now renders area, time-horizon, status, and priority filters above the month view. Selecting the personal-area filter reduced the quick-results list and filter-result statistics from three records to two personal records.

The redesigned tools screen presented a single featured tool, a random-pick action, a collapsible full library, and a saved-record section. The random-pick action changed the featured tool from expert sourcing to EDO and opened the EDO guided writing sheet.

The calendar verification now confirms that the weekday view renders a seven-day board with date-specific task summaries, fixed/non-fixed routine placeholders, vertical cards, and a horizontally scrollable alternative layout for narrow screens. A valid date selected through the picker changed the selected entry date to 2026-08-25 and moved the weekday board to 8/24–8/30.

The schedule cards now render both “하루 당기기” and “하루 미루기” actions. Triggering “하루 미루기” opened the native confirmation flow before a date mutation could occur. A routine-statistics callback issue that caused a blank first render was corrected, and the cache was advanced to `ttc-pwa-v7` to prevent the pre-fix script from being served to existing PWA installations.

The routine creation screen displays the cadence, target count, fixed/non-fixed type, and fixed weekday fields. Opening an existing routine’s edit sheet additionally displays the current fixed/non-fixed setting, weekday, and an explicit active/inactive selection, while each routine card exposes a direct planned/in-progress/completed status selector.

Opening “비고정 루틴 선택” for 2026-08-21 displayed each active non-fixed routine with an “이 날짜에 선택” control. Selecting “주간 성찰” immediately changed the control to “선택 해제” and added a selectable routine row with a completion control to the Friday week card.

The completed weekly routine row was verified with the `state-completed` class, a gold stripe background, and the `✓ 완료` stamp pseudo-element, confirming that the requested gold completion indicator is applied in the rendered calendar.

The new routine tab rendered a dedicated today-routine summary, a Monday-to-Sunday routine count strip, the full weekly/monthly/yearly routine list, and a six-item bottom navigation. A test weekly routine named “월수금 스트레칭” was saved after selecting Monday, Wednesday, and Friday. It immediately displayed as “월·수·금요일 고정”, appeared in the Friday today summary, and raised the counts for all three selected weekdays in the same week strip.

The redesigned today screen rendered a single next-action card, the day’s task timeline, today-routine summary, a project action card, a direct tool card, a reflection card, area progress, and collapsed historical details. Selecting the tool card opened the independent EDO tool-writing screen with its guide and saving field, confirming the main-to-tool link without merging their separate data flows.

The updated today board rendered visible `⋮⋮` handles and a planned/in-progress/completed drop board. A simulated long-press drag of a task to the in-progress zone persisted the task status as `progress`. In the weekday calendar, a second simulated long-press drag of the same task from Friday to the Saturday date card persisted its date as 2026-08-22.

The fixed “월수금 스트레칭” test routine was dragged from Wednesday to Tuesday; its stored `fixedWeekdays` changed from Monday/Wednesday/Friday to `[0, 1, 4]`, confirming a true weekday move rather than an accidental duplicate. Two Friday tasks were also reordered by dragging the second card above the first; the saved order changed to “핵심 프로젝트 20분 점검” followed by “이번 주 가치 시간 정하기”.

The routine tab now rendered individual day status selectors with planned, in-progress, completed, and postponed options. Marking the Friday exercise routine as completed changed only Friday to completed and showed a weekly result of 1/3 days completed; Monday and Tuesday remained planned. Postponing the Friday reflection routine marked Friday as postponed, increased the postponed count to 1 day, and scheduled the same routine for Saturday without marking it completed.

The final v10 home view removed the separate “④ 끌어 놓기로 상태 변경” board. It now shows a compact “③ 주간 루틴” card with per-routine status selectors and a direct link to the full weekly routine check. The expandable area guide correctly displayed plain-language meanings and examples for personal, career, people, and leisure. No browser console errors were present in the final view.

The simplified routine settings view showed monthly routines as “매월 1일” and yearly routines as “매년 1월 1일,” with matching notices explaining when they will appear in today’s list. A new unscheduled weekly routine appeared under “오늘 실천할 비고정 루틴 추가”; the button persisted the current date in its `scheduledDates`, confirming that non-fixed routines can be deliberately added to today and then checked alongside fixed routines.

The project status editor accepted a deadline of 2026-10-15, a progress state, and 35% manual progress. After saving, the project card displayed “마감까지 55일 · 2026-10-15” and “35% 진행,” confirming that deadline and project progress values persist and render correctly.

The final v11 home view displayed a mixed list of fixed and non-fixed routines with per-day status controls, explicit monthly and yearly dates in the collapsed routine lists, and the project’s 35% progress plus deadline. The final browser console check had no output.

The v12 routine tab displayed the persistent “위로” and “아래” controls above the bottom navigation. In the long routine screen, “아래” moved the viewport to the document end and “위로” returned it to the top successfully.
