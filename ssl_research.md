Reflection Questions - HTTPS Implementation
1. What is the difference between HTTP and HTTPS?
HTTP (Hypertext Transfer Protocol) sends data in plain text between the client and server, meaning anyone who intercepts the communication can read the information being transmitted. This includes sensitive data like passwords, personal information, and API responses.

HTTPS (HTTP Secure) encrypts all data using TLS/SSL before sending it over the internet. Even if someone intercepts the communication, they can only see encrypted data that appears as gibberish without the decryption keys. This protects user privacy and data integrity.

2. What role does the private key play in the HTTPS configuration?
The private key is the foundation of HTTPS security. It works with the certificate to establish an encrypted connection. The private key:

Decrypts incoming data that was encrypted with the corresponding public key (found in the certificate)

Proves the server's identity to clients

Must be kept secret - if compromised, anyone can impersonate the server

Is used to establish the secure TLS handshake when a client first connects

3. What information is stored in the certificate?
The certificate contains:

Subject Information: Who the certificate belongs to (e.g., CN=localhost)

Public Key: The public half of the encryption key pair

Issuer: Who issued the certificate (for self-signed, this is the same as the subject)

Validity Period: Start and end dates (e.g., 365 days)

Subject Alternative Names (SAN): Domain names and IPs the certificate is valid for (e.g., DNS:localhost, IP:127.0.0.1)

Digital Signature: A cryptographic hash to verify the certificate hasn't been tampered with

4. Why does the browser warn users about self-signed certificates?
Browsers warn about self-signed certificates because:

No trusted third party verified the certificate's authenticity

The certificate was issued by you, not a recognized Certificate Authority (CA)

Browsers can't verify that the server is legitimate (could be a hacker impersonating your site)

There's no way to revoke the certificate if it's compromised

It's a security feature to protect users from potential man-in-the-middle attacks

The browser is saying: "I can't confirm this server is who it claims to be, so proceed with caution."

5. Did HTTPS change the API routes or only the connection protocol?
HTTPS changed only the connection protocol, not the API routes.

Routes remain the same: /, /about, /health, /games, /games/:id, /games (POST)

Request methods remain the same: GET, POST

Request/response structure remains the same: JSON format unchanged

Status codes remain the same: 200, 201, 400, 404, 500

The only difference is that requests now use https:// instead of http://

HTTPS operates at the transport layer - it's like putting your existing API messages into a secure envelope before sending them.

6. Why must privatekey.pem not be committed to GitHub?
The private key must never be committed to GitHub because:

Anyone with the private key can impersonate your server - they could run a fake GameVault server and trick users

Encryption is compromised - all encrypted traffic could be decrypted

Security breach - it's like giving away the keys to your house

GitHub will send security alerts if it detects private keys in repositories

Cannot be "un-done" - once exposed, you must generate a completely new key and certificate

The private key is the most sensitive security asset - it should never leave your local machine.

7. Why is disabling certificate verification acceptable only for controlled local testing?
Disabling certificate verification is acceptable for local testing because:

Controlled environment: You know exactly what server you're connecting to (your own localhost)

Development purposes: Self-signed certificates are intended for testing, not production

No real users/data are at risk during development

You personally generated the certificate, so you know it's legitimate

Disabling verification in production is dangerous because:

You could be connecting to a malicious server impersonating your API

Man-in-the-middle attacks become possible

User data could be intercepted and stolen

It defeats the entire purpose of HTTPS security

8. What would need to change before GameVault could use HTTPS in production?
For production HTTPS, the following would need to change:

Obtain a Certificate from a Trusted CA:

Use services like Let's Encrypt (free), DigiCert, Comodo, etc.

The certificate would be signed by a recognized authority

Browsers would automatically trust it

Use a Real Domain Name:

Instead of localhost, use something like api.gamevault.com

The certificate would be issued to your actual domain

Configure Production Environment:

Different environment variables for production

Different port (usually 443 for HTTPS)

NODE_ENV=production

Consider Using a Reverse Proxy:

Tools like Nginx or Apache often handle SSL termination

This separates concerns and improves performance

Set Up Automatic Renewal:

Certificates expire (typically 90 days for Let's Encrypt)

Automated renewal scripts would be needed

Additional Security Headers:

HSTS (HTTP Strict Transport Security)

CSP (Content Security Policy)

Other security headers for production