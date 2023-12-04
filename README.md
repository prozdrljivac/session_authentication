# Session Authentication

## Summary

### What is Session Authentication?

Session authentication is authentication method where we verify identity of the user that wants to interact with our application.

### How does it work?

Client sends username and password to the server. After server validates username and password that was provided, server creates a session identifier that it sends to the client as a cookie. Client then sends that cookie with every request which serves as proof of authentication.

### What are Pros and Cons of using Session Authentication?

It is user friendly because user does not need to enter their credentials as long as sessionID is valid. User can easily be logged out by invalidating the session.

Main downside of this approach is session hijacking. If attacker gains access of users sessionID, they can impersonate the user.
