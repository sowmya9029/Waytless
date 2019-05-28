// use waitlistsample database 
db = db.getSiblingDB('waitlistSample')

// create a table 'restaurant'
db.createCollection('restaurants')
restCollection = db.getCollection("restaurants")
restCollection.remove({})
        restCollection.insert(
                {
                        restaurantID : 1,
                        name: "Din Tai Fung",
                        cuisine:"Chinese",
                        address: {
                                "street": "Bellevue Way E",
                                "number": "700", 
                                "zip": "98004",
                                "city": "Bellevue"
                        },
                        phoneNumber: 4256981095,
                        email: "admin@dintaifung.com",
                        rating: 5,
                        reviews: 679,
                        booked:980,
                        url:"../assets/images/dinthaifung.png"
                }
        )
       restCollection.insert(
                {
                        restaurantID : 2,
                        name: "Ruchi Indian Restaurant",
                        cuisine:"Indian",
                        address: {
                                "street": "156th Ave NE",
                                "number": "1360", 
                                "zip": "98007",
                                "city": "Bellevue"
                        },
                        phoneNumber: 4257462144,
                        email: "admin@ruchi.com",
                        rating: 5,
                        reviews: 900,
                        booked:432,
                        url:"../assets/images/imagetwo.jpg"
                }
        )
        restCollection.insert(
                {
                        restaurantID : 3,
                        name: "Olive Garden",
                        cuisine:"Italian",
                        address: {
                                "street": "NE 124th St",
                                "number": "11325", 
                                "zip": "98034",
                                "city": "Kirkland"
                        },
                        phoneNumber: 4258207740,
                        email: "admin@olivegarden.com",
                        rating: 4,
                        reviews: "879",
                        booked:100,
                        url:"../assets/images/image3.jpg"
                      

                      
                }
        )
        restCollection.insert(
                {
                        restaurantID : 4,
                        name: "Southern Spice",
                        cuisine:"Indian",
                        address: {
                                "street": "E Lake Sammamish Pkwy NE",
                                "number": "6536", 
                                "zip": "98052",
                                "city": "Redmond"
                        },
                        phoneNumber: 4257029192,
                        email: "admin@southernspicewa.com",
                        rating: 3,
                        reviews:768,
                        booked:300,
                        url:"../assets/images/image4.jpg"
                }
        )
    
        restCollection.insert(
                {
                        restaurantID :5,
                        name: "Mediterranean Kitchen",
                        cuisine:"Mediterranean",
                        address: {
                                "street": "33rd Ave W",
                                "number": "18415", 
                                "zip": "98009",
                                "city": "Lynwood"
                        },
                        phoneNumber: 4252457551,
                        email: "admin@mediterraneankitchens.net",
                        rating: 4,
                        reviews: "980 Reviews",
                        url:"../assets/images/image5.jpg"
                }
        )

// create a table 'itemCategory'
db.createCollection('menucategory')
itemCategoryCollection = db.getCollection("menucategory")
itemCategoryCollection.remove({})

itemCategoryCollection.insert({
        categoryId:1,
        categoryName:"Appetizer",
        description:"Perfect nibble, bite and nosh"
})

itemCategoryCollection.insert({
        categoryId:2,
        categoryName:"Entree",
        description:"Main Course from our best kitchen staff"
})

itemCategoryCollection.insert({
categoryId:3,
categoryName:"Dessert",
description:"Can't leave without trying out award winning desserts"
})


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
      url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_cucumber.jpg",
      itemCategory:{categoryId:"1",
              categoryName:"Appetizer",
              description:'description here'}
}
)
menuitemsCollection.insert(
{
        itemID: 2,
        itemName: "Soy Noodle Salad",
        price: 7.99,
        description: "Vegetarian cold salad",
        restaurantID: 1,
        url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_soynoodlesalad.jpg",
        itemCategory:{categoryId:"1",
              categoryName:"Appetizer",
              description:'description here'}
}
)
menuitemsCollection.insert(
{
        itemID: 3,
        itemName: "Fried Pork Chop",
        price: 10.99,
      description: "Fried pork chop with a side of rice",
      restaurantID: 1,
      url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_porkchop.jpg",
      itemCategory:
      {
       categoryId:"1",
      categoryName:"Appetizer",
      description:'description here'}
}
)
menuitemsCollection.insert(
        {
                itemID: 104,
                itemName: "Eight-Treasure Rice Cake",
                price: 8.99,
              description: "Sticky rice with eight-treatures.",
              restaurantID: 1,
              url: "https://dintaifungusa.com/wp-content/uploads/2019/01/Eight-Treasure-Sticky-Rice.jpg",
              itemCategory:
              {
               categoryId:"3",
              categoryName:"Dessert",
              description:'description here'}
        }
        )
        menuitemsCollection.insert(
                {
                        itemID: 105,
                        itemName: "Red Bean Rice Cake",
                        price: 10.99,
                      description: "Red Bean Rice Cake.",
                      restaurantID: 1,
                      url: "https://dintaifungusa.com/wp-content/uploads/2019/01/RedBeanRiceCake_frame.jpg",
                      itemCategory:
                      {
                       categoryId:"3",
                      categoryName:"Dessert",
                      description:'description here'}
                }
                )
                menuitemsCollection.insert(
                        {
                                itemID: 106,
                                itemName: "Pork XiaoLongBao",
                                price: 10.99,
                              description: "Pork xiaolongbao",
                              restaurantID: 1,
                              url: "https://dintaifungusa.com/wp-content/uploads/2015/01/pork-soup-dumpling.jpg",
                              itemCategory:
                              {
                               categoryId:"2",
                              categoryName:"Entree",
                              description:'description here'}
                        }
                )
                menuitemsCollection.insert(
                        {
                                itemID: 107,
                                itemName: "Crab & Pork XiaoLongBao",
                                price: 10.99,
                                description: "Crab & Pork xiaolongbao",
                                restaurantID: 1,
                                url: "https://dintaifungusa.com/wp-content/uploads/2015/01/pork-crab-soup-dumpling.jpg",
                                itemCategory:
                                {
                                categoryId:"2",
                                categoryName:"Entree",
                                description:'description here'}
                                }
                )
