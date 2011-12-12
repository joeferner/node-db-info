/*
	Default driver template for JS/CC generated parsers for V8
	
	Features:
	- Parser trace messages
	- Step-by-step parsing
	- Integrated panic-mode error recovery
	- Pseudo-graphical parse tree generation
	
	Written 2007 by Jan Max Meyer, J.M.K S.F. Software Technologies
        Modified 2008 from driver.js_ to support V8 by Louis P.Santillan
			<lpsantil@gmail.com>
	
	This is in the public domain.
*/


/* Switching one of these variables on will enable debug facilities
	of the various parser drivers */
//_dbg_withtrace = true;

function cleanupIdentifier(identifier) {
  var match = identifier.match(/["'](.*)["']/);
	if(match) {
	  identifier = match[1];
	}
  return identifier;
}



var _dbg_withparsetree	= false;
var _dbg_withtrace		= false;
var _dbg_withstepbystep	= false;

function __dbg_print( text )
{
	console.log( text );
}

function __dbg_wait()
{
   var v = read_line();
}

function __lex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return 27;

		do
		{

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) || info.src.charCodeAt( pos ) == 13 || info.src.charCodeAt( pos ) == 32 ) state = 1;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 44 ) state = 4;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 5;
		else if( info.src.charCodeAt( pos ) == 59 ) state = 6;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 7;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 20;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 21;
		else if( info.src.charCodeAt( pos ) == 47 ) state = 22;
		else if( info.src.charCodeAt( pos ) == 75 || info.src.charCodeAt( pos ) == 107 ) state = 36;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 37;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 55;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 56;
		else if( info.src.charCodeAt( pos ) == 67 || info.src.charCodeAt( pos ) == 99 ) state = 63;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 64;
		else if( info.src.charCodeAt( pos ) == 68 || info.src.charCodeAt( pos ) == 100 ) state = 69;
		else if( info.src.charCodeAt( pos ) == 80 || info.src.charCodeAt( pos ) == 112 ) state = 70;
		else if( info.src.charCodeAt( pos ) == 66 || ( info.src.charCodeAt( pos ) >= 69 && info.src.charCodeAt( pos ) <= 72 ) || info.src.charCodeAt( pos ) == 74 || ( info.src.charCodeAt( pos ) >= 76 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 81 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || info.src.charCodeAt( pos ) == 98 || ( info.src.charCodeAt( pos ) >= 101 && info.src.charCodeAt( pos ) <= 104 ) || info.src.charCodeAt( pos ) == 106 || ( info.src.charCodeAt( pos ) >= 108 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 113 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		break;

	case 1:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 2:
		state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 5:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 5;
		else state = -1;
		match = 19;
		match_pos = pos;
		break;

	case 6:
		state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 7:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 76;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 8:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 9:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 13;
		match_pos = pos;
		break;

	case 10:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 11:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 11;
		match_pos = pos;
		break;

	case 12:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 13:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 14:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 15:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 15;
		match_pos = pos;
		break;

	case 16:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 17;
		match_pos = pos;
		break;

	case 17:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 16;
		match_pos = pos;
		break;

	case 18:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 12;
		match_pos = pos;
		break;

	case 19:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 14;
		match_pos = pos;
		break;

	case 20:
		if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		break;

	case 21:
		if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 8;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 22:
		if( info.src.charCodeAt( pos ) == 47 ) state = 24;
		else state = -1;
		break;

	case 23:
		state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 24:
		if( info.src.charCodeAt( pos ) == 10 ) state = 1;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 9 ) || ( info.src.charCodeAt( pos ) >= 11 && info.src.charCodeAt( pos ) <= 254 ) ) state = 24;
		else state = -1;
		break;

	case 25:
		if( info.src.charCodeAt( pos ) == 89 || info.src.charCodeAt( pos ) == 121 ) state = 9;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 88 ) || info.src.charCodeAt( pos ) == 90 || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 120 ) || info.src.charCodeAt( pos ) == 122 ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 26:
		if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 10;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 27:
		if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 11;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 28:
		if( info.src.charCodeAt( pos ) == 88 || info.src.charCodeAt( pos ) == 120 ) state = 12;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 87 ) || ( info.src.charCodeAt( pos ) >= 89 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 119 ) || ( info.src.charCodeAt( pos ) >= 121 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 29:
		if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 13;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 30:
		if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 14;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 31:
		if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 15;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 32:
		if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 16;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 33:
		if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 17;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 34:
		if( info.src.charCodeAt( pos ) == 89 || info.src.charCodeAt( pos ) == 121 ) state = 18;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 88 ) || info.src.charCodeAt( pos ) == 90 || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 120 ) || info.src.charCodeAt( pos ) == 122 ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 35:
		if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 19;
		else if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 36:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 25;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 37:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 26;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 38;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 38:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 27;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 39:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 28;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 40:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 29;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 41:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 30;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 42:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 31;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 43:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 32;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 44:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 33;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 45:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 34;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 46:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 35;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 47:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 68 || info.src.charCodeAt( pos ) == 100 ) state = 39;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 67 ) || ( info.src.charCodeAt( pos ) >= 69 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 99 ) || ( info.src.charCodeAt( pos ) >= 101 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 48:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 66 || info.src.charCodeAt( pos ) == 98 ) state = 40;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || info.src.charCodeAt( pos ) == 65 || ( info.src.charCodeAt( pos ) >= 67 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || info.src.charCodeAt( pos ) == 97 || ( info.src.charCodeAt( pos ) >= 99 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 49:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 41;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 50:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 81 || info.src.charCodeAt( pos ) == 113 ) state = 42;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 80 ) || ( info.src.charCodeAt( pos ) >= 82 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 112 ) || ( info.src.charCodeAt( pos ) >= 114 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 51:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 43;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 52:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 44;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 53:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 45;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 54:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 46;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 55:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 47;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 56:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 48;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 57:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 49;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 58:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 50;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 59:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 51;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 60:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 52;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 61:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 77 || info.src.charCodeAt( pos ) == 109 ) state = 53;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 76 ) || ( info.src.charCodeAt( pos ) >= 78 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 108 ) || ( info.src.charCodeAt( pos ) >= 110 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 62:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 77 || info.src.charCodeAt( pos ) == 109 ) state = 54;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 76 ) || ( info.src.charCodeAt( pos ) >= 78 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 108 ) || ( info.src.charCodeAt( pos ) >= 110 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 63:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 57;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 65;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 64:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 58;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 65:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 59;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 66:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 70 || info.src.charCodeAt( pos ) == 102 ) state = 60;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 69 ) || ( info.src.charCodeAt( pos ) >= 71 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 101 ) || ( info.src.charCodeAt( pos ) >= 103 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 67:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 61;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 68:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 62;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 69:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 66;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 70:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 67;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 71:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 68;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 72:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 67 || info.src.charCodeAt( pos ) == 99 ) state = 71;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 66 ) || ( info.src.charCodeAt( pos ) >= 68 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 98 ) || ( info.src.charCodeAt( pos ) >= 100 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 73:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 72;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 74:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 73;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 75:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 74;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 76:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 75;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 77:
		if( info.src.charCodeAt( pos ) == 34 || info.src.charCodeAt( pos ) == 39 ) state = 23;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 77;
		else state = -1;
		match = 18;
		match_pos = pos;
		break;

}


			pos++;

		}
		while( state > -1 );

	}
	while( 1 > -1 && match == 1 );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		

	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __parse( src, err_off, err_la )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
	//Visual parse tree generation
	var 	treenode		= new Function( "", "var sym; var att; var child;" );
	var		treenodes		= new Array();
	var		tree			= new Array();
	var		tmptree			= null;

