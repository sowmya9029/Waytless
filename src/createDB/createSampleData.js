// use waitlistsample database 
db = db.getSiblingDB('waitlistSample')

// create a table 'restaurant'
db.createCollection('restaurants')
restCollection = db.getCollection("restaurants")
restCollection.remove({})

restCollection.insert(
{
        restaurantId = 1,
        name: "Din Tai Fung",
        address: {
                "street": "Bellevue Way E",
                "number": "100", 
                "zip": "98005",
                "city": "Bellevue"
        },
        phoneNumber: 4251112222,
        email: "admin@dintaifung.com",
        rating: 5
}
)
restCollection.insert(
        {
                restaurantId = 2,
                name: "Oliver Garden",
                address: {
                        "street": "Kirkland Way E",
                        "number": "200", 
                        "zip": "98007",
                        "city": "Kirkland"
                },
                phoneNumber: 4251112222,
                email: "admin@og.com",
                rating: 4
        }
)
restCollection.insert(
        {
                restaurantId = 1,
                name: "Southern Spice",
                address: {
                        "street": "Redmond Way E",
                        "number": "300", 
                        "zip": "98008",
                        "city": "Redmond"
                },
                phoneNumber: 4251112222,
                email: "admin@og.com",
                rating: 3
        }
    )
    
restCollection.insert(
        {
                restaurantId = 4,
                name: "Mediterranean Kitchen",
                address: {
                        "street": "Alderwood Way",
                        "number": "500", 
                        "zip": "98009",
                        "city": "Lynwood"
                },
                phoneNumber: 4251112222,
                email: "admin@mk.com",
                rating: 4
        }
)

// create a table 'menu' items

db.createCollection('menuitems')
menuitemsCollection = db.getCollection("menuitems")
menuitemsCollection.remove({})

menuitemsCollection.insert(
{       
        itemID: 1,
      itemName: "Cucumber Salad",
      price: 5.99,
      description: "Cucumbers marinated in sauce",
      restaurantID: 1,
      type: "Appetizer"
}
)
menuitemsCollection.insert(
{
        itemID: 2,
        itemName: "Soy Noodle Salad",
        price: 7.99,
        description: "Vegetarian cold salad",
        restaurantID: 1,
        type: "Appetizer"
}
)
menuitemsCollection.insert(
{
        itemID: 3,
        itemName: "Fried Pork Chop",
        price: 10.99,
      description: "Fried pork chop with a side of rice",
      restaurantID: 1,
      type: "Appetizer"
}
)
menuitemsCollection.insert(
{
        itemID: 4,
        itemName: "Spring Rolls",
          price: 5.99,
          description: "Cucumbers marinated in sauce",
          restaurantID: 1,
          type: "Appetizer"
}
)

