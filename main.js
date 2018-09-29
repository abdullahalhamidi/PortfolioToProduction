const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    
    //Check if deleting
    if(this.isDeleting) {
       // Remove a Char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
       }else {
       // Add Char
           this.txt = fullTxt.substring(0, this.txt.length + 1);
       }
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    //Type Speed
    let typeSpeed = 220;
    
    if(this.isDeleting){
       typeSpeed /= 2;
       }
    
    //Check to see if word is complete 
    if(!this.isDeleting && this.txt === fullTxt){
        //Pause
       typeSpeed = this.wait;
        //Set delet to true
        this.isDeleting = true;
       }else if(this.isDeleting && this.txt === '') {
           this.isDeleting = false;
           //Move to next word
           this.wordIndex++;
           //Pause before typing
           typeSpeed = 10;
       }
    
    
    setTimeout(() => this.type(), typeSpeed);
}

//Int When DOM Load
document.addEventListener('DOMContentLoaded', init);

//Int App
 function init() {
     const txtElement = document.querySelector('.txt-type');
     const words = JSON.parse(txtElement.getAttribute('data-words'));
     const wait = txtElement.getAttribute('data-wait');
     //Int TypeWriter
     new TypeWriter(txtElement, words, wait);
 }
