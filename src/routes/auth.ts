import { Router, Request, Response, NextFunction } from "express";
import { signup, logout } from "../controllers/auth";
import passport from "passport";

const router = Router();

// router.post("/signup", signup);
/*
The (req, res, next) at the end of the passport.authenticate function call is necessary for immediately invoking the middleware function returned by passport.authenticate. 
*/
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      // Handle error during authentication process
      return res.status(500).json({
        error: err.message,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        // Handle error during login process
        res.status(500).json({
          error: err.message,
        });
      }
      // Successful authentication
      res.status(200).json({ admin: user.username });
    });
  })(req, res, next);
});
router.get("/status", (req: Request, res: Response) => {
  req.user
    ? res.status(200).json({ isAuthenticated: true, admin: req.user.username })
    : res.status(401).json({ isAuthenticated: false });
});
router.post("/logout", logout);

export default router;
