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
  let gameBoard = $("#gameBoard");
  for (let i = 0; i < minecraft.matrix.length; i++) {
    let newRow = document.createElement("div");
    $(newRow).addClass("blocks-row");
    $(newRow).attr("width", "100%");
    $(gameBoard).append(newRow);
    for (let j = 0; j < minecraft.matrix[i].length; j++) {
      let newBlock = document.createElement("span");
      $(newBlock).addClass("block");
      $(newBlock).attr("block-type", minecraft.blocks[minecraft.matrix[i][j]].type);
      $(newBlock).attr("tool", minecraft.blocks[minecraft.matrix[i][j]].tool);
      $(newRow).append(newBlock);
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
  $("[useTool = 'pickaxe']").addClass("blueBorder");
};

$("#start").click(minecraft.startGame);

minecraft.chooseTool = function (e) {
  if (minecraft.currentTool === "stack") {
    $(minecraft.blockInStack).removeClass("blueBorder");
  } else {
    $(`[useTool = ${minecraft.currentTool}]`).removeClass("blueBorder");
  }

  if (e.target.getAttribute("inStack") === "yes") {
    minecraft.currentTool = "stack";
    minecraft.blockInStack = e.target;
    $(e.target).addClass("blueBorder");
  } else {
    minecraft.currentTool = $(e.target).attr("useTool");
    $(`[useTool = ${minecraft.currentTool}]`).addClass("blueBorder");
  }
};

minecraft.chooseInWorldBlock = function (e) {
  function updateBlockStack(type) {
    if ($("[useTool = 'stack']").children().length >= 6) {
      $("[useTool = 'stack'] span").last().remove();
    }
    let newStackItem = document.createElement("span");
    $(newStackItem).addClass("stackItem", "m-0", "p-0");
    $(newStackItem).attr("inStack", "yes");
    $(newStackItem).attr("block-type", `${type}`);
    $(newStackItem).click(minecraft.chooseTool);
    $("[useTool = 'stack']").prepend(newStackItem);
  }

  let type = $(e.target).attr("block-type");
  if (minecraft.currentTool === "stack") {
    let stackType = $('#stack').attr("block-type");
    if (stackType !== "sky") {
      $(e.target).attr("block-type", stackType);
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
    setTimeout(() => { $(blockToFlash).removeClass("redBorder"); }, 400);
  } else {
    $(`[useTool = ${minecraft.currentTool}]`).removeClass("blueBorder");
    $(`[useTool = ${minecraft.currentTool}]`).addClass("redBorder");
    setTimeout(() => {
      $(`[useTool = ${minecraft.currentTool}]`).addClass("blueBorder");
      $(`[useTool = ${minecraft.currentTool}]`).removeClass("redBorder");
    }, 400);
  }
};
