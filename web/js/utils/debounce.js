export function debounce(fn, wait = 1000, time) {
	return function() {
		const args = arguments;

		clearTimeout(time);
		time = setTimeout(function() {
			fn.apply(this, args);
		}, wait);
	}
}