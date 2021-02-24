## Cats As A Service

### Goal

Using a TDD approach, create a simple **JWT authentication service** that allows access to an endpoint **returning a random cat image**.

Let’s use Cats As A Service: https://cataas.com/cat?json=true

### Walkthrough

- Start from today’s project: [**fork the repo**](https://github.com/luisanton-io/Jest-Lesson) and create a **develop branch**
- Create a Continuous Delivery pipeline on Heroku for this project
    - deploy the **current master** in production
      - create and deploy a staging app
      - set "Automatic deploys from master (when CI is finished correctly)"
      - **promote it to production**
    - Don’t forget to add all TEST, REVIEW, STAGING and PRODUCTION environment vars.
- When the pipeline is correctly setup, start writing these tests and their implementation:
    1. When providing the Login endpoint with incorrect credentials:
        - expect requests to be rejected with code 401
    2. When providing the Login endpoint with correct credentials:
        - expect a valid JWT Access token back (use jwt.verify as always)
    3. When calling a “/cats” endpoint with the previously generated token:
        - expect requests to be accepted with 200 code
        - Expect the response.body.url to be defined
        - Expect the **typeof url** in response.body to be “string”
    4. When calling the Cats endpoint without a valid token
        - expect requests to be rejected with code 401

### Notes

Remember to keep separate environments:
- **Review apps** automatically deployed from pull requests.
- **Staging** automatically deployed from master branch.
- **Production** deployed **only when promoted** from staging.

**Until the end**, the production environment is expected to be responding with a fake **"VALID_TOKEN"** when trying to login with valid credentials - just like in the latest master of today’s morning.

We’ll promote your working staging app to production together during debrief.

Good luck! :D
