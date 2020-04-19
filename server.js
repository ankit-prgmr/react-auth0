const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); //validate jwt and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON web key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); // validate jwt scopes

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"],
});

const app = express();

app.get("/public", function (req, res) {
  res.json({
    message: "Hello from a public api",
  });
});

app.get("/private", checkJwt, function (req, res) {
  res.json({
    message: "Hello from a private api",
  });
});

app.get("/courses", checkJwt, checkScope(["read:courses"]), function (
  req,
  res
) {
  res.json({
    courses: [
      { id: 1, title: "Building apps with react and redux" },
      { id: 2, title: "Creating reusable react components" },
    ],
  });
});

app.listen(3001);
console.log("API Server listening on port 3001");
