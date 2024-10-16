CREATE TABLE user_submitted(
    UFID INT PRIMARY KEY,
    LastName VARCHAR(255),
    FIrstName VARCHAR(255)
);

CREATE TABLE images_submitted(
    id SERIAL PRIMARY KEY,
    image_data BYTEA,
    file_name VARCHAR(255),
    
);


