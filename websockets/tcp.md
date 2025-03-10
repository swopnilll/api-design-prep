- TCP stands for Transmission Control Protocol

- TCP has been around for a very long time - since 1983 when it was used with ARPANET 😳

- TCP is just a protocol - a set of rules to carry data over the wire

- TCP and HTTP are two different protocols, but they work together to allow communication over the internet

- Before an HTTP request can be made, a TCP connection has to be established between the client & server

- This initial connection is done via a 3-way handshake process 🤝, commonly known as **SYN**-**SYN/ACK**-**ACK **

- TCP is a persistent protocol, meaning that after a complete HTTP request/response cycle is done, the TCP connection will remain open for future request/response cycles

- TCP is not perfect 😖

- TCP can only handle one request/response at a time. This means that if a client initiates multiple requests to a server, TCP will handle them sequentially, one by one, rather than concurrently

- The limitation referred to above ☝ is known as **head-of-line (HOL) blocking**. HOL blocking occurs when a bunch of packets or requests is held up (or blocked) by the first packet or request in the queue *(as you'll see later, this is one reason why HTTP/3 with UDP was introduced)*
