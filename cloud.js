Parse.Cloud.define("testFunction", async (request) => {
    const query = new Parse.Query("testClass");
    query.equalTo("name", 'Mandar');
    const results = await query.find();

    return results;
});
