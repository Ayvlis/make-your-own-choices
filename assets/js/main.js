$(document).ready(function() {

  /* content of the checklist, simple json file */
  var dialogContent = {
    "first": {
      "label": "option 1",
      "content": {
        "first": {
          "label": "option 1.1",
          "content": "end for 1.1"
        },
        "second": {
          "label": "option 1.2",
          "content": "end for 1.2"
        },
        "third": {
          "label": "option 1.3",
          "content": "end for 1.3"
        }
      }

    },

    "second": {
      "label": "option 2",
      "content": "Brutal End"
    },

    "third": {
      "label": "option 3",
      "content": {
        "first": {
          "label": "option 3.1",
          "content": "end for 3.1"
        },
        "second": {
          "label": "option 3.2",
          "content": {
            "first": {
              "label": "option 3.2.1",
              "content": "end for 3.2.1"
            },
            "second": {
              "label": "option 3.2.2",
              "content": "end for 3.2.2"
            },
            "third": {
              "label": "option 3.2.3",
              "content": {
                "first": {
                  "label": "option 3.2.3.1",
                  "content": "I Finally End Too"
                },
                "second": {
                  "label": "option 3.2.3.2",
                  "content": "And in the End, I End"
                }
              }
            }
          }
        },
        "third": {
          "label": "option 3.3",
          "content": {
            "first": {
              "label": "option 3.3.1"
            },
            "second": {
              "label": "option 3.3.2"
            },
            "third": {
              "label": "option 3.3.3"
            }
          }
        },
        "fourth": {
          "label": "option 3.4"
        }
      }

    }
  };

  createList(dialogContent, ".dialog-body");

  var content = dialogContent; //where we are

  //  openDialog("#dialog");

  /* Get the button that opens the modal*/
  var btn = $(".report");

  /*the checked options history*/
  var checked, history = [];

  /*checking a checkbox */
  $(".my-radio").click(function() {

    checked = check(this);

  });

  /*move to next section */
  function next() {
    history.push(checked); //add the choice to the history

    /* get the current level in the json */
    if (history.length > 1) {
      for (var i = 0; i < history.length - 1; i++) {
        content = content[history[i]].content;
      }
    }

    var nextContent = content[history[history.length - 1]].content; //where we will go

    changeList(".dialog-body", nextContent); //next page

    content = dialogContent; //reset

  }

  /*back to the previous section */
  function back() {
    history.pop();
    if (history.length > 0) {
      for (var i = 0; i < history.length; i++) {
        content = content[history[i]].content;
      }
    }
    var previousContent = content;
    changeList(".dialog-body", previousContent);

    content = dialogContent;

  }

  function createList(array, elementIn) {
    var $dom = "<div class='content'><ul>";

    $.each(array, function(key, value) {
      $dom += "<li><label class='my-radio'><input type='radio' data-name=" + key + "><span class='fa fa-square-o'></span>" + value.label + "</label></li>";
    });
    $dom += "</ul></div>";
    $(elementIn).prepend($dom);
    $("input").prop("checked", false);

  }

  /*open the dialog on click*/
  btn.click(function() {
    openDialog("#dialog");

  });

  function openDialog(dialogId) {
    $(".dialog-body").empty();
    createList(dialogContent, ".dialog-body");
    $(".my-radio").click(function() {

      checked = check(this);

    });
    history = [];
    $("#dialog").dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Back": function() {
          back();
        },
        "Next": function() {
          next();
        }
      }

    });

    $("button").blur();

  }

  function check(input) {
    /*reset checkboxes */
    $("input").prop("checked", false);
    $(".fa-check-square-o").removeClass("checked").removeClass("fa-check-square-o").addClass("fa-square-o");

    /*check this*/
    $(input).find("input").prop("checked", true);
    $(input).find(".fa").toggleClass("fa-square-o").toggleClass("fa-check-square-o").toggleClass("checked");

    return $(input).find("input").attr("data-name");

  }

  function changeList(where, newContent) {
    var ul = where + " ul";
    $(ul).fadeOut("fast", function() {
      $(ul).remove();
      if (typeof newContent !== 'object') {
        $(where).prepend("<p class='end-par'>"+newContent+"</p>");
      } else {
        createList(newContent, where);
        $(".my-radio").click(function() {

          checked = check(this);

        });
      }

    });
  }

});