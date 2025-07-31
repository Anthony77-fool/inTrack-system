 $(document).ready(function () {
    let countdown;
    let correctCode = ""; // Stores the generated 6-digit code

    // When the "Send Verification Code" button is clicked
    $('#sendVerificationBtn').on('click', function () {
      const email = $('#email-input').val().trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!email || !isValidEmail) {
        // Add red border and show feedback
        $('#email-input')
          .addClass('is-invalid shake')
          .removeClass('is-valid');

        $('#email-feedback').show();

        // Remove shake class after animation to allow retriggering
        setTimeout(() => {
          $('#email-input').removeClass('shake');
        }, 500);
      } else {
        // Remove error and open modal
        $('#email-input')
          .removeClass('is-invalid')
          .addClass('is-valid');
        $('#email-feedback').hide();

        $('#emailVerifyModal').modal('show');
      }
    });
    
    // Function to start/resume timer
    function startTimer(duration) {
      clearInterval(countdown);
      let timeLeft = duration;
      $("#resendBtn").prop("disabled", true).addClass("text-muted");

      countdown = setInterval(() => {
        let minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        let seconds = String(timeLeft % 60).padStart(2, "0");
        $("#timer").text(`${minutes}:${seconds}`);

        if (--timeLeft < 0) {
          clearInterval(countdown);
          $("#timer").text("00:00");
          $("#resendBtn").prop("disabled", false).removeClass("text-muted");
        }
      }, 1000);
    }

    // Clear OTP input boxes and focus the first one
    function clearOtpBoxes() {
      $(".otp-box").val('');
      $(".otp-box").first().focus();
    }

    // Generate a random 6-digit code
    function generateVerificationCode() {
      correctCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Generated Code:", correctCode); // For testing purposes
    }

    // Triggered when email verification modal is shown
    $('#emailVerifyModal').on('shown.bs.modal', function () {
      startTimer(60);
      generateVerificationCode();
      clearOtpBoxes();
    });

    // Reset timer when modal is closed
    $('#exit_Modal-icon').on('click', function () {
      clearInterval(countdown);
      $("#timer").text("00:00");
      clearOtpBoxes();
    });

    // Resend button clicked
    $('#resendBtn').on('click', function () {
      startTimer(60);
      generateVerificationCode();
      clearOtpBoxes();
      alert("A new OTP has been sent to your email.");
    });

    // OTP input navigation
    $(".otp-box").on("input", function () {
      if (this.value.length === 1) {
        $(this).next(".otp-box").focus();
      }
    });

    $(".otp-box").on("keydown", function (e) {
      if (e.key === "Backspace" && this.value === "") {
        $(this).prev(".otp-box").focus();
      }
    });

    // Verify button clicked
    $("#verify-btn").on("click", function () {
      const enteredCode = $(".otp-box").map(function () {
        return $(this).val();
      }).get().join('');

      if (enteredCode === correctCode) {
        window.location.href = "user-registration.html"; // ✅ Redirect if correct
      } else {
        // ❌ If wrong code, show incorrect modal and close both after delay
        $('#emailVerifyModal').modal('hide'); // Close OTP modal
        $('#incorrectCodeModal').modal('show'); // Show warning modal

        setTimeout(() => {
          $('#incorrectCodeModal').modal('hide');
        }, 2000); // Hide it after 2 seconds
      }
    });
  });