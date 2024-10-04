#include "db.h"
#include <pqxx/pqxx>
#include <iostream>
#include <string>


using namespace pqxx;
using namespace std;

bool insertImageDB(const char *image_binary, const char* file_name){
    try {
        connection C("dbname=submits_database user=your_local_user password='your_local_password' host=localhost port=5432");

        if (C.is_open()){

            work W(C);

            string command = "INSERT INTO images_submitted (image_data, file_name) VALUES " + image_binary + ", " + file_name + ";";

            W.exec(command);
            W.commit();

            return true;


        }
    }
    catch (const exception &e){
        cerr << e.what() << endl;
        return false;
    }


}

bool insertUserDB(int ufid, string first_name, string last_name){
    try {
        connection C("dbname=submits_database user=your_local_user password='your_local_password' host=localhost port=5432");



    }
    catch (const exception &e){
        cerr << e.what() << endl;
        return false;
    }

}
