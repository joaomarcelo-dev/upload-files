const dropArea = document.querySelector('.drop-area');
const inputFile = document.querySelector('.input-file');
const removeFile = document.querySelector('.remove-file');
const listFiles = document.querySelector('.list-files');

const progress = document.querySelector('progress');

const saveLocalStorage = {
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  getItem: (key, value) => JSON.parse(localStorage.getItem(key)),
  removeItem: (key) => localStorage.removeItem(key)
}

dropArea.addEventListener('dragover', () => {
  dropArea.classList.add('droping-file-active');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('droping-file-active');
});


const animationProgress = (element) => {
  const progressItem = element.querySelector('progress');
  const porcentsItem = element.querySelector('.porcent-uploading');
  const sizefile = element.querySelector('.size-file').innerHTML;
  const progressUploaderFileSize = element.querySelector('.progress-upload-file-size')

  const maxProgress = progressItem.max
  let valueProgress = progressItem.value

  
  const incrementProgress = setInterval(() => {
    valueProgress += 3;
    progressItem.value = valueProgress;
    porcentsItem.innerHTML = valueProgress;
    progressUploaderFileSize.innerHTML = (((sizefile) * valueProgress) / 100).toFixed(2)
    
    if (valueProgress == maxProgress) {
      clearInterval(incrementProgress);
      element.classList.add('completed')
    }
  }, 100)
};

const arrayFiles = [];

const convertToMB = (byts) => {
  const mb = byts / (1024 * 1024)
  return mb.toFixed(2);
}

const henderFiles = () => {
  const lastFile = arrayFiles[arrayFiles.length - 1];
  const element = (`
    <div class="file-upload">
      <div class="content-one-file">
      </div>
        <i class="ph ph-file"></i>
        <div class="file-info">
          <h4 class="name-file">${lastFile.name}</h4>
          <span class="file-size"><span class="progress-upload-file-size">30</span> MB / <span class="size-file">${convertToMB(lastFile.size)}</span> MB</span>
          <div class="progress-bar">
            <progress value="46" max="100"></progress>
            <span><span class="porcent-uploading">46</span> %</span>
          </div>
      </div>
      <i class="ph ph-x remove-file"></i>
    </div>
  `)
  
  listFiles.innerHTML += element;
  animationProgress(listFiles.children[listFiles.children.length - 1])
}

inputFile.addEventListener('change', () => {
  const files = inputFile.files
  arrayFiles.push(...files); 
  henderFiles();
});
