let minecraft = {
  blocks: {
    sky: new Sky(),
    cloud: new Cloud(),
    dirt: new Dirt(),
    grass: new Grass(),
    leaf: new Leaf(),
    tree: new Tree(),
    rock: new Rock()
  },

  tools: {
    axe: new Axe(),
    pickaxe: new Pickaxe(),
    shovel: new Shovel(),
    stack: new Stack(),
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
  minecraft.currentTool =  minecraft.tools.pickaxe.type;
  $("#pickaxe").addClass("blueBorder");
};

$("#start").click(minecraft.startGame);

minecraft.chooseTool = function (e) {
  if (minecraft.currentTool === minecraft.tools.stack.type) {
    $(minecraft.blockInStack).removeClass("blueBorder");
  } else {
    $(`#${minecraft.currentTool}`).removeClass("blueBorder");
  }

  if (e.target.getAttribute("inStack") === "yes") {
    minecraft.currentTool = minecraft.tools.stack.type;
    $("#gameBoard").css("cursor", "url(./images/cursors/stack.png) 12 12,pointer");
    minecraft.blockInStack = e.target;
    $(e.target).addClass("blueBorder");
  } else {
    minecraft.currentTool = e.target.id;
    $("#gameBoard").css("cursor", `url(./images/cursors/${minecraft.currentTool}.png) 12 12,pointer`);
    $(`#${minecraft.currentTool}`).addClass("blueBorder");
  }
};

minecraft.chooseInWorldBlock = function (e) {
  function updateBlockStack(type) {
    if ($("#stack").children().length >= 6) {
      $("#stack span").last().remove();
    }
    let newStackItem = document.createElement("span");
    $(newStackItem).addClass("stackItem", "m-0", "p-0");
    $(newStackItem).attr("inStack", "yes");
    $(newStackItem).attr("block-type", `${type}`);
    $(newStackItem).click(minecraft.chooseTool);
    $("#stack").prepend(newStackItem);
  }

  let type = $(e.target).attr("block-type");
  if (minecraft.currentTool === minecraft.tools.stack.type) {
    let stackType = $('#stack').attr("block-type");
    if (stackType !== "sky") {
      $(e.target).attr("block-type", stackType);
      $('#stack').attr("block-type", "sky");
      $("#stack").removeClass("blueBorder");
    }
    else {
      minecraft.flashRed(minecraft.currentTool);
    }
  }

  if (minecraft.currentTool === minecraft.tools.stack.type) {
    if (type === "sky" || type === "cloud") {
      let stackType = $(minecraft.blockInStack).attr("block-type");
      $(e.target).attr("block-type", stackType);
      $(minecraft.blockInStack).remove();
      minecraft.blockInStack = $("#stack").children()[0];
      if (typeof minecraft.blockInStack === "undefined") {
        minecraft.currentTool = "noTool";
        $("#gameBoard").css("cursor", "pointer");
      } else {
        $(minecraft.blockInStack).addClass("blueBorder");
      }
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
    $(blockToFlash).addClass("redFilter");
    setTimeout(() => { $(blockToFlash).removeClass("redFilter"); }, 400);
  } else {
    $(`#${minecraft.currentTool}`).removeClass("blueBorder");
    $(`#${minecraft.currentTool}`).addClass("redBorder");
    setTimeout(() => {
      $(`#${minecraft.currentTool}`).addClass("blueBorder");
      $(`#${minecraft.currentTool}`).removeClass("redBorder");
    }, 400);
  }
};
