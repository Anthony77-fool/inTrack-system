$(document).ready(function () {
  const $daysTag = $(".days");
  const $currentDate = $(".current-date");
  const $prevNextIcon = $(".icons span");

  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function renderCalendar() {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    // Previous month's last days
    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Current month days
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = (i === new Date().getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()) ? "active" : "";
      liTag += `<li class="${isToday}">${i}</li>`;
    }

    // Next month's starting days
    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    $currentDate.text(`${months[currMonth]} ${currYear}`);
    $daysTag.html(liTag);
  }

  renderCalendar();

  $prevNextIcon.on("click", function () {
    const isPrev = $(this).attr("id") === "prev";
    currMonth = isPrev ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
