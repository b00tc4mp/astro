import { generateToken } from "../utils/jwt.js";
//login controller
const postSessions = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).send({mensaje: "Invalidate user"});
        } 
        const token = generateToken(req.user); 
        res.cookie('jwtCookie', token, {
          maxAge: 43200000 
        });
        res.status(200).send ({token}); 
      } catch (error) {
        res.status(500).send({mensaje: `Error login session ${error}`});
      };
};
//controllador de registro
const registerPost = async (req,res) => {
  try {
      if (!req.user) {
          return res.status(409).send({mensaje:`User already exists`});
      }
            return res.status(200).send({mensaje: "User Created"});
        
  } catch (error) {
      res.status(500).send({mensaje: `Create user error ${error}`});
  };
}

const getCurrentSessions = async (req, res) => {
    res.status(200).send({ mensaje: req.user });  
};

const getLogout = async (req, res) => {
  try {
      if (req.session) {
          await req.session.destroy();
          res.clearCookie('jwtCookie');
          res.status(200).send({ resultado: 'Session logout' });
          //   res.redirect("/static/signin");
      } else {
          res.status(400).send({ error: 'No session register' });
      }
  } catch (error) {
      res.status(500).send({ error: 'Server internal error logout' });
  };
};

const sessionController = {
    postSessions,
    getCurrentSessions,
    getLogout,
    registerPost,
};

export default sessionController;

