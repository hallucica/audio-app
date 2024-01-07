let audioElement = document.querySelector("audio[name='audioTrack']");

let audioCtx;	// AudioContext
let track;	// HTMLで記述した<audio>要素に対応するMediaElementAudioSourceNode

document.addEventListener("DOMContentLoaded", () => {
	if(!audioCtx) init();

	// HTML で記述した<select>要素を取得
	const selector = document.querySelector('select[name="audioList"]');

	selector.addEventListener("change", (e) => {
		// <audio>要素が再生状態の場合は一時停止する。
		if(!audioElement.paused) audioElement.pause();

		// <select>要素の value の値が空でなければ、その値を<audio>要素の src 属性に指定して再生
		if(e.currentTarget.value !== "") {
			// 自動再生ポリシーに従う
			if(audioCtx.state === "suspended") audioCtx.resume();
			audioElement.src = e.currentTarget.value;
			audioElement.play();
		}
	});

	window.addEventListener("beforeunload", (e) => {
		if(!audioElement.paused) audio.pause();
	});

});

// 初期化用
function init() {
	// オーディオコンテキストの生成
	audioCtx = new AudioContext();
	// HTMLに記述した<audio>要素からMediaElementAudioSourceノードを生成
	track = audioCtx.createMediaElementSource(audioElement);
	// Gainノードを生成
	const gainNode = audioCtx.createGain();
	// ノードを接続
	track.connect(gainNode).connect(audioCtx.destination);
}
