$(function () {
  const uiData = {};
  let network = null;
  
  uiData.layers = [];
  uiData.network = "fc";
  uiData.rebuild = true;
  
  $("#add-button").click(function () {
    switch (uiData.network) {
      case "fc":
        let outDims = new Number($("input[name=output-dim]").val());
        uiData.layers.push({
          type: "fc",
          dims: outDims
        });
        appendTensor("Fully Connected", [outDims]);

        $("input[name=output-dim]").val("");
        updateMdl();

        if (outDims == 10) {
          $("#train-button").removeAttr("disabled");
        } else {
          $("#train-button").attr("disabled", "disabled");
        }

        break;
      case "cnn":
        break;
      case "ops":
        break;
    }

  });

  $("#train-button").click(function () {
    if(uiData.rebuild){
        uiData.rebuild = false;
        model = window.ml.createModel(uiData.layers);
    }
    for (let i = 1; i < 10; i++) {
      setTimeout(() => {
        window.ml.train(model);
        window.ml.predict(model);
      }, 100 * i);
    }
  });

  $('ul[for="choice-button"] .mdl-menu__item').click(function () {
    uiData.network = $(this).attr("value");
  });

  function appendTensor(name, dim, icon = "keyboard_arrow_down") {
    const base = $("#input-tensor").clone().removeAttr("id");
    base.find(".tensor-name").text(name);
    base.find(".tensor-dims").text(dim.join("x"));
    base.find(".material-icons").text(icon);

    $("#tensor-list").append(base);
  }

  function updateMdl() {
    $(".mdl-textfield").each((index, e) => {
      e.MaterialTextfield.change();
    })
  }
});
