$(document).ready(function () {
  // Shared selectors for both HTMLs
  $('.toggle-password').on('click', function () {
    const targetInput = $($(this).data('target'));
    const type = targetInput.attr('type') === 'password' ? 'text' : 'password';
    targetInput.attr('type', type);

    // Toggle icon class
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  // Handle password match check on "Change Password" button click
  $('#change-pass-btn').on('click', function () {
    const newPassword = $('#new-password').val().trim();
    const confirmPassword = $('#confirm-password').val().trim();

    if (newPassword !== confirmPassword || newPassword === "") {
      $('#password-feedback').show();
      $('#confirm-password').addClass('is-invalid shake');

      // Remove shake class after 500ms to allow retriggering
      setTimeout(() => {
        $('#confirm-password').removeClass('shake');
      }, 500);

    } else {
      $('#password-feedback').hide();
      $('#confirm-password').removeClass('is-invalid').addClass('is-valid');
    }
  });

});
