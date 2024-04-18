const app=require("../app.js")
const request=require("supertest")
const {db}=require("../db/db.js")
// beforeAll(async () => {
//     await db.end(); // disconnect from the db before tests
//   });
//   afterAll(async () => {
//     await db.connect(); // reconnect to the db after tests
//   });
describe("GET all books",()=>{
    it("should get all books in the database",async ()=>{
        const response=await request(app).get("/all")
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.length).toBeGreaterThan(0)
    })
})
describe("GET single book",()=>{
    it("should get a single book",async()=>{
        const response=await request(app).get("/book/0")
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
      
    })
})
describe("add a book",()=>{
    it("should add a book to the database",async ()=>{
        const response=await request(app).post("/add").send(
            {
                "id": 1,
                "title": "Unlocking Android",
                "isbn": "1933988673",
                "pageCount": 416,
                "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
                "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
                "longDescription": "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
                "authors": ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
                
            }
        )
        expect(response.status).toBe(201)
        expect(response.body["id"]).toBe(1)

    })
})
describe("delete a book",()=>{
    it("should delete a book",async ()=>{
        const response=await request(app).delete("/delete/1")
        expect(response.status).toBe(200)
    })
})
describe("POST login",()=>{
    it("should login a user",async ()=>{
        const response=await request(app).post("/login").send({
            "firstName":"Brian",
            "lastName":"Ruhiu",
            "email":"1234@gmail.com",
            "password":"1234"
        })
        expect(response.status).toBe(200)
        expect(response.body["email"]).toBe("1234@gmail.com")
     

    })
})
describe("POST register",()=>{
    it("should register a user",async ()=>{
        const response=await request(app).post("/register").send({
            "firstName":"Brian",
            "lastName":"Ruhiu",
            "email":"1234@gmail.com",
            "password":"1234"
        })
        expect(response.status).toBe(200)
        expect(response.body["email"]).toBe("1234@gmail.com")
    })
})