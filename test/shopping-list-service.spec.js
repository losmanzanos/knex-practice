const ShoppingListService = require("../src/shopping-list-service");
const knex = require("knex");

describe(`Shopping list service object`, function () {
  let db;

  let testItems = [
    {
      product_id: 1,
      checked: false,
      name: "First test item!",
      price: "1.99",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      category: "Main",
    },
    {
      product_id: 2,
      checked: false,
      name: "Second test item!",
      price: "2.99",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      category: "Main",
    },
    {
      product_id: 3,
      checked: false,
      name: "Third test item!",
      price: "3.99",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      category: "Main",
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => {
    return db.into("shopping_list").insert(testItems);
  });

  after(() => db.destroy());

  afterEach(() => db("shopping_list").truncate());

  describe(`getAllItems()`, () => {
    it(`resolves all items from 'shopping_list' table`, () => {
      return ShoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.eql(testItems);
      });
    });
  });
});
