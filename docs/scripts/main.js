!(function() {
	function e(t, n, r) {
		function s(a, i) {
			if (!n[a]) {
				if (!t[a]) {
					var c = 'function' == typeof require && require
					if (!i && c) return c(a, !0)
					if (o) return o(a, !0)
					var u = new Error("Cannot find module '" + a + "'")
					throw ((u.code = 'MODULE_NOT_FOUND'), u)
				}
				var l = (n[a] = { exports: {} })
				t[a][0].call(
					l.exports,
					function(e) {
						var n = t[a][1][e]
						return s(n || e)
					},
					l,
					l.exports,
					e,
					t,
					n,
					r,
				)
			}
			return n[a].exports
		}
		for (
			var o = 'function' == typeof require && require, a = 0;
			a < r.length;
			a++
		)
			s(r[a])
		return s
	}
	return e
})()(
	{
		1: [
			function(e, t, n) {
				t.exports = function() {
					var e = document.createElement('div')
					return (
						e.setAttribute('aria-live', 'assertive'),
						e.setAttribute(
							'style',
							'position: absolute; opacity: 0; height: 0; width: 0; overflow: hidden; pointer-events: none;',
						),
						e.classList.add(
							'time-input-polyfill-accessibility-block',
						),
						document.querySelector('body').appendChild(e),
						e
					)
				}
			},
			{},
		],
		2: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('../getters/get_values')
				t.exports = function(e, t) {
					setTimeout(function() {
						var n = r(e),
							o = s(e),
							a = o[n],
							i = '--' == a ? 'blank' : a,
							c = { hrs: 'Hours', min: 'Minutes', mode: 'AM/PM' }[
								n
							],
							u = {
								initial: '$label grouping $fullValue.',
								select:
									'$segmentName spin button $segmentValue.',
								update: '$segmentValue.',
							},
							l = t.map(function(e) {
								return u[e] ? u[e] : e
							}),
							_ = e.value.replace(/--/g, 'blank'),
							v = '<p>' + l.join('</p><p>') + '</p>'
						;(v = v.replace(/\$label/g, e.polyfill.label)),
							(v = v.replace(/\$segmentName/g, c)),
							(v = v.replace(/\$segmentValue/g, i)),
							(v = v.replace(/\$fullValue/g, _)),
							(e.polyfill.$a11y.innerHTML = v)
					}, 1)
				}
			},
			{
				'../getters/get_current_segment': 15,
				'../getters/get_values': 18,
			},
		],
		3: [
			function(e, t, n) {
				t.exports = function(e) {
					return e <= 12 ? (0 === e ? 12 : e) : e - 12
				}
			},
			{},
		],
		4: [
			function(e, t, n) {
				t.exports = function(e) {
					return isNaN(e) ? e : parseInt(e)
				}
			},
			{},
		],
		5: [
			function(e, t, n) {
				var r = e('./convert_number'),
					s = e('./convert_hours_to_12hr_time'),
					o = e('./leading_zero')
				t.exports = function(e) {
					if ('' === e) return '--:-- --'
					var t = /([0-9]{2})\:([0-9]{2})/,
						n = t.exec(e),
						a = r(n[1]),
						i = n[2],
						c = s(a),
						u = a > 12,
						l = u ? 'PM' : 'AM'
					return [o(c), ':', i, ' ', l].join('')
				}
			},
			{
				'./convert_hours_to_12hr_time': 3,
				'./convert_number': 4,
				'./leading_zero': 7,
			},
		],
		6: [
			function(e, t, n) {
				var r = e('./leading_zero')
				t.exports = function(e) {
					if (/-/.test(e)) return ''
					var t,
						n = e.indexOf('PM') > -1,
						s = /^([0-9]{2})/.exec(e),
						o = s ? parseInt(s[1]) : ''
					t = 12 === o ? (n ? 12 : 0) : n ? o + 12 : o
					var a = 24 === t ? 0 : t,
						i = /^[0-9]{2}:([0-9]{2}) (AM|PM)/
					return e.replace(i, r(a) + ':$1')
				}
			},
			{ './leading_zero': 7 },
		],
		7: [
			function(e, t, n) {
				t.exports = function(e) {
					if (isNaN(e)) return e
					var t = parseInt(e)
					return t < 10 ? '0' + t : e
				}
			},
			{},
		],
		8: [
			function(e, t, n) {
				t.exports = function(e) {
					return Array.prototype.slice.call(e, 0)
				}
			},
			{},
		],
		9: [
			function(e, t, n) {
				function r(e) {
					e.polyfill.autoSwap &&
						(d(e, 24),
						setTimeout(function() {
							d(e, 12)
						}, 1))
				}
				var s = e('../helpers/values'),
					o = e('../selectors/select_segment'),
					a = e('../selectors/next_segment'),
					i = e('../selectors/prev_segment'),
					c = e('../selectors/select_cursor_segment'),
					u = e('../getters/get_current_segment'),
					l = e('../setters/reset'),
					_ = e('../setters/manual_number_entry'),
					v = e('../setters/clear_segment'),
					f = e('../setters/increment_current_segment'),
					g = e('../setters/decrement_current_segment'),
					m = e('../setters/set_mode'),
					d = e('../setters/switch_times'),
					p = e('../events/handle_tab'),
					h = e('../static-values/all_number_keys'),
					b = e('../static-values/named_keys'),
					y = e('../accessibility/update_a11y')
				t.exports = function(e) {
					var t = '',
						n = !1
					document.addEventListener('keydown', function(e) {
						n = e.shiftKey
					}),
						document.addEventListener('keyup', function(e) {
							n = e.shiftKey
						}),
						e.form &&
							e.form.addEventListener('submit', function() {
								r(e)
							})
					var d = !1
					e.addEventListener('mousedown', function() {
						d = !0
					}),
						e.addEventListener('mouseup', function() {
							setTimeout(function() {
								'' === e.value && l(e)
							}, 1)
						}),
						e.addEventListener('click', function(t) {
							c(e)
						}),
						e.addEventListener('blur', function() {
							var n = e.dataset.value
							n !== t && (t = n), (d = !1)
						}),
						e.addEventListener('focus', function(t) {
							if (!d) {
								t.preventDefault()
								var r = n ? 'mode' : 'hrs'
								o(e, r)
							}
							y(e, ['initial', 'select'])
						}),
						e.addEventListener('keydown', function(t) {
							var n = 13 === t.which
							if (n) return !0
							var r = h.indexOf(t.which) > -1,
								o = s(b).indexOf(t.which) > -1,
								c =
									[
										b.ArrowDown,
										b.ArrowRight,
										b.ArrowUp,
										b.ArrowLeft,
									].indexOf(t.which) > -1,
								d = [b.a, b.p].indexOf(t.which) > -1,
								y =
									[b.Delete, b.Backspace].indexOf(t.which) >
									-1
							if (
								((!o || c || r || d || y) && t.preventDefault(),
								r && _(e, t.which),
								y)
							) {
								var x = u(e)
								v(e, x)
							}
							switch (t.which) {
								case b.ArrowRight:
									a(e)
									break
								case b.ArrowLeft:
									i(e)
									break
								case b.ArrowUp:
									f(e)
									break
								case b.ArrowDown:
									g(e)
									break
								case b.Escape:
									l(e)
									break
								case b.a:
									m(e, 'AM')
									break
								case b.p:
									m(e, 'PM')
									break
								case b.Tab:
									p(e, t)
							}
						})
				}
			},
			{
				'../accessibility/update_a11y': 2,
				'../events/handle_tab': 11,
				'../getters/get_current_segment': 15,
				'../helpers/values': 20,
				'../selectors/next_segment': 22,
				'../selectors/prev_segment': 23,
				'../selectors/select_cursor_segment': 24,
				'../selectors/select_segment': 25,
				'../setters/clear_segment': 28,
				'../setters/decrement_current_segment': 30,
				'../setters/increment_current_segment': 32,
				'../setters/manual_number_entry': 33,
				'../setters/reset': 35,
				'../setters/set_mode': 37,
				'../setters/switch_times': 41,
				'../static-values/all_number_keys': 44,
				'../static-values/named_keys': 45,
			},
		],
		10: [
			function(e, t, n) {
				t.exports = function(e) {
					var t = document.createEvent('Event')
					return t.initEvent(e, !0, !0), t
				}
			},
			{},
		],
		11: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('../selectors/prev_segment'),
					o = e('../selectors/next_segment')
				t.exports = function(e, t) {
					var n = r(e),
						a = t.shiftKey && 'hrs' === n,
						i = !t.shiftKey && 'mode' === n
					a || i || (t.preventDefault(), t.shiftKey ? s(e) : o(e))
				}
			},
			{
				'../getters/get_current_segment': 15,
				'../selectors/next_segment': 22,
				'../selectors/prev_segment': 23,
			},
		],
		12: [
			function(e, t, n) {
				var r = e('./trigger_event')
				t.exports = function(e) {
					r(e, 'input'), r(e, 'change')
				}
			},
			{ './trigger_event': 13 },
		],
		13: [
			function(e, t, n) {
				function r(e) {
					return !/--/.test(e.value)
				}
				var s = e('./create_event'),
					o = s('input'),
					a = s('change')
				t.exports = function(e, t) {
					var n = { input: o, change: a }[t]
					r(e) && e.dispatchEvent(n)
				}
			},
			{ './create_event': 10 },
		],
		14: [
			function(e, t, n) {
				t.exports = function(e, t) {
					for (var n = e, r = []; n; ) {
						r.push(n)
						var s = n.msMatchesSelector
							? n.msMatchesSelector(t)
							: n.matches(t)
						if (s) return r
						n = n.parentElement
					}
					return r
				}
			},
			{},
		],
		15: [
			function(e, t, n) {
				var r = e('../static-values/ranges'),
					s = e('./get_selected_range')
				t.exports = function(e) {
					var t = s(e)
					for (var n in r) {
						var o = r[n],
							a = o.start <= t.start,
							i = o.end >= t.end
						if (a && i) return n
					}
					return 'hrs'
				}
			},
			{ '../static-values/ranges': 46, './get_selected_range': 17 },
		],
		16: [
			function(e, t, n) {
				function r(e) {
					var t = e.getAttribute('aria-labelledby')
					if (t) {
						var n = document.getElementById(t)
						if (n) return n.textContent
					}
					return !1
				}
				function s(e) {
					var t = e.getAttribute('aria-label')
					return !!t && t
				}
				function o(e) {
					if (e.id) {
						var t = document.querySelector(
							'label[for="' + e.id + '"]',
						)
						if (t) return t.textContent
					}
					return !1
				}
				function a(e) {
					var t = c(e, 'label'),
						n = t[t.length - 1]
					return 'LABEL' == n.nodeName && n.textContent
				}
				function i(e) {
					var t = e.getAttribute('title')
					return !!t && t
				}
				var c = e('./get_ancestors')
				t.exports = function(e) {
					var t = r(e) || s(e) || o(e) || a(e) || i(e)
					if (t) return t
					throw (console.error('Label text for input not found.', e),
					new Error(
						'Cannot polyfill time input due to a missing label.',
					))
				}
			},
			{ './get_ancestors': 14 },
		],
		17: [
			function(e, t, n) {
				t.exports = function(e) {
					return { start: e.selectionStart, end: e.selectionEnd }
				}
			},
			{},
		],
		18: [
			function(e, t, n) {
				var r = e('../converters/convert_number')
				t.exports = function(e, t) {
					var n = t ? t : e.value,
						s = /([0-9-]{1,2})\:([0-9-]{1,2})\s?(AM|PM|\-\-)?/,
						o = s.exec(n)
					return { hrs: r(o[1]), min: r(o[2]), mode: o[3] }
				}
			},
			{ '../converters/convert_number': 4 },
		],
		19: [
			function(e, t, n) {
				function r() {
					a = []
				}
				function s(e) {
					a.push(e)
				}
				function o() {
					return a
				}
				var a = []
				t.exports = { items: o, clear: r, add: s }
			},
			{},
		],
		20: [
			function(e, t, n) {
				t.exports = function(e) {
					var t = []
					for (var n in e) t.push(e[n])
					return t
				}
			},
			{},
		],
		21: [
			function(e, t, n) {
				var r = e('../converters/toArray')
				t.exports = function(e) {
					var t = document.querySelectorAll(e)
					return r(t)
				}
			},
			{ '../converters/toArray': 8 },
		],
		22: [
			function(e, t, n) {
				var r = e('./traverse')
				t.exports = function(e) {
					r(e, 'next')
				}
			},
			{ './traverse': 26 },
		],
		23: [
			function(e, t, n) {
				var r = e('./traverse')
				t.exports = function(e) {
					r(e, 'prev')
				}
			},
			{ './traverse': 26 },
		],
		24: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('./select_segment')
				t.exports = function(e) {
					var t = r(e)
					s(e, t)
				}
			},
			{ '../getters/get_current_segment': 15, './select_segment': 25 },
		],
		25: [
			function(e, t, n) {
				t.exports = function(e, t) {
					function n() {
						var n = 'mode' === t ? 'text' : 'tel'
						e.setAttribute('type', n)
					}
					function r(t, n) {
						return function() {
							e.setSelectionRange(t, n)
						}
					}
					n()
					var s = { hrs: r(0, 2), min: r(3, 5), mode: r(6, 8) }
					s[t](e)
				}
			},
			{},
		],
		26: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('../selectors/select_segment'),
					o = e('../helpers/manual_entry_log'),
					a = e('../static-values/segments'),
					i = e('../accessibility/update_a11y')
				t.exports = function(e, t) {
					var n = r(e),
						c = 'next' === t ? 1 : -1,
						u = a.indexOf(n) + c,
						l = {
							next: a[u] || 'mode',
							prev: u < 0 ? 'hrs' : a[u],
						}[t]
					s(e, l), o.clear(), i(e, ['select'])
				}
			},
			{
				'../accessibility/update_a11y': 2,
				'../getters/get_current_segment': 15,
				'../helpers/manual_entry_log': 19,
				'../selectors/select_segment': 25,
				'../static-values/segments': 47,
			},
		],
		27: [
			function(e, t, n) {
				var r = e('../setters/set_data_attribute'),
					s = e('../events/trigger_both_events')
				t.exports = function(e) {
					;(e.value = '--:-- --'), r(e, ''), s(e)
				}
			},
			{
				'../events/trigger_both_events': 12,
				'../setters/set_data_attribute': 36,
			},
		],
		28: [
			function(e, t, n) {
				var r = e('./set_segment'),
					s = e('../accessibility/update_a11y')
				t.exports = function(e, t) {
					r(e, t, '--'), s(e, ['update'])
				}
			},
			{ '../accessibility/update_a11y': 2, './set_segment': 38 },
		],
		29: [
			function(e, t, n) {
				var r = e('./switch_mode'),
					s = e('./nudge_time_segment'),
					o = e('../accessibility/update_a11y')
				t.exports = function(e, t) {
					'mode' === t ? r(e, 'PM') : s(e, t, 'down'),
						o(e, ['update'])
				}
			},
			{
				'../accessibility/update_a11y': 2,
				'./nudge_time_segment': 34,
				'./switch_mode': 40,
			},
		],
		30: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('../setters/decrement')
				t.exports = function(e) {
					var t = r(e)
					s(e, t)
				}
			},
			{
				'../getters/get_current_segment': 15,
				'../setters/decrement': 29,
			},
		],
		31: [
			function(e, t, n) {
				var r = e('./switch_mode'),
					s = e('./nudge_time_segment'),
					o = e('../accessibility/update_a11y')
				t.exports = function(e, t) {
					'mode' === t ? r(e, 'AM') : s(e, t, 'up'), o(e, ['update'])
				}
			},
			{
				'../accessibility/update_a11y': 2,
				'./nudge_time_segment': 34,
				'./switch_mode': 40,
			},
		],
		32: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('../setters/increment')
				t.exports = function(e) {
					var t = r(e)
					s(e, t)
				}
			},
			{
				'../getters/get_current_segment': 15,
				'../setters/increment': 31,
			},
		],
		33: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('./set_segment'),
					o = e('../selectors/next_segment'),
					a = e('../helpers/manual_entry_log'),
					i = e('../static-values/sorted_number_keys')
				t.exports = function(e, t) {
					var n = i[t],
						c = r(e)
					if ('mode' !== c) {
						var u = a.items().length,
							l = { hrs: [1, 2], min: [5, 9] },
							_ = l[c][u]
						u < 2 && a.add(n)
						var v = parseInt(l[c].join('')),
							f = parseInt(a.items().join(''))
						v >= f && s(e, c, f)
						var g = n > _ || 2 === a.items().length
						g && o(e)
					}
				}
			},
			{
				'../getters/get_current_segment': 15,
				'../helpers/manual_entry_log': 19,
				'../selectors/next_segment': 22,
				'../static-values/sorted_number_keys': 48,
				'./set_segment': 38,
			},
		],
		34: [
			function(e, t, n) {
				var r = e('../getters/get_values'),
					s = e('../converters/convert_hours_to_12hr_time'),
					o = e('../converters/leading_zero'),
					a = e('./set_segment')
				t.exports = function(e, t, n) {
					var i,
						c = r(e),
						u = 'up' === n ? 1 : -1
					if ('--' === c[t]) {
						var l = new Date()
						i = { hrs: s(l.getHours()), min: l.getMinutes() }
					} else {
						var _ = {
							up: c.min < 59 ? c.min + u : 0,
							down: 0 === c.min ? 59 : c.min + u,
						}
						i = { hrs: s(c.hrs + u), min: _[n] }
					}
					a(e, t, o(i[t]))
				}
			},
			{
				'../converters/convert_hours_to_12hr_time': 3,
				'../converters/leading_zero': 7,
				'../getters/get_values': 18,
				'./set_segment': 38,
			},
		],
		35: [
			function(e, t, n) {
				var r = e('./apply_default'),
					s = e('../selectors/select_segment')
				t.exports = function(e) {
					r(e), s(e, 'hrs')
				}
			},
			{ '../selectors/select_segment': 25, './apply_default': 27 },
		],
		36: [
			function(e, t, n) {
				var r = e('../converters/convert_to_24hr_time')
				t.exports = function(e, t) {
					var n = t.indexOf('-') > -1 ? '' : t,
						s = r(n)
					e.setAttribute('data-value', s)
				}
			},
			{ '../converters/convert_to_24hr_time': 6 },
		],
		37: [
			function(e, t, n) {
				var r = e('../getters/get_current_segment'),
					s = e('./set_segment')
				t.exports = function(e, t) {
					var n = r(e)
					'mode' === n && s(e, n, t)
				}
			},
			{ '../getters/get_current_segment': 15, './set_segment': 38 },
		],
		38: [
			function(e, t, n) {
				var r = e('../getters/get_values'),
					s = e('../converters/leading_zero'),
					o = e('../selectors/select_segment'),
					a = e('./set_data_attribute'),
					i = e('../events/trigger_both_events')
				t.exports = function(e, t, n) {
					var c = r(e)
					c[t] = n
					var u = [s(c.hrs), ':', s(c.min), ' ', c.mode].join('')
					;(e.value = u), o(e, t), a(e, u), i(e)
				}
			},
			{
				'../converters/leading_zero': 7,
				'../events/trigger_both_events': 12,
				'../getters/get_values': 18,
				'../selectors/select_segment': 25,
				'./set_data_attribute': 36,
			},
		],
		39: [
			function(e, t, n) {
				var r = e('../converters/convert_to_12hr_time'),
					s = e('../setters/set_data_attribute')
				t.exports = function(e, t) {
					var n = r(t)
					;(e.value = n), s(e, t)
				}
			},
			{
				'../converters/convert_to_12hr_time': 5,
				'../setters/set_data_attribute': 36,
			},
		],
		40: [
			function(e, t, n) {
				var r = e('../getters/get_values'),
					s = e('./set_segment')
				t.exports = function(e, t) {
					t = t || 'AM'
					var n = r(e).mode,
						o = { '--': t, AM: 'PM', PM: 'AM' }[n]
					s(e, 'mode', o)
				}
			},
			{ '../getters/get_values': 18, './set_segment': 38 },
		],
		41: [
			function(e, t, n) {
				var r = e('./switch_to_data_value'),
					s = e('./set_time')
				t.exports = function(e, t) {
					var n = /\s/.test(e.value)
					12 != t && 24 != t && (t = n ? 24 : 12)
					var o = {
						12: function() {
							n || s(e, e.dataset.value)
						},
						24: function() {
							n && r(e)
						},
					}
					o[t]()
				}
			},
			{ './set_time': 39, './switch_to_data_value': 42 },
		],
		42: [
			function(e, t, n) {
				t.exports = function(e) {
					var t = e.dataset.value
					e.value = t
				}
			},
			{},
		],
		43: [
			function(e, t, n) {
				var r = e('../setters/set_time')
				t.exports = function(e) {
					return r(e, e.value), e
				}
			},
			{ '../setters/set_time': 39 },
		],
		44: [
			function(e, t, n) {
				var r = [
					48,
					49,
					50,
					51,
					52,
					53,
					54,
					55,
					56,
					57,
					96,
					97,
					98,
					99,
					100,
					101,
					102,
					103,
					104,
					105,
				]
				t.exports = r
			},
			{},
		],
		45: [
			function(e, t, n) {
				var r = {
					ArrowDown: 40,
					ArrowRight: 39,
					ArrowUp: 38,
					ArrowLeft: 37,
					Backspace: 8,
					Delete: 46,
					Tab: 9,
					Shift: 16,
					Escape: 27,
					a: 65,
					p: 80,
				}
				t.exports = r
			},
			{},
		],
		46: [
			function(e, t, n) {
				var r = {
					hrs: { start: 0, end: 2 },
					min: { start: 3, end: 5 },
					mode: { start: 6, end: 8 },
				}
				t.exports = r
			},
			{},
		],
		47: [
			function(e, t, n) {
				var r = e('./ranges'),
					s = Object.keys(r)
				t.exports = s
			},
			{ './ranges': 46 },
		],
		48: [
			function(e, t, n) {
				var r = e('./all_number_keys'),
					s = {}
				r.forEach(function(e, t) {
					var n = t > 9 ? t - 10 : t
					s[e] = n
				}),
					(t.exports = s)
			},
			{ './all_number_keys': 44 },
		],
		49: [
			function(e, t, n) {
				function r(e) {
					e.setAttribute('autocomplete', 'off'),
						e.setAttribute('aria-hidden', !0),
						v || ((s = _()), (v = !0))
					var t = l(e)
					;(e.polyfill = {
						$a11y: s,
						label: t,
						autoSwap: !0,
						update: function() {
							a(e)
						},
						swap: function(t) {
							u(e, t)
						},
					}),
						'' === e.value || /--/.test(e.value)
							? (o(e), i(e, ''))
							: (a(e), i(e, e.value)),
						c(e)
				}
				var s,
					o = e('./core/setters/apply_default'),
					a = e('./core/setters/update_time'),
					i = e('./core/setters/set_data_attribute'),
					c = e('./core/events/bind_events'),
					u = e('./core/setters/switch_times'),
					l = e('./core/getters/get_label'),
					_ = e('./core/accessibility/create_a11y_block'),
					v = !1
				window && (window.TimePolyfill = r), t && (t.exports = r)
			},
			{
				'./core/accessibility/create_a11y_block': 1,
				'./core/events/bind_events': 9,
				'./core/getters/get_label': 16,
				'./core/setters/apply_default': 27,
				'./core/setters/set_data_attribute': 36,
				'./core/setters/switch_times': 41,
				'./core/setters/update_time': 43,
			},
		],
		50: [
			function(e, t, n) {
				t.exports = function(e, t) {
					var n = e.querySelector('.result__list'),
						r = e.querySelector('.result__close'),
						s = ''
					for (var o in t) {
						var a = t[o].replace(
							/^$/,
							'<span class="visually-hidden">blank</span>',
						)
						s += [
							'<div class="result__item">',
							'<dt class="result__label">',
							o,
							'</dt>',
							'<dd class="result__value">"',
							a,
							'"</dd>',
							'</div>',
						].join('')
					}
					;(n.innerHTML = s),
						e.classList.add('-visible'),
						(r.onclick = function() {
							e.classList.remove('-visible')
						})
				}
			},
			{},
		],
		51: [
			function(e, t, n) {
				t.exports = function(e, t) {
					if ('undefined' != typeof gtag)
						t
							? gtag('event', e, {
									event_category: t[0],
									event_label: t[1],
									value: t[2],
							  })
							: gtag('event', e)
					else {
						t = {}
						var n = {
							action: e,
							event_category: t.category || 'general',
							event_label: t.label || '(not set)',
							value: t.value,
						}
						console.log('GA event =', n, '* = required')
					}
				}
			},
			{},
		],
		52: [
			function(e, t, n) {
				'use strict'
				var r = e('../../index'),
					s = e('../../core/selectors/_$$'),
					o = e('../../core/converters/toArray'),
					a = e('../_modules/result/result'),
					i = e('./_helpers/gtag')
				document.addEventListener('DOMContentLoaded', function() {
					var e = s('input.time')
					e.forEach(function(e) {
						new r(e),
							(e.oninput = function() {
								console.log('input', e.dataset.value)
							}),
							(e.onchange = function() {
								console.log('change', e.dataset.value)
							}),
							e.addEventListener('change', function() {
								console.log('listener change')
							}),
							e.addEventListener('input', function() {
								console.log('listener input')
							})
					}),
						(document.querySelector('form').onsubmit = function(e) {
							function t(e) {
								var t = []
								return (
									o(e.children).forEach(function(e) {
										var n = e.querySelector('label')
										n && t.push(n.textContent)
									}),
									t
								)
							}
							function n(e, t) {
								var n = {}
								return (
									o(e.elements).forEach(function(e, r) {
										'INPUT' === e.nodeName &&
											(n[t[r]] = e.value)
									}),
									n
								)
							}
							e.preventDefault()
							var r = t(this),
								s = n(this, r),
								c = document.querySelector('.result')
							i('form submit'), a(c, s), c.focus()
						})
				})
			},
			{
				'../../core/converters/toArray': 8,
				'../../core/selectors/_$$': 21,
				'../../index': 49,
				'../_modules/result/result': 50,
				'./_helpers/gtag': 51,
			},
		],
	},
	{},
	[52],
)
//# sourceMappingURL=main.js.map
