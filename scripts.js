const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');
let mouseDown = false;

fullscreen.addEventListener('click', () => {
	video.webkitDisplayingFullscreen ? video.webkitExitFullscreen() : video.webkitEnterFullscreen();
});

toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', rangeUpdate);

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));

progress.addEventListener('mousedown', () => mouseDown = true);

progress.addEventListener('mouseup', () => mouseDown = false);

ranges.forEach((range) => {
	range.addEventListener('change', (e) => {
		value = e.target.value;
		e.target.name == 'volume' ? video.volume = value : video.playbackRate = value;
	})
})

skipButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		video.currentTime = video.currentTime + parseInt(e.target.dataset.skip);
	});
});

function togglePlay(){
	toggle.innerText = video.paused ? '►' : '| |';
	video.paused ? video.play() : video.pause();
}

function rangeUpdate(){
	const percent = video.currentTime / video.duration * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}