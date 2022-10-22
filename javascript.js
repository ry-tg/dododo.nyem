//閃光のマーク
const FIRST_MARK = "O";

//高校のマーク
const NEXT_MARK = "X";

//ターン数
let count = 1;

//マス目のidリスト（2次元配列）
const IDs =[
  ['b1','b2','b3',],
  ['b4','b5','b6',],
  ['b7','b8','b9',]
];

//ゲームが実行中かどうか判定する変数
let isRun = true;


//閃光かどうか判定する関数
function isFirstMove() {
  let isFirst = count % 2;
  return isFirst == 1;
}

//IDからおぶぜくとをすとくする
function $(id) {
  return document.getElementById(id);
}

//ターン表示を切り替える関数
function changeDisplayCount(){
  if(isFirstMove()){
    //閃光だったら
    $("qawsedrftgyhujikolp").innerHTML = FIRST_MARK + "の晩"
  }else{
    //高校だったら
    $("qawsedrftgyhujikolp").innerHTML = NEXT_MARK + "の晩"
  }
}

//ゲーム終了を判定関数
function judgeEnd(){
  let isEnd = false;
  //横3マスが同じマークかどうか判定
  for(let row = 0; row < 3; row++){
    //勝敗を判定
    isEnd = isWin(IDs[row][0],IDs[row][1],IDs[row][2]);
    if (isEnd){
      displayResult($(IDs[row][0]).value + "の勝ち！");
      return true;
    }
  }
  //縦3マスが同じマークかどうか判定
  for(let col = 0; col < 3; col++){
    //勝敗を判定
    isEnd = isWin(IDs[0][col],IDs[1][col],IDs[2][col]);
    if (isEnd){
      displayResult($(IDs[0][col]).value + "の勝ち！");
      return true;
    }
  }
  //斜め(右下がり)が同じマークか
  isEnd = isWin(IDs [0][0],IDs[1][1],IDs[2][2]);
  if (isEnd) {
    displayResult($(IDs[0][0]).value + "の勝ち！");
    return true;
  }

  //斜め(左下がり)が同じマークか
  isEnd = isWin(IDs [0][2],IDs[1][1],IDs[2][0]);
  if (isEnd) {
    displayResult($(IDs[0][2]).value + "の勝ち！");
    return true;
  }
  //引き分けの判定
  if(count > 9){
    displayResult("引き分け");
    return true;
  }
  //まだ終わってない時
  return false;
}

//勝利を判定する関数
function isWin(firstId,secondId,thirdId,) {
  //1つ目のマスが空ならこの処理終わり
  if ($(firstId).value == ""){
    return false;
  }
  //2つ目のマスが空ならこの処理終わり
  if ($(secondId).value == ""){
    return false;
  }
  //3つ目のマスが空ならこの処理終わり
  if ($(thirdId).value == ""){
    return false;
  }

  //全部空じゃなく3つ同じマークなら勝ち
  if (
    ($(firstId).value == $(secondId).value)
    && ($(secondId).value == $(thirdId).value)
  ) {
    return true;
  }
  //全部空じゃなく3つ違うマークなら引き分け
  return false;
}

//勝敗の結果を表示させる関数
function displayResult(message){
  $("display-result").innerHTML = message;
  isRun = false;
}

//くり１されたときのしより
function clickAction(event) {
  //ゲームが終了しているならこの命令は終了
  if (!isRun) {
    return;
  }

  //eventからクリックされたときのマス目を取得する
  let id = event.target.id;

  //IDからおぶぜくとをすとくする
  let object = $(id);
  
  //既にマス目に入ってる場合はスキップ
  if(object.value != "") {
    return;
  }
  //おぶぜくと(マス目)にしるしを設定する
  if (isFirstMove()) {
     object.value = FIRST_MARK;
  } else {
    object.value = NEXT_MARK;
  }

  if(judgeEnd()) {
    changeDisplayCount();
  }

  //ターン数を+1
  count = count + 1;

  //ゲーム終了かどうか判定
  judgeEnd();

  //ターン表記を切り替える関数
  changeDisplayCount();
}

//もう一度遊ぶボタンを押したときの処理
function resetAction(){
  //ターン数を1に戻す
  count = 1;
  changeDisplayCount();

  //マス目を空にする
  for (let row = 0; row < 3; row++){
    for (let col = 0; col < 3; col++){
      $(IDs[row][col]).value = "";
    }

    //結果の表示をなくす
    displayResult("");

    //ゲームを「実行中」
    isRun = true
  }
}

//画目をよみこんだときのそり
function onloadAction(){
  //マス目にイヴェントを設定する(どうなったら動き出すのか)
  for (let row = 0; row < 3; row++){
    for (let col = 0; col < 3; col++){
      $(IDs[row][col]).onclick = clickAction;
    }
  }

  //もう一度遊ぶボタンにイベントを設定
  $("reset").onclick = resetAction;
}

//画面を読み込んだらじどうだやってもらうイベントを設定
  window.onload= onloadAction();