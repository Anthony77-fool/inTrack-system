import { dataArr } from "./data.js";

$(document).ready(function () {
  // Elements for QR generation
  const $input = $('#qrCodeURL');
  const $button = $('#qrCodeGenerate');
  const $image = $('#qrCodeImage');

  // Handle QR code generation on button click
  $button.on('click', async function () {
    
    const index = parseInt($input.val()); // 👈 Get current value (e.g. "0", "1", etc.)

    // Validate index
    if (isNaN(index) || index < 1 || index >= dataArr.length + 1) {
      alert("Please enter a valid index between 1 and " + (dataArr.length));
      return;
    }

    // Generate QR code from dataArr, -1 to align with the array index
    const data = dataArr[index - 1];
    const dataUrl = await QRCode.toDataURL(data.first_name);

    // Remove the 'd-none' class to make the image visible
    $image.removeClass('d-none');
    $image.addClass('custom-qr-size');

    // Set the QR code image source
    $image.attr('src', dataUrl);

    // Debugging log
    console.log("Generated QR with:", data.first_name);
  });

  // QR Scanner Elements
  const $resultBox = $('#you-qr-result');
  let lastResult = '';
  let scanCount = 0;

  // Handle successful QR scan
  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
      lastResult = decodedText;
      scanCount++;

      alert("Your QR is: " + decodedText);
      $resultBox.html(`You scanned ${scanCount}: ${decodedText}`);
    }
  }

  // Initialize the QR scanner
  const qrScanner = new Html5QrcodeScanner("my-qr-reader", {
    fps: 10,
    qrbox: 250
  });

  qrScanner.render(onScanSuccess);
});



/*
button.addEventListener('click', () => {
  //(data's to create), dataUrl = parameters
  QRCode.toDataURL(input.value).then(dataUrl => {
    image.src = dataUrl;
  });
});
*/
