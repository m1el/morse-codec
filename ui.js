$(function() {
	var input = $('#input'),
		output = $('#output'),
		err = $('#error'),
		lang = 'en';
	function encode() {
		try {
			output.val(morse.encode(input.val(), lang));
			err.text('');
		} catch(e) {
			err.text(e);
		}
	}
	function decode() {
		try {
			input.val(morse.decode(output.val(), lang));
			err.text('');
		} catch(e) {
			err.text(e);
		}
	}
	$.each(['keydown', 'click', /*'focus',*/ 'keyup', 'keypress'], function(i, v) {
		input.on(v, encode);
		output.on(v, decode);
	});
	$('input[name=lang]').change(function(el) {
		el = $(el.target);
		if (el.is(':checked')) {
			lang = el.val();
		}
	});
});
