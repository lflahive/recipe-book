var recipes = [];
var selectedRecipe = null;

function main() {
    var self = this;
    $.getJSON('./recipes.json', function(recipes) {
        self.recipes = recipes;
        loadRecipe(location.hash);
    });
}

function hashChange() {
    loadRecipe(location.hash);
}

function loadRecipe(id) {
    this.selectedRecipe = this.recipes.filter(recipe => recipe.id == id)[0];
    $('#title').text(this.selectedRecipe.title);
    
    this.selectedRecipe.ingredients.forEach(ingredient => {
        $('#ingredients').append('<li>' + ingredient + '</li>');
    });

    this.selectedRecipe.instructions.forEach(instruction => {
        $('#instructions').append('<li>' + instruction + '</li>');
    });

}

window.onhashchange = hashChange;

main();