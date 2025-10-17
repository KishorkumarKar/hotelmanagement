const config={
    port:process.env.PORT || 2005,
    db_connection:process.env.CONNECTION_STRING || "",
    version:"V1",
    check_in_time:process.env.CHECK_IN_TIME || 11,       //in hour
    check_out_time:process.env.CHECK_OUT_TIME || 10,      //in hour
    route:{
        hotel:"hotel",
        room:"room",
        roomType:"roomtype",
        book:"book",
        customer:"customer",
    }
};

export default config;