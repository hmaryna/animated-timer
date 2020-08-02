window.onload = function() {
  TweenLite.defaultEase = Expo.easeOut;

  initTimer("September 1, 2020 15:32:00");
};

function initTimer (dateStr) {
  let timerEl = document.querySelector(".timer");
  let daysGroupEl = timerEl.querySelector(".days-group");
  let hoursGroupEl = timerEl.querySelector(".hours-group");
  let minutesGroupEl = timerEl.querySelector(".minutes-group");
  let secondsGroupEl = timerEl.querySelector(".seconds-group");

  let daysGroup = {
    firstNum: daysGroupEl.querySelector(".first"),
    secondNum: daysGroupEl.querySelector(".second")
  };

  let hoursGroup = {
    firstNum: hoursGroupEl.querySelector(".first"),
    secondNum: hoursGroupEl.querySelector(".second")
  };

  let minutesGroup = {
    firstNum: minutesGroupEl.querySelector(".first"),
    secondNum: minutesGroupEl.querySelector(".second")
  };

  let secondsGroup = {
    firstNum: secondsGroupEl.querySelector(".first"),
    secondNum: secondsGroupEl.querySelector(".second")
  };

  function updateTimer() {
    expirationDate = new Date(dateStr).getTime();

    let currentDate = new Date();

    expirationDate = new Date(expirationDate),
    timeDifference = (expirationDate - currentDate);

    if (expirationDate < currentDate) {
      return;
    }
    
    let secondsInDay = 60 * 60 * 1000 * 24;
    let secondsInHour = 60 * 60 * 1000;

    let daysLeft = Math.floor(timeDifference / (secondsInDay) * 1) ;
    let hoursLeft = Math.floor((timeDifference % (secondsInDay)) / (secondsInHour) * 1);
    let minsLeft = Math.floor(((timeDifference % (secondsInDay)) % (secondsInHour)) / (60 * 1000) * 1);
    let secsLeft = Math.floor((((timeDifference % (secondsInDay)) % (secondsInHour)) % (60 * 1000)) / 1000 * 1);

    let timeLeft = {
      day: (daysLeft > 9) ? "" + daysLeft : "0" + daysLeft,
      hour: (hoursLeft > 9) ? "" + hoursLeft : "0" + hoursLeft,
      min: (minsLeft > 9) ? "" + minsLeft : "0" + minsLeft,
      sec: (secsLeft > 9) ? "" + secsLeft : "0" + secsLeft,
    };

    let timeLeftStr = timeLeft.day + timeLeft.hour + timeLeft.min + timeLeft.sec;

    updateTimerDisplay(timeLeftStr.split(""));

    if (timeLeftStr != "00000000") {
      setTimeout(updateTimer, 1000);
    } else {
      return;
    }
  }

  function updateTimerDisplay(arr) {
    animateNum(daysGroup.firstNum, arr[0]);
    animateNum(daysGroup.secondNum, arr[1]);
    animateNum(hoursGroup.firstNum, arr[2]);
    animateNum(hoursGroup.secondNum, arr[3]);
    animateNum(minutesGroup.firstNum, arr[4]);
    animateNum(minutesGroup.secondNum, arr[5]);
    animateNum(secondsGroup.firstNum, arr[6]);
    animateNum(secondsGroup.secondNum, arr[7]);
  }

  function animateNum (group, arrayValue) {
    TweenMax.killTweensOf(group.querySelector(".number-grp-wrp"));
    TweenMax.to(group.querySelector(".number-grp-wrp"), 1, {
      y: - group.querySelector(".num-" + arrayValue).offsetTop
    });
  }

  setTimeout(updateTimer, 1000);
}