menuitemsCollection.insert(
{
          itemID: 4,
          itemName: "Spring Rolls",
          price: 5.99,
          description: "Cucumbers marinated in sauce",
          restaurantID: 1,
          url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_spareribs.jpg",
          itemCategory:{categoryId:"2",
              categoryName:"Entree",
              description:'description here'}
}
)

menuitemsCollection.insert(
        {
                  itemID: 100,
                  itemName: "Sweet Taro Bao",
                  price: 3.99,
                  description: "Tasty buns",
                  restaurantID: 1,
                  url: "https://dintaifungusa.com/wp-content/uploads/2019/01/SweetTaroXLB_frame.jpg",
                  itemCategory:{categoryId:"3",
                      categoryName:"Dessert",
                      description:'description here'}
                
        }
)
menuitemsCollection.insert(
        {
                  itemID: 101,
                  itemName: "Red Bean Bao",
                  price: 3.99,
                  description: "Tasty buns",
                  restaurantID: 2,
                  url: "https://dintaifungusa.com/wp-content/uploads/2019/01/SweetTaroXLB_frame.jpg",
                  itemCategory:{categoryId:"3",
                      categoryName:"Dessert",
                      description:'description here'}
        }
)
menuitemsCollection.insert(
        {
                  itemID: 102,
                  itemName: "Green Bean Bao",
                  price: 3.99,
                  description: "Tasty buns",
                  restaurantID: 3,
                  itemCategory:{categoryId:"3",
                      categoryName:"Dessert",
                      description:'description here'}
        }
)
menuitemsCollection.insert(
        {
                  itemID: 103,
                  itemName: "Beef Noodle",
                  price: 3.99,
                  description: "Tasty noodle",
                  restaurantID: 2,
                  itemCategory:{categoryId:"2",
                      categoryName:"Dessert",
                      description:'description here'}
        }
)
    menuitemsCollection.insert(
        {       
              itemID: 5,
              itemName: "Item A",
              price: 5.99,
              description: "Cucumbers marinated in sauce",
              restaurantID: 2,
              //type: "Appetizer"
              itemCategory:{categoryId:"1",
              categoryName:"Appetizer",
              description:'description here'}
              
        }
        )
        menuitemsCollection.insert(
        {
                itemID: 6,
                itemName: "Item B",
                price: 7.99,
                description: "Vegetarian cold salad",
                restaurantID: 2,
                itemCategory:{categoryId:"2",
                categoryName:"Entree",
                description:'description here'}
        }
        )
        menuitemsCollection.insert(
        {
                itemID: 7,
                itemName: "Item C",
                price: 10.99,
              description: "Fried pork chop with a side of rice",
              restaurantID: 2,
              //type: "Appetizer"
              itemCategory:{categoryId:"1",
                categoryName:"Appetizer",
                description:'description here'}
        }
        )
        menuitemsCollection.insert(
        {
                itemID: 8,
                itemName: "Item D",
                  price: 5.99,
                  description: "Cucumbers marinated in sauce",
                  restaurantID: 2,
                  //type: "Appetizer",
                  itemCategory:{categoryId:"2",
                        categoryName:"Entree",
                        description:'description here'}
                  
        }
        )

        menuitemsCollection.insert(
                {       
                        itemID: 9,
                      itemName: "Item A",
                      price: 5.99,
                      description: "Cucumbers marinated in sauce",
                      restaurantID: 3,
                     // type: "Appetizer"
                      itemCategory:{categoryId:"2",
                        categoryName:"Entree",
                        description:'description here'}
                }
                )
                menuitemsCollection.insert(
                {
                        itemID: 10,
                        itemName: "Item B",
                        price: 7.99,
                        description: "Vegetarian cold salad",
                        restaurantID: 3,
                       // type: "Entree"
                        itemCategory:{categoryId:"2",
                        categoryName:"Entree",
                        description:'description here'}
                }
                )
                menuitemsCollection.insert(
                {
                        itemID: 11,
                        itemName: "Item C",
                        price: 10.99,
                        description: "Fried pork chop with a side of rice",
                        restaurantID: 3,
                        //type: "Appetizer"
                        itemCategory:{categoryId:"1",
                        categoryName:"Appetizer",
                        description:'description here'}
                }
                )
                menuitemsCollection.insert(
                {
                        itemID: 12,
                        itemName: "Item D",
                        price: 5.99,
                          description: "Cucumbers marinated in sauce",
                          restaurantID: 3,
                         // type: "Appetizer",
                          itemCategory:{categoryId:"1",
                                categoryName:"Appetizer",
                                description:'description here'}
                }
                )

                menuitemsCollection.insert(
                        {       
                                itemID: 13,
                              itemName: "Item A",
                              price: 5.99,
                              description: "Cucumbers marinated in sauce",
                              restaurantID: 4,
                              itemCategory:{categoryId:"1",
                              categoryName:"Appetizer",
                              description:'description here'}
                        }
                        )
                        menuitemsCollection.insert(
                        {
                                itemID: 14,
                                itemName: "Item B",
                                price: 7.99,
                                description: "Vegetarian cold salad",
                                restaurantID: 4,
                                itemCategory:{categoryId:"1",
                                categoryName:"Appetizer",
                                description:'description here'}
                        }
                        )
                        menuitemsCollection.insert(
                        {
                                itemID: 15,
                                itemName: "Item C",
                                price: 10.99,
                              description: "Fried pork chop with a side of rice",
                              restaurantID: 4,
                              itemCategory:{categoryId:"2",
                        categoryName:"Entree",
                        description:'description here'}
                        }
                        )
                        menuitemsCollection.insert(
                        {
                                itemID: 16,
                                itemName: "Item D",
                                  price: 5.99,
                                  description: "Cucumbers marinated in sauce",
                                  restaurantID: 4,
                                  itemCategory:{categoryId:"2",
                                  categoryName:"Entree",
                                  description:'description here'}
                        }
                        )
