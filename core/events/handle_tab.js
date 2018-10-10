
module.exports = function handle_tab(e) {
	var current_segment = get_current_segment();
	var backwards_and_first = e.shiftKey && current_segment === 'hrs';
	var forwards_and_last = !e.shiftKey && current_segment === 'mode';

	if (!backwards_and_first && !forwards_and_last) {
		e.preventDefault();
		if (e.shiftKey) {
			prev_segment();
		} else {
			next_segment();
		}
	}
}