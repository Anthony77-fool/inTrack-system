$(document).ready(function () {

  // ✅ Load all provinces on page load
  $.getJSON("https://psgc.gitlab.io/api/provinces", function (data) {
    data.forEach(function (province) {
      $('#province').append(`<option value="${province.code}">${province.name}</option>`);
    });
  });

  // ✅ Load municipalities when a province is selected
  $('#province').on('change', function () {
    const provCode = $(this).val();

    // Clear and reset Municipality and Barangay dropdowns
    $('#municipality').html('<option selected disabled>Select Municipality</option>');
    $('#barangay').html('<option selected disabled>Select Barangay</option>');

    // Get municipalities from the selected province
    $.getJSON(`https://psgc.gitlab.io/api/provinces/${provCode}/municipalities`, function (data) {
      data.forEach(function (municipality) {
        $('#municipality').append(`<option value="${municipality.code}">${municipality.name}</option>`);
      });
    });
  });

  // ✅ Load barangays when a municipality is selected
  $('#municipality').on('change', function () {
    const munCode = $(this).val();

    // Clear Barangay dropdown
    $('#barangay').html('<option selected disabled>Select Barangay</option>');

    // Get barangays from the selected municipality
    $.getJSON(`https://psgc.gitlab.io/api/municipalities/${munCode}/barangays`, function (data) {
      data.forEach(function (barangay) {
        $('#barangay').append(`<option value="${barangay.code}">${barangay.name}</option>`);
      });
    });
  });
  
});
