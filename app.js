// A.M.A.E. Background Engine & Persistence Controller (app.js) - Persistent Matrix Edition
(function() {
    console.log("🔋 Simultanes app.js Persistenz-Modul im Hintergrund aktiv.");

    // INTERNE SPEICHER-SCHLÜSSEL FÜR DAS SMARTPHONE
    const STORAGE_KEYS = {
        CHAT_HISTORY: "amae_persistent_chat",
        LAST_USER: "amae_last_logged_user",
        LOCAL_LEDGER: "amae_blockchain_ledger",
        IS_AUTHENTICATED: "amae_matrix_auth_state"
    };

    // 1. SIMULTANE KOPPLUNG AN DAS INTERFACE
    document.addEventListener("DOMContentLoaded", function() {
        restorePersistentData();
        setupSimultaneousHooks();
    });

    // 2. KOPPELT SICH AUTOMATISCH AN DIE INTRERFACE-PROZESSE
    function setupSimultaneousHooks() {
        const btnEncrypt = document.querySelector("button[onclick='encryptAndShowMessage()']");
        const btnDecrypt = document.querySelector("button[onclick='decryptIncomingMessage()']");
        
        // Speichert, sobald eine Nachricht verschlüsselt wird
        if (btnEncrypt) {
            const originalEncrypt = window.encryptAndShowMessage;
            window.encryptAndShowMessage = async function() {
                await originalEncrypt();
                saveCurrentChatState();
            };
        }

        // Speichert, sobald eine Nachricht entschlüsselt wird
        if (btnDecrypt) {
            const originalDecrypt = window.decryptIncomingMessage;
            window.decryptIncomingMessage = async function() {
                await originalDecrypt();
                saveCurrentChatState();
            };
        }

        // Lauscht auf den Login-Button, um den persistenten Zustand zu setzen
        const btnLogin = document.querySelector("button[onclick='initializeCrypto()']");
        if (btnLogin) {
            const originalLogin = window.initializeCrypto;
            window.initializeCrypto = async function() {
                await originalLogin();
                // Wenn der Login erfolgreich war, ist das comm-section sichtbar
                const commSection = document.getElementById("comm-section");
                if (commSection && commSection.style.display !== "none") {
                    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, "true");
                    saveCurrentChatState();
                }
            };
        }
    }

    // 3. DATEN IM FLASH-SPEICHER DES HANDYS SICHERN
    function saveCurrentChatState() {
        const chatBox = document.getElementById("chatBox");
        const usernameInput = document.getElementById("username");

        if (chatBox) {
            localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, chatBox.innerHTML);
        }
        if (usernameInput && usernameInput.value) {
            localStorage.setItem(STORAGE_KEYS.LAST_USER, usernameInput.value.trim());
        }
        console.log("💾 Datenpaket persistent im Smartphone-Speicher gesichert.");
    }

    // 4. RESTAURIERT DIE DATEN UND DEN MATRIX-ZUSTAND AUTOMATISCH BEIM NEUSTART
    function restorePersistentData() {
        const chatBox = document.getElementById("chatBox");
        const usernameInput = document.getElementById("username");
        const authState = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);

        const savedChat = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
        const savedUser = localStorage.getItem(STORAGE_KEYS.LAST_USER);

        if (savedUser && usernameInput) {
            usernameInput.value = savedUser;
        }

        if (savedChat && chatBox) {
            chatBox.innerHTML = savedChat;
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        // Wenn das Handy als eingeloggt markiert ist, bauen wir die Matrix um
        if (authState === "true") {
            console.log("🔐 Autorisierter Matrix-Zustand erkannt. Schalte Interface um.");
            
            const commSection = document.getElementById('comm-section');
            const authSection = document.getElementById('auth-section');
            const status = document.getElementById('auth-status');

            if (commSection) commSection.style.display = "block";
            if (authSection) authSection.style.border = "1px solid #005500";
            
            if (status) {
                status.innerText = `🔑 Vektoren für ${savedUser || 'User'} aktiv geladen (Persistent).`;
                status.style.color = "#00ff00";
            }

            // Ruft die Umschalt-Funktion aus der index.html auf, um Logout/Settings anzuzeigen
            if (typeof window.switchMatrixToAuthenticated === "function") {
                window.switchMatrixToAuthenticated();
            }
        }
        
        console.log("🔄 Persistenz-Check abgeschlossen.");
    }

    // 5. ERWEITERTER LOGOUT-HOOK (Löscht den Zustand aus dem Speicher)
    if (window.executeMatrixLogout) {
        const originalLogout = window.executeMatrixLogout;
        window.executeMatrixLogout = function() {
            localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
            originalLogout();
        };
    }
})();
