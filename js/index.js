var count = 0;
var o_win = 0;
var x_win = 0;
var myArray = [
"X",
"O",
];
var enable = true;
var turn = 'X';

function _reset_values(){
	count = 0;
	o_win = 0;
	x_win = 0;
	myArray = [
		"X",
		"O",
	];
	enable = true;
	turn = 'X';
	$('#o_win').text(o_win)
	$('#x_win').text(x_win)
}

$('[name=play_with]').change(function(){
	$('[name=player]').prop( "disabled", this.value == 'computer' ? false : true );
	_reset_game();
	_reset_values();
});

$('[name=player]').change(function(){
	var player = $('[name=player]:checked').val();
	if (turn != player){
		$('#board span').click();
	}
	$('[name=player]').prop( "disabled", true );
});

$('#board span').click(function(){
	if (enable){
		if($('[name=play_with]').val() == 'friend'){
			$(this).text(turn);
			$(this).addClass(turn)
			count++
			_checking(count)
			turn = turn == 'X' ? 'O' : 'X';
		}

		if($('[name=play_with]').val() == 'computer'){
			var player = $('[name=player]:checked').val();
			if (turn == player){
				$(this).text(player);
				$(this).addClass(player)
				count++
				_checking(count);
				turn = turn == 'X' ? 'O' : 'X';
			}

			setTimeout(function() {
				if(enable){
					var computer_player = $('[name=player]:not(:checked)').val();
					if (turn == computer_player){
						var cols = $('td span').not('.X').not('.O');
						var selected_col = cols[Math.floor(Math.random()*cols.length)];
						$(selected_col).text(computer_player);
						$(selected_col).addClass(computer_player)
						count++
						_checking(count)
						turn = turn == 'X' ? 'O' : 'X';
					}
					
				}
			}, 500);

			
		}
	}
	
	

});

function _reset_game(){
	$("tr span").text("")
	$("tr span").removeClass();
	count = 0;
	$('#alert').text("");
	enable = true;
}


$("#reset").click(function () {
	_reset_game()
})

function _checking(count) {
	// body...
	$.each(myArray, function( index, value ) {
		if ($("#one span").hasClass(value) && $("#two span").hasClass(value) && $("#three span").hasClass(value) || $("#four span").hasClass(value) && $("#five span").hasClass(value) && $("#six span").hasClass(value) || $("#seven span").hasClass(value) && $("#eight span").hasClass(value) && $("#nine span").hasClass(value) || $("#one span").hasClass(value) && $("#four span").hasClass(value) && $("#seven span").hasClass(value) || $("#two span").hasClass(value) && $("#five span").hasClass(value) && $("#eight span").hasClass(value) || $("#three span").hasClass(value) && $("#six span").hasClass(value) && $("#nine span").hasClass(value) || $("#one span").hasClass(value) && $("#five span").hasClass(value) && $("#nine span").hasClass(value) || $("#three span").hasClass(value) && $("#five span").hasClass(value) && $("#seven span").hasClass(value))
		{
			setTimeout(function() {
				$('#alert').text(value +' has won the game. Start a new game');
				enable =  false;
				if (value == 'O'){
					o_win++
					$('#o_win').text(o_win)
				}
				else{
					x_win++
					$('#x_win').text(x_win)
				}
			}, 0);
			
		}
	});
	if (count == 9){
		$('#alert').text('Its a tie.');
		enable = false;
		
	}
}