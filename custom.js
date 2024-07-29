const table = document.getElementById("userTable");

// Verileri API'den çek ve tabloyu güncelle
function getUserList() {
    fetch("https://reqres.in/api/users")
      .then(response => response.json())
      .then(data => {
        table.innerHTML = ''; // Tabloyu temizle
        for (const user of data.data) {
          table.innerHTML += `
          <tr>
            <td>
              <input type="text" class="form-control" id="first_name_${user.id}" value="${user.first_name}">
            </td>
            <td>
              <input type="text" class="form-control" id="last_name_${user.id}" value="${user.last_name}">
            </td>
            <td>
              <input type="text" class="form-control" id="email_${user.id}" value="${user.email}">
            </td>
            <td>
              <a href="#" class="btn btn-warning" onclick="updateUser(${user.id}); return false;">Güncelle</a>
              <a href="#" class="btn btn-danger" onclick="deleteUser(${user.id}); return false;">Sil</a>
            </td>
          </tr>`;
        }
      });
}

// Yeni kullanıcı ekle
function createUser() {
    const data = {
      first_name: document.getElementById("first_name").value || "Değer Yok",
      last_name: document.getElementById("last_name").value || "Değer Yok",
      email: document.getElementById("email").value || "Değer Yok",
    };

    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // Yeni kullanıcıyı tabloya ekle
      table.innerHTML += `
      <tr>
        <td>
          <input type="text" class="form-control" id="first_name_${data.id}" value="${data.first_name}">
        </td>
        <td>
          <input type="text" class="form-control" id="last_name_${data.id}" value="${data.last_name}">
        </td>
        <td>
          <input type="text" class="form-control" id="email_${data.id}" value="${data.email}">
        </td>
        <td>
          <a href="#" class="btn btn-warning" onclick="updateUser(${data.id}); return false;">Güncelle</a>
          <a href="#" class="btn btn-danger" onclick="deleteUser(${data.id}); return false;">Sil</a>
        </td>
      </tr>`;
    }) //Return False A hrefini engelleyip sadece js nin çalışmasını sağlıyor o yüzden false 

    .catch(error => console.log("Hata:", error));
}

// Kullanıcıyı güncelle
function updateUser(id) {
    const data = {
      first_name: document.getElementById(`first_name_${id}`).value || "Geçersiz Değer",
      last_name: document.getElementById(`last_name_${id}`).value || "Geçersiz Değer",
      email: document.getElementById(`email_${id}`).value || "Geçersiz Değer",
    };

    fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(veri => console.log("Kullanıcı Güncellendi.", veri))
    .catch(error => console.log(error));
}

// Kullanıcıyı sil
function deleteUser(id) {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      // Silme işlemi başarılı, kullanıcıyı tabloda kaldır
      const row = document.querySelector(`#userTable tr td input[id^="first_name_${id}"]`).closest('tr');
      if (row) row.remove();
      console.log(`Kullanıcı ${id} silindi.`);
    })
    .catch(error => console.log(error));
}

// Sayfa yüklendiğinde kullanıcı listesini al
document.addEventListener("DOMContentLoaded", getUserList);