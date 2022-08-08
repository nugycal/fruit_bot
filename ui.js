// Script Taken from StackOverflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Function to randomize the location data
function randomLocations(locations, length) {
    var index = 0;
    var counter = 0;

    var general_names = ["CSE", "Matthews A", "CLB 7", "Quadrangle", "Anzac Parade", "Matthews C", "CLB 8", "Science Theatre", "J17 G03", "Clancy Auditorium", "Physics Theatre", "K17 Basement", "Matthews B", "Viola Lab", "Kora Lab", "Sitar Lab", "Oboe Lab", "Cello Lab"];
    var apple_names = ["Kensington Apple Farm", "John Lions Garden", "Quadrangle Lawn", "Physics Lawn", "Village Green", "Botany Produce", "Eastgardens Fruit"];
    var electricity_names = ["Campus Charging", "Power For You", "Discount Electrons", "Kensington Solar"];
    var kiwifruit_names = ["John Lions Garden", "Quadrangle Lawn", "Physics Lawn", "Village Green", "Eastgardens Fruit", "Kensington Kiwifruit", "Botany Produce"];
    var watermelon_names = ["John Lions Garden", "Quadrangle Lawn", "Physics Lawn", "Village Green", "Wenworth Watermelons", "Clovelly Watermelons", "Maroubra Melons"];
    var banana_names = ["John Lions Garden", "Quadrangle Lawn", "Physics Lawn", "Village Green", "Bondi Bananas", "Panddington Banana Plantation"];
    var durian_names = ["John Lions Garden", "Quadrangle Lawn", "Physics Lawn", "Village Green", "Smelly Fruits R Us", "Darlinghurst Durians", "The Daring Durians", "Durian Sisters", "We Love The Smell"];
    var orange_names = ["John Lions Garden", "Quadrangle Lawn", "Physics Lawn", "Village Green", "Rosebery Orange Grove", "Kingsford Oranges", "Campus Citrus Centre"];
    var anything_names = ["Campus Compost Heap", "UNSW Green Waste", "Tech Trash", "Random Recyclers", "Rocky The Recycler", "Joy's Juices"];
    var cherry_names = ["Keith Burrows Theatre", "CLB 1", "CLB 2", "Campus Cherry Orchard"];
    var lemon_names = ["Rosebery Lemon Grove", "Kingsford Lemons", "Sour Fruit Specialists"];
    var mango_names = ["CLB 6", "Bondi Mango Growers", "Paddington Mango Plantation", "Marvellous Mangos", "Matthews Mangos"];
    var strawberry_names = ["Mathews D", "Wentworth Strawberries", "Clovelly Strawberries", "Sensuous Strawberries", "Strawberry Brothers"];
    var lime_names = ["Lovely Limes", "Citrus Specialists", "Drum Lab", "Bugle Lab", "Horn Lab", "Bongo Lab", "Tabla Lab", "Oud Lab", "Lyre Lab"];
    var grape_names = ["Randwick Vineyards", "Green Square Vines", "Great Grapes", "Kingsford Estate", "Rosebery Vineyard"]
    

    var max_amount = 120;
    var min_amount = 20;

    var max_buy = 100;
    var min_buy = 30;

    var max_sell = 50;
    var min_sell = 10;

    var anything_amount = 1000;
    var anything_buy_max = 20;
    var anything_buy_min = 2;

    var electricity_amount = 100;
    var electricity_sell_max = 20;
    var electricity_sell_min = 4;

    var used_names = [];
    used_index = 0;
    var used_fruit = [];
    var locs = [];

    for (index = 0; index < length; index++) {
        var loc = new Location("Placeholder", "Nothing", "Nothing", 0, 0);
        locs[index] = loc;
    }

    var name;
    var action;
    var fruit;
    var price;
    var quantity;

    var probabilities = ["Apples", "Apples", "Apples", "Electricity", "Anything", "Other", "Other", "Oranges", "Oranges", "Durians", "Watermelons", "Bananas", "Bananas", "Kiwis", "Strawberries", "Mangoes", "Lemons", "Limes", "Grapes", "Cherries"];

    // Add 1 Charging Station Randomly into the World
    var new_index = Math.floor(Math.random() * (length));
    while (locs[new_index].name != "Placeholder" && counter < length * 2) {
        counter++;
        new_index = Math.floor(Math.random() * (length));
    }
    counter = 0;

    var possibles = electricity_names;
    for (i = 0; i < used_index; i++) {
        found = possibles.indexOf(used_names[i]);
        if (found) {
            possibles.splice(found, 1);
        }
    }

    var name_index = Math.floor(Math.random() * (possibles.length-1));

    name = possibles[name_index];
    used_names[used_index] = name;
    used_index++;
    action = "sell";
    fruit = "Electricity";
    price = Math.floor(Math.random() * (electricity_sell_max - electricity_sell_min + 1)) + electricity_sell_min;
    quantity = electricity_amount - Math.floor(Math.random() * (electricity_amount / 2));

    locs[new_index] = new Location(name, action, fruit, price, quantity);

    // Add 1 Anything Randomly into the World
    var new_index = Math.floor(Math.random() * (length));
    while (locs[new_index].name != "Placeholder" && counter < length * 2) {
        new_index = Math.floor(Math.random() * (length));
        console.error(new_index);
        counter++;
    }
    counter = 0;

    var possibles = anything_names;
    for (i = 0; i < used_index; i++) {
        found = possibles.indexOf(used_names[i]);
        if (found) {
            possibles.splice(found, 1);
        }
    }

    var name_index = Math.floor(Math.random() * (possibles.length-1));

    name = possibles[name_index];
    used_names[used_index] = name;
    used_index++;
    action = "buy";
    fruit = "Anything";
    price = Math.floor(Math.random() * (anything_buy_max - anything_buy_min + 1)) + anything_buy_min;
    quantity = anything_amount - price;

    locs[new_index] = new Location(name, action, fruit, price, quantity);

    for (index = 0; index < length; index++) {
        if (locs[index].name == "Placeholder" && locs[index].fruit == "Nothing") {
            randomIndex = Math.floor(Math.random() * probabilities.length);
            var current = probabilities[randomIndex];

            if (current == "Apples") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(apple_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(apple_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(apple_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }

                    if (possibles.length == 0) {
                        possibles = general_names.concat(apple_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Oranges") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(orange_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }
                if (possibles.length == 0) {
                    possibles = general_names.concat(orange_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(orange_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }

                    if (possibles.length == 0) {
                        possibles = general_names.concat(orange_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Bananas") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(banana_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(banana_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(banana_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(banana_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Watermelons") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(watermelon_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(watermelon_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));

                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(watermelon_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }

                    if (possibles.length == 0) {
                        possibles = general_names.concat(watermelon_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Kiwis") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(kiwifruit_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }
                if (possibles.length == 0) {
                    possibles = general_names.concat(kiwifruit_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));

                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(kiwifruit_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(kiwifruit_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Durians") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(durian_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }
                if (possibles.length == 0) {
                    possibles = general_names.concat(durian_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));

                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(durian_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(durian_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Lemons") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(lemon_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(lemon_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(lemon_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(lemon_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Limes") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(lime_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(lime_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(lime_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(lime_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Mangoes") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(mango_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(mango_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(mango_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(mango_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Grapes") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(grape_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(grape_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(grape_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(grape_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Cherries") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(cherry_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(cherry_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(cherry_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(cherry_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Strawberries") {
                fruit = current;
                action = "sell";
                possibles = general_names.concat(strawberry_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = general_names.concat(strawberry_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (max_sell - min_sell + 1)) + min_sell;
                quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

                locs[index] = new Location(name, action, current, price, quantity);

                randomIndex = Math.floor(Math.random() * (probabilities.length));
                if (randomIndex < probabilities.length * 0.5) {
                    fruit = current;
                    action = "buy";
                    possibles = general_names.concat(strawberry_names);
                    for (i = 0; i < used_index; i++) {
                        found = possibles.indexOf(used_names[i]);
                        if (found) {
                            possibles.splice(found, 1);
                        }
                    }
                    if (possibles.length == 0) {
                        possibles = general_names.concat(strawberry_names);
                    }
                    randomIndex = Math.floor(Math.random() * (possibles.length-1));
                    name = possibles[randomIndex];
                    used_names[used_index] = name;
                    used_index++;

                    price = Math.floor(Math.random() * (max_buy - min_buy + 1)) + min_buy;
                    quantity = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;
                    randomIndex = Math.floor(Math.random() * (length-1));
                    while (locs[randomIndex].name != "Placeholder" && counter < length * 2) {
                        randomIndex = Math.floor(Math.random() * (length-1));
                        counter++;
                    }
                    counter = 0;
                    locs[randomIndex] = new Location(name, action, current, price, quantity);
                }
            }
            else if (current == "Anything") {
                fruit = current;
                action = "buy";
                possibles = anything_names.concat(anything_names, general_names, anything_names, anything_names, anything_names, anything_names);
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }

                if (possibles.length == 0) {
                    possibles = anything_names.concat(anything_names, general_names, anything_names, anything_names, anything_names, anything_names);
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;

                price = Math.floor(Math.random() * (anything_buy_max - anything_buy_min + 1)) + anything_buy_min;
                quantity = anything_amount - price;

                locs[index] = new Location(name, action, current, price, quantity);
            }
            else if (current == "Other") {
                fruit = "nothing";
                action = "nothing";
                possibles = general_names;
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }
                if (possibles.length == 0) {
                    possibles = general_names;
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;
                quantity = 0;
                price = 0;

                locs[index] = new Location(name, action, fruit, price, quantity);
            }
            else if (current == "Electricity") {
                fruit = current;
                action = "sell";
                possibles = electricity_names;
                for (i = 0; i < used_index; i++) {
                    found = possibles.indexOf(used_names[i]);
                    if (found) {
                        possibles.splice(found, 1);
                    }
                }
                if (possibles.length == 0) {
                    possibles = electricity_names;
                }
                randomIndex = Math.floor(Math.random() * (possibles.length-1));
                name = possibles[randomIndex];
                used_names[used_index] = name;
                used_index++;
                price = Math.floor(Math.random() * (electricity_sell_max - electricity_sell_min + 1)) + electricity_sell_min;
                quantity = electricity_amount - Math.floor(Math.random() * (electricity_amount / 2));

                locs[index] = new Location(name, action, fruit, price, quantity);
            }

        }
    }
    for (i = 0; i < locs.length; i++) {
        if (locs[i].name == undefined) {
            randomIndex = Math.floor(Math.random() * (general_names.length-1));
            locs[i].name = general_names[randomIndex];
        }
    }
    
    return locs;
}

// Credit for JQuery URL parameters: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function GetURLParameters(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function Location(name, action, fruit, price, quantity) {
    this.name = name;
    this.action = action;
    this.fruit = fruit;
    this.price = price;
    this.quantity = quantity;
}

// Code below has been adapted from https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
function createFields() {
    $('.field').remove();
    var container = $('#container');

    for (var i = 0; i < locations.length; i++) {
        if (locations[i].fruit == "Anything") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper anything-wrapper"><button class="anything icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Apples" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper apple-wrapper"><button class="apple icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Apples" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper apple-wrapper"><button class="apple icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Bananas" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper banana-wrapper"><button class="banana icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Bananas" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper banana-wrapper"><button class="banana icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Cherries" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper cherry-wrapper"><button class="cherry icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Cherries" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper cherry-wrapper"><button class="cherry icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Durians" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper durian-wrapper"><button class="durian icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Durians" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper durian-wrapper"><button class="durian icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Electricity") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper electricity-wrapper"><button class="electricity icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kJ of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Grapes" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper grape-wrapper"><button class="grape icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Grapes" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper grape-wrapper"><button class="grape icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Kiwis" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper kiwi-wrapper"><button class="kiwi icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Kiwis" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper kiwi-wrapper"><button class="kiwi icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Lemons" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper lemon-wrapper"><button class="lemon icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Lemons" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper lemon-wrapper"><button class="lemon icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Limes" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper lime-wrapper"><button class="lime icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Limes" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper lime-wrapper"><button class="lime icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Mangoes" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper mango-wrapper"><button class="mango icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Mangoes" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper mango-wrapper"><button class="mango icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Oranges" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper orange-wrapper"><button class="orange icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Oranges" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper orange-wrapper"><button class="orange icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Strawberries" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper strawberry-wrapper"><button class="strawberry icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Strawberries" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper strawberry-wrapper"><button class="strawberry icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Other" || locations[i].fruit == "nothing") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper other-wrapper"><button class="other icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">You cannot do anything at '+locations[i].name+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Watermelons" && locations[i].action == "buy") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper watermelon-wrapper"><button class="watermelon icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-success">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
        else if (locations[i].fruit == "Watermelons" && locations[i].action == "sell") {
            $('<div/>', {
                'class': 'field',
                'html': '<div class="icon-wrapper watermelon-wrapper"><button class="watermelon icon btn" type="button" data-toggle="modal" data-target="#location_'+i+'"><span class="badge badge-danger">$</span></button></div>'+'<div class="modal fade" id="location_'+i+'" tabindex="-1" role="dialog" aria-labelledby="location_'+i+'_Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="location_'+i+'_LongTitle">'+locations[i].name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+locations[i].name+' will '+locations[i].action+' '+locations[i].quantity+' kg of '+locations[i].fruit+' for $'+locations[i].price+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>'
            }).appendTo(container);
        }
    }
    
    update_current_loc();
}
function distributeFields() {
    var radius = window.innerHeight / 2 - window.innerHeight / 32 * 3;
    var fields = $('.field'),
        container = $('#container'),
        width = container.width(),
        height = container.height(),
        angle = 0,
        step = (2 * Math.PI) / fields.length;
    fields.each(function() {
        var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
        var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}
function get_user_input() {
    document.getElementById('input').onkeypress = function(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;

        if ( charCode == '13' ) {
            var el = document.getElementById('input');
            var val = el.value;
            el.value = "";
            process_moves(val);
        }
    }
    return 0;
}
function find_substring(string, substring) {
    var val = string.toLowerCase().indexOf(substring);
    if (val >= 0) {
        return 1;
    }
    return 0;
}
function extract_digits(string) {
    if (!string || string == null) {
        return [];
    }
    var val = string.match(/-?\d+/g).map(Number);
    return JSON.parse("[" + val + "]");
}

function parse_locations_into_world() {
    var money = document.getElementById("money").innerHTML;
    money = money.replace(/\D/g,''); // Filter out non-digits
    var exported = [];
    exported.push("*** Fruit Bot Parameters ***\n");
    exported.push("turns_left="+turns+"\n");
    exported.push("battery_capacity="+electricity+"\n");
    exported.push("maximum_fruit_kg="+max_fruit_kg+"\n");
    exported.push("maximum_move="+max_moves+"\n");
    exported.push("cash="+money+"\n");
    exported.push("\n");
    exported.push("*** Turn 1 of "+turns+" ***\n");
    exported.push("\n");
    
    for (i = 0; i < locations.length; i++) {
        if (locations[i].price == 0) {
            exported.push(locations[i].name+": other\n");
        }
        else if (locations[i].fruit != "Electricity") {
            var price = locations[i].price
            if (price < 0) {
                price = -price;
            }
            exported.push(locations[i].name+": will "+locations[i].action+" "+locations[i].quantity+" kg of "+locations[i].fruit+" for $"+price+"/kg\n");
        }
        else {
            exported.push(locations[i].name+": will "+locations[i].action+" "+locations[i].quantity+" kJ of "+locations[i].fruit+" for $"+price+"/kJ\n");
        }
    }
    var html = exported.join("");
    $('#exportedWorld').val(html);
    
    html = html.replace(/\n/g, "\r\n");
    
    var link = document.getElementById("download");
    var blob = new Blob([html], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, "world.txt");
    }
    else{
        link.href = window.URL.createObjectURL(blob);
        link.download = "world.txt";
    }
    link.innerHTML = 'Click to Download';
}
