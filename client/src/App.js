import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import "../src/css/home.min.css";
import LoadingBar from "react-top-loading-bar";
import Axios from "axios";

const Register = lazy(() => import("./pages/Register"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const AllTutorials = lazy(() => import("./pages/AllTutorials"));
const AllUsers = lazy(() => import("./pages/AllUsers"));
const AllDocumentation = lazy(() => import("./pages/AllDocumentation"));
const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Tutorials = lazy(() => import("./pages/Tutorial"));
const PageNotfound = lazy(() => import("./pages/PageNotfound"));
const Footer = lazy(() => import("./components/Footer"));
const Blogs = lazy(() => import("./pages/Blogs"));
const SingleBlogPage = lazy(() => import("./pages/SingleBlogPage"));
const Login = lazy(() => import("./pages/Login"));
const Backend = lazy(() => import("./pages/Backend"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const CreateDocumentation = lazy(() => import("./pages/CreateDocumentation"));
const SingleDocumentationPage = lazy(() =>
  import("./pages/SingleDocumentationPage")
);
const CreateTutorials = lazy(() => import("./pages/CreateTutorials"));
const Documentations = lazy(() => import("./pages/Documentations"));
const TutorialSection = lazy(() => import("./pages/TutorialSection"));
const SingleTutorialSectionPage = lazy(() =>
  import("./pages/SingleTutorialSectionPage")
);
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const Analysis = lazy(() => import("./pages/Analysis"));

function App() {
  const [progress, setProgress] = useState(0);

  window.onload = async () => {
    // if any visitor visit this website then make a request to database and count visitiors
    try {
      await Axios.get("/visitorCount");
    } catch (e) {
      console.log(e);
    }
  };

  const routes = [
    { path: `/`, element: <Home progress={setProgress} /> },
    { path: `/blog`, element: <Blogs progress={setProgress} /> },
    {
      path: `/:path/search/:value`,
      element: <SearchResult progress={setProgress} />,
    },
    {
      path: `/search/:value`,
      element: <SearchResult progress={setProgress} />,
    },
    { path: `/tutorial`, element: <Tutorials progress={setProgress} /> },
    {
      path: `/tutorial/:data`,
      element: <TutorialSection progress={setProgress} />,
    },
    {
      path: `/documentation`,
      element: <Documentations progress={setProgress} />,
    },
    { path: `/about`, element: <About progress={setProgress} /> },
    {
      path: `/blog/:title/:_id`,
      element: <SingleBlogPage progress={setProgress} />,
    },
    {
      path: `/documentation/:title/:_id`,
      element: <SingleDocumentationPage progress={setProgress} />,
    },
    {
      path: `/tutorial/:title/:_id`,
      element: <SingleTutorialSectionPage progress={setProgress} />,
    },
    { path: `/login`, element: <Login progress={setProgress} /> },
    { path: `/register`, element: <Register progress={setProgress} /> },
    { path: `/backend`, element: <Backend progress={setProgress} /> },
    { path: `/create/blog`, element: <CreateBlog progress={setProgress} /> },
    {
      path: `/create/documentation`,
      element: <CreateDocumentation progress={setProgress} />,
    },
    {
      path: `/create/tutorials`,
      element: <CreateTutorials progress={setProgress} />,
    },
    { path: `/all-users`, element: <AllUsers progress={setProgress} /> },
    { path: `/all-blogs`, element: <AllBlogs progress={setProgress} /> },
    {
      path: `/all-tutorials`,
      element: <AllTutorials progress={setProgress} />,
    },
    {
      path: `/all-documentations`,
      element: <AllDocumentation progress={setProgress} />,
    },
    { path: `/analysis`, element: <Analysis progress={setProgress} /> },
    { path: `*`, element: <PageNotfound progress={setProgress} /> },
  ];

  return (
    <Router>
      <Navbar />
      <LoadingBar
        color="red"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Routes>
        {routes.map((item, i) => {
          return (
            <>
              <Route
                path={item.path}
                exact
                element={
                  <Suspense fallback={<>...</>}>{item.element}</Suspense>
                }
                key={i}
              ></Route>
            </>
          );
        })}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
