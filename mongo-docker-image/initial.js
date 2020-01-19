db.createUser(
        {   user: "myuser",
            pwd: "myuser",
            roles:[{role: "readWrite" , db:"mydb"}]});