class Quiz{
    constructor(){

    }

    getState(){
        database.ref('gameState').on("value",function(data){gameState=data.val()});
    }

    updateState(state){
        database.ref('/').update({gameState:state});
    }

    async start(){
        if(gameState===0){
            contestant=new Contestant();
            var contestantCountRef= await database.ref('contestantCount').once("value");
            if(contestantCountRef.exists()){
                contestantCount=contestantCountRef.val();
                contestant.getCount();
            }
            question=new Question();
            question.display();
        }
    }

    result(){
        question.title.hide();

        background("yellow");

        var title = createElement('h1');
        title.html("Result Of Quiz");
        title.position(350,0);

        Contestant.getContestantInfo();
        if(allContestants!==undefined){
            var displayPosition=280;
            textSize(15);
            text("**NOTE: Contestant whose answer is correct is highlighted in green color!",350,270);
             
            for(var cnst in allContestants){
               
                if("2"===allContestants[cnst].answer){
                    fill("green");
                }
                else{
                    fill("red");
                }
                displayPosition+=20;
                text(allContestants[cnst].name+": "+allContestants[cnst].answer,350,displayPosition);
               
            }
        }
    }
}