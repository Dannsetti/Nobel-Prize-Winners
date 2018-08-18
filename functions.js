// Get the info from the json doc
function getFile(url) {
  "use strict";
  var jsFile = new XMLHttpRequest();
  jsFile.open("GET", url, false);
  jsFile.send(null);
  return jsFile.responseText;
}

// Load the select dropbox options with the categories elements from the json doc  
function load() {
  var txt = "";
  var upper = "";
  var xmlDoc = getFile("nobel.json");
  var jsonss = JSON.parse(xmlDoc);
  txt += "<select id=mySelect>";
  txt += "<option selected=selected disabled=disabled>Choose</option>";
  for (i in jsonss.prizes) {
    if (upper.includes(jsonss.prizes[i].category) === false) {
      upper += jsonss.prizes[i].category;
      txt += "<option>" + jsonss.prizes[i].category[0].toUpperCase() + jsonss.prizes[i].category.slice(1);
    }
  }
  txt += "</select>";
  document.getElementById("selForm").innerHTML = txt;
}

// Get the selection from the dropbox and return the value
function getSelectedField(index) {
  var s = document.getElementById("mySelect");
  var t = s.options[s.selectedIndex].text;
  var low = t[0].toLowerCase() + t.slice(1)
  document.getElementById("demo").innerHTML = low;
  return low
}


// Get the year typed to filter the search
function yearField() {
  var selYear = document.getElementById("yearRange").value;
  // If the year typed is not a number or dont have 4 digits
  if (selYear != "") {
    if (isNaN(selYear) || selYear.length !== 4) {
      alert("Input not valid. Please Provide a 4 digit year");
    }
  }
  return selYear
}


// here Get field from share form
function shareField() {
  var selShare = document.getElementById("shareRange").value;
  // If the share typed is not a number
  if (selShare != "") {
    if (isNaN(selShare)) {
      alert("Input not valid. Please provide a number");
    }
  }
  return selShare
}
  

// Get the Name SubString Characters
function nameField() {
  var selName = document.getElementById("winnerName").value;
  // If the SubString typed is not an alphabetical character
  if (selName != "") {
    if (!isNaN(selName)) {
      alert("Input not valid. Only letters Allowed");
    }
  }
  return selName
}


