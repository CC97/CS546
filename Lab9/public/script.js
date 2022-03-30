let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('attempts');
let frmLabel = document.getElementById('formLabel');

function palindrome(str) { 
    str = str.toLowerCase();
    str = str.split("\n").join(";");
    var reg = /(?![A-Za-z0-9])./g;
    str=str.replace(reg, '');
    
    if(str.length == 0) 
    {
      return false;
    }
    for (var i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length-1 - i]) {
        return false;
    }   
  }
    return true;
};

if (myForm) {
  myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (textInput.value.trim()) {
        textInput.classList.remove('inputClass');
        errorDiv.hidden = true;
        //frmLabel.classList.remove('error');
        let flag = palindrome(textInput.value);
        let li = document.createElement('li');
        li.innerHTML = textInput.value;
        if(flag)
            li.className = 'is-palindrome';
        else
            li.classList = 'non-palindrome';
        myUl.appendChild(li);
        myForm.reset();
        textInput.focus();
    }else {
        textInput.value = '';
        errorDiv.hidden = false;
        errorDiv.innerHTML = 'You must enter a value';
        //frmLabel.className = 'error';
        textInput.focus();
        textInput.className = 'inputClass';
    }
  });
}