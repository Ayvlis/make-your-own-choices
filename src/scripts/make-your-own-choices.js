function choicesDialog(dialogContent) {
  /*open the dialog*/
  openDialog("#myoc-dialog", dialogContent);
  
}

function openDialog(dialogId, JSONcontent) {
  /*keep track of the choices and the content*/
  var history = [],
      content = JSONcontent; 

    /* "re"opening the dialog will restart the path */
     $(".myoc-dialog__body").empty(); 
     createList(JSONcontent, ".myoc-dialog__body");
     
     /*inizialize the checkbox listeners*/
    $(".my-radio").click(function() {
      checked = check(this);
    });

    /*open jQuery dialog*/
     $("#myoc-dialog").dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        /*navigation buttons*/
        "Back": function() {
          /*back to the previous section*/
          back(history, content, JSONcontent);
          /*reset checkboxes*/
          checked = 0;
        },
        "Next": function() {
          if(checked != 0) {
            /*move to the nex section*/
            next(checked, history, content, JSONcontent);
            /*reset checkboxes*/
            checked = 0;
          }
        }
      }

    });

    /*remove focus from the buttons*/
    $('.ui-dialog button').blur();


   }


  /*back to the previous section */
  function back(history, content, JSONcontent) {
    /*remove last choice from history*/
    history.pop();

    /*reach the current content*/
    if (history.length > 0) {
      for (var i = 0; i < history.length; i++) {
        content = content[history[i]].content;
      }
    }

    var previousContent = content;
    
    /*move to the next section*/
    changeList(".myoc-dialog__body", previousContent);

    /*reset current content*/
    content = JSONcontent;

  }


  /*move to next section */
  function next(checked, history, content, JSONcontent) {
    /*add new choice to the history*/
    history.push(checked);

    /* get the current level in the json */
    if (history.length > 1) {
      for (var i = 0; i < history.length - 1; i++) {
        content = content[history[i]].content;
      }
    }

    var nextContent = content[history[history.length - 1]].content;

    /*move to the next section*/
    changeList(".myoc-dialog__body", nextContent, checked);

    /*reset current content*/
    content = JSONcontent;

  }


  /*remove the old checkbox list and add the new one*/
  function changeList(where, newContent) {
    /*remove old checkbox list*/
    var container = where + " .content";
    $(container).fadeOut("fast", function() {
      $(container).remove();

      /*add new checkbox list or add the final content*/
      if ($.type(newContent) === 'string') {
        $(where).append("<div class='content'><p class='end-par'>"+newContent+"</p></div>");
      } else {
        createList(newContent, where);
      }

      /*remove focus from the buttons*/
      $('.ui-dialog button').blur();

    });
  
  }


  /*DOM elements for the new list from the json object*/
  function createList(array, elementIn) {

    /*create the container*/
    var $dom = "<div class='content'><ul>";

    /*add the options*/
    $.each(array, function(key, value) {
      $dom += "<li><label class='my-radio'><input type='radio' data-name=" + key + "><span class='fa fa-square-o'></span>" + value.label + "</label></li>";
    });

    $dom += "</ul></div>";

    /*add the list to the DOM*/
    $(elementIn).prepend($dom);

    /*reset the checkboxes*/
    $("input").prop("checked", false);

    /*inizialize the new listeners*/
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

    /*return the selected option*/
    return $(input).find("input").attr("data-name");

  }