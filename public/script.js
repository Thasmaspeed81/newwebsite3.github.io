async function loadNotes() {
  const subject = document.getElementById("subject").value;

  const res = await fetch(`/notes/${subject}`);
  const data = await res.json();

  document.getElementById("content").innerHTML =
    `<h3>Notes:</h3><p>${data.data}</p>`;
}

async function startQuiz() {
  const subject = document.getElementById("subject").value;

  const res = await fetch(`/quiz/${subject}`);
  const data = await res.json();

  let html = "<h3>Quiz:</h3>";
  let score = 0;

  data.data.forEach((q, index) => {
    html += `<p>${q.q}</p>`;
    q.options.forEach(opt => {
      html += `<button onclick="checkAnswer('${opt}','${q.answer}')">${opt}</button>`;
    });
  });

  document.getElementById("content").innerHTML = html;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}
