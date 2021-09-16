Installation:
1. npm install or yarn install
2. convert sample.env to .env
3. npm run dev for development running
4. npm start to build to production
5. npm run test to runa unit tests


API:

POST auth/register:
    {
        "email": "rxa@live.com",
        "password": "password2020@",
        "first_name":"Tessa",
        "last_name":"Bond",
        "gender": "F"
    }

POST auth/login:
    {
        "email": "rxarinze@live.com",
        "password": "password2020@"
    }

POST transaction/fund-wallet:
    Authorization Bearer Scheme
    {
        "amount": 600000,
        "description": "Deposit from PayPal"    
    }

POST transaction/transfer:
    Authorization Bearer Scheme
    {
        "user": "rxa@live.com",
        "amount": 490000,
        "description": "Payment for services rendered"
    }

Get transaction/balance
    Authorization Bearer Scheme

Get transaction/:page
    Authorization Bearer Scheme


