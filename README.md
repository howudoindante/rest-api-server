# REST API SERVER

### Stack : Node js + Express + MongoDB + mongoose + jsonwebtokens + bcrypt

API ENDPOINTS:

/login - login to account , response contains **token** <br>
/register - registration. Password is crypted in database.<br>
/users - user list from db, readeble only for admins.<br>
/changeRights - rights changing for users. acessable only for admins.<br>
