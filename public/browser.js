document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");

  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const bookId = document.getElementById("book-id").value;
      const commentInput = document.getElementById("comment-input");
      const commentText = commentInput.value.trim();

      if (!commentText) return;

      axios
        .post(`/add-comment/${bookId}`, { comment: commentText })
        .then((response) => {
          if (response.data.state === "success") {
            const commentList = document.getElementById("comment-list");
            const noComments = document.getElementById("no-comments");

            if (noComments) {
              noComments.remove();
            }

            const newLi = document.createElement("li");
            newLi.className = "list-group-item pl-0";
            newLi.textContent = commentText;

            commentList.prepend(newLi);
            commentInput.value = "";
          }
        })
        .catch((err) => {
          console.error("Sharh yuborishda xatolik:", err);
          alert("Sharhni saqlab bo'lmadi!");
        });
    });
  }
});


const cleanAllBtn = document.getElementById("clean-all");

if (cleanAllBtn) {
  cleanAllBtn.addEventListener("click", function () {
    if (confirm("Haqiqatdan ham barcha kitoblarni o'chirib tashlamoqchimisiz?")) {
      axios
        .post("/delete-all", { delete_all: true })
        .then((response) => {
          alert(response.data.state);
          document.location.reload();
        })
        .catch((err) => {
          console.error("Xatolik:", err);
          alert("Xatolik yuz berdi!");
        });
    }
  });
}