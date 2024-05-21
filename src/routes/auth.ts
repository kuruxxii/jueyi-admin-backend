import { Router, Request, Response, NextFunction } from "express";
import { signup, logout } from "../controllers/auth";
import passport from "passport";

const router = Router();

router.post("/signup", signup);
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

router.post("/logout", logout);

export default router;
