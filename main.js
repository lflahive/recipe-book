var recipes = [];
var self = this;

function main() {
    $('.home').hide();
    $('.recipe').hide();
    $.getJSON('./index.json', function(recipes) {
        self.recipes = recipes;
        loadPage();
    });
}

function hashChange() {
    resetRecipe();
    loadPage();
}

function loadPage() {
    $('.home').hide();
    $('.recipe').hide();
    var hash = location.hash;
    if(hash == '' || hash == '#')
        loadHome();
    else
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
    var recipe = self.recipes.filter(recipe => recipe.id == id)[0];

    $.getJSON('./recipes/' + recipe.file, function(recipe) {
        $('#title').text(recipe.title);
        recipe.ingredients.forEach(ingredient => {
            $('#ingredients').append('<li>' + ingredient + '</li>');
        });
        recipe.instructions.forEach(instruction => {
            $('#instructions').append('<li>' + instruction + '</li>');
        });

        $('.recipe').show();
    });
}

function loadHome() {
    $('.home').html('');
    self.recipes.forEach(recipe => $('.home').append('<div class="home-recipe"><a href='+recipe.id+'>'+recipe.title+'</a></div>'));
    $('.home').show();
}

window.onhashchange = hashChange;

new autoComplete({
    selector: 'input[id="search"]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var recipes = self.recipes.filter(recipe => recipe.title.toLowerCase().indexOf(term) >= 0);
        suggest(recipes);
    },
    renderItem: function (item, search){
        return '<div class="autocomplete-suggestion" data-href="' + item.id + '">' + item.title + '</div>';
    },
    onSelect: function(e, term, item){
        location.hash = item.getAttribute('data-href');
    }
});

main();