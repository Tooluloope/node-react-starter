import { User } from "../resources/user/user.model";


export const SignUp = async (req, res) => {
    const {username, fullname, email, password} = req.body;
    if (!email || !password || !fullname || !username) {
        return res.status(400).send({ message: "All Fields are required" });
    }
    try {
        
        const user = await User.create(req.body);
        const token =  user.generateJWT();
        return res.status(201).send({ user, token });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(422).json(error);
        }
        return res.status(500).end("Error creating User");
    }
};


export const SignIn = async (req, res) => {
    const { email, password} = req.body;
    console.log(req.body);
    if (!email || !password ) {
        return res.status(400).send({ message: "All Fields are required" });
    }
    try {
        const user = await User.findOne({email}).exec();
        if (!user) {
            return res.status(401).end("Invalid User");
        }
        const match = await user.checkPassword(password);
        if (!match) {
            return res.status(401).send("Invalid Credentials");
        }
        const token =  user.generateJWT();
        return res.status(201).send({ user, token });
    } catch (error) {
        return res.status(500).end("Error validating user");
    }
};