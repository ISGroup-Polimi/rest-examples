# REST services

Collection of examples used in the Process and Service Design course. Some of this examples are used in combination with the executable processes in https://github.com/ISGroup-Polimi/bpmn-examples

The examples are based on
- OpenAPI (https://www.openapis.org)
- Node js (https://nodejs.org/en)

Although the examples are based on nodejs, as long as the OpenAPI description is respected, the services can be implemented with your preferred programming language. 

## Code generation

To create the stub the oas-tools is used 
https://www.npmjs.com/package/@oas-tools/core

``npx @oas-tools/cli init``

to run the service, open the terminal to the `src` directory and execute the command `npm start`

All the examples are set to listen to port 8080. If you need to run more than one ot the same time, change the server port in the `index.js` files.

## Postman client

For each service a collection of Postman requests is available under the `postman` folder

## Security aspects

Some examples adopt a security mechanism based on JWT to authenticated and allow the invocation of the methods. To run this example is required to have a IAM. 

### Setup Keycloak
We suggest the use of Keycloak (https://www.keycloak.org) and, in particular, the docker deployment (https://www.keycloak.org/getting-started/getting-started-docker) that can be started with the following command.

It is assumed that the master realm is used. 

```
docker run -p 9090:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.0 start-dev
```

Keycloak is set to listen to port 9090 to avoid conflicts with the REST services that are set listen to port 8080.

Login to the Keycloak UI

```
http://localhost:9090/admin/master/console/
```

Few configurations are needed to setup keycloak to work the provided examples

- Create new *User* (Users > Add user) specifying the username (e.g., `john`)

- Open the User details of the newly created user and open the Credential panel to set the password (e.g., `doe`)

- Create new *Client* (Clients > Create client ) with Client ID set to `rest-service-client` and `Direct access grants` is checked

It is also suggested to extend the validity time of the tokens. Go to Realm Settings > Tokens and then to the block Access Tokens > Access Token Lifespan. Here set the minutes. 

### Obtain a JWT token

Having this configuration, it is possible to obtain a token with the following command

```
curl -s \
      http://localhost:9090/realms/master/protocol/openid-connect/token \
      -d 'grant_type=password' -d 'client_id=rest-service-client' \
      -d 'username=john' -d 'password=doe'
```

### Obtain the IAM public-key (via keycloak GUI)

Go to http://localhost:9090/admin/master/console/

Select Realm settings > Keys

Click on Public Key button for the RSA256, copy the key, and update the `public.pem` (leave `-----BEGIN PUBLIC KEY----- and -----END PUBLIC KEY-----`)


### Obtain the IAM public-key (via CLI)[*]

Go to `http://jwt.io` and cut and paste the token. Take note of the 'kid' (key identifier) in the sidebar on the right.

Open the page `http://localhost:18080/auth/realms/master/protocol/openid-connect/certs`

Look for the entry with the kid equal to the one associated to the token, and copy the `x5c` field. 

Generate the public key with the following commands

```
cert= value of the x5c...
```

```
cat <<EOF > cert.pem
-----BEGIN CERTIFICATE-----
${cert}
-----END CERTIFICATE-----
EOF
```

```
openssl x509 -in cert.pem -pubkey -noout
```

cut and paste the variable and put inthe public.pem file here

[*] procedure taken from https://stackoverflow.com/questions/51337425/keycloak-retrieve-rsa-public-key

