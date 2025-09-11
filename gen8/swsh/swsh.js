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
      const dynamaxValue = getSelectedValue("dynamaxAdvBlock");
      const masudaValue = getSelectedValue("masudaMethodBlock");
      const brilliantValue = getSelectedValue("shinyBrilliantBlock");
      const genderRatioValue = getSelectedValue("genderRatioBlock");
      const markCharmValue = getSelectedValue("markCharmBlock");
      const randomValue = getSelectedValue("randomSparkleBlock");
      const specificMarkValue = getSelectedValue("specificMarkBlock");
      const bsmrValue = getSelectedValue("bsmrSparkleBlock");

      
      let total = ((1 + (shinyCharmValue + brilliantValue + masudaValue)) / 4096) 
                  * genderRatioValue 
                  * dynamaxValue
                  * (markCharmValue * specificMarkValue)
                  * randomValue
                  * bsmrValue;

      
      total = total * 100;
      document.getElementById("results").textContent = total.toFixed(15) + "%";
    }

    // Setup all button groups with default selections visually highlighted
    setupExclusiveButtons("shinyCharmBlock", 0);     
    setupExclusiveButtons("dynamaxAdvBlock", 0);  
    setupExclusiveButtons("markCharmBlock", 0);       
    setupExclusiveButtons("masudaMethodBlock", 0);    
    setupExclusiveButtons("genderRatioBlock", 0);     
    setupExclusiveButtons("shinyBrilliantBlock", 0);        
    setupExclusiveButtons("randomSparkleBlock", 0);
    setupExclusiveButtons("specificMarkBlock", 0);
    setupExclusiveButtons("bsmrSparkleBlock", 0);

    // Initial calculation
    calculateSVOdds();