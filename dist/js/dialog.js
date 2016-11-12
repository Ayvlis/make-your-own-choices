function choicesDialog(dialogContent) {

  createList(dialogContent, ".dialog-body");

  //  openDialog("#dialog");

  /* Get the button that opens the modal*/
  var btn = $(".trigger");

  /*open the dialog on click*/
  btn.click(function() {
    openDialog("#dialog", dialogContent);

    /* set up the checkboxes listeners */
    var checked = 0;
    $(".my-radio").click(function() {
      checked = check(this);
    });

  });
  
}

function changeList(where, newContent, checked) {
  var ul = where + " ul";
  $(ul).fadeOut("fast", function() {
    $(ul).remove();
    if (typeof newContent !== 'object') {
      $(where).prepend("<p class='end-par'>"+newContent+"</p>");
    } else {
      createList(newContent, where);
    }

  });
}

function createList(array, elementIn) {
  var $dom = "<div class='content'><ul>";

  $.each(array, function(key, value) {
    $dom += "<li><label class='my-radio'><input type='radio' data-name=" + key + "><span class='fa fa-square-o'></span>" + value.label + "</label></li>";
  });
  $dom += "</ul></div>";
  $(elementIn).prepend($dom);
  $("input").prop("checked", false);

  $(".my-radio").click(function() {

    checked = check(this);

  });

}


/*checking a checkbox */
function check(input) {
  /*reset checkboxes */
  $("input").prop("checked", false);
  $(".fa-check-square-o").removeClass("checked").removeClass("fa-check-square-o").addClass("fa-square-o");

  /*check this*/
  $(input).find("input").prop("checked", true);
  $(input).find(".fa").toggleClass("fa-square-o").toggleClass("fa-check-square-o").toggleClass("checked");

  return $(input).find("input").attr("data-name");

}


function openDialog(dialogId, JSONcontent) {
  var history = [],
     content = JSONcontent; //where we are

     $(".dialog-body").empty();
     createList(JSONcontent, ".dialog-body");
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
          back(checked, history, content, JSONcontent);
          checked = 0;
        },
        "Next": function() {
          if(checked != 0) {
            next(checked, history, content, JSONcontent);
            checked = 0;
          }
        }
      }

    });

     $("button").blur();

   }

   /*back to the previous section */
   function back(checked, history, content, JSONcontent) {
    history.pop();
    if (history.length > 0) {
      for (var i = 0; i < history.length; i++) {
        content = content[history[i]].content;
      }
    }
    var previousContent = content;
    changeList(".dialog-body", previousContent, checked);

    content = JSONcontent;

  }


  /*move to next section */
  function next(checked, history, content, JSONcontent) {
    history.push(checked); //add the choice to the history

    /* get the current level in the json */
    if (history.length > 1) {
      for (var i = 0; i < history.length - 1; i++) {
        content = content[history[i]].content;
      }
    }

    var nextContent = content[history[history.length - 1]].content; //where we will go

    changeList(".dialog-body", nextContent, checked); //next page

    content = JSONcontent; //reset


  }