console.log("hey");

const playButton = document.getElementById("play");


const audioCtx = new AudioContext();

document.addEventListener("DOMContentLoaded", () => {
	// Audioクラスを生成する。これはHTMLの<audio>要素と同じと思っていい。
	const audio = new Audio();
	audio.volume = 0.3;
	// audio.controls;			// 再生ボタンやシークバーといったコントロールを表示する
	// audio.loop = true;		// 音声ファイルをループ再生する
	// audio.currentTime = 0;	// 現在の再生時刻(秒)。読み込み前は以外の値にしない方がgood

	// HTML で記述した<select>要素を取得
	const selector = document.querySelector('select[name="audioList"]');

	selector.addEventListener("change", (e) => {
		// <audio>要素が再生状態の場合は一時停止する。
		if(!audio.paused) audio.pause();

		// <select>要素の value の値が空でなければ、その値を<audio>要素の src 属性に指定して再生
		if(e.currentTarget.value !== "") {
			audio.src = e.currentTarget.value;
			console.log(`読み込むファイル：${audio.src}`);
			console.log("再生");
		}
	});

	window.addEventListener("beforeunload", (e) => {
		if(!audio.paused) audio.pause();
	});

	let audioSource = audioCtx.createMediaElementSource(audio);
	
	audioSource.connect(audioCtx.destination);

});
