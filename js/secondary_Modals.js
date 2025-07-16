$(document).ready(function () {
  // Initialize Bootstrap modal instances
  const addStudentModal = new bootstrap.Modal($('#addStudent_Form')[0]);
  const confirmAddModal = new bootstrap.Modal($('#confirmAddModal')[0], {
    backdrop: false, // Allow background interaction
    focus: false     // Prevent autofocus issues
  });

  const updateStudentModal = new bootstrap.Modal($('#editStudent_Form')[0]);
  const confirmUpdateModal = new bootstrap.Modal($('#confirmUpdateModal')[0], {
    backdrop: false,
    focus: false
  });

  const confirmCancelModal = new bootstrap.Modal($('#confirmCancelModal')[0], {
    backdrop: false,
    focus: false
  });

  // === ADD STUDENT FLOW ===

  // Show the "Confirm Add" modal instead of immediately submitting
  $('#openConfirmAdd').on('click', function (e) {
    e.preventDefault(); // Prevent actual form submission (if inside <form>)
    confirmAddModal.show(); // Show confirm modal
  });

  // When user confirms "Yes, Add", submit the Add Student form
  $('#yesAddStudent').on('click', function () {
    $('#addStudent_Form form')[0].submit();
  });

  // === UPDATE STUDENT FLOW ===

  // Show the "Confirm Update" modal instead of immediately submitting
  $('#openConfirmUpdate').on('click', function (e) {
    e.preventDefault();
    confirmUpdateModal.show();
  });

  // When user confirms "Yes, Update", submit the Edit Student form
  $('#yesUpdateStudent').on('click', function () {
    $('#editStudent_Form form')[0].submit();
  });

  // === CANCEL FLOW (shared for both Add and Edit) ===

  // Variable to track which modal to close after confirming cancel
  let currentCancelTarget = null;

  // When a cancel button with class `.openCancelConfirmBtn` is clicked
  $('.openCancelConfirmBtn').on('click', function () {
    // Determine which form the button came from (Add or Edit)
    if ($(this).closest('#addStudent_Form').length) {
      currentCancelTarget = 'add';
    } else if ($(this).closest('#editStudent_Form').length) {
      currentCancelTarget = 'edit';
    }

    // Show the shared "Confirm Cancel" modal
    confirmCancelModal.show();
  });

  // When user confirms cancel ("Yes, Cancel")
  $('#yesCancelForm').on('click', function () {
    confirmCancelModal.hide(); // Hide confirmation modal

    // Hide the appropriate main modal based on origin
    if (currentCancelTarget === 'add') {
      addStudentModal.hide();
    } else if (currentCancelTarget === 'edit') {
      updateStudentModal.hide();
    }

    // Reset tracking variable
    currentCancelTarget = null;
  });
});
