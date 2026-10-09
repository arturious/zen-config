user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("browser.tabs.closeTabByDblclick", true);
user_pref("browser.urlbar.trimURLs", true);
user_pref("browser.urlbar.trimWww", true);
user_pref("layout.css.backdrop-filter.enabled", false);
user_pref("ui.tooltipDelay", 0);
user_pref("widget.macos.native-popovers", false);
user_pref("widget.macos.native-context-menus", false);
user_pref("toolkit.zoomManager.zoomValues", "0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2,2.05,2.1,2.15,2.2,2.25,2.3,2.35,2.4,2.45,2.5,2.55,2.6,2.65,2.7,2.75,2.8,2.85,2.9,2.95,3,3.05,3.1,3.15,3.2,3.25,3.3,3.35,3.4,3.45,3.5,3.55,3.6,3.65,3.7,3.75,3.8,3.85,3.9,3.95,4,4.05,4.1,4.15,4.2,4.25,4.3,4.35,4.4,4.45,4.5,4.55,4.6,4.65,4.7,4.75,4.8,4.85,4.9,4.95,5");
user_pref("browser.cache.memory.capacity", 131072);
user_pref("browser.tabs.unloadOnLowMemory", false);
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.swipe.navigation-icon-start-position", -66);
user_pref("browser.swipe.navigation-icon-end-position", 0);
// Urlbar: bookmarks/history before search suggestions, and no "Search with…"
// heuristic row on top - the best bookmark/history match is the first row.
// hideHeuristic is experimental: check what Enter does with no row selected.
user_pref("browser.urlbar.showSearchSuggestionsFirst", false);
user_pref("browser.urlbar.experimental.hideHeuristic", true);
// Tab moves between results only, skipping each result's "..." menu button
// (still clickable; Shift+Delete removes a history result from the keyboard).
user_pref("browser.urlbar.resultMenu.keyboardAccessible", false);
// Cmd+T opens with an empty bar: Zen otherwise keeps what you typed (or the
// result you arrowed to) for 45s after Escape and puts it back on the next
// Cmd+T. 0 = clear right away.
user_pref("zen.urlbar.wait-to-clear", 0);
