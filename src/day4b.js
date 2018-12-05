function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

export default function(input) {
  let events = input.split("\n").map(element => {
    let type = '';
    let guard;
    if (element.includes('begins shift')) {
      type = "shift";
      guard = parseInt(element.slice(20).match(/\d+/)[0]);
    } else if (element.includes('falls asleep')) {
      type = "sleep";
    } else {
      type = "wake";
    }
    return {
      date: element.slice(1, 17),
      minute: parseInt(element.slice(15, 17)),
      type,
      guard,
    }
  });

  events = events.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  let currentGuard;
  let sleepStart;
  let guardMinutes = createArray(10000, 60);

  for (let i = 0; i < events.length; i++){
    if (events[i].type === "shift") {
      currentGuard = events[i].guard;
    } else if (events[i].type === "sleep") {
      sleepStart = events[i].minute;
      events[i].guard = currentGuard;
    } else {
      for (let j = sleepStart; j < events[i].minute; j++) {
        if(guardMinutes[currentGuard][j]) {
          guardMinutes[currentGuard][j]++;
        } else {
          guardMinutes[currentGuard][j] = 1;
        }
      }
      events[i].guard = currentGuard;
    }
  }

  let maxMinuteCount = 0;
  let maxMinute = 0;
  let maxGuard = 0;
  for(let i = 0; i < guardMinutes.length; i++) {
    for(let j = 0; j < guardMinutes[i].length; j++){
      if (guardMinutes[i][j] > maxMinuteCount) {
        maxMinuteCount = guardMinutes[i][j];
        maxMinute = j;
        maxGuard = i;
      }
    }
  }

  return (maxGuard * maxMinute).toString();
}
