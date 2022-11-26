var display_text = document.getElementById("display-text");
var word_hint = document.getElementById("word-hint");
var referesh_btn = document.getElementById("refButtn");
var Check_btn = document.getElementById("chkButtn");
var user_input = document.getElementById("user-input");
var correct_word;
var time_text = document.getElementById("timer");
var timmer;

function timer_func(maxTime) {
  clearInterval(timmer);
  timmer = setInterval(function () {
    if (maxTime > 0) {
      maxTime--;
      return (time_text.innerText = maxTime + "s");
    }
    //clearInterval(maxTime);
    new Notification(
      "TimeOff" +
        " " +
        correct_word.toLocaleUpperCase() +
        " " +
        "Is the Correct word"
    );
    game();
  }, 1000);
}

function game() {
  timer_func(30);
  var word_obj = words[Math.floor(Math.random() * words.length)];
  var word_arr = word_obj.word.split("");
  for (let i = word_arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [word_arr[i], word_arr[j]] = [word_arr[j], word_arr[i]];
  }

  display_text.innerText = word_arr.join("").toLocaleUpperCase();
  // console.log(typeof display_text);
  word_hint.innerText = word_obj.hint.toLocaleUpperCase();
  correct_word = word_obj.word;
  user_input.value = "";
  user_input.setAttribute("maxlength", word_arr.length);
  //console.log(correct_word);
}
game();

function check_word() {
  var user_word = user_input.value;
  if (user_word != "") {
    if (user_word == correct_word) {
      alert("Congrates" + " " + user_word + " " + "Is the Correct word");
      game();
    } else {
      alert("Oops!" + " " + user_word + " " + "Is not the Correct word");
    }
  } else {
    alert("Input feild is empty");
    //game();
    // console.log("failed");
  }
}

referesh_btn.onclick = function () {
  game();
};
Check_btn.onclick = function () {
  check_word();
};
// document.addEventListener("visibilitychange", (event) => {
//   if (document.visibilityState == "visible") {
//     console.log("tab is active");
//   } else {
//     console.log("tab is inactive");
//   }
// });

let notif;
let interval;
document.addEventListener("visibilitychange", (e) => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notif = new Notification(
        `<h3>Alert-Your Session has been recorded.<h3>`,
        {
          body: `You have been gone for ${Math.round(
            (new Date() - leaveDate) / 1000
          )} seconds`,
          tag: "Come Back",
        }
      );
    }, 100);
  } else {
    if (interval) clearInterval(interval);
    if (notif) notif.close();
  }
});
