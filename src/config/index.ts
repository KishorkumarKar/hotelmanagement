const config={
    port:process.env.PORT || 2005,
    db_connection:process.env.CONNECTION_STRING || "",
    version:"V1",
    route:{
        hotel:"hotel",
        room:"room",
    }
};

export default config;