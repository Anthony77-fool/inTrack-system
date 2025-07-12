$(document).ready(function () {
    const currentYear = new Date().getFullYear();
    const $select = $('#schoolYearSelect');

    for (let i = 0; i < 10; i++) {
      const start = currentYear + i;
      const end = start + 1;
      const option = $('<option>', {
        value: `${start}-${end}`,
        text: `${start}-${end}`,
        class: 'cursor-pointer'
      });
      $select.append(option);
    }

});