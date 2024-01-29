var GLvar = {
  data: [],
  file: [],
};

function populateTable() {
  var i,
    str = "";
  const regex = /(.+)+(\.csv)/;

  $(".metadata-button").removeClass("hide");

  console.log(GLvar.file.name.match(regex)[1]);

  // Populate Header
  $("#title").html(GLvar.file.name.match(regex)[1]);

  // Grab the keys to populate table head
  str += "<th>Rows</th>";
  str += "<th>File Name</th>";
  str += "<th>Size</th>";
  $("#metaData-head").html(str);
  str = "";

  str += "<td>" + GLvar.data.length + "</td>";
  str += "<td>" + GLvar.file.name + "</td>";
  str += "<td>" + GLvar.file.size / 1000 + " KB</td>";
  $("#metaData-body").html(str);
  str = "";

  // Grab the keys to populate table head
  str += "<th>Row</th>";

  for (let [key, value] of Object.entries(GLvar.data[0])) {
    str += "<th>" + key + "</th>";
  }
  $("#dataView-head").html(str);
  str = "";

  // Populate table body
  i = 0;
  GLvar.data.forEach((element) => {
    str += "<tr><td>" + ++i + "</td>";
    for (let [key, value] of Object.entries(element)) {
      str += "<td>" + value + "</td>";
    }
    str += "</tr>";
  });
  $("#dataView-body").html(str);
}

// convert csv to json
function csvJSON(csvText) {
  let lines = [];
  const linesArray = csvText.split("\n");
  // for trimming and deleting extra space
  linesArray.forEach((e) => {
    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ",").trim();
    lines.push(row);
  });
  // for removing empty record
  lines.splice(lines.length - 1, 1);
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return result;
}

function loadContent() {
  const [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();
  console.log(file);
  reader.addEventListener(
    "load",
    () => {
      console.log("results=" + reader.result);
      if (reader.result != "") {
        GLvar.data = csvJSON(reader.result);
        GLvar.file = file;
        populateTable();
      }
    },
    false
  );
  if (file) {
    reader.readAsText(file);
  }
}

function toggleMetadata() {
  $("#metaData").toggle("fast", function () {
    var text = $("#toggleMetadata").text();
    $("#toggleMetadata").text(
      text.indexOf("Show") > -1 ? "Hide Meta Data" : "Show Meta Data"
    );
  });
}
