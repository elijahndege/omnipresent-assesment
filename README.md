## Backend Omnipresent Assessment

### Getting started (development enviroment) 👍👍👍

```bash
# 1. Clone the repository
git clone api

# 2. Enter your newly-cloned folder.
cd api

# 3. Install dependencies.
npm i

# 4. fill in development.env.example file and rename it to  development.env

# 6. Run development server 
npm run start:dev 
# access swagger api doc by opening http://localhost:3000
🥳🥳🥳

# 7. Run tests
 npm run test:e2e
```

### Endpoints 👍👍👍

```bash
# There are two company Id's {1,2} for this use case
GET http://localhost:3000/companies/{id}/employees
```