menuitemsCollection.insert(
        {       
                itemID: 1,
              itemName: "Item A",
              price: 5.99,
              description: "Cucumbers marinated in sauce",
              restaurantID: 2,
              type: "Appetizer"
        }
        )
        menuitemsCollection.insert(
        {
                itemID: 2,
                itemName: "Item B",
                price: 7.99,
                description: "Vegetarian cold salad",
                restaurantID: 2,
                type: "Appetizer"
        }
        )
        menuitemsCollection.insert(
        {
                itemID: 3,
                itemName: "Item C",
                price: 10.99,
              description: "Fried pork chop with a side of rice",
              restaurantID: 2,
              type: "Appetizer"
        }
        )
        menuitemsCollection.insert(
        {
                itemID: 4,
                itemName: "Item D",
                  price: 5.99,
                  description: "Cucumbers marinated in sauce",
                  restaurantID: 2,
                  type: "Appetizer"
        }
        )

        menuitemsCollection.insert(
                {       
                        itemID: 1,
                      itemName: "Item A",
                      price: 5.99,
                      description: "Cucumbers marinated in sauce",
                      restaurantID: 3,
                      type: "Appetizer"
                }
                )
                menuitemsCollection.insert(
                {
                        itemID: 2,
                        itemName: "Item B",
                        price: 7.99,
                        description: "Vegetarian cold salad",
                        restaurantID: 3,
                        type: "Appetizer"
                }
                )
                menuitemsCollection.insert(
                {
                        itemID: 3,
                        itemName: "Item C",
                        price: 10.99,
                      description: "Fried pork chop with a side of rice",
                      restaurantID: 3,
                      type: "Appetizer"
                }
                )
                menuitemsCollection.insert(
                {
                        itemID: 4,
                        itemName: "Item D",
                          price: 5.99,
                          description: "Cucumbers marinated in sauce",
                          restaurantID: 3,
                          type: "Appetizer"
                }
                )

                menuitemsCollection.insert(
                        {       
                                itemID: 1,
                              itemName: "Item A",
                              price: 5.99,
                              description: "Cucumbers marinated in sauce",
                              restaurantID: 4,
                              type: "Appetizer"
                        }
                        )
                        menuitemsCollection.insert(
                        {
                                itemID: 2,
                                itemName: "Item B",
                                price: 7.99,
                                description: "Vegetarian cold salad",
                                restaurantID: 4,
                                type: "Appetizer"
                        }
                        )
                        menuitemsCollection.insert(
                        {
                                itemID: 3,
                                itemName: "Item C",
                                price: 10.99,
                              description: "Fried pork chop with a side of rice",
                              restaurantID: 4,
                              type: "Appetizer"
                        }
                        )
                        menuitemsCollection.insert(
                        {
                                itemID: 4,
                                itemName: "Item D",
                                  price: 5.99,
                                  description: "Cucumbers marinated in sauce",
                                  restaurantID: 4,
                                  type: "Appetizer"
                        }
                        )
// create a table for waitlist

db.createCollection('waitlist')
waitlistCollection = db.getCollection("waitlist")
waitlistCollection.remove({})

waitlistCollection.insert(
{
        customerName: "Mary",
        restaurantID: 1,
        groupSize: 3,
        joinTime: new Date("February 4, 2019 16:00:00"),
        email : "abc@abc.com",
        phone : "2062112222"
}
)

waitlistCollection.insert(
        {
        customerName: "Ken",
        restaurantID: 2,
        groupSize: 2,
        jointime: new Date("February 4, 2019 16:10:00"),
        email : "abc@abc.com",
        phone : "2062112222"
        }
        )


waitlistCollection.insert(
{
        customerName: "Doug",
        restaurantID: 2,
        groupSize: 5,
        jointime: new Date("February 4, 2019 16:15:00"),
        email : "abc@abc.com",
        phone : "2062112222"
}
)

waitlistCollection.insert(
        {
                customerName: "Darren",
                restaurantID: 2,
                groupSize: 3,
                joinTime: new Date("February 4, 2019 16:00:00"),
                email : "abc@abc.com",
                phone : "2062112222"
        }
        )
        
        waitlistCollection.insert(
                {
                customerName: "Lisa",
                restaurantID: 2,
                groupSize: 2,
                jointime: new Date("February 4, 2019 16:10:00"),
                email : "abc@abc.com",
                phone : "2062112222"
                }
                )
        
        
        waitlistCollection.insert(
        {
                customerName: "Nico",
                restaurantID: 3,
                groupSize: 5,
                jointime: new Date("February 4, 2019 16:15:00"),
                email : "abc@abc.com",
                phone : "2062112222"
        }
        )

        waitlistCollection.insert(
                {
                        customerName: "Sam",
                        restaurantID: 3,
                        groupSize: 3,
                        joinTime: new Date("February 4, 2019 16:00:00"),
                        email : "abc@abc.com",
                        phone : "2062112222"
                }
                )
                
                waitlistCollection.insert(
                        {
                        customerName: "Tony",
                        restaurantID: 3,
                        groupSize: 2,
                        jointime: new Date("February 4, 2019 16:10:00"),
                        email : "abc@abc.com",
                        phone : "2062112222"
                        }
                        )
                
                
                waitlistCollection.insert(
                {
                        customerName: "May",
                        restaurantID: 3,
                        groupSize: 5,
                        jointime: new Date("February 4, 2019 16:15:00"),
                        email : "abc@abc.com",
                        phone : "2062112222"
                }
                )