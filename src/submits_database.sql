CREATE TABLE user_submitted(
    UFID INT,
    LastName VARCHAR(255),
    FIrstName VARCHAR(255)
);

CREATE TABLE images_submitted(
    id SERIAL PRIMARY KEY,
    image_data BYTEA,
    filename varchar(255)
);