function downloadCSV(data, filename) {
  var blob = new Blob([data], {type: 'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  var downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function downloadTableAsCSV(button) {
  var table = button.closest('div').querySelector('table');
  var csv = [];
  var rows = table.querySelectorAll('tr');
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length; j++) {
          var data = cols[j].innerText.replace(/"/g, '""');
          row.push('"' + data + '"');
      }
      csv.push(row.join(','));
  }
  downloadCSV(csv.join('\n'), 'table.csv');
}

function downloadSVG(button) {
    // Get the parent container of the button
    var container = button.parentNode;

    // Retrieve the first SVG element within the container
    var svg = container.querySelector('svg');

    // Proceed with the download process
    var serializer = new XMLSerializer();
    var svgBlob = new Blob([serializer.serializeToString(svg)], {type: 'image/svg+xml'});
    var url = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'plot.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}