const express = require('express');
const app = express();
const session = require('express-session');
const request = require('request');
const bcrypt = require('bcrypt');
const pool = require('./dbPool.js');

app.set("view engine", "ejs");
app.use(express.static("public"));
// app.engine('html', require('ejs').renderFile);

app.use(session({
   secret: "top secret!",
   resave: true,
   saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));

//***View routes*** 
app.get("/", function(req, res) {
   res.render("index.ejs");
});

app.get("/cart", function(req, res) {
   res.render("cart.ejs");
});

app.get("/login", function(req, res) {
   res.render("login.ejs");
});

app.get("/signup", function(req, res) {
   res.render("signup.ejs");
});

// Still needs to be built.
app.get("/myAccount", function(req, res) {
   res.send("My Account page currently under construction.");
});

// Only allows admin to be accessed if the user is signed in.
app.get("/admin", isAuthenticated, function(req, res) {
   res.render("admin.ejs");
});

app.get("/reports", isAuthenticated, function(req, res) {
   res.render("reports.ejs");
});

app.get("/signup", function(req, res) {
   res.render("signup.ejs");
});

// Still needs to be built.
app.get("/thankYou", function(req, res) {
   res.send("Thank you page currently under construction.");
});

// Likely will be "hidden" page in final project. Currently accessible for
// testing purposes.
app.get("/adminLogin", function(req, res) {
   res.render("adminLogin.ejs");
});

// Logs out of current session. 
app.get("/logout", function(req, res) {
   req.session.destroy();
   res.redirect("/");
});

app.post("/", async function(req, res) {

   let username = req.body.adminuser;
   let password = req.body.adminpwd;

   let result = await checkUsername(username);
   console.dir(result);
   let hashedPwd = "";

   if (result.length > 0) {
      hashedPwd = result[0].password;
   }

   let passwordMatch = await checkPassword(password, hashedPwd);
   console.log("passwordMatch: " + passwordMatch);

   if (passwordMatch) {
      console.log("Now signed in as admin");
      req.session.authenticated = true;
      res.render("admin");
   }
   else {
      console.log("No match");
      res.render("index", { "loginError": true });
   }
});

//***API Routes*** 
app.get("/api/populateAlbumsArray", function(req, res) {
   let sql = "SELECT * FROM albums";

   pool.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
   });
}); //app.get(populateAlbumArray);

//setCart API route sets the customer cart once a customer clicks the add to cart button
app.get("/api/setCart", function(req, res) {
   let sql = 'INSERT INTO cart (albumIDs, customerID) VALUES (?, ?)';
   let sqlParams = [req.query.albumIDs, req.query.customerID];

   pool.query(sql, sqlParams, function(err, rows, fields) {
      if (err) throw err;
      res.send(rows.affectedRows.toString());
   });
}); //api/setCart

//getCart API route gets the albumIDs from the cart to display on the cart.ejs page
app.get("/api/getCart", function(req, res) {
   let sql = 'SELECT albumIDs FROM cart ORDER BY cartID DESC LIMIT 1';

   pool.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
   });
}); //api/getCart

//submitOrder adds the customer order to the orders table
app.get("/api/submitOrder", function(req, res) {
   let sql = 'INSERT INTO orders (albumIDs, albumTitles, orderTotal) VALUES (?,?,?)';
   let sqlParams = [req.query.albumIDs, req.query.albumTitles, req.query.orderTotal];

   pool.query(sql, sqlParams, function(err, rows, fields) {
      if (err) throw err;
      res.send(rows.affectedRows.toString());
   });
}); //api/submitOrder

app.get("/api/addAlbumsArray", function(req, res) {
   let sql = "INSERT INTO albums (title, artist, coverImage, price, genre, tag1, tag2) VALUES (?, ?, ?, ?, ?, ?, ?)";
   let sqlParams = [req.query.title, req.query.artist, req.query.coverImage, req.query.price, req.query.genre, req.query.tag1, req.query.tag2];

   pool.query(sql, sqlParams, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows.affectedRows.toString());
   });
}); // api/addAlbumsArray

app.get("/api/updateAlbumsArray", function(req, res) {
   let sql = "INSERT INTO albums (title, artist, coverImage, price, genre, tag1, tag2) VALUES (?, ?, ?, ?, ?, ?, ?)";
   let sqlParams = [req.query.title, req.query.artist, req.query.coverImage, req.query.price, req.query.genre, req.query.tag1, req.query.tag2];

   pool.query(sql, sqlParams, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows.affectedRows.toString());
   });
}); // api/updateAlbumsArray

app.get("/api/deleteAlbumsArray", function(req, res) {
   let sql = "DELETE FROM albums WHERE albumID = ?";
   let sqlParams = [req.query.albumID];

   pool.query(sql, sqlParams, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows.affectedRows.toString());
   });
}); // api/deleteAlbumsArray

//start server
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Express server is running...");
});

// Verify password is valid. Currently only for admin.
function checkUsername(username) {
   let sql = "SELECT * FROM admin WHERE username = ? ";
   return new Promise(function(resolve, reject) {
      pool.query(sql, [username], function(err, rows, fields) {
         if (err) throw err;
         console.log("Rows found: " + rows.length);
         resolve(rows);
      });
   });
}

// Make sure password is valid.
function checkPassword(password, hashedValue) {
   return new Promise(function(resolve, reject) {
      bcrypt.compare(password, hashedValue, function(err, result) {
         if (err) throw err;
         console.log("Result: " + result);
         resolve(result);
      });
   });
}

// Makes sure user is signed in as admin before certain pages are accessed.
// Currently only for admin.
function isAuthenticated(req, res, next) {
   if (!req.session.authenticated) {
      res.redirect("/adminLogin");
   }
   else {
      next();
   }
}
