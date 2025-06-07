setTimeout(createSteps, 111);

function createSteps() {
   const ulSteps = document.querySelector("#next-steps + ul");
   ulSteps.id = "ul-steps";
   

   const lastLI = ulSteps.firstElementChild;
   const nextLI = ulSteps.lastElementChild;

   const lastLabel = document.createElement("label");
   const nextLabel = document.createElement("label");
   
   lastLabel.innerHTML = 'last'
   nextLabel.innerHTML = 'next'

   lastLI.prepend(lastLabel);
   nextLI.prepend(nextLabel);

   const lastButton = document.createElement("button");
   const nextButton = document.createElement("button");

   lastButton.innerHTML = "<";
   nextButton.innerHTML = ">";

   lastButton.id = 'last-button';
   nextButton.id = 'next-button';

   lastLI.prepend(lastButton);
   nextLI.prepend(nextButton);
}