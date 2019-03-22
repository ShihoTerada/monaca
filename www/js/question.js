var questions = []; // 問題
var score;          // 正答数
var current;        // 現在の問題インデックス

// 問題データをランダム取得
function getRandomQuestions() {
  $.getJSON("../question/data.json", function(result) {
    questions = result;
    // ランダムに並べ替え
    questions.sort(function() {
      return Math.random() - Math.random();
    });
  });
}

// 開始する
function start() {
  current = 0;
  score = 0;
  document.getElementById("navi").pushPage("../question/questions.html");
}

// 各ページが開いたとき
document.addEventListener('init', function(event) {
  // 開いたページ
  var page = event.target;
  // TOPページが開いたとき
  if (page.id == "top-page") {
    // 最高記録を表示
    var highscore = localStorage.getItem("highscore");
    if (highscore != null) {
      document.getElementById("highscore").textContent = "正答率：" + highscore + "%";
    }
    else {
      document.getElementById("highscore").textContent = "記録なし";
    }
  }
  // 問題ページが開いたとき
  if (page.id == "question-page") {
    // タイトルを設定
    var no = current + 1;
    var title = "第" + no + "問";
    var body  = questions[current].body;
    page.querySelector("#title").innerHTML = title;
    page.querySelector("#body").innerHTML = body;

    // 選択肢を設定
    page.querySelector("#btn1").innerHTML = questions[current].choice1;
    page.querySelector("#btn2").innerHTML = questions[current].choice2;
    page.querySelector("#btn3").innerHTML = questions[current].choice3;
    page.querySelector("#btn4").innerHTML = questions[current].choice4;
  }
});

// 回答を選択したとき
function select(choiceNo) {
  var icon;
  if (choiceNo == questions[current].answer) {
    // 正解の場合、○を表示して正答数をカウントアップ
    icon = "circle-o";
    score++;
  } else {
    // 不正解の場合、×を表示
    icon = "ion-close";
  }

  // 結果ページに移動
  document.getElementById("navi").pushPage("../question/result.html").then(function(page) {
    page.querySelector("#result-icon").setAttribute("icon", icon);
  });
}

// 次のページへボタンを押したとき
function next() {
  current++;
  if (current < 10) {
    // 次の問題があるとき
    document.getElementById("navi").pushPage('../question/questions.html');
  } else {
    // 最後の問題まで進んだとき
    var percent = Math.floor(score / 10 * 100);
    var message = "正答率は" + percent + "%でした。";
    // 正答率が最高記録だったらLocalStorageに保存
    var highscore = Number(localStorage.getItem("highscore"));
    if (highscore < percent) {
      localStorage.setItem("highscore", String(percent));
      message += "\n最高記録です！"
    }
    alert(message);
    // 最初のページに戻る
    document.getElementById("navi").resetToPage("../question/top.html");
  }
}