// create a table for waitlist

db.createCollection('waitlist')
waitlistCollection = db.getCollection("waitlist")
waitlistCollection.remove({})

waitlistCollection.insert(
{
        queueID: 1,
        customerName: "Mary Johnson",
        restaurantID: 1,
        groupSize: 3,
        joinTime: new Date("February 4, 2019 17:00:00"),
        quotedtime: new Date("February 4, 2019 17:10:00"),
        email : "maryk@yahoo.com",
        phone : "2062112222",
        notified: false,
        confirmed: false
}
)

waitlistCollection.insert(
        {
                queueID: 2,
                customerName: "John Jones",
                restaurantID: 1,
                groupSize: 3,
                joinTime: new Date("February 4, 2019 17:04:00"),
                quotedtime: new Date("February 4, 2019 17:20:00"),
                email : "john@yahoo.com",
                phone : "2062112222",
                notified: false,
                confirmed: false
        }
        )

        waitlistCollection.insert(
                {
                        queueID: 3,
                        customerName: "Peter Andrews",
                        restaurantID: 1,
                        groupSize: 3,
                        joinTime: new Date("February 4, 2019 17:09:00"),
                        quotedtime: new Date("February 4, 2019 17:25:00"),
                        email : "john@yahoo.com",
                        phone : "2062112222",
                        notified: false,
                        confirmed: false
                }
                )
        
waitlistCollection.insert(
        {
        queueID: 1,
        customerName: "Ken",
        restaurantID: 2,
        groupSize: 2,
        joinTime: new Date("February 4, 2019 16:10:00"),
        quotedtime: new Date("February 4, 2019 16:10:00"),
        email : "abc@abc.com",
        phone : "2062112222",
        notified: true,
        confirmed: true
        }
        )


waitlistCollection.insert(
{
        queueID: 2,
        customerName: "Doug",
        restaurantID: 2,
        groupSize: 5,
        joinTime: new Date("February 4, 2019 16:15:00"),
        quotedtime: new Date("February 4, 2019 16:10:00"),
        email : "abc@abc.com",
        phone : "2062112222",
        notified: false,
        confirmed: false
}
)

