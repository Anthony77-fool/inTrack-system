$(document).ready(function () {
  let countdown;
  let correctCode = "";

  // Shared selectors for both HTMLs
  const emailInput = $('#email-input').length ? $('#email-input') : $('#change-pass-email-input');
  const sendBtn = $('#sendVerificationBtn').length ? $('#sendVerificationBtn') : $('#change-pass-sendVerificationBtn');
  const verifyBtn = $('#verify-btn');
  const resendBtn = $('#resendBtn').length ? $('#resendBtn') : $('#change-pass-resendBtn');
  const emailFeedback = $('#email-feedback');
  const modal = $('#emailVerifyModal');
  const exitModalIcon = $('#exit_Modal-icon');

  // Click Send Verification
  sendBtn.on('click', function () {
    const email = emailInput.val().trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email || !isValidEmail) {
      emailInput.addClass('is-invalid shake').removeClass('is-valid');
      emailFeedback.show();

      setTimeout(() => {
        emailInput.removeClass('shake');
      }, 500);
    } else {
      emailInput.removeClass('is-invalid').addClass('is-valid');
      emailFeedback.hide();
      modal.modal('show');
    }
  });

  // Timer Function
  function startTimer(duration) {
    clearInterval(countdown);
    let timeLeft = duration;
    resendBtn.prop("disabled", true).addClass("text-muted");

    countdown = setInterval(() => {
      let minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
      let seconds = String(timeLeft % 60).padStart(2, "0");
      $("#timer").text(`${minutes}:${seconds}`);

      if (--timeLeft < 0) {
        clearInterval(countdown);
        $("#timer").text("00:00");
        resendBtn.prop("disabled", false).removeClass("text-muted");
      }
    }, 1000);
  }

  // Reset OTP boxes
  function clearOtpBoxes() {
    $(".otp-box").val('');
    $(".otp-box").first().focus();
  }

  // Generate 6-digit code
  function generateVerificationCode() {
    correctCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated Code:", correctCode);
  }

  modal.on('shown.bs.modal', function () {
    startTimer(60);
    generateVerificationCode();
    clearOtpBoxes();
  });

  exitModalIcon.on('click', function () {
    clearInterval(countdown);
    $("#timer").text("00:00");
    clearOtpBoxes();
  });

  resendBtn.on('click', function () {
    startTimer(60);
    generateVerificationCode();
    clearOtpBoxes();
    alert("A new OTP has been sent to your email.");
  });

  // OTP input logic
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

  // Verify button
  verifyBtn.on("click", function () {
    const enteredCode = $(".otp-box").map(function () {
      return $(this).val();
    }).get().join('');

    if (enteredCode === correctCode) {
      window.location.href = "user-registration.html";
    } else {
      modal.modal('hide');
      $('#incorrectCodeModal').modal('show');
      setTimeout(() => {
        $('#incorrectCodeModal').modal('hide');
      }, 2000);
    }
  });

  //Veirfy Button for Change Password
  $('#change-pass-verify-btn').on('click', function () {
    const enteredCode = $(".otp-box").map(function () {
      return $(this).val();
    }).get().join('');

    if (enteredCode === correctCode) {
      // ✅ Hide the modal and Hide the send verification button
      $('#emailVerifyModal').modal('hide');
      $('#change-pass-sendVerificationBtn').addClass('d-none');

      // ✅ Show the password reset sections
      $('#change-pass-newPassSection').removeClass('d-none');
      $('#change-pass-confirmPassSection').removeClass('d-none');
      $('#change-pass-btnSection').removeClass('d-none');
    } else {
      // ❌ Show incorrect code modal
      $('#emailVerifyModal').modal('hide');
      $('#incorrectCodeModal').modal('show');
      setTimeout(() => {
        $('#incorrectCodeModal').modal('hide');
      }, 2000);
    }
  });

});
