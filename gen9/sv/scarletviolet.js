function setupExclusiveButtons(blockId, defaultIndex = 0) {
      const block = document.getElementById(blockId);
      const buttons = block.querySelectorAll("button");

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("selected"));
          button.classList.add("selected");
          calculateSVOdds();
        });


        if (index === defaultIndex) {
          button.classList.add("selected");
        }
      });
    }

    function getSelectedValue(blockId) {
      const selected = document.querySelector(`#${blockId} .selected`);
      return selected ? parseFloat(selected.getAttribute("data-value")) : 0;
    }

    function calculateSVOdds() {
      
      const masudaSelected = getSelectedValue("masudaMethodBlock");
      const shinyButtons = document.querySelectorAll("#shinyCharmBlock button");
      shinyButtons.forEach(button => {
        if (button.textContent === "Yes") {
          button.setAttribute("data-value", masudaSelected === 1 ? 1 : 2);
        }
      });

      const shinyCharmValue = getSelectedValue("shinyCharmBlock");
      const sparklingPowerValue = getSelectedValue("sparklingPowerBlock");
      const masudaValue = getSelectedValue("masudaMethodBlock");
      const outbreakValue = getSelectedValue("outbreakBlock");
      const genderRatioValue = getSelectedValue("genderRatioBlock");
      const markCharmValue = getSelectedValue("markCharmBlock");
      const titlePowerValue = getSelectedValue("titlePowerBlock");
      const specificMarkValue = getSelectedValue("specificMarkBlock");
      const sizeMarkValue = getSelectedValue("sizeMarkBlock")

      
      let total = ((1 + shinyCharmValue + outbreakValue + sparklingPowerValue + masudaValue) / 4096) 
                  * genderRatioValue 
                  * ((markCharmValue + titlePowerValue) * specificMarkValue)
                  * sizeMarkValue;

      
      total = total * 100;
      document.getElementById("results").textContent = total.toFixed(15) + "%";
    }

    // Setup all button groups with default selections visually highlighted
    setupExclusiveButtons("shinyCharmBlock", 0);     
    setupExclusiveButtons("sparklingPowerBlock", 0);  
    setupExclusiveButtons("markCharmBlock", 0);       
    setupExclusiveButtons("masudaMethodBlock", 0);    
    setupExclusiveButtons("genderRatioBlock", 0);     
    setupExclusiveButtons("outbreakBlock", 0);        
    setupExclusiveButtons("titlePowerBlock", 0);
    setupExclusiveButtons("specificMarkBlock", 0);
    setupExclusiveButtons("sizeMarkBlock", 0);

    // Initial calculation
    calculateSVOdds();