#include <pqxx/pqxx>
#include <iostream>


using namespace pqxx;
using namespace std;

bool userExists(string username){

    try {
        connection C("dbname=logins user=yourusername password='yourpassword' host=localhost port=5432");


        if (C.is_open()){

            nontransaction N(C);

            string command = "SELECT * FROM LOGINS WHERE username_ = " + username + ";";

            result results(N.exec(command));

            if (results.empty()){
                cout << "user could not be found" << endl;
                return false;
            } else {
                return true;
            }


            return false; 
        }
        

    } catch (const exception &e){
        cerr << e.what() << endl;
        return false; 
    }


}