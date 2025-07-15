$(document).ready(function () {
  const $month = $('#birthMonth');
  const $day = $('#birthDay');
  const $year = $('#birthYear');

  // Populate months
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthNames.forEach((name, index) => {
    $month.append(`<option value="${index + 1}">${name}</option>`);
  });

  // Populate years
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    $year.append(`<option value="${i}">${i}</option>`);
  }

  // Function to update days based on selected month and year
  function updateDays() {
    const selectedMonth = parseInt($month.val());
    const selectedYear = parseInt($year.val());

    if (!selectedMonth || !selectedYear) return; // Wait until both are selected

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    $day.html('<option selected disabled>Select Day</option>'); // Clear old days

    for (let d = 1; d <= daysInMonth; d++) {
      $day.append(`<option value="${d}">${d}</option>`);
    }
  }

  // Call updateDays when either month or year changes
  $month.on('change', updateDays);
  $year.on('change', updateDays);
});
