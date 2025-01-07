# OSI : Open system interconnection


### Sending

![1](https://github.com/user-attachments/assets/08da4a76-4435-48a8-a54b-34c2f18ceb84)

When a user sends an email, it first interacts with the application layer, which is responsible for data manipulation.

Next, the email's data is forwarded to the presentation layer, which adds the presentation layer header (PH) to it.

The session layer adds the session layer header (SH) and manages the session during the communication

The transport layer adds the transport layer header (TH), divides the data into segments, and adds the sender and receiver port numbers.

The network layer converts the segments into packets and adds the IP addresses of the sender and receiver.

The data link layer converts the packets into frames, adds the MAC address of the immediate next hop in the path and passes them to the physical layer. This layer adds a data layer header (DH) and a data trailer (DT) to define the boundaries of a frame on the wire.

The physical layer converts the frames into the bitstreams and sends it to the receiver side.

### Receiving

![2](https://github.com/user-attachments/assets/495c9d13-aa80-4bb5-8e14-8572ac2ba838)

The bit stream propagates to the physical layer of the receiving machine through the transmission medium.

The physical medium sends the data to the data link layer, which reads the header of the frame at the data link layer.

The data link layer hands over the packet to the appropriate network layer protocol after removing the data link layer header (DH) and trailer (DT).

The network layer forwards the packets to the transport layer after reading the network layer header (NH).

The transport layer header (TH) is used to forward data to the session layer.

The session layer header (SH) contains information that is used to forward the packet to the correct presentation layer protocol.

The presentation layer header (PH) forwards the data to the email client running on the application layer.

#### Sending 

```yaml
Physical Layer: 
   Bitstream -> [01101001 11001110 ...]

Data Link Layer: 
   DLH {Source MAC: 00:14:22:01:23:45, Destination MAC: 00:16:36:14:12:AB}
   NH {Source IP: 192.168.1.2, Destination IP: 172.217.11.46}
   TH {Source Port: 55001, Destination Port: 25}
   SH {Session-ID: 12345}
   PH {Encryption Type: AES-256}
   Data: "E9a8fD1c5..."
   DLT {Frame Check Sequence}

Network Layer: 
   NH {Source IP: 192.168.1.2, Destination IP: 172.217.11.46}

Transport Layer: 
   TH {Source Port: 55001, Destination Port: 25}

Session Layer: 
   SH {Session-ID: 12345}

Presentation Layer: 
   PH {Encryption Type: AES-256}

Application Layer: 
   Data: "Hi Bob, How are you?"

```

### **Scenario**

-   **Use Case**: A React application sends a POST API request to `https://api.example.com/login` with the payload:

```json
{
  "username": "user123",
  "password": "mypassword"
}
```


### **Application Layer (Layer 7)**

-   **Role**: Manages communication between the client application (React frontend) and the web server (backend API). This includes protocol handling and generating the HTTP request.
**Details**:

1.  **HTTP Protocol** is used to structure the POST request.

2.  **Request Formation**:
    -   **URL**: `https://api.example.com/login`

    -   **Headers**

        ```less
        Content-Type: application/json
        Authorization: Bearer <token>
        ```

    -   **Body**

        ```json
        {
        "username": "user123",
        "password": "mypassword"
        }
        ```

#### Final Output from Application Layer:

```makefile
POST /login HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer <token>
Content-Length: 42

{
  "username": "user123",
  "password": "mypassword"
}
```

### **Presentation Layer (Layer 6)**

-   **Role**: Formats the data for transmission, ensuring compatibility between sender and receiver. If necessary, it handles encryption, compression, and encoding.
**Details**:

1.  **Data Encoding**: Converts the JSON payload into byte format.
    -   Input: `{ "username": "user123", "password": "mypassword" }`
    -   Encoded Output: Byte stream (e.g., `7b2263757365726e616d65223a202275736572313233...`).
2.  **Encryption**: If HTTPS is used, this layer encrypts the data using SSL/TLS.
    -   Input: Encoded byte stream.
    -   Output: Encrypted binary data (e.g., `e83a9b71c4c...`).
**Final Output from Presentation Layer**:

-   Encrypted data ready for transport.
* * *

### **Transport Layer (Layer 4)**

-   **Role**: Ensures reliable delivery of the API request to the server. It segments the data, adds port numbers, and manages error handling.
**Details**:

1.  **Segmentation**:
    -   Splits the encrypted data into smaller chunks (segments) for transmission. For example:
        -   Segment 1: `e83a9b71c4c... (0–1024 bytes)`
        -   Segment 2: `d7a3f20a8d2... (1025–2048 bytes)`
2.  **Port Numbers**:
    -   Source Port: **Random ephemeral port** (e.g., 54001).
    -   Destination Port: **443** (for HTTPS).
3.  **Headers Added**:
    -   **Source Port**: 54001
    -   **Destination Port**: 443
    -   **Sequence Number**: Indicates the order of segments.
    -   **Acknowledgment Number**: Used for reliable delivery.

**Final Output from Transport Layer**:

```yaml
[Transport Layer Header]
- Source Port: 54001
- Destination Port: 443
- Sequence Number: 1001
- Acknowledgment Number: 0

[Data (Segmented, Encrypted)]
e83a9b71c4c...

```

# Layered Roles in a POST API Request

This document explains the roles of the Application Layer, Presentation Layer, and Transport Layer during a POST API request.

---

## **Application Layer**
- **Role**: Forms the HTTP request with headers, method, URL, and body.
- **Example in POST Request**:
  - **HTTP Method**: `POST`
  - **Headers**:
    ```
    Content-Type: application/json
    ```
  - **Body**:
    ```json
    {
      "username": "user123",
      "password": "mypassword"
    }
    ```

---

## **Presentation Layer**
- **Role**: Encodes the data into bytes, compresses it (if needed), and encrypts it for secure transmission.
- **Example in POST Request**:
  - **Data Encoding**:
    - JSON to Bytes: 
      ```
      7b2263757365726e616d65223a202275736572313233...
      ```
  - **Encryption**:
    - Encrypted Data: 
      ```
      e83a9b71c4c...
      ```

---

## **Transport Layer**
- **Role**: Splits the encrypted data into segments, adds port numbers, and ensures reliable delivery.
- **Example in POST Request**:
  - **Segmentation**:
    - Splits encrypted data into 1024-byte chunks.
  - **Port Numbers**:
    - **Source Port**: `54001` (random ephemeral port)
    - **Destination Port**: `443` (for HTTPS)

---

## Summary Table

| **Layer**         | **Role**                                                                                           | **Example in POST Request**                                                                                                  |
|--------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **Application**    | Forms the HTTP request with headers, method, URL, and body.                                       | - HTTP Method: `POST` <br> - Headers: `Content-Type: application/json` <br> - Body: `{ "username": "user123", "password": "mypassword" }` |
| **Presentation**   | Encodes the data into bytes, compresses it (if needed), and encrypts it for secure transmission.  | - JSON to bytes: `7b2263757365726e616d65223a202275736572313233...` <br> - Encrypted: `e83a9b71c4c...`                        |
| **Transport**      | Splits the encrypted data into segments, adds port numbers, and ensures delivery reliability.     | - Segmentation: Splits data into 1024-byte chunks. <br> - Source Port: `54001` <br> - Destination Port: `443`              |

---

## Notes
This process describes how data flows through the first three layers of the OSI model during a typical POST API request. Subsequent layers (Network, Data Link, and Physical) handle routing, framing, and physical transmission of data.
