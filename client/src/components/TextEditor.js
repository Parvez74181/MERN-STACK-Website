import { useEffect, useState, useCallback } from "react";
import Parser from "html-react-parser";

function TextEditor(props) {
  const [textEditor, setTextEditor] = useState(null);

  const customTag = useCallback(() => {
    let text_editor_input = document.querySelector(".text-editor-input");
    let text_editor_output = document.querySelector(".text-editor-output");
    let tagButton = document.querySelectorAll(".tag");
    let select = document.querySelectorAll(".select");
    let link = document.querySelector("#createlink");
    let img = document.querySelector("#insertimage");
    let addCode = document.querySelector(".add-code");

    const getLinkFromUser = () => {
      let userLink = prompt("Enter a URL");
      //if link has http of https
      if (/http/i.test(userLink) || /https/i.test(userLink)) {
        return userLink;
      } else {
        return (userLink = "http://" + userLink);
      }
    };

    link.addEventListener("click", () => {
      let linkId = getLinkFromUser();
      console.log(linkId);
      modifyText(link.id, false, linkId);
    });

    img.addEventListener("click", () => {
      let linkId = getLinkFromUser();
      linkId = linkId.split("/")[5];
      modifyText(
        "insertHTML",
        false,
        `<img src="https://drive.google.com/uc?export=view&id=${linkId}" loading='lazy' alt='${linkId}'/>`
      );
    });

    // storing the modifyed text into the textarea
    const outputText = () => {
      let main_edited_html = text_editor_input.innerHTML;
      text_editor_output.value = main_edited_html;
    };

    // for modifying text editor texts
    const modifyText = (command, defaultUi, value) => {
      document.execCommand(command, defaultUi, value); //execCommand executes command on selected text
      outputText();
    };
    if (props.data) {
      modifyText("insertHTML", false, props.data);
    }

    text_editor_input.addEventListener("keyup", outputText);

    // for all the tagButton, add an EventListener
    tagButton.forEach((button) => {
      button.addEventListener("click", () => {
        modifyText(button.id, false, null);
      });
    });

    // for font size, colors and headings
    select.forEach((button) => {
      button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
      });
    });
    // for add code button
    addCode.addEventListener("click", () => {
      let selection = document.getSelection();
      let selectedText = selection.getRangeAt(0);
      selectedText.commonAncestorContainer.removeAttribute("style"); // removing the attribute cause if code pasted then execCommand creates its own styling
      modifyText(
        "insertHTML",
        false,
        `<div class="code-block"><code>${selectedText.commonAncestorContainer.innerHTML}</code><i class="fa-solid fa-copy"><span class='copy-text'>copy</span></i></div>`
      );
    });
  }, [props.data]);

  useEffect(() => {
    customTag();
  }, [customTag]);

  const handleKeyDown = (e) => {
    setTextEditor(e.target.innerHTML);
  };
  return (
    <>
      <div>
        {/* bold */}
        <button title="bold" type="button" id="bold" className="btn m-2 tag">
          <i className="fa-solid fa-bold"></i>
        </button>
        {/* italic */}
        <button
          title="italic"
          type="button"
          id="italic"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-italic"></i>
        </button>
        {/* underline */}
        <button
          title="underline"
          type="button"
          id="underline"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-underline"></i>
        </button>
        {/* add code */}
        <button
          title="add code"
          type="button"
          id="code"
          className="btn m-2 add-code"
        >
          <i className="fa-solid fa-code"></i>
        </button>
        {/* superscript */}
        <button
          title="superscript"
          type="button"
          id="superscript"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-superscript"></i>
        </button>
        {/* subscript */}
        <button
          title="subscript"
          type="button"
          id="subscript"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-subscript"></i>
        </button>
        {/* <!-- List --> */}
        <button
          title="order list"
          type="button"
          id="insertOrderedList"
          className="btn m-2 tag"
        >
          <div className="fa-solid fa-list-ol"></div>
        </button>
        <button
          title="unorder list"
          type="button"
          id="insertUnorderedList"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-list"></i>
        </button>
        {/* <!-- Link --> */}
        <button
          title="add link"
          type="button"
          id="createlink"
          className="btn m-2 "
        >
          <i className="fa fa-link"></i>
        </button>
        {/* <!-- img --> */}
        <button
          title="add link"
          type="button"
          id="insertimage"
          className="btn m-2 "
        >
          <i className="fa-solid fa-image"></i>
        </button>
        {/* <!-- Alignment --> */}
        <button
          title="align left"
          type="button"
          id="justifyLeft"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button
          title="align center"
          type="button"
          id="justifyCenter"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-align-center"></i>
        </button>
        <button
          title="align right"
          type="button"
          id="justifyRight"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button
          title="justify"
          type="button"
          id="justifyFull"
          className="btn m-2 tag"
        >
          <i className="fa-solid fa-align-justify"></i>
        </button>
        {/* <!-- Headings --> */}
        <select title="heading" id="formatBlock" className="btn m-2 select">
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>
        {/* <!-- Font --> */}
        <select title="font size" id="fontSize" className="btn m-2 select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        {/* <!-- Color --> */}
        <input
          title="text color"
          type="color"
          id="foreColor"
          className="btn m-2 select "
        />
        <label htmlFor="foreColor">Font Color</label>
        <input
          title="highlighter"
          type="color"
          id="backColor"
          className="btn m-2 select "
        />
        <label htmlFor="backColor">Highlight Color</label>
      </div>
      {/* editor div */}
      <div className="form-floating">
        <div
          contentEditable="true"
          className="form-control px-3 text-editor-input"
          id="textEditor"
          name="desc"
          value={textEditor}
          onKeyDown={handleKeyDown}
          style={{ height: "300px" }}
        >
          {props.data ? Parser(`${props.data}`) : null}
        </div>
      </div>
      <textarea
        name="desc"
        className="text-editor-output"
        value={props.data ? props.data : null}
      ></textarea>
    </>
  );
}

export default TextEditor;
