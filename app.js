var current_loc = 0;
var starting_money = 0;
var world_size = 10;
var locations = [];
var turns;
var debug = 0;
var carrying = 0;
var fruit = "";
var fruit_amount = 0;
var electricity;
var max_moves = 10;
var max_fruit_kg = 10;
var max_charge;

if (GetURLParameters("amount")) {
    world_size = GetURLParameters("amount");
}
else if (!GetURLParameters("amount") && GetURLParameters("world")) {
    var world_type = GetURLParameters("world");
    if (world_type == "tiny") {
        world_size = 6;
    }
    else if (world_type == "medium") {
        world_size = 12;
    }
    else if (world_type == "large") {
        world_size = 20;
    }
}

function set_starting_values() {
    var min_money = 50;
    var max_money = 150;
    var money = Math.floor(Math.random() * (max_money - min_money + 1)) + min_money;
    starting_money = money;

    document.getElementById('money').innerHTML= "$"+money;
    var min_moves = Math.floor(Math.random() * (world_size - 6 + 1));
    var max_moves = Math.floor(Math.random() * (world_size - 3 + 1));
    var moves = Math.floor((Math.random() * (max_moves*2 - min_moves)+4) * 3 / 2) + world_size;
    
    if (moves < 0) {
        moves = -moves;
    }
    max_charge = moves * 2 + Math.floor(Math.random() * min_moves);
    
    electricity = moves;
    document.getElementById('electricity').innerHTML= moves+" kJ";
    
    var l_turns = Math.floor(world_size * Math.random());
    if (l_turns < 0) l_turns = -l_turns;
    l_turns += world_size;
    turns = l_turns;
    
    // Dummy Data from fruit_bot_referee.py
    locations[0] = (new Location("CSE", "nothing", "other", "0", "0"));
    locations[1] = (new Location("Campus Compost Heap", "buy", "Anything", "$1", "1000 kg"));
    locations[2] = (new Location("Campus Charging", "sell", "Electricity", "$4", "100 kJ"));
    locations[3] = (new Location("Matthews A", "buy", "Apples", "$15", "100 kg"));
    locations[4] = (new Location("CLB 7", "buy", "Apples", "$15", "100 kg"));
    locations[5] = (new Location("Kensington Apple Farm", "sell", "Apples", "$15", "100 kg"));
    locations[6] = (new Location("Quadrangle", "nothing", "other", "0", "0"));
    
    // Get number of locations to display from URL
    // NB: Credit for JQuery URL parameters: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
    var amount = world_size;
    if (!amount) {
        amount = 10;
    }
    locations = randomLocations(locations, amount);
    locations = shuffle(locations);
    
    update_turns();
    update_electricity();
    update_fruit();
    update_current_loc();
}
function update_money(money) {
    var money_el = document.getElementById('money');
    money_el.innerHTML="$"+money;
}
function update_fruit() {
    if (fruit_amount <= 0) {
        carrying = 0;
    }
    
    if (carrying != 0) {
        $(".fruit-wrapper").removeClass('hidden');
        $(".fruit-wrapper").addClass('visible');
        $(".fruit-wrapper").find(".icon").removeClass();
        $(".fruit-wrapper").children("div").addClass("icon");
        var temp = fruit;
        temp = temp.toLowerCase();
        var correspond = ["apples", "oranges", "durians", "watermelons", "bananas", "kiwis", "mangoes", "lemons", "limes", "strawberries", "grapes", "cherries"];
        var actual = ["apple", "orange", "durian", "watermelon", "banana", "kiwi", "mango", "lemon", "lime", "strawberry", "grape", "cherry"];
        var index = correspond.indexOf(temp);
        var temp = actual[index];
        $(".fruit-wrapper").children("div").addClass(temp);
        $("#fruit").html(fruit_amount+" kg");
    }
    else {
        $(".fruit-wrapper").removeClass('visible');
        $(".fruit-wrapper").addClass('hidden');
    }
    
}
function update_turns() {
    var turns_el = document.getElementById('turns');
    turns_el.innerHTML=turns+"";
}
function update_electricity() {
    var elec_el = document.getElementById('electricity');
    elec_el.innerHTML=electricity+" kJ";
}
function remove_current_loc() {
     $('button[data-target="#location_'+current_loc+'"]').parent().removeClass("current");
}
function update_current_loc() {
    $('button[data-target="#location_'+current_loc+'"]').parent().addClass("current");
}
function process_moves(val) {
    if (!val) {
        return;
    }
    else {
        remove_current_loc();
        if (find_substring(val, "move")) {
            console.log("Attempting to move "+extract_digits(val)[0]);

            if (electricity >= extract_digits(val)[0]) {
                current_loc = (current_loc+extract_digits(val)[0]) % world_size;
                if (current_loc < 0) {
                    current_loc = current_loc + world_size;
                }
                var e_usage = extract_digits(val)[0];
                if (e_usage < 0) {
                    e_usage = -e_usage;
                }
                electricity -= e_usage;
                console.log("Successfully moved "+extract_digits(val)[0]);
            }
            else if (electricity < extract_digits(val)[0] && electricity > 0) {
                console.log("Unable to move "+extract_digits(val)[0]);
                console.log("Moving "+extract_digits(val)[0]+" instead.");
                current_loc = (current_loc+electricity) % world_size;
                electricity -= electricity;
                if (current_loc < 0) {
                    current_loc = current_loc + world_size;
                }
            }
            else {
                console.log("Unable to move", extract_digits(val)[0], "as electricity =", electricity);
            }
            turns -= 1;
        }
        else if (find_substring(val, "buy")) {
            if (locations[current_loc].action == "sell") {
                var buy = 0;
                var money = document.getElementById("money").innerHTML;
                money = money.replace(/\D/g,''); // Filter out non-digits
                
                if (!carrying) {
                    buy = 1;
                }
                else if (carrying && fruit == locations[current_loc].fruit) {
                    buy = 1;
                }
                if (buy == 1 && money > locations[current_loc].price && locations[current_loc].quantity > 0 && locations[current_loc].fruit != "Electricity") {
                    console.log("Attempting to purchase "+extract_digits(val)[0], locations[current_loc].fruit+".");
                    var fruit_kg = extract_digits(val)[0];
                    if (extract_digits(val)[0] > max_fruit_kg) {
                        fruit_kg = max_fruit_kg;
                    }
                    if (carrying == 1 && fruit_amount + fruit_kg > max_fruit_kg) {
                        fruit_kg = max_fruit_kg - fruit_amount;
                    }
                    
                    if (money >= locations[current_loc].price * fruit_kg && locations[current_loc].quantity >= fruit_kg) {
                        console.log("Successfully purchased "+fruit_kg, locations[current_loc].fruit+"!");
                        fruit = locations[current_loc].fruit;
                        fruit_amount = fruit_kg;
                        
                        locations[current_loc].quantity -= fruit_kg;
                        update_money(money-locations[current_loc].price*fruit_kg);
                        
                        carrying = 1;
                    }
                    else if (money >= locations[current_loc].price * fruit_kg && locations[current_loc].quantity < fruit_kg) {
                        console.log("Unable to purchase "+fruit_kg, locations[current_loc].fruit+".");
                        console.log("Successfully purchased "+locations[current_loc].quantity, locations[current_loc].fruit+"!");
                        fruit = locations[current_loc].fruit;
                        fruit_amount = locations[current_loc].quantity;
                        
                        locations[current_loc].quantity -= locations[current_loc].quantity;
                        
                        update_money(money-locations[current_loc].price*locations[current_loc].quantity);
                        
                        carrying = 1;
                    }
                    else if (money < locations[current_loc].price * fruit_kg && money >= locations[current_loc].price) {
                        console.log("Unable to purchase "+fruit_kg, locations[current_loc].fruit+".");
                        var most = Math.floor(money / locations[current_loc].price) % fruit_kg;
                        console.log("Successfully purchased "+most, locations[current_loc].fruit+"!");
                        fruit = locations[current_loc].fruit;
                        fruit_amount = most;
                        
                        locations[current_loc].quantity -= most;
                        update_money(money-locations[current_loc].price*most);
                        
                        carrying = 1;
                    }
                    else {
                        console.log("Unable to purchase "+fruit_kg, locations[current_loc].fruit, "from", locations[current_loc].name);
                    }
                }
                else if (buy == 1 && money > locations[current_loc].price && locations[current_loc].quantity > 0 && locations[current_loc].fruit == "Electricity") {
                    console.log("Attempting to purchase "+extract_digits(val)[0], locations[current_loc].fruit+".");
                    var most = max_charge - electricity;
                    if (money >= locations[current_loc].price * most && locations[current_loc].quantity >= most) {
                        console.log("Successfully purchased "+most, locations[current_loc].fruit+"!");
                        electricity += most;
                        
                        locations[current_loc].quantity -= most;
                        update_money(money-locations[current_loc].price*most);
                    }
                    else if (money >= locations[current_loc].price * most && locations[current_loc].quantity < most) {
                        console.log("Unable to purchase "+most, locations[current_loc].fruit+".");
                        console.log("Successfully purchased "+locations[current_loc].quantity, locations[current_loc].fruit+"!");
                        electricity += locations[current_loc].quantity;
                        
                        locations[current_loc].quantity -= locations[current_loc].quantity;
                        
                        update_money(money-locations[current_loc].price*locations[current_loc].quantity);
                    }
                    else if (money < locations[current_loc].price * most && money >= locations[current_loc].price) {
                        console.log("Unable to purchase "+most, locations[current_loc].fruit+".");
                        var most_possible = Math.floor(money / locations[current_loc].price);
                        console.log("Successfully purchased "+most_possible, locations[current_loc].fruit+"!");
                        electricity += most_possible;
                        
                        locations[current_loc].quantity -= most_possible;
                        update_money(money-locations[current_loc].price*most_possible);
                    }
                    else {
                        console.log("Unable to purchase "+extract_digits(val)[0], locations[current_loc].fruit, "from", locations[current_loc].name);
                    }
                }
                else {
                    console.log("Unable to purchase "+extract_digits(val)[0], locations[current_loc].fruit, "from", locations[current_loc].name);
                }
            }
            turns -= 1;
        }
        else if (find_substring(val, "sell")) {
            var money = document.getElementById("money").innerHTML;
            money = Number(money.replace(/\D/g,'')); // Filter out non-digits
            if (carrying == 1 && (locations[current_loc].fruit == fruit || locations[current_loc].fruit == "Anything") && locations[current_loc].quantity > 0 && locations[current_loc].fruit != "Electricity") {
                console.log("Attempting to sell "+extract_digits(val)[0], locations[current_loc].fruit+".");
                if (locations[current_loc].quantity >= extract_digits(val)[0] && fruit_amount <= locations[current_loc].quantity) {
                    console.log("Successfully sold "+extract_digits(val)[0], locations[current_loc].fruit+"!");
                    fruit = "";
                    fruit_amount = 0;

                    locations[current_loc].quantity -= extract_digits(val)[0];
                    update_money(money+locations[current_loc].price*extract_digits(val)[0]);

                    carrying = 0;
                }
                else if (fruit_amount >= extract_digits(val)[0] && extract_digits(val)[0] < locations[current_loc].quantity) {
                    console.log("Successfully sold "+extract_digits(val)[0], locations[current_loc].fruit+"!");
                    fruit = "";
                    fruit_amount = fruit_amount - extract_digits(val)[0];

                    locations[current_loc].quantity -= extract_digits(val)[0];
                    update_money(money+locations[current_loc].price*extract_digits(val)[0]);

                    carrying = 0;
                }
                else if (locations[current_loc].quantity < extract_digits(val)[0] && fruit_amount > locations[current_loc].quantity) {
                    console.log("Unable to sell "+extract_digits(val)[0], locations[current_loc].fruit+".");
                    console.log("Successfully sold "+locations[current_loc].quantity, locations[current_loc].fruit+"!");
                    fruit_amount = fruit_amount - locations[current_loc].quantity;

                    locations[current_loc].quantity -= locations[current_loc].quantity;

                    update_money(money+locations[current_loc].price*locations[current_loc].quantity);
                }
                else if (locations[current_loc].quantity < extract_digits(val)[0] && fruit_amount < locations[current_loc].quantity) {
                    console.log("Unable to sell "+extract_digits(val)[0], locations[current_loc].fruit+".");
                    console.log("Successfully sold "+fruit_amount, locations[current_loc].fruit+"!");

                    locations[current_loc].quantity -= fruit_amount;

                    update_money(money+locations[current_loc].price*fruit_amount);
                    fruit_amount = 0;
                }
                else {
                    console.log("Unable to sell "+extract_digits(val)[0], locations[current_loc].fruit, "to", locations[current_loc].name);
                }
            }
            else {
                console.log("Unable to sell "+extract_digits(val)[0], locations[current_loc].fruit, "to", locations[current_loc].name);
            }
            turns -= 1;
        }
        else {
            console.log("Illegal Action Detected");
        }
        update_electricity();
        update_turns();
        update_fruit();
        createFields();
        distributeFields();
        update_current_loc();
    }
    if (turns == 0) {
        end_game();
    }
}

