Install NVM
------------

     nvm use # will use the version of node found in .nvmrc

.env

----
Create a copy of `env.example` and name it `.env`
Sensitive environment-specific variables will be stored here, such as
database name, user, and password

    cp env.example .env

Database
--------
  - Install and run postgresql (if necessary)
  - `createdb dk-theta-employee-info # remember this database name; you will place it in .env`
  - replace the dummy values in .env with the database name, user and password you used to create it

