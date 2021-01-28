function memo() {
  // index.htmlの投稿ボタンのid取得
  const submit = document.getElementById("submit");
  // 投稿ボタンをクリックした際のイベントを定義
  submit.addEventListener("click", (e) => {
    // メモ投稿フォームの入力データを取得するオブジェクトを生成
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信実装のためXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を引数へ指定
    XHR.open("POST", "/posts", true);
    // データ返却時のデータ形式にjsonを指定
    XHR.responseType = "json";
    // メモ投稿フォームの入力データを送信
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // メモのレコードデータ
      const item = XHR.response.post;
      // HTMLを描画する為、親要素listの要素を取得
      const list = document.getElementById("list");
      // メモの入力フォームをリセットするため、content要素を取得
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTML
      const HTML = `
       <div class="post" data-id=${item.id}>
         <div class="post-date">
           投稿日時：${item.created_at}
         </div>
         <div class="post-content">
         ${item.content}
         </div>
       </div>`;
        // list要素の直後に上記のHTMLを描画する
        list.insertAdjacentHTML("afterend", HTML);
        // 入力フォームに空の文字列で上書きし、リセット
        formText.value = "";
      };
      e.preventDefault();
  });
}
// ページ読み込み時に実行
window.addEventListener("load", memo);