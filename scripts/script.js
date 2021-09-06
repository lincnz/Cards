

$(document).ready(function(){
	
	var gameArray = [];
	var down = true;
	var twoCards = 0;
	var activeCards = [];
	var cardArray = [];
	var idArray = [];
	var secs = 0;
	var mins = 0;
	var attempts = 0;
	var matchCounter = 0;
	var timer;
	
	function clock() {
		if (matchCounter === 6) {clearInterval(this);}
		else if (secs < 59){
			secs++;
			if (secs < 10) {$('.secs').html("0" + secs);} else {$('.secs').html(secs);}
			if (mins < 10) {$('.mins').html("0" + mins);} else {$('.mins').html(mins);}
		}
		else {
			secs = 0;	
			mins++;
			if (secs < 10) {$('.secs').html("0" + secs);} else {$('.secs').html(secs);}
			if (mins < 10) {$('.mins').html("0" + mins);} else {$('.mins').html(mins);}
		}
		
	};
	
	function cardShuffle() {
		for (i = 1; i < 7; i++){ gameArray.push(i) };
		for (i = 1; i < 7; i++){ gameArray.push(i) };

		function shuffle(array) {
			for (let i = array.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
		
		shuffle(gameArray);
		console.log(gameArray);
	}
	
	function cardSprites() {
		var j = 1;
		for (i of gameArray){
			$('.gamespace').append(
				`<div class="` + i + `-card card-f clickable" id="id-` + j + `" >
					<div class='front'>
						<img src="img/cards/back.jpg">
					</div>
					<div class='back'>
						<img src="img/cards/` + i + `.jpg">
					</div>
				</div>`
			);
			j++;
		};
	}
	
	
	
	/* game function */
	function startGame() {
		
		gameArray = [];
		$(".gamespace").empty();
		matchCounter = 0;
		
		/* set up random array of cards */
		cardShuffle();
		
		/* make card sprites */
		cardSprites();
		
		/* flip animation rules */
		$(".card-f").flip({
			trigger: 'manual'
		});
		
		function reSet() {
			$(".clickable").flip(false);
			$(".matched").flip(true);
			twoCards = 0;
			cardArray = [];
		}
		
		$(".clickable").click(function() {
			if ($(this).hasClass("matched")){
				
			}
			else if (twoCards === 2){
				twoCards = 0;
				cardArray = [];
				idArray = [];
				reSet();
				/* $(this).flip(true); */
				/* twoCards++; */
				console.log(twoCards)
				console.log(idArray);
				console.log(cardArray);
			}
			else if (twoCards === 1) {
				$(this).flip(true);
				twoCards++;
				attempts++;
				$('.attempts').html(attempts);
				console.log(twoCards)
				var classes = $(this).attr('class');
				var id = $(this).attr('id');
				cardArray.push(classes);
				idArray.push(id);
				if ((cardArray[0] === cardArray[1]) && (idArray[0] !== idArray[1])) { 
					matchCounter++; 
					$('#' + idArray[0]).removeClass('clickable').addClass('matched'); 
					$('#' + idArray[1]).removeClass('clickable').addClass('matched'); 
					twoCards = 0; 
					cardArray = []; 
					idArray = []; 
					if (matchCounter === 6) { window.alert("YOU WIN"); $(".timer").css("color", "red"); $(".restart").css("display", "block"); }
					else {}
				}
				else if (idArray[0] === idArray[1]) { 
					twoCards = 0; 
					cardArray = []; 
					idArray = []; 
					reSet(); 
				}
				console.log(cardArray);
				console.log(idArray);
			}
			else if (twoCards === 0 ) {
				$(this).flip(true);
				twoCards++;
				console.log(twoCards)
				
				var classes = $(this).attr('class');
				var id = $(this).attr('id');
				cardArray.push(classes);
				idArray.push(id);
				console.log(cardArray);
				console.log(idArray);
			}
		});
	}
	

	/* start button */
	$('.start').click(function() {	
		startGame();
		$(this).hide();	
		var timer = setInterval(clock, 1000);
		
	});
	
	$('.restart').click(function() {	
		startGame();
		$(this).css("display", "none");	
		mins = 0;
		secs = 0;
		attempts = 0;
		var timer = setInterval(clock, 1000);
		$(".timer").css("color", "white"); 
	});
	
});
