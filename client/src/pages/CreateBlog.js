import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import TextEditor from "../components/TextEditor";
import TagInputBox from "../components/TagInputBox";
import CategorieInput from "../components/CategorieInput";

function CreateBlog(props) {
  const [blogData, setBlogData] = useState({
    _id: "",
    heading: "Create Blog",
    thumbnail: "",
    title: "",
    desc: "",
    tags: "",
    category: "",
    buttonText: "Create",
  });

  const { progress } = props;
  const navigate = useNavigate();
  const location = useLocation();
  progress(0);

  // if admin click on the edit button then get data from the server
  const getBlog = async (_id) => {
    let res = await Axios(`/edit/blog/${_id}`);
    setBlogData({
      _id: _id,
      heading: "Edit Blog",
      thumbnail: res.data.thumbnail,
      title: res.data.title,
      desc: res.data.desc,
      tags: res.data.tags,
      category: res.data.category,
      buttonText: "Update",
    });

    location.state = null;
  };
  // if admin clicks on the edit post button then getting the state and setBlog
  if (location.state) {
    let _id = location.state._id;

    getBlog(_id);
  }

  useEffect(() => {
    document.title = "Create a new blog | Futurisers";
    progress(100);
  }, [progress]);

  // handle changes if any value is assinged
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBlogData({ ...blogData, [name]: value });
  };

  // submit form
  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const { title, thumbnail } = blogData;
      let desc = document.querySelector(".text-editor-output").value;
      let tagsDom = document.querySelectorAll(".tag-box span"); // getting the tag box span
      let tags = [];

      tagsDom.forEach((tag) => {
        tags.push(tag.innerText);
      });
      // for categories
      let category = document
        .querySelector(".selected-category-output")
        .value.split(","); // getting the category textarea value and split

      // make a Request to the server to save the data
      let res = await Axios.post(
        `${
          blogData.buttonText === "Update"
            ? `/update/${blogData._id}`
            : `/create`
        }/blog`,
        {
          thumbnail,
          title,
          desc,
          tags,
          category,
        }
      );

      if (res.status === 201 || res.status === 200)
        navigate("/blog", { state: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main>
        <form
          className="d-flex justify-content-center flex-column"
          onSubmit={createBlog}
        >
          <h1 className="h1 mt-5 ">{blogData.heading}</h1>
          <div className="mx-auto container-fluid row">
            <div className="container col-12 col-md-6 my-5 p-5">
              {/* thumbnail upload link */}
              <div className="form-floating my-5  mx-auto">
                <input
                  type="text"
                  name="thumbnail"
                  className="form-control ps-3"
                  id="floatingInput"
                  value={blogData.thumbnail}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Enter post thumbnail url..."
                />
                <label htmlFor="floatingInput">
                  Enter post thumbnail url...
                </label>
              </div>

              {/* title input box */}
              <div className="form-floating my-5">
                <input
                  type="text"
                  name="title"
                  className="form-control ps-3"
                  id="floatingInput"
                  value={blogData.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Enter post title..."
                />
                <label htmlFor="floatingInput">Enter post title...</label>
              </div>

              {/* descripton input box */}
              <TextEditor data={blogData.desc} />

              {/* sumit button */}
              <div className="row justify-content-md-center gap-2">
                <button type="submit" className="btn col-5 my-3">
                  {blogData.buttonText}
                </button>
              </div>
            </div>

            {/* tag and categories adding box */}
            <div className=" mx-auto container col-12 col-md-4 my-5 p-5 ">
              {/* tag input box */}
              <TagInputBox data={blogData.tags} />

              {/* category input box */}
              <CategorieInput component="blog" data={blogData.category} />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreateBlog;
