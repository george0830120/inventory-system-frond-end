export var fakeAcquisitions = {
  acquisitions: [
    {
      id: "0",
      type: 1,
      donor: "Westbrook",
      contact: "Paul George",
      phone: "0933557",
      date: new Date(2014, 1, 1),
      status: 2,
      items: [
        {
          name: "Toyota Corolla",
          id: "1",
          description: "Hello",
          condition: 2,
          price: 100,
          quantity: 2
        },
        {
          name: "Mercedes-Benz S-Class",
          id: "2",
          description: "Hello",
          condition: 2,
          price: 100,
          quantity: 2
        }
      ]
    },
    {
        id: "1",
        type: 2,
        donor: "Kevin Durant",
        contact: "James Harden",
        phone: "095833212",
        date: new Date(1997,3,25),
        status: 3,
        items: [
          {
            name: "Fedora Uns",
            id: "1",
            description: "Good",
            condition: 3,
            price: 100,
            quantity: 2
          },
          {
            name: "Mozda",
            id: "2",
            description: "Fuck",
            condition: 1,
            price: 1000,
            quantity: 12
          }
        ]
      },
  ]
};
