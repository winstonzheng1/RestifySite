import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../Home"
import NewRestaurant from "../NewRestaurant";
import Signup from "../Signup"
import Navbar from "../Navbar"
import Login from "../Login"
import EditProfile from "../EditProfile";
import ChangePassword from "../ChangePassword";
import Feed from "../Feed";
import MyRestaurant from "../MyRestaurant";
import EditRestaurant from "../EditRestaurant";
import AddMenu from "../AddMenu";
import AboutPage from "../RestaurantTabs/AboutPage";
import MenuPage from "../RestaurantTabs/MenuPage";
import BlogPage from "../RestaurantTabs/BlogPage";
import CommentPage from "../RestaurantTabs/CommentsPage";
import AdminPage from "../RestaurantTabs/AdminPage";
import CreateBlogPost from "../CreateBlogPost";
import BlogPostPage from "../BlogPostPage";
import EditMenu from "../EditMenu"
import Comment from "../Comment";
import PostComment from "../PostComment";
import Restaurant from "../Restaurant";
import AboutPageGeneral from "../RestaurantTabsGeneral/AboutPage";
import BlogPageGeneral from "../RestaurantTabsGeneral/BlogPage";
import CommentPageGeneral from "../RestaurantTabsGeneral/CommentsPage";
import MenuPageGeneral from "../RestaurantTabsGeneral/MenuPage";
//Remove comment and postcomment routes later
//Overall needs fixing here

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="newrestaurant" element={<NewRestaurant/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="editprofile" element={<EditProfile/>}/>
                    <Route path="changepassword" element={<ChangePassword/>}/>
                    <Route path="feed" element={<Feed/>}/>
                    <Route path="myrestaurant" element={<MyRestaurant/>}>
                            <Route path="about" element={<AboutPage/>}/>
                            <Route path="menu" element={<MenuPage/>}/>
                            <Route path="blog" element={<BlogPage/>}/>
                            <Route path="comments" element={<CommentPage/>}/>
                            <Route path="admin" element={<AdminPage/>}/>
                            <Route path="createpost" element={<CreateBlogPost/>}/>
                            <Route path="editrestaurant" element={<EditRestaurant/>}/>
                            <Route path="addmenu" element={<AddMenu/>}/>
                            <Route path="editmenu" element={<EditMenu/>}/>
                    </Route>
                    <Route path="post" element={<BlogPostPage/>}/>
                    <Route path="addmenu" element={<AddMenu/>}/>
                    <Route path="editmenu" element={<EditMenu/>}/>
                    <Route path="comment" element={<Comment/>}/>
                    <Route path="postcomment" element={<PostComment/>}/>
                    <Route path="restaurants/:restId" element={<Restaurant/>}>
                        <Route path="about" element={<AboutPageGeneral/>}/>
                        <Route path="blog" element={<BlogPageGeneral/>}/>
                        <Route path="comments" element={<CommentPageGeneral/>}/>
                        <Route path="menu" element={<MenuPageGeneral/>}/>
                    </Route>




            </Routes>
        </BrowserRouter>
    )
}

export default Router