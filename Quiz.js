class Quiz {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        contestant = new Contestant();
        var contestantCountRef = await database.ref('contestantCount').once("value");
        if(contestantCountRef.exists()){
          contestantCount = contestantCountRef.val();
          contestant.getCount();
        }
        question = new Question()
        question.display();
      }
    }
  
    play(){
      
      background("yellow");
      fill(0);
      textSize(30);
      text("Result of the Quiz",40, 350);
      text("..................",320, 65);
  
  
      Contestant.getPlayerInfo();
     
      if(allContestants !== undefined){
        
        var display_Answers = 365;
        fill("black");
        textSize(20);
        text("*NOTE: Contestant who answered correct are highlighted in green color!",130,370);
  
        for(var plr in allContestants){
          debugger;
          var correctAns = "2";
          if (correctAns === allContestants[plr].answer)
            fill("Green")
          else
            fill("red");
  
          display_Answers+=20;
          textSize(15);
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
        }
      }
    }
  }