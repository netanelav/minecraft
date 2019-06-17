var currentTool = "pickaxe"
function chooseTool(eventObject){
    currentTool = eventObject.currentTarget.id;
}
$(".tool").click(chooseTool);
