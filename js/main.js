class Block {
  constructor(type, tool) {
    this.type = type;
    this.tool = tool;
  }
}

let minecraft = {
  blocks: {
    sky: new Block("sky", "none"),
    cloud: new Block("cloud", "cloudTool"),
    dirt: new Block("dirt", "shovel"),
    grass: new Block("grass", "shovel"),
    leaf: new Block("leaf", "axe"),
    tree: new Block("tree", "axe"),
    rock: new Block("rock", "pickaxe")
  },
  matrix: matrix
};

minecraft.createBoard = function () {
  var gameBoard = $("#gameBoard");
  for (var i = 0; i < minecraft.matrix.length; i++) {
    var newRow = document.createElement("div");
    newRow.classList.add("blocks-row");
    newRow.setAttribute("width", "100%");
    gameBoard.append(newRow);
    for (var j = 0; j < minecraft.matrix[i].length; j++) {
      var newBlock = document.createElement("span");
      newBlock.classList.add("block");
      newBlock.setAttribute("block-type", minecraft.blocks[minecraft.matrix[i][j]].type);
      newBlock.setAttribute("tool", minecraft.blocks[minecraft.matrix[i][j]].tool);
      newRow.append(newBlock);
    }
  }
};

minecraft.startGame = function () {
  $("#landing-page").css("display", "none");
  $(".tutorial").css("display", "none");
  $(".container").css("display", "block");
  minecraft.createBoard();
  $(".block").click(minecraft.chooseInWorldBlock);
  $(".tool").click(minecraft.chooseTool);

  minecraft.blockInStack;
  minecraft.currentTool = "pickaxe";
  $("#pickaxe").addClass("blueBorder");
};

$("#start").click(minecraft.startGame);

minecraft.chooseTool = function (e) {
  if (minecraft.currentTool === "stack") {
    $(minecraft.blockInStack).removeClass("blueBorder");
  } else {
    $(`#${minecraft.currentTool}`).removeClass("blueBorder");
  }

  if (e.target.getAttribute("inStack") === "yes") {
    minecraft.currentTool = "stack";
    minecraft.blockInStack = e.target;
    $(e.target).addClass("blueBorder");
  } else {
    minecraft.currentTool = e.target.id;
    $(`#${minecraft.currentTool}`).addClass("blueBorder");
  }
};

minecraft.chooseInWorldBlock = function (e) {
  function updateBlockStack(type) {
    if ($("#stack").children().length >= 6) {
      $("#stack span").last().remove();
      ``
    }
    var newStackItem = document.createElement("span");
    newStackItem.classList.add("stackItem", "m-0", "p-0");
    newStackItem.setAttribute("inStack", "yes");
    newStackItem.setAttribute("block-type", `${type}`);
    $(newStackItem).click(minecraft.chooseTool);
    $("#stack").prepend(newStackItem);
  }

  let type = $(e.target).attr("block-type");
  if (minecraft.currentTool === "stack") {
    let stackType = document.getElementById("stack").getAttribute("block-type");
    if (stackType !== "sky") {
      e.target.setAttribute("block-type", stackType);
      document.getElementById("stack").setAttribute("block-type", "sky");
      $("#stack").removeClass("blueBorder");
    }
    else {
      minecraft.flashRed(minecraft.currentTool);
    }
  }

  if (minecraft.currentTool === "stack") {
    if (type === "sky" || type === "cloud") {
      let stackType = $(minecraft.blockInStack).attr("block-type");

      $(e.target).attr("block-type", stackType);
      $(minecraft.blockInStack).remove();
      minecraft.currentTool = "noTool";
    } else minecraft.flashRed(e.target);
  } else if (minecraft.blocks[type].tool === minecraft.currentTool) {
    $(e.target).attr("block-type", "sky");
    updateBlockStack(type);
  } else {
    minecraft.flashRed();
  }
};

minecraft.flashRed = function (blockToFlash) {
  if (minecraft.currentTool === "stack") {
    $(blockToFlash).addClass("redBorder");
    setTimeout(() => {
      $(blockToFlash).removeClass("redBorder");
    }, 400);

  } else {

    $(`#${minecraft.currentTool}`).removeClass("blueBorder");
    $(`#${minecraft.currentTool}`).addClass("redBorder");
    setTimeout(() => {
      $(`#${minecraft.currentTool}`).addClass("blueBorder");
      $(`#${minecraft.currentTool}`).removeClass("redBorder");
    }, 400);
  }
};
