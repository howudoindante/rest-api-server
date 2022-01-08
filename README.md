# REST API SERVER

### Stack : Node js + Express + MongoDB + mongoose + jsonwebtokens + bcrypt

API ENDPOINTS:

/login - login to account , response contains **token**
/register - registration. Password is crypted in database.
/users - user list from db, readeble only for admins
/changeRights - rights changing for users. acessable only for admins.
