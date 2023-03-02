## Backend

Has 3 endpoints:
1. `http://localhost:8000/qrcode` - access it using the browser to see the qrcode
2. `http://localhost:8000/login` - validate email and password (when success will return the fakeUser)
3. `http://localhost:8000/otp/validate` - validate OTP(one time password)


## my-app

has 2 main cards on the page:
- Login, followed by 2FA
- 2FA to generate the token using the secret key (created by the backend)


## How to use it:
- the placeholder for the frontend is the fakeUser, if you just press login it will use the placeholder info to login
- insert the secret, generate by the backend to get the token and use it to successfully authenticate.

