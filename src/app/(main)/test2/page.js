import React from 'react'


export default () => {

    const json = {
        "total_students": 86,
        "students": [
            { "scan_index": 1, "name": "KIRAN", "rank": "1", "class": "M.A. (POL.)" },
            { "scan_index": 2, "name": "BHARTI", "rank": "1", "class": "M.Sc. (Phy.)" },
            { "scan_index": 3, "name": "ANTIM", "rank": "1", "class": "M.COM" },
            { "scan_index": 4, "name": "NANCY", "rank": "1", "class": "M.Com." },
            { "scan_index": 5, "name": "NISHU", "rank": "1", "class": "M.Sc. (BOT)" },
            { "scan_index": 6, "name": "VARSHA RANI", "rank": "1", "class": "M.COM" },
            { "scan_index": 7, "name": "PRIYA", "rank": "1", "class": "M.A. (Pol. Sci.)" },
            { "scan_index": 8, "name": "DEEPIKA", "rank": "1", "class": "M.A. (Pol. Sci.)" },
            { "scan_index": 9, "name": "KHUSHBU", "rank": "1", "class": "M.A. (His.)" },
            { "scan_index": 10, "name": "UJJWAL", "rank": "1", "class": "M.A. (Eng.)" },
            { "scan_index": 11, "name": "PAYAL", "rank": "1", "class": "M.A. (Eng.)" },
            { "scan_index": 12, "name": "KAVITA", "rank": "1", "class": "M.A. (POL.)" },
            { "scan_index": 13, "name": "KALPANA", "rank": "2", "class": "M.Sc. (Phy.)" },
            { "scan_index": 14, "name": "PRIYANKA", "rank": "2", "class": "M.Sc.(Geo.)" },
            { "scan_index": 15, "name": "TANNU", "rank": "2", "class": "M.A (ECO.)" },
            { "scan_index": 16, "name": "RITIKA", "rank": "2", "class": "M.Sc. (Zoo.)" },
            { "scan_index": 17, "name": "KHUSHBU", "rank": "2", "class": "M.A (ECO.)" },
            { "scan_index": 18, "name": "NISHU", "rank": "2", "class": "M.Sc. (ZOO.)" },
            { "scan_index": 19, "name": "JANVI", "rank": "2", "class": "M.A (Eco.)" },
            { "scan_index": 20, "name": "RONAK", "rank": "2", "class": "M.COM" },
            { "scan_index": 21, "name": "NAVIT", "rank": "3", "class": "M.A(ENG.)" },
            { "scan_index": 22, "name": "NIDHI", "rank": "3", "class": "M.Sc (PHY)" },
            { "scan_index": 23, "name": "SUSHMA", "rank": "3", "class": "M.A. (Eng.)" },
            { "scan_index": 24, "name": "ARUN", "rank": "3", "class": "M.Sc.(Comp.Sci.)" },
            { "scan_index": 25, "name": "JYOTI", "rank": "3", "class": "M.A(Pol.Sci.)" },
            { "scan_index": 26, "name": "RISHAB SHARMA", "rank": "3", "class": "M.COM" },
            { "scan_index": 27, "name": "PRIYA", "rank": "3", "class": "M.Sc. (Phy.)" },
            { "scan_index": 28, "name": "SONU", "rank": "3", "class": "M.Com" },
            { "scan_index": 29, "name": "KHUSHBU", "rank": "3", "class": "M.Sc. (Geo.)" },
            { "scan_index": 30, "name": "JANVI SONI", "rank": "3", "class": "M.A (Eco.)" },
            { "scan_index": 31, "name": "DEEPIKA", "rank": "4", "class": "M.Sc. (Zoo.)" },
            { "scan_index": 32, "name": "EKTA", "rank": "4", "class": "M.Sc. (Math)" },
            { "scan_index": 33, "name": "ALKA DHILLON", "rank": "4", "class": "M.Sc. (Phy.)" },
            { "scan_index": 34, "name": "SANVI", "rank": "4", "class": "M.Sc. (Phy.)" },
            { "scan_index": 35, "name": "MUSKAN", "rank": "4", "class": "M.Sc. (CHE)" },
            { "scan_index": 36, "name": "SUNIL", "rank": "4", "class": "M.A (ECO.)" },
            { "scan_index": 37, "name": "KHUSHI", "rank": "5", "class": "M.Sc. (PHY)" },
            { "scan_index": 38, "name": "PRIYANKA", "rank": "5", "class": "M.Sc. (BOT.)" },
            { "scan_index": 39, "name": "PREETI YADAV", "rank": "5", "class": "M.A (Eco.)" },
            { "scan_index": 40, "name": "BHAWNA", "rank": "5", "class": "M.Sc.(Phy.)" },
            { "scan_index": 41, "name": "RAHUL K.", "rank": "5", "class": "M.Sc. (MATHS)" },
            { "scan_index": 42, "name": "ANKIT", "rank": "5", "class": "M.A (SKT.)" },
            { "scan_index": 43, "name": "MONIKA", "rank": "5", "class": "M.Sc.(BOT.)" },
            { "scan_index": 44, "name": "MAHAK", "rank": "5", "class": "M.Sc. (Phy.)" },
            { "scan_index": 45, "name": "KAMLESH", "rank": "5", "class": "M.Sc.(GEO)" },
            { "scan_index": 46, "name": "ANNU", "rank": "6", "class": "M.A (Eco.)" },
            { "scan_index": 47, "name": "POOJA", "rank": "6", "class": "M.Sc. (ZOO)" },
            { "scan_index": 48, "name": "RAKHI", "rank": "6", "class": "M.Sc. (Maths)" },
            { "scan_index": 49, "name": "RISHWA", "rank": "6", "class": "M.Sc. (Phy.)" },
            { "scan_index": 50, "name": "KIRAN YADAV", "rank": "6", "class": "M.Sc. (Chem.)" },
            { "scan_index": 51, "name": "LATA", "rank": "6", "class": "M.COM" },
            { "scan_index": 52, "name": "MONIKA", "rank": "6", "class": "M.Sc (Bot.)" },
            { "scan_index": 53, "name": "BHARTI", "rank": "6", "class": "M.A(ENG.)" },
            { "scan_index": 54, "name": "PRIYANKA", "rank": "6", "class": "M.Com" },
            { "scan_index": 55, "name": "NEHA", "rank": "7", "class": "M.Sc. (BOT.)" },
            { "scan_index": 56, "name": "MONIKA", "rank": "7", "class": "M.Sc. (BOT)" },
            { "scan_index": 57, "name": "RAHUL", "rank": "7", "class": "M.COM" },
            { "scan_index": 58, "name": "PREETI", "rank": "7", "class": "M.A. (Eco.)" },
            { "scan_index": 59, "name": "NISHA", "rank": "7", "class": "M.Sc. (Zoo.)" },
            { "scan_index": 60, "name": "ISHA KUMARI", "rank": "7", "class": "M.Sc (Chem.)" },
            { "scan_index": 61, "name": "PRIYA", "rank": "8", "class": "M.Sc (Bot.)" },
            { "scan_index": 62, "name": "ARCHANA", "rank": "8", "class": "M.Sc. (MATHS)" },
            { "scan_index": 63, "name": "SONIYA", "rank": "8", "class": "M.A. (His.)" },
            { "scan_index": 64, "name": "PRIYANKA", "rank": "8", "class": "M.Sc. (CHE)" },
            { "scan_index": 65, "name": "PRIYANKA", "rank": "8", "class": "M.A(SKT.)" },
            { "scan_index": 66, "name": "ARUNA", "rank": "8", "class": "M.Sc (CHE.)" },
            { "scan_index": 67, "name": "PREETI", "rank": "8", "class": "M.Sc. (ZOO.)" },
            { "scan_index": 68, "name": "NIDHI", "rank": "9", "class": "M.Sc. (BOT.)" },
            { "scan_index": 69, "name": "HIMANSHU", "rank": "9", "class": "M.Sc. (BOT.)" },
            { "scan_index": 70, "name": "JYOTI", "rank": "9", "class": "M.Sc (PHY)" },
            { "scan_index": 71, "name": "PUSHPA", "rank": "9", "class": "M.A.(Pol.)" },
            { "scan_index": 72, "name": "VARSHA", "rank": "9", "class": "M.Sc. (MATHS)" },
            { "scan_index": 73, "name": "BULBUL", "rank": "9", "class": "M.Sc. (MATHS)" },
            { "scan_index": 74, "name": "AARTI", "rank": "9", "class": "M.A(POL.SCI.)" },
            { "scan_index": 75, "name": "ANKITA YADAV", "rank": "9", "class": "M.COM" },
            { "scan_index": 76, "name": "RITU", "rank": "9", "class": "M.Sc. (Chem.)" },
            { "scan_index": 77, "name": "SHIKHA", "rank": "10", "class": "M.Sc (PHY)" },
            { "scan_index": 78, "name": "ANSHU", "rank": "10", "class": "M.Sc. (Zoo.)" },
            { "scan_index": 79, "name": "KIRAN", "rank": "10", "class": "M.Sc. (Phy.)" },
            { "scan_index": 80, "name": "NEHA SAINI", "rank": "10", "class": "M.Com" },
            { "scan_index": 81, "name": "MANSI BALWAN", "rank": "10", "class": "M.Sc. (Phy.)" },
            { "scan_index": 82, "name": "JYOTI", "rank": "10", "class": "M.A(POL.SCI.)" },
            { "scan_index": 83, "name": "MUSKAN", "rank": "10", "class": "M.Sc. (BOT.)" },
            { "scan_index": 84, "name": "POOJA", "rank": "10", "class": "M.Com" },
            { "scan_index": 85, "name": "PREETI", "rank": "10", "class": "M.Sc. (ZOO.)" },
            { "scan_index": 86, "name": "PRIYANKA", "rank": "10", "class": "M.Sc. (BOT.)" }
        ]
    }
    return (
        <div className="w-full">
            <div className="imported-block my-2">
                <header className="mb-10 text-center">
                    <h1 className="text-2xl font-normal tracking-tight mb-2">&nbsp;</h1>
                </header>

                <main className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-[1400px] mx-auto">
                    {json.students.map((student, index) => (
                        <div key={student.scan_index || index} className="student-card">
                            <div className="student-img-container">
                                <img
                                    className="student-img"
                                    src={"https://admin.yaduvanshigroup.edu.in/uploads/college-top/top-10-pg/" + student.scan_index + ".jpg"}
                                    alt={student.name}
                                />
                            </div>
                            <div className="student-info">
                                <div className="student-name">
                                    {student.name}
                                </div>
                                <div className="student-meta">
                                    RANK: <span className="student-highlight">{student.rank}</span>
                                </div>
                                <div className="student-meta">
                                    Class: <span className="student-highlight">{student.class}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    )
}
