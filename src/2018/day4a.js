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
  let guardSleepTime = new Array(10000).fill(0);

  for (let i = 0; i < events.length; i++){
    if (events[i].type === "shift") {
      currentGuard = events[i].guard;
    } else if (events[i].type === "sleep") {
      sleepStart = events[i].minute;
      events[i].guard = currentGuard;
    } else {
      guardSleepTime[currentGuard] += (events[i].minute - sleepStart);
      events[i].guard = currentGuard;
    }
  }

  let maxMinutes = 0;
  let maxGuard = 0;
  guardSleepTime.forEach((minutes, id) => {
    if (minutes > maxMinutes) {
      maxMinutes = minutes;
      maxGuard = id;
    }
  })

  const interestingGuardsEvents = events.filter((event) => {
    return event.guard === maxGuard;
  });

  let allMinutes = new Array(60).fill(0);

  for(let i = 0; i < interestingGuardsEvents.length; i++) {
    if (interestingGuardsEvents[i].type === "sleep") {
      sleepStart = interestingGuardsEvents[i].minute;
    } else if (interestingGuardsEvents[i].type === "wake") {
      for (let j = sleepStart; j < interestingGuardsEvents[i].minute; j++) {
        allMinutes[j]++;
      }
    }
  }

  const likelyMinuteFrequency = allMinutes.reduce(function(a, b) {
    return Math.max(a, b);
  });

  const likelyMinute = allMinutes.findIndex(minuteCount => {
    return (minuteCount === likelyMinuteFrequency);
  });

  return (maxGuard * likelyMinute).toString();
}
