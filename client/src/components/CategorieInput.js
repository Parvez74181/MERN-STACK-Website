import { useState, useEffect, useCallback } from "react";
import Axios from "axios";

function CategorieInput(props) {
  let { component, data } = props; // in here, component means which type of category will fetch from the server

  const [selectedCategory, setSelectedCategory] = useState([]); // for selected categories
  const [userCategory, setUserCategory] = useState([]); // for showing categories from server from the reference databse documents
  // add a New category basis on the input filed, but this will not save on the database if they are not selected as a category
  const addNewCategory = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let value = e.target.value;
      setUserCategory([...userCategory, userCategory.push(value.trim())]); // push data to the array state
      setUserCategory([...new Set(userCategory)]); // creating a new array basis o every uniqu data and set into state
      e.target.value = null;
    }
  };
  // catetgorie selection
  const selectCategory = (e) => {
    let value = e.target.innerText;
    // toggol "selected" class between the selected span
    e.target.classList.contains("selected")
      ? e.target.classList.remove("selected")
      : e.target.classList.add("selected");

    /*
          if a category has been selected then remove it
          or
          if it is not selected then add
    */
    let index = selectedCategory.indexOf(value);
    selectedCategory.includes(value)
      ? selectedCategory.splice(index, 1)
      : setSelectedCategory([...selectedCategory, value]);
  };
  // getting categories from server
  const getCategories = useCallback(async () => {
    if (!data) {
      try {
        let res = await Axios.get(`/category/${component}`);
        let resData = res.data.category;
        resData.forEach((item) => {
          // let categories = [];
          if (component === "tutorialSection") {
            let categories = item.tutorialSection;
            console.log(resData);
            setUserCategory([...userCategory, userCategory.push(categories)]); // push data to the array state
            setUserCategory([...new Set(userCategory)]); // creating a new array basis on every unique data and set into state
          } else {
            let categories = item.category;

            categories.forEach((category) => {
              setUserCategory([...userCategory, userCategory.push(category)]); // push data to the array state
              setUserCategory([...new Set(userCategory)]); // creating a new array basis on every unique data and set into state
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [component]);

  useEffect(() => {
    if (data) {
      setUserCategory(data);
      setSelectedCategory(data);
      return;
    }
    getCategories();
  }, [getCategories, data]);

  return (
    <>
      <div className="my-5 category-container container  rounded-3">
        <h5 className="h5 text-light">Add category</h5>
        <div className="select-box p-2 px-3 d-flex justify-content-between align-items-center rounded-2">
          Select Category <span className="dropdown-icon"></span>
        </div>
        <div
          className="form-select d-flex flex-column mt-1"
          size="3"
          name="category"
        >
          {/* categories */}
          {userCategory.map((category, i) => {
            return (
              <>
                <span
                  key={i}
                  onClick={selectCategory}
                  className="p-2 rounded-2 select-categorie"
                >
                  {category}
                </span>
              </>
            );
          })}
        </div>
        <input
          type="text"
          className="form-control mt-3 py-2"
          placeholder="add another category"
          // value={newCategory}
          onKeyDown={(e) => {
            addNewCategory(e);
          }}
        ></input>
        <textarea
          className="selected-category-output d-none"
          value={selectedCategory}
        ></textarea>
      </div>
    </>
  );
}

export default CategorieInput;
