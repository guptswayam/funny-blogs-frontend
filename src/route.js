import homepage  from "./components/Homepage";
import blogView from "./components/BlogView";
import signin from "./components/Signin";
import signup from "./components/Signup"
import account from "./components/Account"
import addBlog from "./components/addBlog"

export const routes= [
    { path: "/", component: homepage, name: "home-page"},
    { path: "/blogs", component: blogView, name: "blog-view"},
    { path: "/signin", component: signin, name: "signin"},
    { path: "/signup", component: signup, name: "signup"},
    { path: "/profile", component: account, name: "account"},
    { path: "/addBlog", component: addBlog, name: "add-blog"},
    { path : "*", redirect: "/"}
]