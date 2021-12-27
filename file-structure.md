This page constains the file structure of this project

1) www.js(bin->www) = It creates an HTTP server and pass the app.js to it to render. It handels all the server files for you. It is auto created .

2) app.js(root) = It is the main controller to manage all the middlewares and 3rd parties.

3) node_modules = contain all the library infos

4)Public = It contains all the images, extra js configuation files and css files

5) Routes = It contains all the routing end points in and off.

6) Views = It contains the front view and is written in handlebars hbs, a template engine.

-------------------------X---------------------------------------X---------------------------------------X--------------

                            How engine works in routes and views

so when ypu type something on the address, it serches for the same in the routes folder for the file of the same name, once found it sees the code and routes you the given view page and render it.
----------------------------x---------------------------------------X---------------------------------------X-------------

                      Packages used 

1) express-validator(3.1.2) : used for form validator

2) nodemailer(3.1.5) : for performing maling operatoions

3)passport : Passport is authentication middleware for Node.js.Passport uses the concept of strategies to authenticate requests. Strategies can range from verifying username and password credentials, delegated authentication using OAuth (for example, via Facebook or Twitter), or federated authentication using OpenID.

4)passport-local : The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.

5)passport-jwt : This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

6)code-mirror : This module is to be used for  coding mirroring with the two parties

7)monokai : theme

8) socket.io : Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. used here for the task window

9) ot.js : used for code sharing.

10) peer.js : PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API. Equipped with nothing but an ID, a peer can create a P2P data or media stream connection to a remote peer. 

11)  Express : will be used for routing pages and creating the server where the web application will run.

12) Body-parser : To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.Body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.The middleware was a part of Express.js earlier but now you have to install it separately.This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request..
