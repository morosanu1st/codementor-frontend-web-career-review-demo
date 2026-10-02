(function () {
  const STORAGE_KEY = "frontend-career-checklist-v1";
  const form = document.getElementById("career-form");
  const progressText = document.getElementById("progress-text");
  if (!form || !progressText) return;

  const boxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
  const total = boxes.length;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return;
      boxes.forEach(function (box) {
        box.checked = saved.includes(box.value);
      });
    } catch (_) {
      /* ignore corrupt storage */
    }
  }

  function save() {
    const checked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch (_) {
      /* private mode / quota */
    }
  }

  function updateProgress() {
    const n = boxes.filter(function (b) { return b.checked; }).length;
    progressText.textContent = n + " of " + total + " checked";
  }

  boxes.forEach(function (box) {
    box.addEventListener("change", function () {
      save();
      updateProgress();
    });
  });

  load();
  updateProgress();
})();
