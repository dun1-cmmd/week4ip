$(document).ready(function () {
  $(".clickable").click(function () {
    $(".initially-showing").toggle();
  });
});

function Pizza(size, crust) {
  this.size = size;
  this.crust = crust;
  this.toppings = [];
}

function Location(name, town) {
  this.name = name;
  this.town = town;
}

var sizePrice = {
  small: 1000,
  medium: 1200,
  large: 1500,
  mega: 2000,
};

var toppingPrice = [
  {
    soda: {
      small: 30,
      medium: 70,
      large: 100,
      mega: 150,
    },
    sauce: {
      small: 100,
      medium: 150,
      large: 250,
      mega: 350,
    },
    bites: {
      small: 200,
      medium: 300,
      large: 350,
      mega: 400,
    },
  },
];

var crustto = {
  Napoletana: 0,
  Fritta: 100,
  Siciliana: 150,
  Napoletana: 250,
  cheesy: 350,
};

function sizeCalculatePrice(size) {
  if (size === "small") {
    return sizePrice.small * 1;
  } else if (size === "medium") {
    return sizePrice.medium * 1;
  } else {
    return sizePrice.large * 1;
  }
}

function crustCalculatePurice(crust) {
  if (crust === "crispy") {
    return crustPrice.crisy * 1;
  } else if (crust === "stuffed") {
    return crustPrice.stuffed * 1;
  } else {
    return crustPrice.gluten * 1;
  }
}

function toppingsCalculatePrice(toppings) {
  var noOfTopping = 0;
  for (i = 0; i < toppings.length; i++) {
    if (toppings[i] == "sauce") {
      noOfTopping += 350;
    }
    if (toppings[i] == "soda") {
      noOfTopping += 150;
    }
    if (toppings[i] == "bites") {
      noOfTopping += 400;
    }
  }
  return noOfTopping * 1;
}

$(document).ready(function () {
  function getPizzasize() {
    return $("#pizza-size").find(":selected").val();
  }

  function getcrust() {
    return $("#pizza-crust").find(":selected").val();
  }

  function gettoppings() {
    var toppings = [];
    $(".toppings :checked").each(function () {
      toppings.push($(this).val());
    });
    return toppings;
  }

  $("#pizza").submit(function (event) {
    event.preventDefault();
    var pizzaSize = getPizzasize();
    var crust = getcrust();
    var toppings = gettoppings();

    var newPizza = new Pizza(pizzaSize, crust);
    newPizza.toppings.push(toppings);
    $("#table").show();
    $(".checkout").show();
    var oneOrder =
      sizeCalcPrice(pizzaSize) +
      crustCalcPrice(crust) +
      toppingsCalcPrice(toppings);

    $("#items").append(
      "<tr>" +
        "<td>" +
        newPizza.size +
        "</td>" +
        "<td>" +
        "<p>" +
        newPizza.crust +
        "</p>" +
        "</td>" +
        "<td>" +
        newPizza.toppings +
        "</td>" +
        "<td>" +
        oneOrder +
        "</td>" +
        "</tr>"
    );
  });
  var totalQuantity = parseInt($("#quantity").val());

  function calculateTotal() {
    var priceOnePizza =
      sizeCalculatePrice(getPizzasize()) +
      crustCalculatePrice(getcrust()) +
      toppingsCalculatePrice(gettoppings());
    return priceOnePizza;
  }
  var pizzaList = [];

  $("#orderbtn").click(function () {
    totalQuantity += 1;
    $("#quantity").text(totalQuantity);
    pizzaList.push(calculateTotal());
  });

  $("#gettotal").click(function () {
    var total = 0;
    pizzaList.forEach(function (pizza) {
      total += pizza;
    });
    $("#money").text(total);
  });

  $("#myModel").click(function () {
    var deliver = confirm("Would you like to be deliverd?");
    if (deliver) {
      var place = prompt("cofirm your are code");
      $("#place").text(place);
      $("#success").show();
      alert("Delivery fee is Ksh 300");
    } else {
      $("#no-delivery").show();
    }

    $("#size").val("");
    $("crust").val("");
    $("#items").remove();
    $("#items").text(0);
  });
});
