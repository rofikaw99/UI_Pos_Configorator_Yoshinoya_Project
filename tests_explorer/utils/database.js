/**
   * Untuk run query SELECT pakai getValueDatabase atau getAllDatabase
   * Untuk run query INSERT, UPDATE, DELETE pakai queryDatabase
   * 
   * Penjelasan pemakaian function utils database
   * 1. getValueDatabase(serverName, dbName, query, columnName, callback)
   *        -> untuk mendapatkan satu value dari query
   *        -> balikan nya adalah value
   * 
   *    serverName: process.env.BEYONDREPORT_SERVER
   *    dbName: "AAB"
   *    query: querySELECT
   *    columnName: "POLICY_ID"
   * 
   * 2. getAllDatabase(serverName, dbName, query, callback)
   *        -> untuk mendapatkan beberapa kolom dari 1 baris di query
   *        -> balikan nya adalah array
   * 
   *    serverName: process.env.BEYONDREPORT_SERVER
   *    dbName: "AAB"
   *    query: querySELECT
   * 
   * 3. queryDatabase(serverName, dbName, query, callback)
   *        -> untuk run query INSERT, UPDATE, DELETE
   *        -> balikan nya adalah array
   * 
   *    serverName: process.env.BEYONDREPORT_SERVER
   *    dbName: "AAB"
   *    query: queryINSERT
   *
   * 4. getOneColumnDatabase(serverName, dbName, query, columnName, callback)
   *        -> untuk mendapatkan semua value dari satu kolom
   *        -> balikan nya adalah array
   * 
   *    serverName: process.env.BEYONDREPORT_SERVER
   *    dbName: "AAB"
   *    query: querySELECT
   *    columnName: "POLICY_ID"
   * 
   * =========================================
   * Contoh pemakaian function di test script:
   * 1. SELECT   
        await new Promise(function (resolve) {
            db.getValueDatabase(process.env.BEYONDREPORT_SERVER, "AAB", querySELECT, "POLICY_ID", function (value) {
               POLICY_ID = value;
               resolve(POLICY_ID);
            });
        });
        await new Promise(function (resolve) {        
            db.getAllDatabase(process.env.A2ISFINANCEDB_SERVER, "a2isFinanceDB", querySELECT2, function (value) {            
                POLICY_ID = value;            
                resolve(POLICY_ID);         
            });      
        });
     
        await new Promise(function (resolve) {
            db.getOneColumnDatabase(process.env.BEYONDMOSS_SERVER, "AABMobile", query, "MenuDesc", function (value) {
                menudesc = value;
                resolve(menudesc);
            });
        });
     
   * 2. INSERT
        await new Promise(function (resolve) {
            db.queryDatabase(process.env.BEYONDREPORT_SERVER, "AAB", queryINSERT, function (value) {
                resolve(value);
            });
        });
    
   * 3. UPDATE
        await new Promise(function (resolve) {
            db.queryDatabase(process.env.BEYONDREPORT_SERVER, "AAB", queryUPDATE, function (value) {
                resolve(value);
            });
        });
   
   * 4. DELETE
        await new Promise(function (resolve) {
            db.queryDatabase(process.env.BEYONDREPORT_SERVER, "AAB", queryDELETE, function (value) {
                resolve(value);
            });
        });
   */

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const Connection = require('tedious').Connection
const Request = require('tedious').Request
const {encode, decode} = require('node-encoder')


