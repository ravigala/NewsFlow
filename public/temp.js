function updateSupplierCountryChart(dataSheetNames) {

    // Get the dashboard temp data sheet
    const tempDataSheet = dashboardTempDataSheet;
  
    // Column name of the supplier column
    const columnName = loadingCountryColumnName;
  
    //Array will contains all the values of required column from all the required sheets
    let dataValues = fetchDataValuesFromSheet(dataSheetNames, columnName);
    //Getting the values from the main sheet
    let mainSheetDataValues = fetchDataValuesFromMainSheet(dataSheetNames, columnName);
  
    //Concatentaion the data from the main sheet and the month sheet
    dataValues.push(...mainSheetDataValues)
    let valueCounts = {};
  
    //Iterating through all the values
    dataValues.forEach(function (value) {
      //Check if the value is empty
      if (value !== '') {
  
        //check if it is multi-valued
        if (value.includes(supplierDelimeter)) {
          // add appropriate weightage
          let subValues = value.split(supplierDelimeter);
          let frequency = 1 / subValues.length;
          subValues.forEach(function (subValue) {
            if (valueCounts[subValue]) {
              valueCounts[subValue] += frequency;
            } else {
              valueCounts[subValue] = frequency;
            }
          });
        } else {
          //For single valued element
          if (valueCounts[value]) {
            valueCounts[value]++;
          } else {
            valueCounts[value] = 1;
          }
        }
      }
    });
  
    // Prepare the data for the chart
    let chartData = [['Top Supplier Country', 'Count']];
    for (let value in valueCounts) {
      chartData.push([value, valueCounts[value].toFixed(2)]);
    }
    chartData = sortCountry(chartData);
    // Clear previous data in the specific column of the temp data sheet
    let startColumn = 15; // Specify the column number to clear
    if (tempDataSheet.getLastRow() >= 1) {
      let columnRange = tempDataSheet.getRange(1, startColumn, tempDataSheet.getLastRow(), 2);
      columnRange.clearContent();
    }
  
    // Write the chart data to the specific column of the temp data sheet
    let dataColumnRange = tempDataSheet.getRange(1, startColumn, chartData.length, chartData[0].length);
    dataColumnRange.setValues(chartData);
  
  }