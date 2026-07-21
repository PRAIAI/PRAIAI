// A.M.A.E. Background Engine & Persistence Controller (app.js)
(function() {
    console.log("🔋 Simultanes app.js Persistenz-Modul im Hintergrund aktiv.");

    // INTERNE SPEICHER-SCHLÜSSEL FÜR DAS SMARTPHONE
    const STORAGE_KEYS = {
        CHAT_HISTORY: "amae_persistent_chat",
        LAST_USER: "amae_last_logged_user",
        LOCAL_LEDGER: "amae_blockchain_ledger"
    };

    // 1. SIMULTANE KOPPLUNG AN DAS INTERFACE (Sobald DOM bereit ist)
    document.addEventListener("DOMContentLoaded", function() {
        restorePersistentData();
        setupSimultaneousHooks();
    });

    // 2. KOPPELT SICH AUTOMATISCH AN DIE BESTEHENDEN INDEX-FUNKTIONEN
    function setupSimultaneousHooks() {
        const btnEncrypt = document.querySelector("button[onclick='encryptAndShowMessage()']");
        const btnDecrypt = document.querySelector("button[onclick='decryptIncomingMessage()']");
        
        // Erweitert die Verschlüsselung um automatische Hintergrund-Speicherung
        if (btnEncrypt) {
            const originalEncrypt = window.encryptAndShowMessage;
            window.encryptAndShowMessage = async function() {
                await originalEncrypt();
                saveCurrentChatState();
            };
        }

        // Erweitert die Entschlüsselung um automatische Hintergrund-Speicherung
        if (btnDecrypt) {
            const originalDecrypt = window.decryptIncomingMessage;
            window.decryptIncomingMessage = async function() {
                await originalDecrypt();
                saveCurrentChatState();
            };
        }
    }

    // 3. DATEN AUS DEM FLASH-SPEICHER DES HANDYS LÖSCHEN/LADEN
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

    // 4. RESTAURIERT DIE DATEN AUTOMATISCH BEIM NEUSTART DER WEBSEITE
    function restorePersistentData() {
        const chatBox = document.getElementById("chatBox");
        const usernameInput = document.getElementById("username");

        const savedChat = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
        const savedUser = localStorage.getItem(STORAGE_KEYS.LAST_USER);

        if (savedChat && chatBox) {
            // Lädt den alten verschlüsselten/entschlüsselten Chatverlauf direkt wieder in die Box
            chatBox.innerHTML = savedChat;
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        if (savedUser && usernameInput) {
            // Setzt Ihren Benutzernamen automatisch wieder ein, damit Sie ihn nicht neu tippen müssen
            usernameInput.value = savedUser;
        }
        
        console.log("🔄 Persistente Daten erfolgreich aus dem localStorage dechiffriert/wiederhergestellt.");
    }

    // 5. GLOBALE RESET-FUNKTION (Sollten Sie jemals den Speicher leeren wollen)
    window.purgeAmaeStorage = function() {
        if(confirm("Möchten Sie alle persistenten Verläufe lokal auf diesem Handy unwiderruflich löschen?")) {
            localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
            localStorage.removeItem(STORAGE_KEYS.LAST_USER);
            localStorage.removeItem(STORAGE_KEYS.LOCAL_LEDGER);
            alert("Speicher bereinigt. Starten Sie die Seite neu.");
            window.location.reload();
        }
    };
})();
