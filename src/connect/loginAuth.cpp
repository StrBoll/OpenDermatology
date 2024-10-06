#include <pqxx/pqxx>
#include <iostream>
#include "loginAuth.h"

using namespace pqxx;
using namespace std;

bool userExists(string username){

    try {
        connection C("dbname=logins user=phillipboll3 password='NewPassword2024' host=localhost port=5432");


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
        }
        

    } catch (const exception &e){
        cerr << e.what() << endl;
    }


}