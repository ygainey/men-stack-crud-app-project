const bcrypt = require('bcrypt')

module.exports = [
    {
        userName: "admin",
        password: bcrypt.hashSync('admin', 10),
        name: "admin",
        dOB: new Date('1990-01-01'),
        isAdmin: true,
        team: "HR",
        contact: 
            {
                email: "test@example.com",
                phone: 1234567890,
                address: "test",
                aboutMe: "test"
            }
        
    },
    {
        userName: "user",
        password: bcrypt.hashSync('user', 10),
        name: "user",
        dOB: new Date('1990-01-01'),
        isAdmin: false,
        team: "HR",
        contact: 
            {
                email: "test@example.com",
                phone: 1234567890,
                address: "test",
                aboutMe: "test"
            }
        
    },
    {
        userName: "johnDoe123",
        password: bcrypt.hashSync('pass', 10),
        name: "John Doe",
        dOB: new Date('1990-01-01'),
        isAdmin: true,
        team: "Engineer",
        contact: 
            {
                email: "john.doe@example.com",
                phone: 1234567890,
                address: "123 Elm Street, Anytown, USA",
                aboutMe: "I am an experienced software engineer."
            }
        
    },
    {
        userName: "janeSmith456",
        password: bcrypt.hashSync('pass', 10),
        name: "Jane Smith",
        dOB: new Date('1985-05-15'),
        isAdmin: false,
        team: "HR",
        contact: 
            {
                email: "jane.smith@example.com",
                phone: 9876543210,
                address: "456 Oak Street, Sometown, USA",
                aboutMe: "Passionate about employee relations and HR management."
            }
        
    },
    {
        userName: "aliceJohnson789",
        password: bcrypt.hashSync('pass', 10),
        name: "Alice Johnson",
        dOB: new Date('1992-03-22'),
        isAdmin: true,
        team: "Marketing",
        contact: 
            {
                email: "alice.johnson@example.com",
                phone: 1122334455,
                address: "789 Maple Street, Anycity, USA",
                aboutMe: "Creative marketing strategist."
            }
        
    },
    {
        userName: "bobBrown101",
        password: bcrypt.hashSync('pass', 10),
        name: "Bob Brown",
        dOB: new Date('1988-07-10'),
        isAdmin: false,
        team: "Operations",
        contact: 
            {
                email: "bob.brown@example.com",
                phone: 2233445566,
                address: "101 Pine Street, Somewhere, USA",
                aboutMe: "Dedicated operations manager."
            }
        
    },
    {
        userName: "carolWhite202",
        password: bcrypt.hashSync('pass', 10),
        name: "Carol White",
        dOB: new Date('1995-11-30'),
        isAdmin: true,
        team: "Engineer",
        contact: 
            {
                email: "carol.white@example.com",
                phone: 3344556677,
                address: "202 Birch Street, Hometown, USA",
                aboutMe: "Expert in frontend development."
            }
        
    },
    {
        userName: "daveBlack303",
        password: bcrypt.hashSync('pass', 10),
        name: "Dave Black",
        dOB: new Date('1991-04-18'),
        isAdmin: false,
        team: "HR",
        contact: 
            {
                email: "dave.black@example.com",
                phone: 4455667788,
                address: "303 Cedar Street, Anytown, USA",
                aboutMe: "Specialist in talent acquisition."
            }
        
    },
    {
        userName: "eveGreen404",
        password: bcrypt.hashSync('pass', 10),
        name: "Eve Green",
        dOB: new Date('1987-09-25'),
        isAdmin: true,
        team: "Marketing",
        contact: 
            {
                email: "eve.green@example.com",
                phone: 5566778899,
                address: "404 Walnut Street, Sometown, USA",
                aboutMe: "Experienced in digital marketing."
            }
        
    },
    {
        userName: "frankGrey505",
        password: bcrypt.hashSync('pass', 10),
        name: "Frank Grey",
        dOB: new Date('1993-12-05'),
        isAdmin: false,
        team: "Operations",
        contact: 
            {
                email: "frank.grey@example.com",
                phone: 6677889900,
                address: "505 Spruce Street, Anycity, USA",
                aboutMe: "Operations specialist with a focus on logistics."
            }
        
    },
    {
        userName: "graceBlue606",
        password: bcrypt.hashSync('pass', 10),
        name: "Grace Blue",
        dOB: new Date('1990-08-12'),
        isAdmin: true,
        team: "Engineer",
        contact: 
            {
                email: "grace.blue@example.com",
                phone: 7788990011,
                address: "606 Fir Street, Somewhere, USA",
                aboutMe: "Backend development and system architecture expert."
            }
        
    },
    {
        userName: "henryOrange707",
        password: bcrypt.hashSync('pass', 10),
        name: "Henry Orange",
        dOB: new Date('1989-06-20'),
        isAdmin: false,
        team: "HR",
        contact: 
            {
                email: "henry.orange@example.com",
                phone: 8899001122,
                address: "707 Redwood Street, Hometown, USA",
                aboutMe: "HR manager with a passion for people."
            }
        
    }
];

