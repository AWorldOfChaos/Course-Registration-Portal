const  client  =  require("../configs/database");

exports.student_details = async (req, res) => {
    var ID = req.session.message
    try {
        // Checking if user already exists
        const data  =  await client.query(`SELECT * FROM student WHERE ID=$1;`, [ID]); 
        const courses = await client.query("SELECT takes.semester, takes.year, STRING_AGG(course.title,', ') AS Courses FROM student JOIN takes ON student.ID=takes.ID JOIN course ON  takes.course_id=course.course_id WHERE student.ID=$1 GROUP BY (semester, year) ORDER BY year;",[ID])
        const course_list = courses.rows
        const arr  =  data.rows;
        if (arr.length  ===  0) {
            return  res.status(400).json({
                error: "ID not present. Please try again",
            });
        }
        else if (arr.length === 1) {
            return res.status(200).json({"student_details" : arr, "courses" : course_list});
        }
    }
    // Database connection error
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", 
        });
    };
}
