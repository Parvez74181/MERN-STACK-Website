import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import Axios from "axios";
import TagInputBox from "../components/TagInputBox";
import CategorieInput from "../components/CategorieInput";

function CreateDocumentation({ progress }) {
  const [documentationData, setDocumentationData] = useState({
    _id: "",
    heading: "Create Blog",
    thumbnail: "",
    title: "",
    desc: "",
    tags: "",
    category: "",
    buttonText: "Create",
  });

  const navigate = useNavigate();
  const location = useLocation();

  progress(0);

  useEffect(() => {
    document.title = "Create documentation | Futurisers";
    progress(100);
  }, [progress]);

  // if admin click on the edit button then get data from the server
  const getDocumentation = async (_id) => {
    let res = await Axios(`/edit/documentation/${_id}`);

    setDocumentationData({
      _id: _id,
      heading: "Edit Documentation",
      thumbnail: res.data.thumbnail,
      title: res.data.title,
      desc: res.data.desc,
      tags: res.data.tags,
      category: res.data.category,
      tutorialSection: res.data.tutorialSection,
      buttonText: "Update",
    });

    location.state = null;
  };
  // if admin clicks on the edit post button then getting the state and setBlog
  if (location.state) {
    let _id = location.state._id;
    getDocumentation(_id);
  }
  // to hendle the changes of input fields and set data into the state
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDocumentationData({ ...documentationData, [name]: value });
  };

  // submit form
  const createDocumentation = async (e) => {
    e.preventDefault();
    try {
      const { title } = documentationData; // destructuring title from the documentationData
      // for tags
      let tagsDom = document.querySelectorAll(".tag-box span"); // getting the tag box span
      let tags = [];
      tagsDom.forEach((tag) => {
        tags.push(tag.innerText);
      });

      // for categories
      let category = document
        .querySelector(".selected-category-output")
        .value.split(","); // getting the category textarea value and split

      let res = await Axios.post(
        `${
          documentationData.buttonText === "Update"
            ? `/update/${documentationData._id}`
            : `/create`
        }/documentation`,
        {
          title,
          desc: document.querySelector(".text-editor-output").value,
          tags,
          category,
        }
      );
      //  if the documentation has created or update sumitted then navigate to the documentation page
      if (res.status === 201 || res.status === 200)
        navigate("/documentation", { state: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <main>
        <form
          className="d-flex justify-content-around flex-column"
          onSubmit={createDocumentation}
        >
          {/* heading */}
          <h1 className="h1 text-center mt-5">{documentationData.heading}</h1>
          <div className=" mx-auto container-fluid row">
            <div className="container col-12 col-md-6 my-5 p-5">
              {/* title input box */}
              <div className="form-floating my-5">
                <input
                  type="text"
                  name="title"
                  className="form-control ps-3"
                  id="floatingInput"
                  value={documentationData.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Enter post title..."
                />
                <label htmlFor="floatingInput">Enter post title...</label>
              </div>
              {/* descripton input box */}
              <TextEditor data={documentationData.desc} />

              {/* submit button */}
              <div className="d-grid ">
                <button type="submit" className="btn  my-3">
                  {documentationData.buttonText}
                </button>
              </div>
            </div>

            <div className=" mx-auto container col-12 col-md-4 my-5 p-5 ">
              {/* tag adding box */}
              <TagInputBox data={documentationData.tags} />
              {/* category selectin div */}
              <CategorieInput
                component="documentation"
                data={documentationData.category}
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreateDocumentation;
