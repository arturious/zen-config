user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("browser.urlbar.trimURLs", true);
user_pref("browser.urlbar.trimWww", true);
// CSS backdrop-filter blur off, everywhere - websites AND Zen's own UI (the
// compact-mode sidebar glass is blur(42px) via backdrop-filter, so the sidebar
// is see-through without blur now). Off for heat: heavy sites redraw their
// blurred headers/panels on the GPU on every scroll. true to bring it back.
user_pref("layout.css.backdrop-filter.enabled", false);
user_pref("ui.tooltipDelay", 0);
user_pref("layout.css.devPixelsPerPx", "1.8");
user_pref("zen.view.hide-window-controls", true);
user_pref("zen.view.experimental-no-window-controls", true);
user_pref("widget.macos.native-popovers", false);
user_pref("widget.macos.native-context-menus", false);
user_pref("toolkit.zoomManager.zoomValues", "0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2,2.05,2.1,2.15,2.2,2.25,2.3,2.35,2.4,2.45,2.5,2.55,2.6,2.65,2.7,2.75,2.8,2.85,2.9,2.95,3,3.05,3.1,3.15,3.2,3.25,3.3,3.35,3.4,3.45,3.5,3.55,3.6,3.65,3.7,3.75,3.8,3.85,3.9,3.95,4,4.05,4.1,4.15,4.2,4.25,4.3,4.35,4.4,4.45,4.5,4.55,4.6,4.65,4.7,4.75,4.8,4.85,4.9,4.95,5");
user_pref("browser.tabs.unloadOnLowMemory", true);
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
user_pref("browser.contentblocking.category", "strict");
user_pref("browser.uitour.enabled", false);
user_pref("security.OCSP.enabled", 0);
user_pref("privacy.antitracking.isolateContentScriptResources", true);
user_pref("security.csp.reporting.enabled", false);
user_pref("security.tls.enable_0rtt_data", false);
user_pref("browser.xul.error_pages.expert_bad_cert", true);
user_pref("media.memory_cache_max_size", 65536);
user_pref("browser.sessionstore.interval", 60000);
/** SPECULATIVE LOADING ***/
user_pref("network.http.speculative-parallel-limit", 0);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.dns.disablePrefetchFromHTTPS", true);
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.places.speculativeConnect.enabled", false);
user_pref("network.prefetch-next", false);
/** HTTPS-ONLY MODE ***/
user_pref("dom.security.https_only_mode", true);
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);
/** SAFE BROWSING ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("extensions.getAddons.cache.enabled", false);
/** TELEMETRY ***/
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.coverage.opt-out", true);
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("datareporting.usage.uploadEnabled", false);
/** CRASH REPORTS ***/
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
/** MOZILLA UI ***/
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("browser.discovery.enabled", false);
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.preferences.moreFromMozilla", false);
user_pref("browser.aboutConfig.showWarning", false);
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.aboutwelcome.enabled", false);
user_pref("browser.profiles.enabled", true);

user_pref("browser.compactmode.show", true);

/** AI ***/
user_pref("browser.ml.enable", false);
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.chat.menu", false);
user_pref("browser.tabs.groups.smart.enabled", false);
user_pref("browser.ml.linkPreview.enabled", false);
user_pref("browser.ai.control.default", "blocked");
/** TRANSLATIONS ***/
// Built-in translator off (its URL bar icon and "Translate this page?" popup
// go with it) - pages are translated with the TWP extension instead.
user_pref("browser.translations.enable", false);
/** FULLSCREEN NOTICE ***/
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
/** DOWNLOADS ***/
user_pref("browser.download.manager.addToRecentDocs", false);

/** PDF ***/
user_pref("browser.download.open_pdf_attachments_inline", true);

/** POWER ***/
// Pause video decoding in background tabs (default; was turned off here) -
// unwatched YouTube/Twitch tabs kept decoding and heating the Mac.
user_pref("media.suspend-bkgnd-video.enabled", true);

// Fullscreen video in its own Core Animation layer that macOS shows directly -
// cheaper for the GPU. Firefox's default on Apple Silicon ("consistently works
// well"); the old M1 problems with it (bugs 1733148, 1738926, 1774939) were
// fixed in 2021-2022.
user_pref("gfx.core-animation.specialize-video", true);

/** MEMORY ***/
// Back/forward cache: keep at most 4 left pages in memory (default -1 = auto,
// up to 8) - "Back" is instant for the last 4 pages, further back reloads.
user_pref("browser.sessionhistory.max_total_viewers", 4);
// No per-site process isolation (Fission): the biggest RAM saving, but weaker
// protection against Spectre-type attacks between sites. Delete to restore.
user_pref("fission.webContentIsolationStrategy", 0);
user_pref("dom.ipc.processCount", 4);

/** NETWORK & CACHE (Betterfox "Fastfox") ***/
user_pref("browser.cache.memory.capacity", 131072); // memory cache 128 MB
user_pref("network.http.max-persistent-connections-per-server", 10);
user_pref("network.http.pacing.requests.enabled", false); // don't hold back requests
user_pref("network.dnsCacheExpiration", 3600); // keep DNS answers 1 hour
user_pref("network.ssl_tokens_cache_capacity", 10240); // faster repeat TLS handshakes
user_pref("content.notify.interval", 100000); // fewer reflows while loading
user_pref("gfx.canvas.accelerated.cache-items", 32768);
user_pref("gfx.canvas.accelerated.cache-size", 4096);
user_pref("gfx.content.skia-font-cache-size", 32);

/** GPU ***/
// Everything on the GPU, even where Firefox would fall back to the CPU
// (blocklisted driver, failed check). force-enabled skips those checks -
// if a site renders black/garbled or Zen crashes, delete that line first.
user_pref("gfx.webrender.all", true); // page drawing: WebRender on the GPU
user_pref("gfx.webrender.software", false); // never the CPU WebRender fallback
user_pref("gfx.webrender.compositor", true); // layers composited by macOS Core Animation
user_pref("gfx.webrender.compositor.force-enabled", true);
user_pref("layers.acceleration.force-enabled", true);
user_pref("media.hardware-video-decoding.enabled", true); // video decoded by the media engine
user_pref("media.hardware-video-decoding.force-enabled", true);
user_pref("media.av1.enabled", true); // AV1 is hardware-decoded on M3+
user_pref("gfx.canvas.accelerated", true); // <canvas> drawn on the GPU
user_pref("gfx.canvas.accelerated.force-enabled", true);
user_pref("webgl.force-enabled", true);
user_pref("dom.webgpu.enabled", true);

/** LOOK ***/
// Translucent "acrylic" glass on Zen's own panels and menus (not websites -
// that's layout.css.backdrop-filter.enabled). Costs some GPU/WindowServer work.
user_pref("zen.theme.acrylic-elements", false);
// Translucent window (desktop blurred behind Zen). Was off because it made
// scrolling lag; back on now that the page clip-path mask is gone (see
// userChrome.css) - set to false if the lag or heat returns.
user_pref("zen.widget.macos.window-vibrancy", false);
// Let the translucent window show through the sidebar/toolbars. Without it
// Zen paints them fully opaque (alpha 1) even with vibrancy on; with it the
// toolbar base is drawn at alpha 0.6 (ZenGradientGenerator.mjs).
user_pref("zen.theme.acrylic-sidebar", false);
