document.addEventListener("DOMContentLoaded", function () {
  const toggleFormBtn = document.querySelector("#toggleFormBtn");
  const deleteLastBtn = document.querySelector("#deleteLastBtn");
  const totalCount = document.querySelector("#totalCount");
  const lionForm = document.querySelector("#lionForm");
  const cancelBtn = document.querySelector("#cancelBtn");
  const summaryGrid = document.querySelector("#summaryGrid");
  const detailList = document.querySelector("#detailList");
  const summaryEmpty = document.querySelector("#summaryEmpty");
  const detailEmpty = document.querySelector("#detailEmpty");
  const partFilter = document.querySelector("#partFilter");

  const imageList = [
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  ];

  let lions = [
    {
      name: "김아기사자",
      part: "Frontend",
      skills: ["HTML / CSS", "JavaScript", "React"],
      summary: "구조적인 UI를 고민하는 프론트엔드 개발자입니다.",
      intro: "사용자가 편하게 사용할 수 있는 화면을 만드는 데 관심이 많습니다.",
      email: "frontend@example.com",
      phone: "010-1111-1111",
      website: "https://frontend.example.com",
      comment: "작은 화면도 꼼꼼하게 설계하겠습니다.",
      image: imageList[0],
      isMine: true
    },
    {
      name: "박아기사자",
      part: "Backend",
      skills: ["Java", "Spring", "Node.js"],
      summary: "안정적인 서버 구조에 관심이 많습니다.",
      intro: "데이터가 안전하게 흐르는 구조와 서버 로직을 배우고 있습니다.",
      email: "backend@example.com",
      phone: "010-2222-2222",
      website: "https://backend.example.com",
      comment: "보이지 않는 곳을 단단하게 만들고 싶습니다.",
      image: imageList[1],
      isMine: false
    },
    {
      name: "이아기사자",
      part: "Design",
      skills: ["Figma", "UX", "Design Tokens"],
      summary: "사용자 관점에서 디자인을 고민합니다.",
      intro: "보기 좋은 디자인을 넘어서 사용하기 쉬운 경험을 만드는 데 관심이 있습니다.",
      email: "design@example.com",
      phone: "010-3333-3333",
      website: "https://design.example.com",
      comment: "사용자의 입장에서 먼저 생각하겠습니다.",
      image: imageList[2],
      isMine: false
    }
  ];

  function render() {
    const selectedPart = partFilter.value;

    const filteredLions = lions.filter(function (lion) {
      return selectedPart === "all" || lion.part === selectedPart;
    });

    summaryGrid.innerHTML = "";
    detailList.innerHTML = "";

    filteredLions.forEach(function (lion, index) {
      createSummaryCard(lion, index);
      createDetailCard(lion, index);
    });

    totalCount.textContent = lions.length;

    if (filteredLions.length === 0) {
      summaryEmpty.classList.remove("hidden");
      detailEmpty.classList.remove("hidden");
    } else {
      summaryEmpty.classList.add("hidden");
      detailEmpty.classList.add("hidden");
    }
  }

  function createSummaryCard(lion, index) {
    const card = document.createElement("article");
    card.className = "summary-card";

    if (lion.isMine) {
      card.classList.add("my-card");
    }

    card.innerHTML = `
      <div class="image-box">
        <img src="${lion.image}" alt="${lion.name} 프로필 이미지" />
        <span class="badge">${lion.skills[0]}</span>
      </div>
      <div class="card-content">
        <h3>${lion.name}</h3>
        <p class="part">${lion.part}</p>
        <p class="summary">${lion.summary}</p>
      </div>
    `;

    card.addEventListener("click", function () {
      const detailCards = document.querySelectorAll(".detail-card");
      detailCards[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    summaryGrid.appendChild(card);
  }

  function createDetailCard(lion) {
    const card = document.createElement("article");
    card.className = "detail-card";

    const skillItems = lion.skills
      .map(function (skill) {
        return `<li>${skill}</li>`;
      })
      .join("");

    card.innerHTML = `
      <h2>${lion.name}</h2>
      <p class="part">${lion.part} · 멋쟁이사자처럼</p>
      <p>${lion.intro}</p>

      <h3>관심 기술</h3>
      <ul>${skillItems}</ul>

      <h3>연락처</h3>
      <p>
        이메일: ${lion.email}<br />
        웹사이트: ${lion.website}<br />
        휴대전화: ${lion.phone}
      </p>

      <h3>한 마디</h3>
      <p>${lion.comment}</p>
    `;

    detailList.appendChild(card);
  }

  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorMessage = formGroup.querySelector(".error-message");
    errorMessage.textContent = message;
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (message) {
      message.textContent = "";
    });
  }

  function validateForm() {
    clearErrors();

    const inputs = [
      document.querySelector("#name"),
      document.querySelector("#part"),
      document.querySelector("#skills"),
      document.querySelector("#summary"),
      document.querySelector("#intro"),
      document.querySelector("#email"),
      document.querySelector("#phone"),
      document.querySelector("#website"),
      document.querySelector("#comment")
    ];

    let isValid = true;

    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        showError(input, "이 항목을 입력해주세요.");
        isValid = false;
      }
    });

    return isValid;
  }

  function addLion() {
    const name = document.querySelector("#name").value.trim();
    const part = document.querySelector("#part").value.trim();
    const skillsValue = document.querySelector("#skills").value.trim();
    const summary = document.querySelector("#summary").value.trim();
    const intro = document.querySelector("#intro").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const website = document.querySelector("#website").value.trim();
    const comment = document.querySelector("#comment").value.trim();

    const skills = skillsValue
      .split(",")
      .map(function (skill) {
        return skill.trim();
      })
      .filter(function (skill) {
        return skill !== "";
      });

    const newLion = {
      name: name,
      part: part,
      skills: skills,
      summary: summary,
      intro: intro,
      email: email,
      phone: phone,
      website: website,
      comment: comment,
      image: imageList[lions.length % imageList.length],
      isMine: false
    };

    lions.push(newLion);
    render();
    lionForm.reset();
    lionForm.classList.add("hidden");
  }

  toggleFormBtn.addEventListener("click", function () {
    lionForm.classList.toggle("hidden");
  });

  cancelBtn.addEventListener("click", function () {
    lionForm.reset();
    clearErrors();
    lionForm.classList.add("hidden");
  });

  lionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    addLion();
  });

  deleteLastBtn.addEventListener("click", function () {
    if (lions.length === 0) {
      return;
    }

    lions.pop();
    render();
  });

  partFilter.addEventListener("change", function () {
    render();
  });

  render();
});
