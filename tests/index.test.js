const server = require("../src/server");
const request = require("supertest")(server);
const mongoose = require("mongoose");
const UserSchema = require("../src/services/users/schema");
const UserModel = require("mongoose").model("User", UserSchema);
const jwt = require("jsonwebtoken");

beforeAll((done) => {
  mongoose.connect(`${process.env.ATLAS_URL}/test`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to Atlas.");
    done();
  });
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// I: Testing a test

describe("Stage I: Testing tests", () => {
  it("should check that true is true", () => {
    expect(true).toBe(true);
  });

  it("should check that the /test endpoint is working correctly", async () => {
    const response = await request.get("/test");
    expect(response.status).toEqual(200);
    expect(response.body.message).not.toBeFalsy();
    expect(response.body.message).toEqual("Test success");
  });
});

// II: Testing user creation and login
const validCredentials = {
  username: "luisanton.io",
  password: "password",
};

const invalidCredentials = {
  username: "luisanton.io",
};

const incorrectCredentials = {
  username: "luisanton.io",
  password: "incorrectPassword",
};
let validtocken = "";
describe("Stage II: testing user creation and login", () => {
  it("should return an id from a /users/register endpoint when provided with valid credentials", async () => {
    const response = await request.post("/users/register").send(validCredentials);

    const { _id } = response.body;

    expect(_id).not.toBeFalsy();

    expect(typeof _id).toBe("string");

    const user = await UserModel.findById(_id);

    expect(user).toBeDefined();
  });

  it("should NOT return an id from a /users/register endpoint when provided with invalid credentials", async () => {
    const response = await request.post("/users/register").send(invalidCredentials);
    expect(response.status).toBe(400);
    expect(response.body.errorCode).toBe("wrong_credentials");
  });

  it("should return a valid token when loggin in with correct credentials", async () => {
    // "VALID_TOKEN"
    const response = await request.post("/users/login").send(validCredentials); //

    const { token } = response.body;

    validtocken = token;
    const valid = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return false;
      return decoded;
    });
    expect(valid).toBeDefined();
    expect(valid).not.toBeFalsy();
    const user = await UserModel.findById(valid._id);
    expect(user).toBeDefined();
    const correct = user.username === validCredentials.username;
    expect(correct).toBe(true);
  });

<<<<<<< HEAD
        expect(response.status).toBe(400)
        expect(response.body.errorCode).toBe("wrong_credentials")
    })

    it("should return a valid token when loggin in with correct credentials", async () => { // "VALID_TOKEN"
        const response = await request.post("/users/login").send(validCredentials) // 

        const { token } = response.body
        expect(token).toBe(validToken)
    })

    it("should NOT return a valid token when loggin in with INCORRECT credentials", async () => {
        const response = await request.post("/users/login").send(invalidCredentials)

        expect(response.status).toBe(400)

        const { token } = response.body
        expect(token).not.toBeDefined()
    })

})

// III: Testing protected endpoints cats pls work

describe("Stage III: testing get cats", () => {
  it("should return a response with a url from /users/cats when provided with a correct token", async () => {
    const response = await request.get("/users/cats").send({ token: validtocken });
    console.log(response.error);
    expect(response.status).toBe(201);
    const { url } = response.body;
    expect(url).toBeDefined();
    expect(typeof url).toBe("string");
  });

  it("should NOT return a response with a url from /users/cats when provided with a INCORRECT token", async () => {
    const response = await request.get("/users/cats").send({ token: "" });
    console.log(response.error);
    expect(response.status).toBe(401);
    const { url } = response.body;
    expect(url).not.toBeDefined();
  });
});
=======
  it("should NOT return a valid token when loggin in with INCORRECT credentials", async () => {
    const response = await request.post("/users/login").send(incorrectCredentials);

    expect(response.status).toBe(401);

    const { token } = response.body;
>>>>>>> parent of dd24fed (Revert "finished")

    expect(token).not.toBeDefined();
  });
});
// III: Testing protected endpoints cats

describe("Stage III: testing get cats", () => {
  it("should return a response with a url from /users/cats when provided with a correct token", async () => {
    const response = await request.get("/users/cats").send({ token: validtocken });
    console.log(response.error);
    expect(response.status).toBe(201);
    const { url } = response.body;
    expect(url).toBeDefined();
    expect(typeof url).toBe("string");
  });

  it("should NOT return a response with a url from /users/cats when provided with a INCORRECT token", async () => {
    const response = await request.get("/users/cats").send({ token: "" });
    console.log(response.error);
    expect(response.status).toBe(401);
    const { url } = response.body;
    expect(url).not.toBeDefined();
  });
});
