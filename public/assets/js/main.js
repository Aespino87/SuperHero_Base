/**
 * Client side code.
 */

// Call render function
renderSuperHeroList();

// Add submit button event handler
$("#submitHero").click(function() {

    // Create and add hero to list
    let newHero = {
        hero_name: $("#superheroNameInput").val(),
        on_team: false
    };

    $.ajax({
        url: "/api/heroes",
        type: 'POST',
        contentType: 'application/json',  
        data: JSON.stringify(newHero),  
        success: function (result) {
            console.log(result);

            //Update ID returned from API and push it onto hero list
            newHero.id = result.id;
            heroList.push(newHero);
            
            // Clear input
            $("#superheroNameInput").val("");
            renderSuperHeroList();
        },  
        error: function (error) {  
            console.log(error);  
        }  
    });
});


// Render superhero list function.
function renderSuperHeroList() {
    
    let onTeamContainer = $("#heroesOnTeam");
    let notOnTeamContainer = $("#heroesNotOnTeam");

    // Empty the containers before rendering.
    onTeamContainer.empty();
    notOnTeamContainer.empty();

    // Loop through all heroes
    for ( let i=0; i<heroList.length; i++) {

        let hero = heroList[i];

        let row = $("<div></div>");
        row.addClass("row my-2");

        if (hero.on_team) {

            // Hero on team, put them on the right side.

            // Create name column
            let nameCol = $("<div></div>");
            nameCol.addClass ("col-12");

            // Create name textbox.
            let userField = $("<input type='text'></input>");
            userField.addClass("form-control");
            userField.prop('readonly', true);
            userField.val(hero.id + ". " + hero.hero_name);

            // Append elements together.
            nameCol.append(userField);
            row.append(nameCol);
            onTeamContainer.append(row);

        } else {

            // Hero not on team, put them on the left side.
            
            // Create name column
            let nameCol = $("<div></div>");
            nameCol.addClass ("col-8");

            // Create name textbox.
            let userField = $("<input type='text'></input>");
            userField.addClass("form-control");
            userField.prop('readonly', true);
            userField.val(hero.id + ". " + hero.hero_name);

            // Create button column
            let buttonCol = $("<div></div>");
            buttonCol.addClass ("col-4");

            // Create add button
            let addButton = $("<button></button>")
            addButton.addClass("btn btn-secondary");
            addButton.html("Assemble <i class='fas fa-arrow-circle-right'></i>");
            addButton.click(function() {
                addHeroListener(i);
            });

            // Append elements together.
            nameCol.append(userField);
            buttonCol.append(addButton);
            row.append(nameCol);
            row.append(buttonCol);
            notOnTeamContainer.append(row);

        }
    }
}

// Listener for button to add hero
function addHeroListener(heroListIndex) {

    var heroToUpdate = heroList[heroListIndex];
    heroToUpdate.on_team = true;

    $.ajax({
        url: "/api/heroes/" + heroToUpdate.id,
        type: 'PUT',
        contentType: 'application/json',  
        data: JSON.stringify(heroToUpdate),  
        success: function (result) {
            console.log(result);
            renderSuperHeroList();
        },  
        error: function (error) {  
            console.log(error);  
        }  
    });
}

