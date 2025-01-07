# OSI : Open system interconnection


### Sending


When a user sends an email, it first interacts with the application layer, which is responsible for data manipulation.

Next, the email's data is forwarded to the presentation layer, which adds the presentation layer header (PH) to it.

The session layer adds the session layer header (SH) and manages the session during the communication

The transport layer adds the transport layer header (TH), divides the data into segments, and adds the sender and receiver port numbers.

The network layer converts the segments into packets and adds the IP addresses of the sender and receiver.

The data link layer converts the packets into frames, adds the MAC address of the immediate next hop in the path and passes them to the physical layer. This layer adds a data layer header (DH) and a data trailer (DT) to define the boundaries of a frame on the wire.

The physical layer converts the frames into the bitstreams and sends it to the receiver side.

### Receiving


The bit stream propagates to the physical layer of the receiving machine through the transmission medium.

The physical medium sends the data to the data link layer, which reads the header of the frame at the data link layer.

The data link layer hands over the packet to the appropriate network layer protocol after removing the data link layer header (DH) and trailer (DT).

The network layer forwards the packets to the transport layer after reading the network layer header (NH).

The transport layer header (TH) is used to forward data to the session layer.

The session layer header (SH) contains information that is used to forward the packet to the correct presentation layer protocol.

The presentation layer header (PH) forwards the data to the email client running on the application layer.

