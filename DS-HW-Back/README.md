| Instalations | site |
|-----:|-----------|
|     MongoDB:| https://www.mongodb.com/try/download/community)https://www.mongodb.com/try/download/community|
|     Node| https://nodejs.org/en    |

# Running Back and Front for the first time
We need to run `npm install` on the frontend and the backend.

## After initial instalation
The database was created after running the backend, after that you can continue and add the `Role` and the `User `.

## ROLE
Add this on MongoDB - hw-calibration - roles:

``` JSON
{
  "_id": {
    "$oid": "64da7e24734f1bd82fafc013"
  },
  "role": "ADMIN_ROLE",
  "createPermissions": [],
  "updatePermissions": [],
  "deletePermissions": [],
  "readPermissions": [],
  "priority": "p1",
  "__v": 0
}
```


## USER
Add this on MongoDB - hw-calibration - user: You need change firstName, LastName and Email, the password is set as '123456' (don't touch the password)

``` JSON
{
  "_id": {
    "$oid": "64deeb29467d93a9f6e35b26"
  },
  "firstName": "TuNombre",
  "lastName": "TuApellido",
  "email": "tuemail@dominio.com",
  "password": "$2a$10$Yf1vzD8Y/2/ULyX4.dVgg.cs.A0ixjUA9BKZCFwgZrGddXLo1miDq",
  "role": {
    "$oid": "64da7e24734f1bd82fafc013"
  },
  "entryDate": {
    "$date": "2023-08-17T05:00:00.000Z"
  },
  "birthDate": {
    "$date": "2001-08-15T06:00:00.000Z"
  },
  "attachments": [],
  "status": true,
  "__v": 0
}
```


