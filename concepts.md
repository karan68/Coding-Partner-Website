                        Visual flow of passport serializer and deserializer

passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});

refer to this link for detailed info
https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize


----------------------------xxxxxxxxxx--------------
The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
--------------------xxxxxxxxxxxxxx---------------------

                                Data over WebRTC

Before we start, it is important to understand that WebRTC is not all about transmitting audio and video streams. It also provides support for P2P data channels. These channels come in two variations: reliable and unreliable. As one may guess, reliable data channels guarantee that messages are delivered and they are delivered in order, while unreliable channels provide no such guarantees.

image for refernce - https://ibb.co/NNSXqgY

--------------------------xxxxxxxxxxxxxxxx----------------


                                MEET PEER JS

PeerJS takes the implementation of WebRTC in your browser and wraps a simple, consistent, and elegant API around it. It plugs various holes in WebRTC implementation of earlier browsers. For example, in Chrome 30 or older, only unreliable data channels were available. PeerJS, if configured to use reliable data channels, would use a shim for those older browsers. Although this wouldn’t be as performant as native implementation of reliable channels, it would still work.

With PeerJS, identifying peers is even simpler. Every peer is identified using nothing but an ID. A string that the peer can choose itself, or have a server generate one. Although WebRTC promises peer-to-peer communication, you still need a server anyway to act as a connection broker and handle signaling. PeerJS provides an open source implementation of this connection broker server PeerJS Server (written in Node.js), in case you do not want to use their cloud-hosted version (which is free right now, and comes with some limitations).


------------------------xxxxxxxxxxxxxxxxxx---------------------------
                            error resolve :

line no. 165,185 of task.hbs - $('#my-video').prop('src', URL.createObjectURL(stream));
                               $('#second-video').prop('src', URL.createObjectURL(stream));
problem - mozilla and chrome isn't accepting createobjecturl and throwing error there.

solution - depricating the above functions.
changed the line to : const video = document.getElementById('my-video');
                     video.srcObject = stream;

------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------------------------
                        SOCKET.IO CONCEPTUALIZATION 
Earlier, websites used to reload every-time a resource was requested. This introduced unnecessary delays which increased average wait time. Often users had to wait for minutes to fetch a particular page or file. Real-time applications(Instant messenger, Online gaming, push notification etc), on the other hand, are those applications which run within a given time-slot such that user is presented with immediate and up-to-date copy of the resource. Latency in these applications is kept as low as possible to give smooth and consistent user experience. Socket.IO is one such JavaScript library that programmers use in developing real-time “Web Applications”.

Most of the applications on Internet today are based on Client-Server architecture. A client is someone who requests something from a Server. A Server, based on the request, responds with appropriate results. These two entities are completely different from each other because of the nature of tasks they perform. A browser is a perfect example of client application. Clients on browsers usually communicate to Servers via HTTP requests and responses. The problem with this communication is that either a request or a response can be sent at a time. For understanding, think of it as a half-duplex link. Also, HTTP headers contain lots and lots of redundant information which is useless once a connection between client and server is made. Sockets on the other hand work on transport layer of Network Stack. There are not many redundant fields thus increase the efficiency of information transfer over web.

Socket.IO works on the same concept and enables bi-directional communication between web clients and servers. For handling them separately and efficiently, it consists of two parts;

    a JavaScript client library that runs on browsers.
    a Node.js server

    