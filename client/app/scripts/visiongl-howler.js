// Web interface sound system

const VISIONGL_SOUND_LOGO = new Howl({
	urls: ['../sounds/visiongl.ogg']
});

$("#visiongl-logo").mouseenter(function() {
	VISIONGL_SOUND_LOGO.play();
});

$("#visiongl-logo").mouseout(function() {
	VISIONGL_SOUND_LOGO.stop();
});
