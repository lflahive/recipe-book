var recipes = [];
var self = this;

function main() {
    $.getJSON('./index.json', function(recipes) {
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
    console.log(id);
    var recipe = self.recipes.filter(recipe => recipe.id == id)[0];

    $.getJSON('./recipes/' + recipe.file, function(recipe) {
        $('#title').text(recipe.title);
        recipe.ingredients.forEach(ingredient => {
            $('#ingredients').append('<li>' + ingredient + '</li>');
        });
        recipe.instructions.forEach(instruction => {
            $('#instructions').append('<li>' + instruction + '</li>');
        });
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