function connectDB(serverName, dbName, useColumnNames, callback) {
    let instanceName, user_name, pass;

    if(process.env.NODE_ENV=='staging'){
        instanceName = serverName.substring(8);
        serverName = serverName.substring(0,8);
        
        // Match server with username and pw
        if (serverName == process.env.BEYONDMOSS_SERVER.substring(0,8)) {
            user_name = process.env.BEYONDMOSS_USERNAME;
            pass = process.env.BEYONDMOSS_PASS;
        } else if (serverName == process.env.BEYONDREPORT_SERVER.substring(0,8)) {
            user_name = process.env.BEYONDREPORT_USERNAME;
            pass = process.env.BEYONDREPORT_PASS;
        } else if (serverName == process.env.BEYONDAPP_SERVER.substring(0,8)) {
            user_name = process.env.BEYONDAPP_USERNAME;
            pass = process.env.BEYONDAPP_PASS;
        } else if (serverName == process.env.BEYONDPA_SERVER.substring(0,8)) {
            user_name = process.env.BEYONDPA_USERNAME;
            pass = process.env.BEYONDPA_PASS;
        } else if (serverName == process.env.A2ISFINANCEDB_SERVER.substring(0,8)) {
            user_name = process.env.A2ISFINANCEDB_USERNAME;
            pass = process.env.A2ISFINANCEDB_PASS;
        }
    }
    else {
        // Match server with username and pw
        if (serverName == process.env.BEYONDMOSS_SERVER) {
            user_name = process.env.BEYONDMOSS_USERNAME;
            pass = process.env.BEYONDMOSS_PASS;
        } else if (serverName == process.env.BEYONDREPORT_SERVER) {
            user_name = process.env.BEYONDREPORT_USERNAME;
            pass = process.env.BEYONDREPORT_PASS;
        } else if (serverName == process.env.BEYONDAPP_SERVER) {
            user_name = process.env.BEYONDAPP_USERNAME;
            pass = process.env.BEYONDAPP_PASS;
        } else if (serverName == process.env.BEYONDPA_SERVER) {
            user_name = process.env.BEYONDPA_USERNAME;
            pass = process.env.BEYONDPA_PASS;
        } else if (serverName == process.env.A2ISFINANCEDB_SERVER) {
            user_name = process.env.A2ISFINANCEDB_USERNAME;
            pass = process.env.A2ISFINANCEDB_PASS;
        }
    }

    

    // Create connection to database
    let config = {
        server: serverName,  //update me
        authentication: {
            type: 'default',
            options: {
                userName: decode(user_name), //update me
                password: decode(pass)  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: false,
            database: dbName, //update me
            trustServerCertificate: true,
            useColumnNames: useColumnNames, //true untuk getValueDatabase & queryDatabase, false untuk getAllDatabase
            instanceName: instanceName
        }
    };

    return callback(config);
}

function getValueDatabase(serverName, dbName, query, columnName, callback) {
    connectDB(serverName, dbName, true, function (config) {
        let connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }

            // Read all rows from table
            request = new Request(query, function (err) {
                if (err) {
                    console.log(err)
                }

                connection.close();
            });

            request.on('row', function (columns) {
                let hasil;
                // Converting the response row to a JSON formatted object: [property]: value
                for (let name in columns) {
                    if (name.toLowerCase() == columnName.toLowerCase()) {
                        hasil = columns[name].value;
                        return callback(hasil);
                    }
                }
            });

            connection.execSql(request);
        });
        connection.connect();
    });
}

function getAllDatabase(serverName, dbName, query, callback) {
    connectDB(serverName, dbName, false, function (config) {
        const connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }

            // Read all rows from table
            request = new Request(query, function (err) {
                if (err) {
                    console.log(err)
                }

                connection.close();
            });

            request.on('row', function (columns) {
                let val = [];
                columns.forEach((column) => {
                    val[column.metadata.colName] = column.value;
                });

                return callback(val);
            });

            connection.execSql(request);
        });
        connection.connect();
    });
}

function queryDatabase(serverName, dbName, query, callback) {
    connectDB(serverName, dbName, true, function (config) {
        const connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }

            // Read all rows from table
            request = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err)
                }

                connection.close();
                return callback(rowCount);
            });

            connection.execSql(request);
        });
        connection.connect();
    });
}

function getOneColumnDatabase(serverName, dbName, query, columnName, callback) {
    connectDB(serverName, dbName, true, function (config) {
        let connection = new Connection(config);
        let val = [];

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }

            // Read all rows from table
            request = new Request(query, function (err) {
                if (err) {
                    console.log(err)
                }
                
                connection.close();
                return callback(val);
            });

            request.on('row', function (columns) {
                
                for (let name in columns) {
                    if (name.toLowerCase() == columnName.toLowerCase()) {
                        val.push(columns[name].value);
                    }
                }
            });
            
            connection.execSql(request);
        });
        connection.connect();
    });
}

module.exports = {
    getAllDatabase,
    getValueDatabase,
    connectDB,
    queryDatabase,
    getOneColumnDatabase
}