// Function that print the table on demand
// There is a condition for all the 4 filter possibilities
// First the program check which fields were used to filter the resul (category, year, share, name)
// Then there is a condition for every condition combination entered by the user.
// I tried to use some other concise method like filter and so on but the outputs were not the expected
// So my solution was to use this huge block to satisfy all the combinations.
// I could keep trying to make it smaller but as it is working smootly I decided to leave like this. 
function printFinalTable() {
  
  // First I create the head of the table
  var x = "<table id=myTable>";
  x += "<tr>";
  var xmlDoc = getFile("nobel.json");
  var jsonss = JSON.parse(xmlDoc);
  x += "<th> Year </th>";
  x += "<th> Category </th>";
  x += "<th> First name </th>";
  x += "<th> Surname </th>";
  x += "</tr>";
  document.getElementById("results").innerHTML = x + "</table>"; 
  
  // Iniciate the row index counter 
  var rowIndex = 0;
  var table = document.getElementById("myTable");
  
  // The following are to check and return true if the filer fields were used
  var catSelector = getSelectedField(this.index);
  var catSelectorFlag = false;
  if (catSelector != "choose") {
    catSelectorFlag = true;
  }
  
  var yearSelection = yearField();
  var yearSelrange = document.getElementById("yRangeOption").value;
  var yearSelectionFlag = false;
  if (yearSelection !== "") {
    yearSelectionFlag = true;
  } else {
    yearSelectionFlag = false;
  }
  
  var shareSelection = shareField();
  var shareSelrange = document.getElementById("sRangeOption").value;
  var shareSelectionFlag = false;
  if (shareSelection !== "") {
    shareSelectionFlag = true;
  } else {
    shareSelectionFlag = false;
  }
  
  
  var nameSelection = nameField();
  var nameSelToLow = nameSelection.toLowerCase();
  var nameSelectionFlag = false;
  if (nameSelection !== "") {
    nameSelectionFlag = true;
  } else {
    nameSelectionFlag = false;
  }
  
  
  // Here is where the for loop through the Json file starts
  for (i in jsonss.prizes) {
    rowIndex += 1;
    // Initiate the variable row to insert the resuls
    var row = table.insertRow(rowIndex);
    
    //nested for loop to find all the required output 
    for (j in jsonss.prizes[i].laureates) {
      
      // Initiation of vars to handle the name matches
      var firstName = jsonss.prizes[i].laureates[j].firstname;
      var firstNameToLow = firstName.toLowerCase();
      var surName = jsonss.prizes[i].laureates[j].surname;
      var surnameToLow = surName.toLowerCase();
      
      // Here is where the conditions starts 
      // If it matches any of the input combinations it builds the table.
      if (catSelectorFlag === true && yearSelectionFlag === true && shareSelectionFlag === true && nameSelectionFlag === true) {
        
        if (jsonss.prizes[i].category === catSelector && (jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=")) && (jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "=")) && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">" && shareSelrange === ">") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<" && shareSelrange === "<") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
        
      
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if ((yearSelrange === "<" && shareSelrange === ">") || (yearSelrange === ">" && shareSelrange === "<") || (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) || (yearSelrange === ">" && (shareSelrange === "=" || shareSelection === "Choose")) || ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") || ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === "<")) {
          if (yearSelrange === "<" && shareSelrange === ">") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && shareSelrange === "<") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === "<") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {

              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === true && shareSelectionFlag === true && nameSelectionFlag === false) {
        if (jsonss.prizes[i].category === catSelector &&  (jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=")) && (jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "="))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">" && shareSelrange === ">") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<" && shareSelrange === "<") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            //row = table.insertRow(rowIndex);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if ((yearSelrange === "<" && shareSelrange === ">") || (yearSelrange === ">" && shareSelrange === "<") || (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) || (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) || ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") || ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === "<")) {
          if (yearSelrange === "<" && shareSelrange === ">") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && shareSelrange === "<") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === "<") {
            if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection) {
        
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === true && shareSelectionFlag === false && nameSelectionFlag === true) {
        if (jsonss.prizes[i].category === catSelector && (jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=")) && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === false && shareSelectionFlag === true && nameSelectionFlag === true) {
        if (jsonss.prizes[i].category === catSelector && (jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "=")) && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (shareSelrange === ">") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (shareSelrange === "<") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
        
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === true && shareSelectionFlag === true && nameSelectionFlag === true) {
        if (jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=") && jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "=") && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
                  
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">" && shareSelrange === ">") {
          if (jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<" && shareSelrange === "<") {
          if (jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
             
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if ((yearSelrange === "<" && shareSelrange === ">") || (yearSelrange === ">" && shareSelrange === "<") || (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) || (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) || ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") || ((yearSelrange === "=" || yearSelrange === "Choose" ) && shareSelrange === "<")) {
          if (yearSelrange === "<" && shareSelrange === ">") {
            if (jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && shareSelrange === "<") {
            if (jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") {
            if (jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === "<") {
            if (jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
        
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === true && shareSelectionFlag === false && nameSelectionFlag === false) {
        if (jsonss.prizes[i].category === catSelector && (jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "="))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year > yearSelection) {
          
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].year < yearSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === true && shareSelectionFlag === true && nameSelectionFlag === false) {
        if ((jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=")) && (jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "="))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">" && shareSelrange === ">") {
          if (jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<" && shareSelrange === "<") {
          if (jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if ((yearSelrange === "<" && shareSelrange === ">") || (yearSelrange === ">" && shareSelrange === "<") || (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) || (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) || ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") || ((yearSelrange === "=" || yearSelrange === "Choose" ) && shareSelrange === "<")) {
          if (yearSelrange === "<" && shareSelrange === ">") {
            if (jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && shareSelrange === "<") {
            if (jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === "<" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].year < yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if (yearSelrange === ">" && (shareSelrange === "=" || shareSelrange === "Choose")) {
            if (jsonss.prizes[i].year > yearSelection && jsonss.prizes[i].laureates[j].share === shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === ">") {
            if (jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share > shareSelection) {
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
          if ((yearSelrange === "=" || yearSelrange === "Choose") && shareSelrange === "<") {
            if (jsonss.prizes[i].year === yearSelection && jsonss.prizes[i].laureates[j].share < shareSelection) {
        
              rowIndex += 1;
              row = table.insertRow(rowIndex);
              var yearCell = row.insertCell(0);
              yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
              var categoryCell = row.insertCell(1); 
              categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
              var firstNameCell = row.insertCell(2);
              firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
              var surnameCell = row.insertCell(3); 
              surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
            }
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === false && shareSelectionFlag === true && nameSelectionFlag === false) {
        if (jsonss.prizes[i].category === catSelector && (jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "="))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (shareSelrange === ">") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].laureates[j].share > shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (shareSelrange === "<") {
          if (jsonss.prizes[i].category === catSelector && jsonss.prizes[i].laureates[j].share < shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === false && shareSelectionFlag === false && nameSelectionFlag === true) {
        if (jsonss.prizes[i].category === catSelector && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === true && shareSelectionFlag === false && nameSelectionFlag === true) {
        if ((jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=")) && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">") {
          if (jsonss.prizes[i].year > yearSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<" ) {
          if (jsonss.prizes[i].year < yearSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === false && shareSelectionFlag === true && nameSelectionFlag === true) {
        if ((jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "=")) && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (shareSelrange === ">") {
          if (jsonss.prizes[i].laureates[j].share > shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (shareSelrange === "<") {
          if (jsonss.prizes[i].laureates[j].share < shareSelection && (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow))) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === true && yearSelectionFlag === false && shareSelectionFlag === false && nameSelectionFlag === false) {
        if (jsonss.prizes[i].category === catSelector) {
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === true && shareSelectionFlag === false && nameSelectionFlag === false) {
        if (jsonss.prizes[i].year === yearSelection && (yearSelrange === "Choose" || yearSelrange === "=")) {
        
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (yearSelrange === ">") {
          if (jsonss.prizes[i].year > yearSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (yearSelrange === "<") {
          if (jsonss.prizes[i].year < yearSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === false && shareSelectionFlag === true && nameSelectionFlag === false) {
        if (jsonss.prizes[i].laureates[j].share === shareSelection && (shareSelrange === "Choose" || shareSelrange === "=")) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
        if (shareSelrange === ">") {
          if (jsonss.prizes[i].laureates[j].share > shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
        if (shareSelrange === "<") {
          if (jsonss.prizes[i].laureates[j].share < shareSelection) {
            
            rowIndex += 1;
            row = table.insertRow(rowIndex);
            var yearCell = row.insertCell(0);
            yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
            var categoryCell = row.insertCell(1); 
            categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
            var firstNameCell = row.insertCell(2);
            firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
            var surnameCell = row.insertCell(3); 
            surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
          }
        }
      }
      else if (catSelectorFlag === false && yearSelectionFlag === false && shareSelectionFlag === false && nameSelectionFlag === true) {
        if (firstNameToLow.includes(nameSelToLow) || surnameToLow.includes(nameSelToLow)) {
          
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
      }
      else {
        if (catSelectorFlag === false && yearSelectionFlag === false && shareSelectionFlag === false && nameSelectionFlag === false) {
          rowIndex += 1;
          row = table.insertRow(rowIndex);
          var yearCell = row.insertCell(0);
          yearCell.innerHTML = "<td>" + jsonss.prizes[i].year + "</td>";
          var categoryCell = row.insertCell(1); 
          categoryCell.innerHTML = "<td>" + jsonss.prizes[i].category + "</td>";
          var firstNameCell = row.insertCell(2);  
          firstNameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].firstname + "</td>";
          var surnameCell = row.insertCell(3); 
          surnameCell.innerHTML = "<td>" + jsonss.prizes[i].laureates[j].surname + "</td>";
        }
      }
    }
  }
}
