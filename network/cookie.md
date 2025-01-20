### What is a Cookie?

A **cookie** is a small piece of data sent from a server and stored in the user's web browser. Cookies are used to store information that can be retrieved by the server or client on subsequent requests. They help the web server remember things about the user, such as login status, preferences, and tracking information.

### How Does a Cookie Look?

A cookie typically consists of the following parts:

-   **Name**: The identifier for the cookie.
-   **Value**: The actual data stored in the cookie (e.g., user ID, session ID, etc.).
-   **Domain**: Specifies the domain to which the cookie is sent.
-   **Path**: Defines the specific path on the domain where the cookie is valid.
-   **Expiry Date**: Specifies when the cookie should expire. If not set, it's a session cookie, which is deleted when the browser is closed.
-   **Secure**: Indicates that the cookie should only be sent over HTTPS.
-   **HttpOnly**: Marks the cookie as inaccessible to JavaScript (helps protect against XSS attacks).

#### Example of a Cookie:

css

CopyEdit

`Set-Cookie: session_id=abc123; Domain=example.com; Path=/; Expires=Wed, 19 Jan 2025 18:00:00 GMT; Secure; HttpOnly`

In this example:

-   `session_id=abc123` is the **cookie name and value**.
-   `Domain=example.com` restricts the cookie to only `example.com` domain.
-   `Expires=Wed, 19 Jan 2025 18:00:00 GMT` sets the expiration date.
-   `Secure` means the cookie is only sent over HTTPS.
-   `HttpOnly` ensures the cookie can't be accessed by JavaScript.

### How Does a Server Send Cookies?

When a user visits a website for the first time or logs in, the server sends a **Set-Cookie** header in the HTTP response. The browser then stores the cookie and sends it back with each subsequent request to the same domain.

#### Example HTTP Response (Server to Client):

css

CopyEdit

`HTTP/1.1 200 OK
Set-Cookie: session_id=abc123; Domain=example.com; Path=/; Expires=Wed, 19 Jan 2025 18:00:00 GMT; Secure; HttpOnly`

In the response above, the server instructs the browser to store the cookie (`session_id=abc123`) with specific settings.

### How Do Multiple Servers Validate Cookies Sent by Frontend?

In a distributed system with multiple servers, cookies can still be validated without being stored on a specific server. This is because cookies are stored **client-side** (in the user's browser), not on the server.

Here's how the process works:

1.  **User Logs In**: When a user logs in, the server generates a cookie (usually containing a session ID or token) and sends it back in the response headers.
2.  **Browser Stores Cookie**: The browser automatically stores this cookie and associates it with the domain specified in the cookie (e.g., `example.com`).
3.  **Subsequent Requests**: For any subsequent requests to the same domain, the browser automatically includes the stored cookie in the `Cookie` header of the HTTP request.
4.  **Server Validates Cookie**: When the request reaches any of the multiple servers in the system, the cookie is included in the request headers. The server then checks the validity of the session ID or token stored in the cookie. This validation typically involves looking up the session information in a centralized store (like a **database** or a **cache** like Redis).

Even though the servers are distributed, the cookie (session ID or token) allows any server to validate the request by checking the token against a centralized authentication service, ensuring that the user is authenticated.

#### Example of an HTTP Request with Cookie:

vbnet

CopyEdit

`GET /dashboard HTTP/1.1
Host: example.com
Cookie: session_id=abc123`

In the request above, the cookie `session_id=abc123` is sent back to the server with the request to `/dashboard`.

### Where are Cookies Stored in HTTP Request Headers?

Cookies are stored in the **`Cookie`** header of the HTTP request. Every time the browser makes a request to a domain that has set cookies, the browser automatically includes the relevant cookies in this header.

#### Example of an HTTP Request with Cookie:

vbnet

CopyEdit

`GET /profile HTTP/1.1
Host: example.com
Cookie: session_id=abc123; user_preferences=dark_mode`

Here, the request to `/profile` includes the `session_id` and `user_preferences` cookies in the `Cookie` header, which the server will use to identify the user and load preferences.

### Important Points About Cookies:

1.  **Cookies Are Stored Client-Side**: Cookies are stored in the browser, not on the server. This allows cookies to persist across multiple requests to the server.
2.  **Expiration Date**: Cookies can be **session cookies** (which are deleted when the browser is closed) or **persistent cookies** (which have an expiration date and remain after the browser is closed).
3.  **Secure and HttpOnly Flags**: These flags provide additional security. `Secure` ensures cookies are sent over HTTPS, and `HttpOnly` prevents JavaScript from accessing cookies (which helps protect against XSS attacks).
4.  **Cross-Domain Cookies**: If the frontend and backend are on different subdomains, cookies can be shared between them by setting the `Domain` attribute (e.g., `.example.com` allows cookies to be shared between `api.example.com` and `frontend.example.com`).
5.  **SameSite Attribute**: This attribute helps protect against **CSRF** (Cross-Site Request Forgery) by controlling how cookies are sent in cross-origin requests. It can have values like `Strict`, `Lax`, or `None`.

### Most Asked Interview Questions About Cookies:

1.  **What is a cookie in HTTP?**

    -   A cookie is a small piece of data stored in the user's browser that is sent to the server with every request to the same domain. It is typically used to store session information or preferences.
2.  **What are the main components of a cookie?**

    -   Name, value, domain, path, expiry date, Secure flag, HttpOnly flag, and SameSite attribute.
3.  **How are cookies stored in the browser?**

    -   Cookies are stored client-side in the user's browser. The browser automatically sends cookies associated with a domain with every HTTP request to that domain.
4.  **What is the difference between a session cookie and a persistent cookie?**

    -   A session cookie is stored only for the duration of the browser session and is deleted when the browser is closed. A persistent cookie has an expiration date and is stored beyond the browser session.
5.  **What is the purpose of the HttpOnly flag on cookies?**

    -   The `HttpOnly` flag ensures that cookies are not accessible via JavaScript, helping protect against **Cross-Site Scripting (XSS)** attacks.
6.  **How does SameSite attribute in cookies work?**

    -   The `SameSite` attribute controls whether a cookie is sent in cross-site requests. `SameSite=Strict` prevents cookies from being sent in cross-site requests, `SameSite=Lax` allows cookies for certain types of cross-site requests, and `SameSite=None` allows cookies to be sent in all cross-site requests (when combined with `Secure`).
7.  **What is the purpose of the Secure flag in cookies?**

    -   The `Secure` flag ensures that cookies are only sent over secure HTTPS connections, preventing them from being sent over insecure HTTP connections.
8.  **How can cookies be used for user authentication?**

    -   Cookies can store a session ID or token (e.g., JWT). When a user logs in, the server sends the session ID/token as a cookie. The browser automatically includes the cookie in future requests, allowing the server to authenticate the user based on the cookie.
9.  **Can cookies be shared across subdomains?**

    -   Yes, by setting the `Domain` attribute to a parent domain (e.g., `.example.com`), cookies can be shared across subdomains like `api.example.com` and `app.example.com`.
10. **What is the role of the `Cookie` header in an HTTP request?**

    -   The `Cookie` header contains all the cookies associated with the domain and sends them with the HTTP request to the server. The server can use these cookies to authenticate the user or remember their preferences.
