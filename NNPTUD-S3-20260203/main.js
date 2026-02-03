async function getData() {
  try {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    let body = document.getElementById("table_body");
    body.innerHTML = "";
    for (const post of posts) {
      const titleHTML = post.isDeleted ? `<s>${post.title}</s>` : post.title;
      const idHTML = post.isDeleted ? `<s>${post.id}</s>` : post.id;
      const viewsHTML = post.isDeleted ? `<s>${post.views}</s>` : post.views;
      body.innerHTML += `<tr>
                <td>${idHTML}</td>
                <td>${titleHTML}</td>
                <td>${viewsHTML}</td>
                <td><input type='submit' value='Delete' onclick='Delete(${post.id})'></td>
            </tr>`;
    }
  } catch (error) {
    console.log(error);
  }
}
async function Save() {
  let id = document.getElementById("txt_id").value;
  let title = document.getElementById("txt_title").value;
  let views = document.getElementById("txt_views").value;
  id = id && id.trim();
  title = title && title.trim();
  views = views && views.trim();

  if (id) {
    // try to get existing item
    let getItem = await fetch("http://localhost:3000/posts/" + id);
    if (getItem.ok) {
      // edit - preserve isDeleted flag
      let existing = await getItem.json();
      let res = await fetch("http://localhost:3000/posts/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          views: views,
          isDeleted: existing.isDeleted,
        }),
      });
      if (res.ok) {
        console.log("thanh cong");
        await getData();
      }
    } else {
      // id provided but not found -> create with this id
      let res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          views: views,
        }),
      });
      if (res.ok) {
        console.log("thanh cong");
        await getData();
      }
    }
  } else {
    // create - compute maxId + 1 when id is empty
    let allRes = await fetch("http://localhost:3000/posts");
    if (allRes.ok) {
      let posts = await allRes.json();
      let max = posts.reduce((m, p) => {
        const n = parseInt(p.id) || 0;
        return Math.max(m, n);
      }, 0);
      let newId = String(max + 1);
      let res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newId,
          title: title,
          views: views,
        }),
      });
      if (res.ok) {
        console.log("thanh cong");
        await getData();
      }
    }
  }
}
async function Delete(id) {
  // Soft-delete: set isDeleted = true via PATCH
  let res = await fetch("http://localhost:3000/posts/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDeleted: true }),
  });
  if (res.ok) {
    console.log("xoa thanh cong");
    await getData();
  }
}
getData();
