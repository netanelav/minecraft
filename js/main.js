var currentTool = "pickaxe";
function chooseTool(eventObject) {
  currentTool = eventObject.currentTarget.id;
}
$(".tool").click(chooseTool);

function chooseBlock(eventObject) {
    if(eventObject.target.c === ){

    }

}
$(".block").click(chooseBlock);
