require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

// 1. Get all items that contain text

function searchByProductName(searchTerm) {
  knexInstance
    .select("product_id", "name")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

searchByProductName("bee");

// 2. Get all items paginated

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

paginateProducts(2);

// 3. Get all items added after date

function getItems(daysAgo) {
  knexInstance
    .select("*")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .from("shopping_list")
    .then((result) => {
      console.log(result);
    });
}

getItems(1);

// 4. Get the total cost for each category

function categoryCost() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log(result);
    });
}

categoryCost();
