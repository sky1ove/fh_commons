// Function to load protein
function loadProtein(proteinId, siteData) {
  // Create a new plugin instance each time the function is called
  const viewerInstance = new PDBeMolstarPlugin();

  // Set options
  const options = {
    customData: {
      url: `https://alphafold.ebi.ac.uk/files/AF-${proteinId}-F1-model_v1.cif`,
      format: 'cif',
    },
    alphafoldView: false,
    bgColor: { r: 255, g: 255, b: 255 },
    hideCanvasControls: [
      'animation',
      'controlToggle',
      'controlInfo',
      'expand',
      'selection',     // Hide selection controls
      'orientation',   // Hide orientation controls
      'zoom',          // Hide zoom controls
    ],
    sequencePanel: true,
    hideControls: false, // Whether to hide control panel
    landscape: true, // Make the control panel horizontal
  };

  // Get element from HTML/Template to place the viewer
  const viewerContainer = document.getElementById('myViewer');

  // Render the new instance
  viewerInstance.render(viewerContainer, options);

  // Add tooltips for AM_pathogenicity scores
  viewerInstance.events.loadComplete.subscribe(() => {
    const tooltipData = siteData.map(site => {
      // Generate tooltip content dynamically from all keys in the site object
      const tooltipContent = Object.keys(site).map(key => {
        return `${key}: ${site[key] || 'N/A'}`; // Handle null or undefined values
      }).join('<br>'); // Join each key-value pair with an HTML line break
      return {
        residue_number: site.residue,
        tooltip: tooltipContent,
        color: { r: 255, g: 0, b: 150 },
      };
    });

    // Apply the selection and tooltip data to the viewer instance
    viewerInstance.visual.select({ data: tooltipData }); // Highlight residues with color
    viewerInstance.visual.tooltips({ data: tooltipData }); // Show tooltip information
  });
}

// Add event listener to the button
document.addEventListener('DOMContentLoaded', function() {
  const loadButton = document.getElementById('load-protein-btn');
  const proteinInput = document.getElementById('uniprot_id');

  loadButton.addEventListener('click', function() {
    const proteinId = proteinInput.value.trim();
    if (proteinId) {
      fetch(`./api/protein/${proteinId}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            loadProtein(proteinId, data.site_data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while fetching protein data');
        });
    } else {
      alert('Please enter a valid Protein ID');
    }
  });

  // Load a default protein on page load
  fetch('./api/protein/P35222')
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        loadProtein('P35222', data.site_data);
      }
    });
});