/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* CreateStmt' */, 1 ),
	new Array( 22/* CreateStmt */, 7 ),
	new Array( 22/* CreateStmt */, 9 ),
	new Array( 21/* ColumnNames */, 3 ),
	new Array( 21/* ColumnNames */, 1 ),
	new Array( 21/* ColumnNames */, 0 ),
	new Array( 20/* ColumnDefs */, 3 ),
	new Array( 20/* ColumnDefs */, 1 ),
	new Array( 20/* ColumnDefs */, 0 ),
	new Array( 23/* ColumnDef */, 3 ),
	new Array( 24/* TypeName */, 1 ),
	new Array( 24/* TypeName */, 4 ),
	new Array( 24/* TypeName */, 6 ),
	new Array( 25/* ColumnConstraints */, 2 ),
	new Array( 25/* ColumnConstraints */, 0 ),
	new Array( 26/* ColumnConstraint */, 2 ),
	new Array( 26/* ColumnConstraint */, 2 ),
	new Array( 26/* ColumnConstraint */, 1 ),
	new Array( 26/* ColumnConstraint */, 1 ),
	new Array( 26/* ColumnConstraint */, 2 ),
	new Array( 26/* ColumnConstraint */, 2 ),
	new Array( 26/* ColumnConstraint */, 2 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 2/* "CREATE" */,2 ),
	/* State 1 */ new Array( 27/* "$" */,0 ),
	/* State 2 */ new Array( 4/* "INDEX" */,3 , 3/* "TABLE" */,4 ),
	/* State 3 */ new Array( 18/* "Identifier" */,5 ),
	/* State 4 */ new Array( 18/* "Identifier" */,6 ),
	/* State 5 */ new Array( 9/* "ON" */,7 ),
	/* State 6 */ new Array( 5/* "(" */,8 ),
	/* State 7 */ new Array( 18/* "Identifier" */,9 ),
	/* State 8 */ new Array( 18/* "Identifier" */,12 , 6/* ")" */,-8 ),
	/* State 9 */ new Array( 5/* "(" */,13 ),
	/* State 10 */ new Array( 6/* ")" */,14 ),
	/* State 11 */ new Array( 8/* "," */,15 , 6/* ")" */,-7 ),
	/* State 12 */ new Array( 18/* "Identifier" */,17 ),
	/* State 13 */ new Array( 18/* "Identifier" */,19 , 6/* ")" */,-5 ),
	/* State 14 */ new Array( 7/* ";" */,20 ),
	/* State 15 */ new Array( 18/* "Identifier" */,12 , 6/* ")" */,-8 ),
	/* State 16 */ new Array( 8/* "," */,-14 , 6/* ")" */,-14 , 12/* "PRIMARY" */,-14 , 10/* "NOT" */,-14 , 14/* "AUTOINCREMENT" */,-14 , 15/* "UNIQUE" */,-14 , 16/* "DEFAULT" */,-14 , 17/* "COLLATE" */,-14 ),
	/* State 17 */ new Array( 5/* "(" */,23 , 12/* "PRIMARY" */,-10 , 10/* "NOT" */,-10 , 14/* "AUTOINCREMENT" */,-10 , 15/* "UNIQUE" */,-10 , 16/* "DEFAULT" */,-10 , 17/* "COLLATE" */,-10 , 8/* "," */,-10 , 6/* ")" */,-10 ),
	/* State 18 */ new Array( 6/* ")" */,24 ),
	/* State 19 */ new Array( 8/* "," */,25 , 6/* ")" */,-4 ),
	/* State 20 */ new Array( 27/* "$" */,-1 ),
	/* State 21 */ new Array( 6/* ")" */,-6 ),
	/* State 22 */ new Array( 12/* "PRIMARY" */,27 , 10/* "NOT" */,28 , 14/* "AUTOINCREMENT" */,29 , 15/* "UNIQUE" */,30 , 16/* "DEFAULT" */,31 , 17/* "COLLATE" */,32 , 8/* "," */,-9 , 6/* ")" */,-9 ),
	/* State 23 */ new Array( 19/* "Integer" */,33 ),
	/* State 24 */ new Array( 7/* ";" */,34 ),
	/* State 25 */ new Array( 18/* "Identifier" */,19 , 6/* ")" */,-5 ),
	/* State 26 */ new Array( 8/* "," */,-13 , 6/* ")" */,-13 , 12/* "PRIMARY" */,-13 , 10/* "NOT" */,-13 , 14/* "AUTOINCREMENT" */,-13 , 15/* "UNIQUE" */,-13 , 16/* "DEFAULT" */,-13 , 17/* "COLLATE" */,-13 ),
	/* State 27 */ new Array( 13/* "KEY" */,36 ),
	/* State 28 */ new Array( 11/* "NULL" */,37 ),
	/* State 29 */ new Array( 8/* "," */,-17 , 6/* ")" */,-17 , 12/* "PRIMARY" */,-17 , 10/* "NOT" */,-17 , 14/* "AUTOINCREMENT" */,-17 , 15/* "UNIQUE" */,-17 , 16/* "DEFAULT" */,-17 , 17/* "COLLATE" */,-17 ),
	/* State 30 */ new Array( 8/* "," */,-18 , 6/* ")" */,-18 , 12/* "PRIMARY" */,-18 , 10/* "NOT" */,-18 , 14/* "AUTOINCREMENT" */,-18 , 15/* "UNIQUE" */,-18 , 16/* "DEFAULT" */,-18 , 17/* "COLLATE" */,-18 ),
	/* State 31 */ new Array( 18/* "Identifier" */,38 , 19/* "Integer" */,39 ),
	/* State 32 */ new Array( 18/* "Identifier" */,40 ),
	/* State 33 */ new Array( 8/* "," */,41 , 6/* ")" */,42 ),
	/* State 34 */ new Array( 27/* "$" */,-2 ),
	/* State 35 */ new Array( 6/* ")" */,-3 ),
	/* State 36 */ new Array( 8/* "," */,-15 , 6/* ")" */,-15 , 12/* "PRIMARY" */,-15 , 10/* "NOT" */,-15 , 14/* "AUTOINCREMENT" */,-15 , 15/* "UNIQUE" */,-15 , 16/* "DEFAULT" */,-15 , 17/* "COLLATE" */,-15 ),
	/* State 37 */ new Array( 8/* "," */,-16 , 6/* ")" */,-16 , 12/* "PRIMARY" */,-16 , 10/* "NOT" */,-16 , 14/* "AUTOINCREMENT" */,-16 , 15/* "UNIQUE" */,-16 , 16/* "DEFAULT" */,-16 , 17/* "COLLATE" */,-16 ),
	/* State 38 */ new Array( 8/* "," */,-20 , 6/* ")" */,-20 , 12/* "PRIMARY" */,-20 , 10/* "NOT" */,-20 , 14/* "AUTOINCREMENT" */,-20 , 15/* "UNIQUE" */,-20 , 16/* "DEFAULT" */,-20 , 17/* "COLLATE" */,-20 ),
	/* State 39 */ new Array( 8/* "," */,-19 , 6/* ")" */,-19 , 12/* "PRIMARY" */,-19 , 10/* "NOT" */,-19 , 14/* "AUTOINCREMENT" */,-19 , 15/* "UNIQUE" */,-19 , 16/* "DEFAULT" */,-19 , 17/* "COLLATE" */,-19 ),
	/* State 40 */ new Array( 8/* "," */,-21 , 6/* ")" */,-21 , 12/* "PRIMARY" */,-21 , 10/* "NOT" */,-21 , 14/* "AUTOINCREMENT" */,-21 , 15/* "UNIQUE" */,-21 , 16/* "DEFAULT" */,-21 , 17/* "COLLATE" */,-21 ),
	/* State 41 */ new Array( 19/* "Integer" */,43 ),
	/* State 42 */ new Array( 12/* "PRIMARY" */,-11 , 10/* "NOT" */,-11 , 14/* "AUTOINCREMENT" */,-11 , 15/* "UNIQUE" */,-11 , 16/* "DEFAULT" */,-11 , 17/* "COLLATE" */,-11 , 8/* "," */,-11 , 6/* ")" */,-11 ),
	/* State 43 */ new Array( 6/* ")" */,44 ),
	/* State 44 */ new Array( 12/* "PRIMARY" */,-12 , 10/* "NOT" */,-12 , 14/* "AUTOINCREMENT" */,-12 , 15/* "UNIQUE" */,-12 , 16/* "DEFAULT" */,-12 , 17/* "COLLATE" */,-12 , 8/* "," */,-12 , 6/* ")" */,-12 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 22/* CreateStmt */,1 ),
	/* State 1 */ new Array(  ),
	/* State 2 */ new Array(  ),
	/* State 3 */ new Array(  ),
	/* State 4 */ new Array(  ),
	/* State 5 */ new Array(  ),
	/* State 6 */ new Array(  ),
	/* State 7 */ new Array(  ),
	/* State 8 */ new Array( 20/* ColumnDefs */,10 , 23/* ColumnDef */,11 ),
	/* State 9 */ new Array(  ),
	/* State 10 */ new Array(  ),
	/* State 11 */ new Array(  ),
	/* State 12 */ new Array( 24/* TypeName */,16 ),
	/* State 13 */ new Array( 21/* ColumnNames */,18 ),
	/* State 14 */ new Array(  ),
	/* State 15 */ new Array( 20/* ColumnDefs */,21 , 23/* ColumnDef */,11 ),
	/* State 16 */ new Array( 25/* ColumnConstraints */,22 ),
	/* State 17 */ new Array(  ),
	/* State 18 */ new Array(  ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array(  ),
	/* State 22 */ new Array( 26/* ColumnConstraint */,26 ),
	/* State 23 */ new Array(  ),
	/* State 24 */ new Array(  ),
	/* State 25 */ new Array( 21/* ColumnNames */,35 ),
	/* State 26 */ new Array(  ),
	/* State 27 */ new Array(  ),
	/* State 28 */ new Array(  ),
	/* State 29 */ new Array(  ),
	/* State 30 */ new Array(  ),
	/* State 31 */ new Array(  ),
	/* State 32 */ new Array(  ),
	/* State 33 */ new Array(  ),
	/* State 34 */ new Array(  ),
	/* State 35 */ new Array(  ),
	/* State 36 */ new Array(  ),
	/* State 37 */ new Array(  ),
	/* State 38 */ new Array(  ),
	/* State 39 */ new Array(  ),
	/* State 40 */ new Array(  ),
	/* State 41 */ new Array(  ),
	/* State 42 */ new Array(  ),
	/* State 43 */ new Array(  ),
	/* State 44 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"CreateStmt'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"CREATE" /* Terminal symbol */,
	"TABLE" /* Terminal symbol */,
	"INDEX" /* Terminal symbol */,
	"(" /* Terminal symbol */,
	")" /* Terminal symbol */,
	";" /* Terminal symbol */,
	"," /* Terminal symbol */,
	"ON" /* Terminal symbol */,
	"NOT" /* Terminal symbol */,
	"NULL" /* Terminal symbol */,
	"PRIMARY" /* Terminal symbol */,
	"KEY" /* Terminal symbol */,
	"AUTOINCREMENT" /* Terminal symbol */,
	"UNIQUE" /* Terminal symbol */,
	"DEFAULT" /* Terminal symbol */,
	"COLLATE" /* Terminal symbol */,
	"Identifier" /* Terminal symbol */,
	"Integer" /* Terminal symbol */,
	"ColumnDefs" /* Non-terminal symbol */,
	"ColumnNames" /* Non-terminal symbol */,
	"CreateStmt" /* Non-terminal symbol */,
	"ColumnDef" /* Non-terminal symbol */,
	"TypeName" /* Non-terminal symbol */,
	"ColumnConstraints" /* Non-terminal symbol */,
	"ColumnConstraint" /* Non-terminal symbol */,
	"$" /* Terminal symbol */
);


	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __lex( info );
			
	while( true )
	{
		act = 46;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		/*
		_print( "state " + sstack[sstack.length-1] + " la = " + la + " info.att = >" +
				info.att + "< act = " + act + " src = >" + info.src.substr( info.offset, 30 ) + "..." + "<" +
					" sstack = " + sstack.join() );
		*/
		
		if( _dbg_withtrace && sstack.length > 0 )
		{
			__dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
			
			if( _dbg_withstepbystep )
				__dbg_wait();
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == 46 )
		{
			if( _dbg_withtrace )
				__dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == 46 && la != 27 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 46 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 46;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 46 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __lex( info );
			}
			
			if( act == 46 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( _dbg_withtrace )
				__dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 46 )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{
			//Parse tree generation
			if( _dbg_withparsetree )
			{
				var node = new treenode();
				node.sym = labels[ la ];
				node.att = info.att;
				node.child = new Array();
				tree.push( treenodes.length );
				treenodes.push( node );
			}
			
			if( _dbg_withtrace )
				__dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __lex( info );
			
			if( _dbg_withtrace )
				__dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( _dbg_withtrace )
				__dbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( _dbg_withtrace )
				__dbg_print( "\tPerforming semantic action..." );
			
switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		 global.parserResult = { type: 'CREATE TABLE', tableName: cleanupIdentifier(vstack[ vstack.length - 5 ]), columns: vstack[ vstack.length - 3 ] }; 
	}
	break;
	case 2:
	{
		 global.parserResult = { type: 'CREATE INDEX', indexName: cleanupIdentifier(vstack[ vstack.length - 7 ]), tableName: cleanupIdentifier(vstack[ vstack.length - 5 ]), columns: vstack[ vstack.length - 3 ] }; 
	}
	break;
	case 3:
	{
		 rval = [ vstack[ vstack.length - 3 ] ].concat(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 4:
	{
		 rval = [ vstack[ vstack.length - 1 ] ]; 
	}
	break;
	case 5:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 6:
	{
		 rval = [ vstack[ vstack.length - 3 ] ].concat(vstack[ vstack.length - 1 ]); 
	}
	break;
	case 7:
	{
		 rval = [ vstack[ vstack.length - 1 ] ]; 
	}
	break;
	case 8:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 9:
	{
		 rval = { name: vstack[ vstack.length - 3 ], type: vstack[ vstack.length - 2 ], columnConstraints: (vstack[ vstack.length - 1 ] || []) }; 
	}
	break;
	case 10:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 11:
	{
		rval = vstack[ vstack.length - 4 ];
	}
	break;
	case 12:
	{
		rval = vstack[ vstack.length - 6 ];
	}
	break;
	case 13:
	{
		 rval = (vstack[ vstack.length - 2 ] || []).concat([vstack[ vstack.length - 1 ]]); 
	}
	break;
	case 14:
	{
		 rval = []; 
	}
	break;
	case 15:
	{
		 rval = 'PRIMARY KEY' 
	}
	break;
	case 16:
	{
		 rval = 'NOT NULL' 
	}
	break;
	case 17:
	{
		 rval = 'AUTOINCREMENT' 
	}
	break;
	case 18:
	{
		 rval = 'UNIQUE' 
	}
	break;
	case 19:
	{
		 rval = { name: 'DEFAULT', value: vstack[ vstack.length - 1 ] }; 
	}
	break;
	case 20:
	{
		 rval = { name: 'DEFAULT', value: vstack[ vstack.length - 1 ] }; 
	}
	break;
	case 21:
	{
		 rval = { name: 'COLLATE', value: vstack[ vstack.length - 1 ] }; 
	}
	break;
}


			
			if( _dbg_withparsetree )
				tmptree = new Array();

			if( _dbg_withtrace )
				__dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				if( _dbg_withparsetree )
					tmptree.push( tree.pop() );
					
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( _dbg_withparsetree )
			{
				var node = new treenode();
				node.sym = labels[ pop_tab[act][0] ];
				node.att = new String();
				node.child = tmptree.reverse();
				tree.push( treenodes.length );
				treenodes.push( node );
			}
			
			if( act == 0 )
				break;
				
			if( _dbg_withtrace )
				__dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
	}

	if( _dbg_withtrace )
		__dbg_print( "\nParse complete." );

	if( _dbg_withparsetree )
	{
		if( err_cnt == 0 )
		{
			__dbg_print( "\n\n--- Parse tree ---" );
			__dbg_parsetree( 0, treenodes, tree );
		}
		else
		{
			__dbg_print( "\n\nParse tree cannot be viewed. There where parse errors." );
		}
	}
	
	return err_cnt;
}


function __dbg_parsetree( indent, nodes, tree )
{
	var str = new String();
	for( var i = 0; i < tree.length; i++ )
	{
		str = "";
		for( var j = indent; j > 0; j-- )
			str += "\t";
		
		str += nodes[ tree[i] ].sym;
		if( nodes[ tree[i] ].att != "" )
			str += " >" + nodes[ tree[i] ].att + "<" ;
			
		__dbg_print( str );
		if( nodes[ tree[i] ].child.length > 0 )
			__dbg_parsetree( indent + 1, nodes, nodes[ tree[i] ].child );
	}
}



exports.parse = __parse;
