CREATE TABLE login_info (
    account_number INT PRIMARY KEY,
    username_ VARCHAR(255),
    password_ VARCHAR(255),
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    

);