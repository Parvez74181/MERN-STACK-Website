import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import Axios from "axios";
import TagInputBox from "../components/TagInputBox";
import CategorieInput from "../components/CategorieInput";

function CreateTutorials({ progress }) {
  const navigate = useNavigate();
  const location = useLocation();
  progress(0);
  const [tutorialData, setTutorialData] = useState({
    _id: "",
    heading: "Create Tutorial",
    thumbnail: "",
    title: "",
    desc: "",
    tags: "",
    category: "",
    tutorialSection: "",
    buttonText: "Create",
  });
  useEffect(() => {
    document.title = "Create tutorial | Futurisers";
    progress(100);
  }, [progress]);

  // if admin click on the edit button then get data from the server
  const getTutorial = async (_id) => {
    let res = await Axios(`/edit/tutorial/${_id}`);

    setTutorialData({
      _id: _id,
      heading: "Edit Tutorial",
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
    getTutorial(_id);
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTutorialData({ ...tutorialData, [name]: value });
  };

  // submit form
  const createTutorial = async (e) => {
    e.preventDefault();
    try {
      const { title } = tutorialData; // destructuring title from the documentationData
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

      // for tutorial section
      let tutorialSection = document.querySelector(
        ".tutorial-section-adding-box .selected-category-output"
      ).value; // getting the category textarea value

      let res = await Axios.post(
        `${
          tutorialData.buttonText === "Update"
            ? `/update/${tutorialData._id}`
            : `/create`
        }/tutorial`,
        {
          title,
          desc: document.querySelector(".text-editor-output").value,
          tags,
          category,
          tutorialSection,
        }
      );

      //  if the documentation has created then navigate to the documentation page
      if (res.status === 201 || res.status === 200)
        navigate("/tutorial", { state: true });
    } catch (e) {
      console.log(e);
    }
  };

  // tutorialSectionAddingBox
  let tutorialSectionAddingBox = document.querySelector(
    ".category-container:last-child"
  );
  if (tutorialSectionAddingBox) {
    let h5 = tutorialSectionAddingBox.querySelector(".h5");
    h5.innerText = "Add Tutorial Section";
    tutorialSectionAddingBox.classList.add("tutorial-section-adding-box");
  }

  return (
    <>
      <main>
        <form
          className="d-flex justify-content-around flex-column"
          onSubmit={createTutorial}
        >
          <h1 className="h1 mt-5">{tutorialData.heading}</h1>
          <div className=" mx-auto container-fluid row">
            {/* heading */}

            <div className="container col-12 col-md-6 my-5 p-5">
              {/* title input box */}
              <div className="form-floating my-5">
                <input
                  type="text"
                  name="title"
                  className="form-control ps-3"
                  id="floatingInput"
                  value={tutorialData.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Enter post title..."
                />
                <label htmlFor="floatingInput">Enter post title...</label>
              </div>
              {/* descripton input box */}
              <TextEditor data={tutorialData.desc} />

              {/* submit button */}
              <div className="d-grid ">
                <button type="submit" className="btn  my-3">
                  {tutorialData.buttonText}
                </button>
              </div>
            </div>

            <div className=" mx-auto container col-12 col-md-4 my-5 p-5 ">
              {/* tag adding box */}
              <TagInputBox data={tutorialData.tags} />
              {/* category selection div */}
              <CategorieInput
                component="tutorial"
                data={tutorialData.category}
              />

              <CategorieInput component="tutorialSection" />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreateTutorials;