waitlistCollection.insert(
        {
                queueID: 3,
                customerName: "Darren",
                restaurantID: 2,
                groupSize: 3,
                joinTime: new Date("February 4, 2019 16:00:00"),
                quotedtime: new Date("February 4, 2019 16:10:00"),
                email : "abc@abc.com",
                phone : "2062112222",
                notified: true,
                confirmed: true
        }
        )
        
        waitlistCollection.insert(
                {
                queueID: 4,
                customerName: "Lisa",
                restaurantID: 2,
                groupSize: 2,
                joinTime: new Date("February 4, 2019 16:10:00"),
                quotedtime: new Date("February 4, 2019 16:10:00"),
                email : "abc@abc.com",
                phone : "2062112222",
                notified: false,
                confirmed: false
                }
                )
        
        
        waitlistCollection.insert(
        {
                queueID: 1,
                customerName: "Nico",
                restaurantID: 3,
                groupSize: 5,
                joinTime: new Date("February 4, 2019 16:15:00"),
                quotedtime: new Date("February 4, 2019 16:10:00"),
                email : "abc@abc.com",
                phone : "2062112222",
                notified: true,
                confirmed: true
        }
        )

        waitlistCollection.insert(
                {
                        queueID: 2,
                        customerName: "Sam",
                        restaurantID: 3,
                        groupSize: 3,
                        joinTime: new Date("February 4, 2019 16:00:00"),
                        quotedtime: new Date("February 4, 2019 16:10:00"),
                        email : "abc@abc.com",
                        phone : "2062112222",
                        notified: true,
                        confirmed: true
                }
                )
                
                waitlistCollection.insert(
                        {
                        queueID: 3,
                        customerName: "Tony",
                        restaurantID: 3,
                        groupSize: 2,
                        joinTime: new Date("February 4, 2019 16:10:00"),
                        quotedtime: new Date("February 4, 2019 16:10:00"),
                        email : "abc@abc.com",
                        phone : "2062112222",
                        notified: true,
                        confirmed: true
                        }
                        )
                
                
                waitlistCollection.insert(
                {
                        queueID: 4,
                        customerName: "May",
                        restaurantID: 3,
                        groupSize: 5,
                        joinTime: new Date("February 4, 2019 16:15:00"),
                        quotedtime: new Date("February 4, 2019 16:10:00"),
                        email : "abc@abc.com",
                        phone : "2062112222",
                        notified: true,
                        confirmed: true
                }
                )

// create a table for customers

db.createCollection('customer')
customerCollection = db.getCollection("customer")
customerCollection.remove({})

customerCollection.insert(
{
        customerId : 1,
        firstName : "John",
        lastName : "Doe",
        address: {
                "street": "Bellevue Way E",
                "number": "100", 
                "zip": "98005",
                "city": "Bellevue"
        },
        phone : "2062112222",
        email : "abc@abc.com"
})

customerCollection.insert(
        {
                customerId : 2,
                firstName : "Peter",
                lastName : "Johnson",
                address: {
                        "street": "Bellevue Way E",
                        "number": "100", 
                        "zip": "98005",
                        "city": "Bellevue"
                },
                phone : "2062112222",
                email : "abc@abc.com"
        })

customerCollection.insert(
        {
                customerId : 3,
                firstName : "Mary",
                lastName : "Gates",
                address: {
                        "street": "Bellevue Way E",
                        "number": "100", 
                        "zip": "98005",
                        "city": "Bellevue"
                },
                phone : "2062112222",
                email : "abc@abc.com"
        })

        customerCollection.insert(
        {
                customerId : 4,
                firstName : "John",
                lastName : "Doe",
                address: {
                        "street": "Bellevue Way E",
                        "number": "628", 
                        "zip": "98025",
                        "city": "Bellevue"
                },
                phone : "2062112222",
                email : "abc@abc.com"
        })

       customerCollection.insert(
                {
                        customerId : 5,
                        firstName : "Bill",
                        lastName : "Gates",
                        address: {
                                "street": "Bellevue Way E",
                                "number": "100", 
                                "zip": "98005",
                                "city": "Bellevue"
                        },
                        phone : "2062112222",
                        email : "abc@abc.com"
                })

// create a table for orders

db.createCollection('orders')
orderCollection = db.getCollection("orders")
orderCollection.remove({})

orderCollection.insert({
        "menuItemId" : 1,
        "quantity": 1,
        "orderTime": "2019-02-05T12:15:00.000Z",
        "customerId": 1,
        "restaurantID": 2
})

orderCollection.insert({
        "menuItemId" : 2,
        "quantity": 1,
        "orderTime": "2019-02-05T12:15:00.000Z",
        "customerId": 1,
        "restaurantID": 2
})

orderCollection.insert({
        "menuItemId" : 3,
        "quantity": 1,
        "orderTime": "2019-02-05T12:15:00.000Z",
        "customerId": 1,
        "restaurantID": 2
})