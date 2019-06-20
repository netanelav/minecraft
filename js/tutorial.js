minecraft.startTutorial = function () {
    $("#landing-page").css("display", "none");
    $(".tutorial").css("display", "block");
    welcome();
};

function welcome() {
    $('.text')[0].innerHTML = 'Welcome to the Minecraft tutorial! In this game you can move tiles and change the environment you see on your screen with specific tools.';
    setTimeout(function () { $('.text')[0].innerHTML = 'You can use 3 different tools - axe, pickaxe and shovel.'; }, 8000);
    setTimeout(function () { $('.text')[0].innerHTML = 'The first tool is the pickaxe, it only works with rock.'; }, 12000);
    setTimeout(function () { $('.text')[0].innerHTML = 'The second tool is the shovel, it only works with dirt and grass.'; }, 18000);
    setTimeout(function () { $('.text')[0].innerHTML = 'The third tool is the axe, it only works with leafs and tree.'; }, 22000);
    setTimeout(function () { $('.text')[0].innerHTML = 'If the tool you select is not compatible with the tile of environment you select, the tool will flash red.'; }, 26000);
    setTimeout(function () { $('.text')[0].innerHTML = 'The last item in the side menu is the stack which can hold up to 6 tiles.'; }, 31000);
    setTimeout(function () { $('.text')[0].innerHTML = 'If you add another tile to the stack inventory when its full it will remove the last one.'; }, 36000);
    setTimeout(function () { $('.text')[0].innerHTML = 'When you mine a tile it will be automatically added to the inventory and you could place it in the world ,pay attention, you can place the tile only in empty spaces.'; }, 41000);
    setTimeout(function () { $('.text')[0].innerHTML = 'Well...thats it! now its your turn, Have Fun!'; }, 50000);
    setTimeout(minecraft.startGame, 55000);
};

$("#tutorial").click(minecraft.startTutorial);

