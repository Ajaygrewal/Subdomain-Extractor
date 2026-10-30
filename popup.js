const isFirefox = typeof browser !== 'undefined';
const API = isFirefox ? browser : chrome;

let allDomains = [];
let filteredDomains = [];

const scanBtn = document.getElementById('scanBtn');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error');
const emptyDiv = document.getElementById('empty');
const domainsList = document.getElementById('domainsList');
const countInfo = document.getElementById('countInfo');
const filterInput = document.getElementById('filterInput');
const extensionFilter = document.getElementById('extensionFilter');
const customExtension = document.getElementById('customExtension');
const copyAllBtn = document.getElementById('copyAllBtn');
const downloadCsvBtn = document.getElementById('downloadCsvBtn');
const downloadJsonBtn = document.getElementById('downloadJsonBtn');
const downloadTxtBtn = document.getElementById('downloadTxtBtn');
const copyNotification = document.getElementById('copyNotification');

// Scan button click
scanBtn.addEventListener('click', scanPage);

async function scanPage() {
  try {
    loadingDiv.style.display = 'block';
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    emptyDiv.style.display = 'none';

    const [tab] = await API.tabs.query({ active: true, currentWindow: true });

    // Check if tab URL is accessible
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) {
      throw new Error('Cannot scan system pages (chrome://, about:, etc.)');
    }

    // Function to extract ALL domains/files
    const extractFunction = function() {
      const pageContent = document.documentElement.outerHTML;
      const matches = pageContent.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}/gi) || [];
      let domains = [...new Set(matches)];
      domains = domains.filter(d => {
        const parts = d.split('.');
        return parts.length >= 2 && d.length < 253;
      });
      return domains.sort();
    };

    // Use scripting.executeScript
    const results = await API.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      function: extractFunction,
      world: 'MAIN'
    });

    const domains = results && results[0] && results[0].result ? results[0].result : [];

    if (!domains || domains.length === 0) {
      loadingDiv.style.display = 'none';
      emptyDiv.style.display = 'block';
      return;
    }

    allDomains = domains;
    filteredDomains = [...allDomains];
    loadingDiv.style.display = 'none';
    displayResults();

  } catch (error) {
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    errorDiv.textContent = '❌ ' + error.message;
    console.error('Scan error:', error);
  }
}

function displayResults() {
  resultsDiv.style.display = 'block';
  updateDomainsList();
  updateCount();
}

function updateDomainsList() {
  domainsList.innerHTML = '';
  if (filteredDomains.length === 0) {
    domainsList.innerHTML = '<div class="domain-item"><p>No domains found</p></div>';
    return;
  }

  filteredDomains.forEach((domain, index) => {
    const item = document.createElement('div');
    item.className = 'domain-item';
    
    // Create span for domain
    const span = document.createElement('span');
    span.className = 'domain-text';
    span.textContent = domain;
    
    // Create button for copy
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('data-index', index);
    
    item.appendChild(span);
    item.appendChild(btn);
    domainsList.appendChild(item);
  });

  // Add event listeners to copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', handleCopyClick);
  });
}

function handleCopyClick(event) {
  const index = event.target.getAttribute('data-index');
  const domain = filteredDomains[index];
  copyToClipboard(domain);
}

function updateCount() {
  countInfo.textContent = `Found: ${filteredDomains.length} domains`;
}

filterInput.addEventListener('input', applyFilters);
extensionFilter.addEventListener('change', applyFilters);
customExtension.addEventListener('input', applyFilters);

extensionFilter.addEventListener('change', (e) => {
  customExtension.style.display = e.target.value === 'custom' ? 'block' : 'none';
  applyFilters();
});

function applyFilters() {
  const searchTerm = filterInput.value.toLowerCase();
  const extFilter = extensionFilter.value;
  const customExt = customExtension.value.toLowerCase();

  filteredDomains = allDomains.filter(domain => {
    if (searchTerm && !domain.toLowerCase().includes(searchTerm)) {
      return false;
    }
    if (extFilter === 'custom' && customExt) {
      return domain.toLowerCase().endsWith(customExt);
    } else if (extFilter && extFilter !== 'custom') {
      return domain.toLowerCase().endsWith(extFilter);
    }
    return true;
  });

  updateDomainsList();
  updateCount();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('✅ Copied: ' + text);
  }).catch(err => {
    showNotification('❌ Copy failed');
  });
}

copyAllBtn.addEventListener('click', () => {
  const text = filteredDomains.join('\n');
  navigator.clipboard.writeText(text).then(() => {
    showNotification('✅ All ' + filteredDomains.length + ' items copied!');
  }).catch(err => {
    showNotification('❌ Copy failed');
  });
});

downloadCsvBtn.addEventListener('click', () => {
  const csv = filteredDomains.join('\n');
  downloadFile(csv, 'domains.csv', 'text/csv');
});

downloadJsonBtn.addEventListener('click', () => {
  const json = JSON.stringify(filteredDomains, null, 2);
  downloadFile(json, 'domains.json', 'application/json');
});

downloadTxtBtn.addEventListener('click', () => {
  const txt = filteredDomains.join('\n');
  downloadFile(txt, 'domains.txt', 'text/plain');
});

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  showNotification('✅ Downloaded: ' + filename);
}

function showNotification(message = '✅ Done!') {
  copyNotification.textContent = message;
  copyNotification.style.display = 'block';
  setTimeout(() => {
    copyNotification.style.display = 'none';
  }, 2000);
}
