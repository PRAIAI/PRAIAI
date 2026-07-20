// A.M.A.E. Local Blockchain Explorer - Lokales Modul (A-AA-AAA Edition)
(function() {
    console.log("🏠 Lokaler Kette-Explorer (A-AA-AAA) aktiv.");

    const container = document.getElementById('dynamic-explorer-container');
    if (!container) return;

    // Erzeuge das lokale Blockchain-Interface
    const localDiv = document.createElement('div');
    localDiv.id = 'local-blockchain-explorer';
    localDiv.style.cssText = "border: 1px solid #00ff00; padding: 15px; background: #020202; margin-top: 15px;";
    localDiv.innerHTML = `
        <h3 style="color:#00ff00; border-bottom: 1px solid #003300; padding-bottom:5px;">Lokaler Ledger-Kettenverlauf (Home)</h3>
        <div id="local-chain-box" style="max-height: 350px; overflow-y: auto; font-family: monospace;">
            <span style="color:#555;">Initialisiere echte System-Blöcke...</span>
        </div>
    `;
    container.appendChild(localDiv);

    // Funktion zum Rendern der echten A-AA-AAA Blöcke
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
                        <pre style="margin: 3px 0; background: #050505; color: #888; padding: 5px; border-left: 2px solid #00ff00; white-space: pre-wrap; font-size: 0.75rem;">${block.cipher}</pre>
                    </div>
                    <button onclick="autoLoadToDecrypt('${btoa(block.cipher)}')" style="margin-top: 5px; padding: 5px; font-size: 0.7rem; width: 100%; background: #002200; border: 1px solid #00ff00; color: #00ff00; cursor: pointer; font-family: inherit;">In Entschlüsselung laden</button>
                </div>
            `;
        });
    };

    // Hilfsfunktion: Schreibt den Block mit einem Klick in das Entschlüsselungsfeld der index.html
    window.autoLoadToDecrypt = function(encodedCipher) {
        const targetField = document.getElementById('inputCipher');
        if (targetField) {
            targetField.value = atob(encodedCipher);
            targetField.scrollIntoView({ behavior: 'smooth' });
        }
    };
})();
