document.addEventListener("DOMContentLoaded", function () {
  const chatWrapper = document.getElementById("chat-wrapper");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // Mensaje de bienvenida inicial
  addBotMessage(
    "Hola, soy el asistente virtual de Carabineros de Chile. Estoy aquí para brindarte informacion y asistencia. ¿En que puedo ayudarte hoy?"
  );

  // Enviar mensaje al hacer clic en el botón
  sendBtn.addEventListener("click", sendMessage);

  // Enviar mensaje al presionar Enter
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
      addUserMessage(message);
      userInput.value = "";

      // Simular procesamiento y respuesta del bot
      setTimeout(() => {
        const response = getBotResponse(message);
        addBotMessage(response);
      }, 500);
    }
  }

  function addUserMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message user-msg";
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <div class="message-icon">
                <span class="material-symbols-outlined btn">person</span>
            </div>
        </div>
    `;
    chatWrapper.appendChild(messageDiv);
    chatWrapper.scrollTop = chatWrapper.scrollHeight;
  }

  function addBotMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message bot-msg";
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-icon">
                <span class="material-symbols-outlined btn">robot</span>
            </div>
            <p>${message}</p>
        </div>
    `;
    chatWrapper.appendChild(messageDiv);
    chatWrapper.scrollTop = chatWrapper.scrollHeight;
  }

  function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    const emergencyNumbers = `
            Los principales números de emergencia en Chile son:
            <ul>
                <li>Carabineros de Chile: 133</li>
                <li>Ambulancia (SAMU): 131</li>
                <li>Bomberos: 132</li>
                <li>Policía de Investigaciones (PDI): 134</li>
                <li>Número único de emergencias: 911</li>
            </ul>
        `;

    const responses = {
      greetings: ["hola", "hi", "buenos días", "buenas tardes"],
      farewells: ["adiós", "chao", "hasta luego", "nos vemos"],
      thanks: ["gracias", "agradecido", "agradecida"],
      emergency: [
        "emergencia",
        "número",
        "números",
        "teléfono",
        "telefono",
        "133",
        "131",
        "132",
        "134",
        "911",
      ],
      help: ["ayuda", "qué puedes hacer", "funciones"],
    };

    if (responses.greetings.some((word) => userMessage.includes(word))) {
      return "¡Hola! ¿En qué puedo ayudarte hoy?";
    } else if (responses.farewells.some((word) => userMessage.includes(word))) {
      return "¡Hasta luego! Recuerda que estoy aquí para ayudarte cuando lo necesites.";
    } else if (responses.thanks.some((word) => userMessage.includes(word))) {
      return "¡De nada! Es un honor servir a la comunidad.";
    } else if (responses.emergency.some((word) => userMessage.includes(word))) {
      return emergencyNumbers;
    } else if (responses.help.some((word) => userMessage.includes(word))) {
      return "Puedo proporcionarte información sobre números de emergencia, procedimientos de seguridad y orientación general. ¿En qué necesitas ayuda?";
    } else {
      return "Entendido. Si necesitas información sobre emergencias, seguridad o procedimientos policiales, no dudes en preguntar.";
    }
  }
});
