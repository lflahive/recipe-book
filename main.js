var recipes = [];
var selectedRecipe = null;
var self = this;

function main() {
    var self = this;
    $.getJSON('./recipes.json', function(recipes) {
        self.recipes = recipes;
        loadRecipe(location.hash);
    });
}

function hashChange() {
    resetRecipe();
    loadRecipe(location.hash);
}

function resetRecipe() {
    $('#title').html('');
    $('#ingredients').html('');
    $('#instructions').html('');
    $('#search').val('');
    $('#search-results').html('');
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

$('#search').keyup(function() {
    $('#search-results').html('');
    var value = $('#search').val().toLowerCase();
    var recipes = self.recipes.filter(recipe => recipe.title.toLowerCase().indexOf(value) >= 0);
    recipes.forEach(recipe => $('#search-results').append('<li><a href=' + recipe.id + '>' + recipe.title + '</a></li>'));
});

window.onhashchange = hashChange;

main();