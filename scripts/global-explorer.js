// A.M.A.E. Global & Local Explorer - Monolithisches Dynamic Module (FINALE VERSION)
(function() {
    console.log("🌐 Globaler & Lokaler Explorer erfolgreich paritätisch injiziert.");

    const container = document.getElementById('dynamic-explorer-container');
    if (!container) return;

    // 1. ERZEUGE DAS GLOBALE INTERFACE INJEKTION
    container.innerHTML = `
        <!-- GLOBAL FEED MODULE -->
        <div style="border: 1px dashed #00ff00; padding: 15px; background: #030303; margin-top: 10px; font-family: monospace;">
            <h3>Globaler Datenstrom-Kanal</h3>
            
            <label for="theme-select">Thematik / Frequenz-Filter:</label>
            <select id="theme-select" style="width:100%; background:#000; color:#00ff00; border:1px solid #00ff00; padding:8px; margin: 5px 0; font-family:inherit;" onchange="filterGlobalFeed()">
                <option value="all">-- Alle globalen Vektoren --</option>
                <option value="satoramy_registration">Satoramy Registrierung (A)</option>
                <option value="axiomatrix_activation">Axiomatrix Aktivierung (AA)</option>
                <option value="amae_explorer_sync">A.M.A.E. Explorer Sync (AAA)</option>
                <option value="matrix_dimension_lock">Matrix Dimensions Lock (AAAA)</option>
                <option value="axiomatrix">Axiomatrix-Theorie</option>
                <option value="neutrino">Neutrino-Kristallisation</option>
                <option value="amae-core">A.M.A.E. Kern-Prozesse</option>
                <option value="mutations">Mutierende Innovationen</option>
            </select>

            <div id="global-chat-box" style="height: 200px; overflow-y: auto; border: 1px solid #003300; background:#000; padding:10px; margin: 10px 0; font-size:0.85rem; color:#00ff00;">
                <span style="color:#666;">Lade verschlüsselten Welt-Feed...</span>
            </div>
            
            <button onclick="fetchGlobalData()" style="background:#003300; border:1px solid #00ff00; color:#00ff00; font-family:inherit; width:100%; padding:10px; cursor:pointer; font-weight:bold;">Aktualisieren & Synchronisieren</button>
        </div>

        <!-- LOCAL LEDGER MODULE -->
        <div id="local-blockchain-explorer" style="border: 1px solid #00ff00; padding: 15px; background: #020202; margin-top: 15px; font-family: monospace;">
            <h3 style="color:#00ff00; border-bottom: 1px solid #003300; padding-bottom:5px;">Lokaler Ledger-Kettenverlauf (Home)</h3>
            <div id="local-chain-box" style="max-height: 350px; overflow-y: auto;">
                <span style="color:#555;">Initialisiere echte System-Blöcke...</span>
            </div>
        </div>
    `;

    // 2. GLOBALER DATENABRUF GEKOPPELT AN LOKALEN LEDGER
    window.fetchGlobalData = async function() {
        const chatBox = document.getElementById('global-chat-box');
        try {
            const response = await fetch('data/global-feed.json');
            const data = await response.json();
            window.currentGlobalData = data.feed;
            
            // RENDERT DIE DATEN DIREKT IM LOKALEN LEDGER-EXPLORER BEREICH
            window.renderLocalBlockchain(data.feed);
            
            // FILTERT DEN GLOBALEN CHATVERLAUF
            filterGlobalFeed();
        } catch (e) {
            if(chatBox) chatBox.innerHTML = `<span style="color:#ff0000;">Fehler beim Synchronisieren: ${e.message}</span>`;
        }
    };

    // 3. FILTER-FUNKTION FÜR DAS DROPDOWN-MENÜ
    window.filterGlobalFeed = function() {
        const selectedTheme = document.getElementById('theme-select').value;
        const chatBox = document.getElementById('global-chat-box');
        
        if (!window.currentGlobalData) return;

        chatBox.innerHTML = "";
        window.currentGlobalData.forEach(item => {
            if (selectedTheme === "all" || item.category === selectedTheme) {
                chatBox.innerHTML += `
                    <div style="margin-bottom:10px; border-bottom:1px solid #001100; padding-bottom:5px;">
                        <span style="color:#00ffff; font-size:0.75rem;">[Kategorie: ${item.category.toUpperCase()}] [Zeit: ${item.timestamp}]</span>
                        <pre style="margin:5px 0; white-space: pre-wrap; background:#050505; padding:5px; border-left:2px solid #00ff00; color:#888; font-family:inherit;">${item.cipher}</pre>
                    </div>
                `;
            }
        });
        if(chatBox.innerHTML === "") {
            chatBox.innerHTML = `<span style="color:#555;">Keine Einträge für diese Kategorie vorhanden.</span>`;
        }
    };

    // 4. RENDERING DER ECHTEN A-AA-AAA-AAAA BLÖCKE IM LEDGER
    window.renderLocalBlockchain = function(blocks) {
        const chainBox = document.getElementById('local-chain-box');
        if (!chainBox) return;
        chainBox.innerHTML = "";

        blocks.forEach(block => {
            chainBox.innerHTML += `
                <div style="margin-bottom: 15px; padding: 10px; border: 1px dashed #005500; background: #000; font-size: 0.8rem;">
                    <div style="color: #00ff00; font-weight: bold; margin-bottom: 4px;">📦 BLOCK ID: #${block.id}</div>
                    <div style="color: #888;">📅 ZEIT: ${block.timestamp}</div>
                    <div style="color: #00ffff;">🏷️ KATEGORIE: ${block.category.toUpperCase()}</div>
                    <div style="color: #ffaa00;">⏮️ PREV HASH: [ ${block.prev_hash} ]</div>
                    <div style="color: #ff0055; font-weight: bold;">🔏 CURR HASH: [ ${block.curr_hash} ]</div>
                    <div style="margin-top: 5px;">
                        <span style="color: #666;">🔐 CIPHER DETEKTIERT:</span>
                        <pre style="margin: 3px 0; background: #050505; color: #888; padding: 5px; border-left: 2px solid #00ff00; white-space: pre-wrap; font-size: 0.75rem; font-family:inherit;">${block.cipher}</pre>
                    </div>
                    <button onclick="autoLoadToDecrypt('${btoa(block.cipher)}')" style="margin-top: 5px; padding: 5px; font-size: 0.7rem; width: 100%; background: #002200; border: 1px solid #00ff00; color: #00ff00; cursor: pointer; font-family: inherit; font-weight:bold;">In Entschlüsselung laden</button>
                </div>
            `;
        });
    };

    // 5. HILFSFUNKTION: PARITÄTISCHES BEFÜLLEN DES INDEX-INPUTS
    window.autoLoadToDecrypt = function(encodedCipher) {
        const targetField = document.getElementById('inputCipher');
        if (targetField) {
            targetField.value = atob(encodedCipher);
            targetField.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ERSTEN ABALGEICH DIREKT BEIM ERSTSTART AUSFÜHREN
    fetchGlobalData();
})();
