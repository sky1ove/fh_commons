// Create plugin instance
const viewerInstance = new PDBeMolstarPlugin();

// Function to load protein
function loadProtein(proteinId, siteData) {
  // Set options
  const options = {
    customData: {
      url: `https://alphafold.ebi.ac.uk/files/AF-${proteinId}-F1-model_v1.cif`,
      format: 'cif',
    },
    alphafoldView: false,
    bgColor: { r: 255, g: 255, b: 255 },
    hideCanvasControls: ['animation',
                         'controlToggle',
                         'controlInfo',
                         'expand',
                         'selection',     // Hide selection controls
                         'orientation',   // Hide orientation controls
                         'zoom',          // Hide zoom controls
                        ],
    // rightPanel:false,
    sequencePanel: true,
    hideControls: false, //whether to hide control panel
    landscape:true, //make the control panel to be horizontal
  };

  // Get element from HTML/Template to place the viewer
  const viewerContainer = document.getElementById('myViewer');
  // Clear previous content
  viewerContainer.innerHTML = '';
  // Call render method to display the 3D view
  viewerInstance.render(viewerContainer, options);

  // Add tooltips for AM_pathogenicity scores
  viewerInstance.events.loadComplete.subscribe(() => {
    const tooltipData = siteData.map(site => ({

      start_residue_number: site.residue,
      end_residue_number: site.residue,

      tooltip: `Residue: ${site.residue}, AM_pathogenicity: ${site.AM_pathogenicity || 'N/A'}`
    }));
    viewerInstance.visual.select({ data: tooltipData ,color: { r: 255, g: 0, b: 0 } });

  });
}

// Add event listener to the button
document.addEventListener('DOMContentLoaded', function() {
  const loadButton = document.getElementById('load-protein-btn');
  const proteinInput = document.getElementById('protein-id');

  loadButton.addEventListener('click', function() {
    const proteinId = proteinInput.value.trim();
    if (proteinId) {
      fetch(`/api/protein/${proteinId}`)
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

  // Load a default protein (O15552) on page load
  fetch('/api/protein/P35222')
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        loadProtein('P35222', data.site_data);
      }
    });
});