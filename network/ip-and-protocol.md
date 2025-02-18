### 1\. What is IP?

-   **IP stands for Internet Protocol.**\
    Think of IP as a set of rules that all computers follow when they send data over the internet. It's like the language or method that lets devices talk to each other.

-   **Why is it important?**\
    IP makes sure that data (like emails, web pages, or files) gets from one computer to another, even if they are far apart. It handles the addressing and routing, much like how a postal system uses addresses to deliver letters.

* * * * *

### 2\. What is an IP Header?

-   **What is a header in general?**\
    A header is like the envelope of a letter. It contains important information about what's inside and how it should be delivered.

-   **IP Header specifics:**\
    The IP header is the first part of an IP packet. It includes crucial details such as:

    -   **Source IP Address:** Where the data came from (like the return address on an envelope).
    -   **Destination IP Address:** Where the data is going.
    -   **Protocol Field:** This tells the receiving computer what kind of data is inside. For example:
        -   If the data is following the rules of TCP (Transmission Control Protocol), the protocol field is set to **6**.
        -   If the data follows the rules of UDP (User Datagram Protocol), the protocol field is set to **17**.
        -   If you choose a different number, like **99**, it means you're using a custom or non-standard protocol.
-   **Why is the IP header important?**\
    Without the header, the packet wouldn't have the "address" or instructions needed to reach its destination.

* * * * *

### 3\. What is a Packet?

-   **What is a packet?**\
    A packet is a small piece of data that is sent over the network. When you send a large message or file, it's broken down into many smaller packets.

-   **Structure of a Packet:**\
    A packet typically has two parts:

    -   **Header:** Contains metadata (like addresses and protocol information) needed to deliver the packet.
    -   **Payload:** The actual data or content you want to send (like part of a webpage, a file, etc.).
-   **Analogy:**\
    Imagine you're sending a long letter. Instead of sending one huge envelope, you break it up into several smaller envelopes. Each envelope (packet) has the sender and recipient's address (header) and a part of your letter (payload). The postal system (IP) takes care of delivering each envelope correctly.


### Example in Hexadecimal Representation

Here's how the parts might look in a simplified hex (byte-by-byte) format. This is a simplified view to illustrate the idea:

**IP Header (20 bytes):**

`45 00 00 28 1c 46 40 00 40 63 b1 e6 c0 a8 01 02 c0 a8 01 03`

Let's break this down:

-   **45:**
    -   `4` means IPv4
    -   `5` means the header length is 5 (i.e., 5 * 4 = 20 bytes)
-   **00:** Type of Service is 0.
-   **00 28:** Total Length is 0x0028, which is 40 bytes.
-   **1c 46:** Identification (example value).
-   **40 00:** Flags and Fragment Offset (with the "Don't Fragment" flag set).
-   **40:** TTL is 64 (0x40 in hex).
-   **63:** Protocol is 0x63, which is 99 in decimal (our custom protocol).
-   **b1 e6:** Header Checksum (example value).
-   **c0 a8 01 02:** Source IP address, which is 192.168.1.2 in hexadecimal.
-   **c0 a8 01 03:** Destination IP address, which is 192.168.1.3 in hexadecimal.

**Payload (Example Data):**

Suppose our payload is a short text message like "Hello". In ASCII, "Hello" in hex is:


`48 65 6C 6C 6F`

**Complete Raw IP Packet:**

Combining the header and payload, the full packet in hex might look like:


`45 00 00 28 1c 46 40 00 40 63 b1 e6 c0 a8 01 02 c0 a8 01 03 48 65 6C 6C 6F`

This string of hex values represents:

-   The first 20 bytes are the IP header.
-   The following bytes are the payload ("Hello").

* * * * *

### Recap

-   **IP:** The system (rules) that allows data to be sent between devices using addresses like 192.168.1.2.
-   **IP Header:** The envelope that contains crucial information (version, addresses, protocol, etc.) for each packet.
-   **Packet:** A small unit of data with a header and payload.
-   **Raw IP Packet:** A packet that consists solely of the IP header and payload (using a custom protocol number like 99) without any additional layers.
