$(document).ready(function () {
  $(".draggable-field").draggable({
    helper: "clone",
    revert: "invalid",
    appendTo: "body",
    zIndex: 1000,
  });

  $("#preview-form").droppable({
    accept: ".draggable-field",
    drop: function (event, ui) {
      addFormField($(ui.helper).data("type"));
    },
  });

  function addFormField(type) {
    let field;
    switch (type) {
      case "checkbox":
      case "radio":
        field = $(
          `<div class='form-field'><label>${
            type.charAt(0).toUpperCase() + type.slice(1)
          }:</label>${Array.from(
            { length: 3 },
            (_, i) =>
              `<input type='${type}' required>${
                type.charAt(0).toUpperCase() + type.slice(1)
              } ${i + 1}`
          ).join(
            ""
          )}<div class='error-message'>This field is required</div></div>`
        );
        break;
      case "select":
        field = $(
          "<div class='form-field'><label>Dropdown:</label><select required>" +
            Array.from(
              { length: 3 },
              (_, i) =>
                `<option value='option${i + 1}'>Option ${i + 1}</option>`
            ).join("") +
            "</select><div class='error-message'>This field is required</div></div>"
        );
        break;
      default:
        field = $(
          `<div class='form-field'><label>${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Input:</label><input type='${type}' required><div class='error-message'>This field is required</div></div>`
        );
    }

    $("#preview-form").append(field);
  }

  $("#submit-btn").on("click", function () {
    if (validateForm()) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fill out all required fields.");
    }
  });

  function validateForm() {
    let isValid = true;
    $("#preview-form [required]").each(function () {
      const fieldValue = $(this).val();
      isValid = isValid && fieldValue.trim() !== "";
      $(this).next(".error-message").toggle(!isValid);
    });
    return isValid;
  }
});