$(document).ready(function () {
  let lastResult = '';
  let scanCount = 0; // Global count that persists
  let qrScannerInstance = null;

  // Start the QR scanner
  function startScanner() {
    $('#my-qr-reader').show();         // Show the scanner div
    lastResult = '';                   // Reset the last scanned text

    qrScannerInstance = new Html5Qrcode("my-qr-reader");

    qrScannerInstance.start(
      { facingMode: "environment" },   // Use rear camera
      { fps: 10, qrbox: 250 },         // Settings
      function (decodedText, decodedResult) {
        // Only handle new scans
        if (decodedText !== lastResult) {
          lastResult = decodedText;
          scanCount++;  // Update the persistent scan count

          // ✅ Update the scan count inside your <h5> element
          $('#scan-count').text(`${scanCount}`);

          // ✅ Display scanned result in modal
          $('#qr-modal-content').html(`
            <p>You scanned #${scanCount}: <strong>${decodedText}</strong></p>
          `);

          // ✅ Show modal
          new bootstrap.Modal(document.getElementById('qrResultModal')).show();
        }
      },
      function (errorMessage) {
        // Optional: Handle camera scan errors here
      }
    ).catch(err => {
      console.error("Scanner start failed:", err);
      // Show modal if permission denied or no camera
      new bootstrap.Modal(document.getElementById('permissionModal')).show();
    });
  }

  // Stop the QR scanner
  function stopScanner() {
    if (qrScannerInstance) {
      qrScannerInstance.stop().then(() => {
        $('#my-qr-reader').hide(); // Hide scanner UI
        qrScannerInstance.clear(); // Clear canvas and internals
        qrScannerInstance = null;  // Reset instance
      }).catch(err => {
        console.error("Failed to stop scanner:", err);
      });
    } else {
      $('#my-qr-reader').hide(); // Just hide in fallback
    }
  }

  // When "Scan" button is clicked
  $('#scan-btn').click(function () {
    stopScanner();   // Always stop first (if previously open)
    startScanner();  // Start fresh
  });

  // When "Okay" button in result modal is clicked
  $('#qr-ok-btn').on('click', function () {
    stopScanner();                   // Stop scanner
    $('#qr-modal-content').empty(); // Clear result display
  });
});