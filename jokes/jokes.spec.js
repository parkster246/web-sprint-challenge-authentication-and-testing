const request = require('supertest')
const server = require('../api/server')

const db = require('../database/dbConfig')
const { response, set } = require('../api/server')
const Jokes = require('./jokes-model')


const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6Im5ld3VzZXIiLCJpYXQiOjE1OTgwMjY0MjAsImV4cCI6MTU5ODExMjgyMH0.4JIscoApLP6J0TMLm3dkXA906BN3DEM0pFJ_zHbvf7Q'

const defaultUser = { username: "parkss", password: "password25"}
const newUser = { username: "parks", password: "password25"}

describe('server', ()=> {

    describe('GET /', () =>{

    
        // should recieve a 401 becuase we don't have token 
        it("Should require authorization" , () => {
            return request(server).get('/api/jokes')
            .then( res => {
                expect(res.status).toBe(401)
            })
        })

        it("Responds with JSON", () => {
            return  request(server).get('/api/jokes')
            .set('Authorization' , `${token2}`)
            .then( res => {
             expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
            })
         
        })



      
    })

    describe('Register success', () => {

        beforeAll(async () => {
            await db("users").truncate();
       });

        it('Should get a status of 201', () => {
            return request(server).post("/api/auth/register")
            .send(newUser)
            .then( res => {
                expect(res.body.data.username).toBe('parks')
                expect(res.status).toBe(201)
            })
        })
        it('Should get a status of 500 becuase it already exists', () => {
            return request(server).post("/api/auth/register")
            .send(newUser)
            .then( res => {
                expect(res.status).toBe(500)
            })
        })
    })

    describe('Login success', () => {

     
        it('Should get a status of 200', () => {
            return request(server).post("/api/auth/login")
            .send(newUser)
            .then( res => {
                const tokens = res.body.token
                expect(res.body.message).toMatch(/Welcome to Our API/i)
                expect(res.status).toBe(200)
            })
        })
        it('Should get a status of 401 becuase of wrong username', () => {
            return request(server).post("/api/auth/login")
            .send({ username: "park", password: "password25"})
            .then( res => {
                expect(res.status).toBe(401)
            })
        })
       
    })





})