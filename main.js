$(document).ready(function() {
  // 現在の入力状態を保存するための変数。ユーザーがボタンを押すたびに値が追加される
  let input = "";
  // #displayのIDを持つ入力フィールドを参照する変数
  const display = $("#display");

  // ディスプレイに現在の入力(input変数)を表示する関数
  function  updateDisplay() {
    // inputが空のときは0を表示する
    // .val()メソッドはフォーム要素(<input>や<textarea>)の値を取得または設定するために使う 例: display.val()現在の値を取得 display.val("123")ディスプレイに123を表示
    // inputが空文字列""やnullの場合右側の値0を返す 例: input="";→display.val("0"); input="123";→display.val("123");
    display.val(input || "0");
  }

  // 引数charが演算子かどうか確認する関数。電卓の入力で演算子が連続入力されないようにするために使われる
  function isOperator(char) {
    // includesメソッドは配列の中に指定した値charが含まれているかどうかを確認するために使う
    // 例: console.log(["+", "-", "×", "÷"].includes("+")); true console.log(["+", "-", "×", "÷"].includes("1")); false
    return ["+", "-", "×", "÷"].includes(char);
  }
//
  // .buttonクラスを持つすべてのボタンにクリックイベントを設定する
  $(".button").on("click", function() {
    // クリックされたボタンのテキスト(1,2,+など)を取得btnValueに格納してそれに応じて異なる処理を行う
    const btnValue = $(this).text();

    // ACボタンを押した時にinputを空にしてリセットする
    if (btnValue === "AC") {
      input = "";
    } else if (btnValue === "=") { // =ボタンを押したときに入力された計算式(input)を評価して結果を計算する
      // ×と÷をそれぞれ*と/に置き換え、計算ができるようにする
      input= input.replace(/×/g, "*").replace(/÷/g, "/");
      // tryブロック内のコードはエラーが発生する可能性がある部分
      try {
        // evalは文字列として渡されたコードをJavaScriptとして評価・実行する失敗したときはErrorを表示する 例:input = "3+5";input = eval(input);  結果: 8
        // この場合は電卓の入力文字列inputを数学式として実行する
        // .toString()で結果を文字列に変換
          input = eval(input).toString();
          // catchブロックはtryでエラーが発生したときに実行される
      } catch  (error) {
          input = "Error";
      }
    } else {
      // 現在の入力の最後を取得
        const lastChar = input[input.length - 1];

        // 0の連続入力防止 入力が空または0のときに連続で0や00が入力されるのを防ぐ
        if (btnValue === "0" &&(input === "0" || input === "")) return;
        if (btnValue === "00" &&(input === "" || input === "0")) return;

        // 最初に小数点を入力したときは「0.」とする
        if (btnValue === "." && (input === "" || input === "0")) {
            input = "0.";
        }

        // 小数点がすでに入力されている場合に2つ目の小数点入力を無視する
        else if (btnValue === "." && lastChar === ".") {
            return;
        }

        // 入力が0の状態で新しい数字が入力されるとその数字で置き換える
        else if (input === "0" && btnValue !== ".") {
            input = btnValue;
        }
        // 入力が空の場合や直前に演算子が入力された場合に次の演算子入力を無視する
        else if (isOperator(btnValue) && (input === "" || isOperator(lastChar))) {
            return;
        } else {
          // 条件に該当しない場合は入力された値をinputに追加
            input += btnValue;
        }
      }

      // 各クリックイベントの最後にupdateDisplay()を呼び出してディスプレイを最新の入力状態に更新する
      updateDisplay();
  });
});
