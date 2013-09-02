// yet another morse codec
// sources used:
// http://www.qsl.net/we6w/text/morse.txt
// http://pobukvam.org/alphabetInfo?alphabet=ru-morse
// http://en.wikipedia.org/wiki/Wabun_code

var morse = (function() {
	var morseTableEn = {
			'A': '.-'
			,'B': '-...'
			,'C': '-.-.'
			,'D': '-..'
			,'E': '.'
			,'F': '..-.'
			,'G': '--.'
			,'H': '....'
			,'I': '..'
			,'J': '.---'
			,'K': '-.-'
			,'L': '.-..'
			,'M': '--'
			,'N': '-.'
			,'O': '---'
			,'P': '.--.'
			,'Q': '--.-'
			,'R': '.-.'
			,'S': '...'
			,'T': '-'
			,'U': '..-'
			,'V': '...-'
			,'W': '.--'
			,'X': '-..-'
			,'Y': '-.--'
			,'Z': '--..'
			,'0': '-----'
			,'1': '.----'
			,'2': '..---'
			,'3': '...--'
			,'4': '....-'
			,'5': '.....'
			,'6': '-....'
			,'7': '--...'
			,'8': '---..'
			,'9': '----.'
			//,'Ä': '.-.-'
			//,'Á': '-.--'
			//,'Â': '.--.-'
			//, CH: '----'
			//,'É': '..-..'
			//,'Ñ': '--.--'
			//,'Ö': '---.'
			//,'Ü': '..--'
			,'.': '.-.-.-'
			,',': '--..--'
			,';': '-.-.-'
			,'?': '..--..'
			,'!': '-.-.--'
			,'-': '-....-'
			,':': '---...'
			,'_': '..--.-'
			,'`': '.----.'
			,'"': '.-..-.'
			,'(': '-.--.'
			,')': '-.--.-'
			,'=': '-...-'
			,'+': '.-.-.'
			//,'*': '-..-'
			,'@': '.--.-.'
			,'$': '...-..-'
			//,'×': '-..-'
			,'/': '-..-.'
			//,'separator': '.-..-'
			//,'separator': '.-..-'
			,'\n': '.-.-'
			,'WARNING': '.-..-'
			,'SOS': '...---...'
			,'ERROR': '........'
			,'REPETITION': '.. ..'            // [I I]
			,'WAIT': '.-...'                  // [AS]
			,'INTERRUPTION': '-...-.-'        // [BK]
			,'UNDERSTOOD': '...-.'            // [VE]
			,'TRANSMISSION RECEIVED': '.-.'   // [R]
			,'BEGINNING OF MESSAGE': '-.-.-'  // [KA]
			,'END OF MESSAGE': '.-.-.'        // [AR]
			,'END OF TRANSMISSION': '-.-'     // [K]
			,'END OF TRANSMISSION2': '-.--.'  // [KN]
			,'CLOSING MARK': '...-.-'         // [SK]
			,'CLOSING STATION': '-.-..-..'    // [CL]
			,' ': ' '
		},
		morseTableCyr = {
			'А': '.-'
			,'Б': '-...'
			,'В': '.--'
			,'Г': '--.'
			,'Д': '-..'
			,'Е': '.'
			,'Ё': '.'
			,'Ж': '...-'
			,'З': '--..'
			,'И': '..'
			,'Й': '.---'
			,'К': '-.-'
			,'Л': '.-..'
			,'М': '--'
			,'Н': '-.'
			,'О': '---'
			,'П': '.--.'
			,'Р': '.-.'
			,'С': '...'
			,'Т': '-'
			,'У': '..-'
			,'Ф': '..-.'
			,'Х': '....'
			,'Ц': '-.-.'
			,'Ч': '---.'
			,'Ш': '----'
			,'Щ': '--.-'
			,'Ъ': '--.--'
			,'Ы': '-.--'
			,'Ь': '-..-'
			,'Э': '..-..'
			,'Ю': '..--'
			,'Я': '.-.-'
			,'.': '.-.-.-'
			,',': '--..--'
			,';': '-.-.-'
			,'?': '..--..'
			,'!': '-.-.--'
			,'-': '-....-'
			,':': '---...'
			,'_': '..--.-'
			,'`': '.----.'
			,'"': '.-..-.'
			,'(': '-.--.'
			,')': '-.--.-'
			,'=': '-...-'
			,'+': '.-.-.'
			//,'*': '-..-'
			,'@': '.--.-.'
			,'$': '...-..-'
			//,'×': '-..-'
			,'/': '-..-.'
			//,'separator': '.-..-'
			,'\n': '.-.-'
			,'WARNING': '.-..-'
			,'ERROR': '........'
			,'SOS': '...---...'
			,'REPETITION': '.. ..'            // [I I]
			,'WAIT': '.-...'                  // [AS]
			,'INTERRUPTION': '-...-.-'        // [BK]
			,'UNDERSTOOD': '...-.'            // [VE]
			,'TRANSMISSION RECEIVED': '.-.'   // [R]
			,'BEGINNING OF MESSAGE': '-.-.-'  // [KA]
			,'END OF MESSAGE': '.-.-.'        // [AR]
			,'END OF TRANSMISSION': '-.-'     // [K]
			,'END OF TRANSMISSION2': '-.--.'  // [KN]
			,'CLOSING MARK': '...-.-'         // [SK]
			,'CLOSING STATION': '-.-..-..'    // [CL]
			,' ': ' '
		},
		morseTableJp = {
			'ア': '--.--'  // a
			,'イ': '.-'     // i
			,'ウ': '..-'    // u
			,'エ': '-.---'  // e
			,'オ': '.-...'  // o
			,'カ': '.-..'   // ka
			,'キ': '-.-..'  // ki
			,'ク': '...-'   // ku
			,'ケ': '-.--'   // ke
			,'コ': '----'   // ko
			,'サ': '-.-.-'  // sa
			,'シ': '--.-.'  // shi
			,'ス': '---.-'  // su
			,'セ': '.---.'  // se
			,'ソ': '---.'   // sho
			,'タ': '-.'     // ta
			,'チ': '..-.'   // ti
			,'ツ': '.--.'   // tu
			,'テ': '.-.--'  // te
			,'ト': '..-..'  // to
			,'ナ': '.-.'    // na
			,'ニ': '-.-.'   // ni
			,'ヌ': '....'   // nu
			,'ネ': '--.-'   // ne
			,'ノ': '..--'   // no
			,'ハ': '-...'   // ha
			,'ヒ': '--..-'  // hi
			,'フ': '--..'   // hu
			,'ヘ': '.'      // he
			,'ヌ': '-..'    // ho
			,'マ': '-..-'   // ma
			,'ミ': '..-.-'  // mi
			,'ム': '-'      // mu
			,'メ': '-...-'  // me
			,'モ': '-..-.'  // mo
			,'ヤ': '.--'    // ya
			,'ユ': '-..--'  // yu
			,'ヨ': '--'     // yo
			,'ラ': '...'    // ra
			,'リ': '--.'    // ri
			,'ル': '-.--.'  // ru
			,'レ': '---'    // re
			,'ロ': '.-.-'   // ro
			,'ワ': '-.-'    // wa
			,'ヰ': '.-..-'  // wi
			,'ン': '.-.-.'  // n
			,'ヱ': '.--..'  // we
			,'ヲ': '.---'   // wo
			,'゛': '..'     // Dakuten
			,'゜': '..--.'  // Handakuten
			,'ー': '.--.-'  // Chōonpu
			,'。': '.-.-..' // Full stop
			,'、': '.-.-.-' // Comma
			,'0': '-----'
			,'1': '.----'
			,'2': '..---'
			,'3': '...--'
			,'4': '....-'
			,'5': '.....'
			,'6': '-....'
			,'7': '--...'
			,'8': '---..'
			,'9': '----.'
			//,'5': '...-.'
			//０１２３４５６７８９
		};

	function getReversed(table) {
		var reversed = {};
		for (var k in table) {
			if (!table.hasOwnProperty(k)) {
				next;
			}
			if (!reversed[table[k]] || k.length < reversed[table[k]].length) {
				reversed[table[k]] = k;
			}
		}
		return reversed;
	}

	var morseReverseEn = getReversed(morseTableEn),
		morseReverseCyr = getReversed(morseTableCyr),
		morseReverseJp = getReversed(morseTableJp);

	var encTables = {
			en: morseTableEn,
			ru: morseTableCyr,
			jp: morseTableJp
		},
		decTables = {
            en: morseReverseEn,
            ru: morseReverseCyr,
            jp: morseReverseJp,
        };
	

	function morseEncode(text, table, ignoreErrors, inBrackets) {
		var str = '';
		table = table || morseTableEn;
		for (var i = 0; i < text.length; i++) {
			if (!inBrackets && i) {
				str += ' ';
			}
			var char = text.charAt(i).toUpperCase();
			if (char === '[' && !inBrackets) {
				var idx = text.indexOf(']', i),
					substr;
				if (idx === -1) {
					if (ignoreErrors) {
						idx = i;
					} else {
						throw new Error('Right bracket not found, starting position ' + idx);
					}
				} else {
					substr = text.substring(i + 1, idx);
					if (table.hasOwnProperty(substr)) {
						str += table[substr];
					} else {
						str += morseEncode(substr, table, ignoreErrors, true);
					}
				}
				i = idx;
			} else {
				if (table.hasOwnProperty(char)) {
					str += table[char];
				} else {
					if (ignoreErrors) {
						
					} else {
						throw new Error('Could not encode character: ``' + char + '\'\'');
					}
				}
			}
		}
		return str;
	}

	function tokenize(text) {
		var tokens = ('' + text).match(/([.-]+|[\s]+)/g),
			idx = 0;
		tokens = (tokens || []).map(function(text) {
			var token = {
					text: text,
					idx: idx
				};
			idx += text.length;
			if (/[.-]/.test(text)) {
				token.type = 'code';
			} else {
				token.type = 'space';
			}
			return token;
		});
		return tokens.concat({type: 'eof'});
	}

	function multiDecode(text, table) {
		var arr = text.split(''),
			result = '',
			prev,
			sub = '';
		arr.forEach(function(c) {
			if (table.hasOwnProperty(sub + c) && table[sub + c].match(/^[a-zа-яё]$/i)) {
				sub += c;
				prev = table[sub];
			} else if (prev) {
				sub = c;
				result += prev;
			} else {
				throw new Error('Cannot decode multiple entries: ``' + text + '\'\'');
			}
		});
		return '[' + result + prev + ']';
	}

	function morseDecode(text, table) {
		var idx = 0,
			codeStack = [],
			strStack = [],
			tokens = tokenize(text),
			result = '',
			str;
		table = table || morseReverseEn;
		tokens.forEach(function(tok) {
			switch (tok.type) {
			case 'space': {
				if (tok.text.length > 1) {
					result += strStack.join('') + ' ';
					codeStack = [];
					strStack = [];
				}
				break;
			}
			case 'code': {
				str = table[tok.text];
				if (codeStack.length > 0) {
					if (table.hasOwnProperty(codeStack.concat(tok.text).join(' '))) {
						codeStack.push(tok.text);
						strStack = ['[' + table[codeStack.join(' ')] + ']' ];
					} else {
						result += strStack.join('');
						codeStack = [tok.text];
						strStack = [str];
					}
				} else if (table.hasOwnProperty(tok.text)) {
					codeStack.push(tok.text);
					strStack.push(str.length === 1 ? str : ('[' + str + ']'));
				} else if (null != (str = multiDecode(tok.text, table))) {
					result += str;
					codeStack = [];
					strStack = [];
				} else {
					throw new Error('Could not decode value: ``' + tok.text + '\'\'');
				}
				break;
			}
			case 'eof': {
				result += strStack.join('');
				codeStack = null;
				strStack = null;
				break;
			}
			default:
				throw new Error('Unexpected token :' + tok.type);
			}
		});
		return result;
	}

	return {
		encode: function(text, table) {
			return morseEncode(text, encTables[table || 'en']);
		},
		decode: function(text, table) {
			return morseDecode(text, decTables[table || 'en']);
		},
		getReversed: getReversed,
		encTables: encTables,
		decTables: decTables
	};
})();
