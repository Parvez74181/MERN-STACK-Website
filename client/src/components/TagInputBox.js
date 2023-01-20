import { useState, useEffect } from "react";

function TagInputBox(props) {
  const [tags, setTags] = useState([]); // for storing the tags first and then save the tags into documentationData

  // for adding tags into the tag box
  const addTag = (e) => {
    if (e.key === "Enter") e.preventDefault();
    if (e.key === " ") {
      let value = e.target.value;
      if (value === " ") return;
      setTags([...tags, value.trim()]);

      e.target.value = null;
    }
  };

  useEffect(() => {
    // this method will execute when admin click on the edit button
    if (props.data) {
      setTags(props.data);
    }
  }, [props.data]);

  // for removing tags
  const removeTag = (e) => {
    let span = e.target.parentElement;
    const index = tags.indexOf(span.innerText);
    tags.splice(index, 1);
    console.log(tags);
    setTags([...tags]);
  };

  return (
    <>
      <div className="tag-container container p-3 rounded-3">
        <h5 className="h5">Enter Tags :</h5>
        <div className="tag-box d-flex flex-wrap my-3">
          {tags.map((tag, i) => {
            return (
              <>
                <span className="m-1 d-flex text-light" key={i}>
                  {tag}
                  <i
                    className="d-flex justify-content-center align-items-center fa-solid fa-xmark ms-2 my-auto rounded-5 remove-tag"
                    onClick={removeTag}
                  ></i>
                </span>
              </>
            );
          })}
        </div>
        {/* tag input box */}
        <input
          className="form-control ps-2 mt-1"
          type="text"
          name="tags"
          placeholder="tag1 tag2"
          onKeyPress={addTag}
        ></input>
      </div>
    </>
  );
}

export default TagInputBox;
