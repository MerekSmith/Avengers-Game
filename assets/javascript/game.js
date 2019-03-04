$(document).ready(function() {
  var characters = [
    { name: "Captain America", hp: 0, attackPower: 0, counterPower: 0, level: 2},
    { name: "Iron Man", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "Hulk", hp: 0, attackPower: 0, counterPower: 0, level: 3 },
    { name: "Antman", hp: 0, attackPower: 0, counterPower: 0, level: 1 },
    { name: "Black Panther", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "Black Widow", hp: 0, attackPower: 0, counterPower: 0, level: 1 },
    { name: "Falcon", hp: 0, attackPower: 0, counterPower: 0, level: 1 },
    { name: "Hawkeye", hp: 0, attackPower: 0, counterPower: 0, level: 1 },
    { name: "Loki", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "Red Skull", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "Scarlet Witch", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "Spiderman", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "Thanos", hp: 0, attackPower: 0, counterPower: 0, level: 3 },
    { name: "Thor", hp: 0, attackPower: 0, counterPower: 0, level: 3 },
    { name: "Vision", hp: 0, attackPower: 0, counterPower: 0, level: 2 },
    { name: "The Wasp", hp: 0, attackPower: 0, counterPower: 0, level: 1 },
    { name: "Captain Marvel", hp: 0, attackPower: 0, counterPower: 0, level: 3 },
    { name: "Doctor Strange", hp: 0, attackPower: 0, counterPower: 0, level: 2 }
  ];
  // May be better to just update Iron Man picture when fighting Hulk rather than change any values.

  var heroCount = characters.length;
  var selectedHeros = [];
  var heroChosen = false;
  var enemyChosen = false;
  var readyToAttack = false;
  var attackCount = 1;
  // var enemyHP = 0;
  // var heroHP = 0;
  var defeatedCount = 0;
	var firstEnemy = true;
	var heroKey;
	var defenderKey;
	var heroInfo;
	var defenderInfo;
	var ironManKey;


  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function restart() {
    selectedHeros = [];
    ironManvsHulk = false;
    heroChosen = false;
    enemyChosen = false;
    readyToAttack = false;
    attackCount = 1;
    // enemyHP = 0;
    // heroHP = 0;
    defeatedCount = 0;
    firstEnemy = true;

    $(".heroVsDefender").empty();
    $(".enemiesLineup").empty();
    $(".headers").empty();

    //Selects random hero number
    var randomHero = Math.floor(Math.random() * heroCount);
    // loops through all possible hero #s and chooses 4 random numbers that will represent the heros to play used.
    while (selectedHeros.length < 4) {
      if (selectedHeros.includes(characters[randomHero]) === false) {
        selectedHeros.push(characters[randomHero]);
        randomHero = Math.floor(Math.random() * heroCount);
      } else {
        randomHero = Math.floor(Math.random() * heroCount);
      }
    }

    ///////// Character object loop to make each character attribute randomized. //////////
    for (let i = 0; i < selectedHeros.length; i++) {
      let hero = selectedHeros[i];
      switch (hero.level) {
        case 1:
          hero.hp = randomRange(100, 120);
          hero.attackPower = randomRange(5, 8);
          hero.counterPower = randomRange(8, 20);
          break;
        case 2:
          hero.hp = randomRange(115, 135);
          hero.attackPower = randomRange(6, 10);
          hero.counterPower = randomRange(12, 25);
          break;
        case 3:
          hero.hp = randomRange(125, 150);
          hero.attackPower = randomRange(8, 12);
          hero.counterPower = randomRange(15, 30);
          break;
        default:
          console.log("Something didn't work in the range");
      }
    }

    $("#mainHeader").text("Choose Your Character!");
    for (var i = 0; i < selectedHeros.length; i++) {
			var hero = selectedHeros[i];
			if (hero.name === 'Iron Man') {
				ironManKey = i;

				$(".heroLineup").append(
					'<div class="col-md-3 heroDiv availableHeroes ironMan" id="' + i + '"><img class="heroimg available" src="assets/images/' + hero.name + '.png" alt="' + hero.name + '"><div class="heroNameDisplay"><h4>' + hero.name + '</h4></div><div class="hpDisplay"><h4>' + hero.hp + "</h4></div></div>");
			} else {

				$(".heroLineup").append(
					'<div class="col-md-3 heroDiv availableHeroes" id="' + i + '"><img class="heroimg available" src="assets/images/' + hero.name + '.png" alt="' + hero.name + '"><div class="heroNameDisplay"><h4>' + hero.name + '</h4></div><div class="hpDisplay"><h4>' + hero.hp + "</h4></div></div>");
				}
			}
    // end of restart function
  }

  // Initiates the start of the game.
  restart();

  // User selects a Hero, then it is given choosen class and is moved to 'your character' space.
  $(".container").on("click", ".availableHeroes", function() {
    console.log("Available Hero has been clicked", this);
    if (!heroChosen) {
      heroChosen = true;
      $("#mainHeader").html("<h3>Choose Your Enemy!</h3>");
      $(".yourHeroTitle").html("<h3>Your Character</h3>");
      $(".enemiesLineupTitle").html("<h3>Enemies Available to Attack</h3>");
      $(this)
        .addClass("userHero")
        .removeClass("availableHeroes");
      $(".heroVsDefender").append(this);
      $("div.userHero > div > h4").addClass("userHeroHeader");
      $(".availableHeroes")
        .detach()
        .appendTo(".enemiesLineup")
        .addClass("availableEnemies")
        .removeClass("availableHeroes");
      $("div.availableEnemies > div > h4").addClass("enemiesLineupHeader");
    }
  });


  // User now selects an Enemy from the EnemyLineup or class of availableEnemies.
  $(".container").on("click", ".availableEnemies", function() {
    if (!enemyChosen) {
      enemyChosen = true;
      readyToAttack = true;
      console.log("enemy chosen", enemyChosen);
      $("#mainHeader").html("<h3>Fight Section</h3>");
      $(".vsTitleDiv").html('<h3 class="vsTitle">VS</h3>');
      $(".defenderTitle").html("<h3>Defender</h3>");
      $(this).addClass("mainEnemy");
      $("div.mainEnemy > div > h4").addClass("mainEnemyHeader");
      $(this).removeClass("availableEnemies");
      if (firstEnemy) {
        $(".heroVsDefender").append(
          '<div class="col-md-2 attackButtonDiv"><button class="btn btn-danger attackButton">Attack</button></div>'
        );
				$(".attackButtonDiv").append('<div class="attackStats"></div>');
				$(".mainHeader").attr('class', 'col-md-8 mainHeader');
				
      }
      // Choosen defender is moved to defender location.
			$(".heroVsDefender").append(this);

			// Check if it is Hulk vs Iron Man to switch to Hulkbuster.
			heroKey = $(".userHero").attr("id");
      defenderKey = $(".mainEnemy").attr("id");
      heroInfo = selectedHeros[heroKey];
      defenderInfo = selectedHeros[defenderKey];
			console.log('enemy selection',heroInfo.name, defenderInfo.name);
			if ((heroInfo.name === 'Iron Man' && defenderInfo.name === 'Hulk') || (heroInfo.name === 'Hulk' && defenderInfo.name === 'Iron Man')) {
				console.log('Hulk vs Iron Man!', selectedHeros[ironManKey]);

				var hulkbuster = {
					name: "Hulkbuster",
					hp: selectedHeros[ironManKey].hp + 10,
					attackPower: characters[ironManKey].attackPower + 10,
					counterPower: characters[ironManKey].counterPower + 5,
					level: 4
				};
				selectedHeros[ironManKey] = hulkbuster;
				console.log('hulkbuster switch',selectedHeros[ironManKey]);

				heroInfo = selectedHeros[heroKey];
      	defenderInfo = selectedHeros[defenderKey];

				$(".ironMan > img").attr("src", "assets/images/Hulkbuster.png");
				$(".ironMan > div.heroNameDisplay > h4").text("Hulkbuster");
				$(".ironMan > div.hpDisplay > h4").text(selectedHeros[ironManKey].hp);
				$(".attackStats").html(
					'<p class="hulkbuster">Iron Man gained the Hulkbuster Armor.<p>'
				);

			}
    }
  });

  // Calls Select Enemy on click function.
  // selectEnemy();

  // click event for attack button.
  // function attack() {
  $(".container").on("click", ".attackButton", function() {
    console.log("you clicked the attack button");
    if (readyToAttack) {
      
      var updatedAttackPower = heroInfo.attackPower * attackCount;

      // Logic to say you attacked and provide the name of the defending character.
      // Also need to add in the attack values, increase an attack counter that will multiple the original attack power of the Hero.
      // Build logic to win or lose, click in new Defender, and reset the game.
      // If possible, check that Iron Man and Hulk are fighting to change into the Hulkbuster.
      $(".attackStats").html(
        "<p>You attacked " +
          defenderInfo.name +
          " for " +
          updatedAttackPower +
          " damage.<p>"
      );
      $(".attackStats").append(
        "<p>" +
          defenderInfo.name +
          " attacked you back for " +
          defenderInfo.counterPower +
          " damage.</p>"
      );
      attackCount++;
      defenderInfo.hp = defenderInfo.hp - updatedAttackPower;
      heroInfo.hp = heroInfo.hp - defenderInfo.counterPower;
      $("div.mainEnemy > div.hpDisplay").html(
        '<h4 class="mainEnemyHeader">' + defenderInfo.hp + "</h4>"
      );
      $("div.userHero > div.hpDisplay").html(
        '<h4 class="userHeroHeader">' + heroInfo.hp + "</h4>"
      );

      // Need logic to check with enemy is dead, make the element hide, and notify to select new enemy.
      if (heroInfo.hp <= 0) {
        readyToAttack = false;
        $(".attackStats").html("<p>You've been defeated! GAME OVER!!.<p>");
        $("button").addClass("restart");
        $(".restart").text("Restart");

      } else if (defenderInfo.hp <= 0) {
        readyToAttack = false;
        enemyChosen = false;
        // hide enemy, state to make new enemy selection.
        defeatedCount = defeatedCount + 1;
        $(".mainEnemy").remove();

        if (defeatedCount === 3) {
          $(".attackStats").html(
            "<p>You've defeated " + defenderInfo.name + "<p>"
          );
          $(".attackStats").append(
            "<p>You've defeated all Defenders! YOU WIN!!.<p>"
          );
          $("button").addClass("restart");
          $(".restart").text("Restart");
        } else {
          firstEnemy = false;
          $(".attackStats").html(
            "<p>You've defeated " + defenderInfo.name + "<p>"
          );
          $(".attackStats").append("<p>Select a new Defender!.<p>");
        }
      }
    }
  });
  // Calls attack button on click function

  // Listener for restart button to reset game, if game is won or lost.
  $(".container").on("click", ".restart", function() {
    restart();
  });

  /////// End of document ready function ////////
});