function end_game() {
    var money = document.getElementById('money').innerHTML;
    money = money.replace(/\D/g,'');
    if (money > starting_money) {
        $('<div/>', {
            'html': '<div class="modal fade" id="end_game" tabindex="-1" role="dialog" aria-labelledby="end_game_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="end_game_LongTitle">Game Over</h5></div><div class="modal-body">You returned a profit of $'+(money-starting_money)+'.<br></div><div class="modal-footer"><button type="button" class="btn btn-secondary" onclick="window.location.reload();">Try again?</button></div></div></div></div>'
        }).appendTo('body');
    }
    else if (money == starting_money) {
        $('<div/>', {
            'html': '<div class="modal fade" id="end_game" tabindex="-1" role="dialog" aria-labelledby="end_game_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="end_game_LongTitle">Game Over</h5></div><div class="modal-body">You broke even (no profit)!</div><div class="modal-footer"><button type="button" class="btn btn-secondary" onclick="window.location.reload();">Try again?</button></div></div></div></div>'
        }).appendTo('body');
    }
    else {
        $('<div/>', {
            'html': '<div class="modal fade" id="end_game" tabindex="-1" role="dialog" aria-labelledby="end_game_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="end_game_LongTitle">Game Over</h5></div><div class="modal-body">You returned a loss of $'+(-(money-starting_money))+'.<br></div><div class="modal-footer"><button type="button" class="btn btn-secondary" onclick="window.location.reload();">Try again?</button></div></div></div></div>'
        }).appendTo('body');
    }
    $('#end_game').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#end_game').modal('show');
}

function export_world() {
    
}
