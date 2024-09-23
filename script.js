const proposals = [
    { offer: 100, text: "R$ 100,00 pelo produto A" },
    { offer: 200, text: "R$ 200,00 pelo produto B" },
    { offer: 150, text: "R$ 150,00 pelo produto C" },
    { offer: 250, text: "R$ 250,00 pelo produto D" },
    { offer: 300, text: "R$ 300,00 pelo produto E" },
    { offer: 400, text: "R$ 400,00 pelo produto F" },
];

let currentProposalIndex = 0;
let negotiationHistory = [];
let acceptedCount = 0;  // Contador de acordos

const proposalElement = document.getElementById("proposal");
const historyElement = document.getElementById("history");
const acceptButton = document.getElementById("accept-button");
const rejectButton = document.getElementById("reject-button");
const counterButton = document.getElementById("counter-button");
const nextButton = document.getElementById("next-button");
const resultMessage = document.getElementById("result-message");
const startButton = document.getElementById("start-button");
const endScreen = document.getElementById("end-screen");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const restartButton = document.getElementById("restart-button");

startButton.addEventListener("click", startGame);
acceptButton.addEventListener("click", acceptProposal);
rejectButton.addEventListener("click", rejectProposal);
counterButton.addEventListener("click", makeCounterOffer);
nextButton.addEventListener("click", nextProposal);
restartButton.addEventListener("click", restartGame);

function startGame() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    currentProposalIndex = 0;
    negotiationHistory = [];
    acceptedCount = 0;  // Reiniciar contador
    loadProposal();
}

function loadProposal() {
    if (currentProposalIndex < proposals.length) {
        proposalElement.textContent = proposals[currentProposalIndex].text;
        historyElement.innerHTML = negotiationHistory.map((entry) => `<div>${entry}</div>`).join('');
        nextButton.classList.add("hidden");
    } else {
        endGame();
    }
}

function acceptProposal() {
    acceptedCount++;  // Incrementar contador de acordos
    negotiationHistory.push(`Aceitou: ${proposals[currentProposalIndex].text}`);
    nextButton.classList.remove("hidden");
    proposalElement.textContent = "Você aceitou a proposta!";
}

function rejectProposal() {
    negotiationHistory.push(`Rejeitou: ${proposals[currentProposalIndex].text}`);
    nextButton.classList.remove("hidden");
    proposalElement.textContent = "Você rejeitou a proposta. Tente novamente!";
}

function makeCounterOffer() {
    const counterOfferValue = parseFloat(document.getElementById("counteroffer").value);
    const originalOffer = proposals[currentProposalIndex].offer;
    
    if (!isNaN(counterOfferValue)) {
        negotiationHistory.push(`Contraproposta: R$ ${counterOfferValue}`);
        historyElement.innerHTML = negotiationHistory.map((entry) => `<div>${entry}</div>`).join('');

        if (counterOfferValue >= originalOffer * 0.85) {
            acceptedCount++;  // Incrementar contador de acordos
            proposalElement.textContent = "Você fez uma contraproposta aceita!";
        } else {
            proposalElement.textContent = "Contraproposta rejeitada. Valor muito baixo.";
        }
        
        document.getElementById("counteroffer").value = '';
        nextButton.classList.remove("hidden");
    } else {
        alert("Por favor, insira um valor válido.");
    }
}

function nextProposal() {
    currentProposalIndex++;
    loadProposal();
}

function endGame() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    if (acceptedCount >= 3) {
        resultMessage.textContent = `Você chegou a acordos ${acceptedCount} vez(es). Obrigado por participar! Pegue sua recompensa!`;
    } else {
        resultMessage.textContent = `Você chegou a acordos ${acceptedCount} vez(es). Obrigado por participar!`;
    }
}

function restartGame() {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}
