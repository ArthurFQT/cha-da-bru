import {
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { database } from "./firebase-config.js";

const giftListEl = document.getElementById("gift-list");
const modal = document.getElementById("modal");
const giftNameEl = document.getElementById("gift-name");
const guestNameInput = document.getElementById("guest-name");
const confirmBtn = document.getElementById("confirm-btn");
const closeBtn = document.getElementById("close-btn");

let selectedGiftId = null;

// Carrega lista em tempo real
onValue(ref(database, "gifts"), (snapshot) => {
  const gifts = snapshot.val() || {};
  giftListEl.innerHTML = "";
  Object.entries(gifts).forEach(([id, gift]) => {
    const div = document.createElement("div");
    div.className = "gift";
    div.innerHTML = `
    <h3>${gift.name}</h3>
    ${
      gift.image
        ? `<img src="${gift.image}" alt="${gift.name}" class="gift-img">`
        : ""
    }
    ${gift.description ? `<p>${gift.description}</p>` : ""}
    ${
      gift.reservedBy
        ? `<p>Reservado por: <strong>${gift.reservedBy}</strong></p>`
        : ""
    }
    <button ${gift.reservedBy ? "disabled" : ""} data-id="${id}">
      ${gift.reservedBy ? "Já Reservado" : "Reservar"}
    </button>
  `;
    giftListEl.appendChild(div);
  });

  document.querySelectorAll(".gift button").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedGiftId = btn.dataset.id;
      giftNameEl.textContent = gifts[selectedGiftId].name;
      modal.style.display = "flex";
    });
  });
});

// Confirmar presente
confirmBtn.addEventListener("click", () => {
  const guestName = guestNameInput.value.trim();
  if (!guestName) {
    alert("Digite seu nome para confirmar!");
    return;
  }
  update(ref(database, `gifts/${selectedGiftId}`), {
    reservedBy: guestName,
  });
  modal.style.display = "none";
  guestNameInput.value = "";
});

// Fechar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
