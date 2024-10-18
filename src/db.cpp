#include "db.h"
#include <pqxx/pqxx>
#include <iostream>
#include <string>


using namespace pqxx;
using namespace std;

bool insertImageDB(const char *image_binary, size_t image_size, string file_name){
    try {
        connection C("your login info");

        if (C.is_open()){

            work W(C);

            string command = "INSERT INTO images_submitted (image_data, file_name) VALUES ($1, $2);";

            W.exec_params(command, binarystring(image_binary, image_size), file_name);
            W.commit();

            cout << "Image submitted to database" << endl;
            return true;


        } else {
            cout << "Couldn\'t connect to database, insertImageDB();";
        }
    }
    catch (const exception &e){
        cerr << e.what() << endl;
        return false;
    }


}

bool insertUserDB(int ufid, string first_name, string last_name){
    try {
        connection C("your login info");

        if (C.is_open()){
        work W(C);

        string command = "INSERT INTO user_submitted (UFID, LastName, FirstName) VALUES ($1, $2, $3);";

        W.exec_params(command, ufid, first_name, last_name);
        W.commit();

        cout << "User submitted to database" << endl;
        return true;

        } else {
            cout << "Couldn\'t connect to database, insertUserDB();";
        }          
    
    } catch (const exception &e){
        cerr << e.what() << endl;
        return false;
    }

}
